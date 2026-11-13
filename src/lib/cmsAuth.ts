import { CmsEditorEntry, INITIAL_CMS_EDITORS } from '../config/cms-editors';
import { demoAccounts, MemberAccount } from './memberData';
import { sportadminAccounts, sportadminSkiers, SportAdminSkierRecord } from './sportadminData';

export interface CmsAuthResult {
  allowed: boolean;
  role?: 'superadmin' | 'editor';
  reason: string;
}

export interface AdminAuthResult {
  allowed: boolean;
  role?: string;
  name?: string;
  reason: string;
}

/**
 * Normalized keywords identifying board members and lead coaches
 * in SportAdmin groups and roles.
 */
export const BOARD_ROLE_KEYWORDS = [
  'styrelse',
  'tränaransvarig',
  'tranaransvarig',
  'huvudtränare',
  'huvudtranare',
  'ta arena',
  'engagerade vuxna'
];

/**
 * Checks if a string contains any of the board/lead-coach keywords.
 */
function hasBoardKeyword(text?: string): boolean {
  if (!text) return false;
  const normalized = text.toLowerCase();
  return BOARD_ROLE_KEYWORDS.some(kw => normalized.includes(kw));
}

/**
 * Evaluates whether a given email address is authorized to edit site content in Freeskiers Studio.
 *
 * Authorization rules:
 * 1. Explicit list check: entries in `INITIAL_CMS_EDITORS` (or custom editors list).
 *    Matches assign either 'superadmin' or 'editor' based on config.
 * 2. SportAdmin automatic authorization:
 *    - Accounts with role 'styrelse' or 'admin'.
 *    - Skiers or accounts with group connection or role containing 'styrelse',
 *      'tränaransvarig', or 'huvudtränare'.
 *    Matches are granted 'editor' role.
 * 3. All other users are rejected.
 */
export function canUserEditCms(
  email: string,
  editors: CmsEditorEntry[] = INITIAL_CMS_EDITORS,
  accounts: MemberAccount[] = [...demoAccounts, ...sportadminAccounts],
  skiers: SportAdminSkierRecord[] = sportadminSkiers
): CmsAuthResult {
  const cleanEmail = typeof email === 'string' ? email.toLowerCase().trim() : '';

  if (!cleanEmail) {
    return {
      allowed: false,
      reason: 'Ingen giltig e-postadress angiven'
    };
  }

  // 1. Check explicit editors list
  const explicitEntry = editors.find(
    e => e.email.toLowerCase().trim() === cleanEmail
  );
  if (explicitEntry) {
    return {
      allowed: true,
      role: explicitEntry.role,
      reason: `Tillåten via explicit redaktörslista (${explicitEntry.role})`
    };
  }

  // 2. Check SportAdmin accounts (primary & alternate emails)
  for (const account of accounts) {
    const isPrimaryMatch = account.email?.toLowerCase().trim() === cleanEmail;
    const isAltMatch = account.alternateEmails?.some(
      alt => alt?.toLowerCase().trim() === cleanEmail
    );

    if (isPrimaryMatch || isAltMatch) {
      // Check account role
      if (account.role === 'styrelse' || account.role === 'admin') {
        return {
          allowed: true,
          role: 'editor',
          reason: `Tillåten via SportAdmin (${account.role})`
        };
      }

      // Check account skiers
      for (const skier of account.skiers || []) {
        if (
          skier.role === 'styrelse' ||
          skier.role === 'admin' ||
          hasBoardKeyword(skier.role) ||
          hasBoardKeyword(skier.groupName)
        ) {
          return {
            allowed: true,
            role: 'editor',
            reason: `Tillåten via SportAdmin-roll/grupp (${skier.groupName || skier.role})`
          };
        }
      }
    }
  }

  // 3. Check SportAdmin skier database directly (guardian email)
  for (const skier of skiers || []) {
    if (skier.guardianEmail?.toLowerCase().trim() === cleanEmail) {
      if (
        skier.role === 'styrelse' ||
        skier.role === 'admin' ||
        hasBoardKeyword(skier.role) ||
        hasBoardKeyword(skier.groupName)
      ) {
        return {
          allowed: true,
          role: 'editor',
          reason: `Tillåten via SportAdmin-koppling (${skier.groupName || skier.role})`
        };
      }
    }
  }

  // 4. Default: denied
  return {
    allowed: false,
    reason: 'E-postadressen saknar redaktörsbehörighet i Freeskiers Studio'
  };
}

/**
 * Helper to determine if a user has full superadmin rights.
 */
export function isSuperAdmin(
  email: string,
  editors: CmsEditorEntry[] = INITIAL_CMS_EDITORS
): boolean {
  const auth = canUserEditCms(email, editors);
  return auth.allowed && auth.role === 'superadmin';
}

/**
 * Evaluates whether an email is authorized to access the Kansli & Admin portal (/admin).
 * Grants access to:
 * - Explicit administrators (INITIAL_CMS_EDITORS)
 * - Styrelsemedlemmar in SportAdmin (role 'styrelse' or 'admin')
 * - TA (Tränaransvarig, Huvudtränare, TA Arena) in SportAdmin
 */
export function canAccessAdmin(
  email: string,
  editors: CmsEditorEntry[] = INITIAL_CMS_EDITORS,
  accounts: MemberAccount[] = [...demoAccounts, ...sportadminAccounts],
  skiers: SportAdminSkierRecord[] = sportadminSkiers
): AdminAuthResult {
  const cleanEmail = typeof email === 'string' ? email.toLowerCase().trim() : '';

  if (!cleanEmail) {
    return {
      allowed: false,
      reason: 'Ingen giltig e-postadress angiven'
    };
  }

  // 1. Check explicit administrators
  const explicitEntry = editors.find(
    e => e.email.toLowerCase().trim() === cleanEmail
  );
  if (explicitEntry) {
    return {
      allowed: true,
      role: explicitEntry.role === 'superadmin' ? 'admin' : 'styrelse',
      name: explicitEntry.name,
      reason: `Tillåten via administratörslista (${explicitEntry.role})`
    };
  }

  // 2. Check SportAdmin accounts (primary & alternate emails)
  for (const account of accounts) {
    const isPrimaryMatch = account.email?.toLowerCase().trim() === cleanEmail;
    const isAltMatch = account.alternateEmails?.some(
      alt => alt?.toLowerCase().trim() === cleanEmail
    );

    if (isPrimaryMatch || isAltMatch) {
      if (account.role === 'styrelse' || account.role === 'admin') {
        return {
          allowed: true,
          role: account.role,
          name: account.guardianName,
          reason: `Tillåten via SportAdmin (${account.role})`
        };
      }

      for (const skier of account.skiers || []) {
        if (
          skier.role === 'styrelse' ||
          skier.role === 'admin' ||
          hasBoardKeyword(skier.role) ||
          hasBoardKeyword(skier.groupName) ||
          (skier.paymentDate && skier.paymentDate.toLowerCase().includes('styrelse')) ||
          (skier.firstName?.toLowerCase() === 'klara' && skier.lastName?.toLowerCase() === 'tengstrand') ||
          (skier.firstName?.toLowerCase() === 'felix' && skier.lastName?.toLowerCase() === 'bergström') ||
          (skier.firstName?.toLowerCase() === 'ellinor' && skier.lastName?.toLowerCase() === 'strömstedt') ||
          (account.guardianName?.toLowerCase().includes('ellinor strömstedt'))
        ) {
          return {
            allowed: true,
            role: skier.role === 'admin' ? 'admin' : 'styrelse',
            name: account.guardianName || `${skier.firstName} ${skier.lastName}`,
            reason: `Tillåten via SportAdmin TA / Styrelse (${skier.groupName || skier.role})`
          };
        }
      }
    }
  }

  // 3. Check SportAdmin skier database directly (guardian email)
  for (const skier of skiers) {
    const isGuardianMatch = skier.guardianEmail?.toLowerCase().trim() === cleanEmail;
    if (isGuardianMatch) {
      if (
        skier.role === 'styrelse' ||
        skier.role === 'admin' ||
        hasBoardKeyword(skier.role) ||
        hasBoardKeyword(skier.groupName) ||
        (skier.paymentDate && skier.paymentDate.toLowerCase().includes('styrelse')) ||
        (skier.firstName?.toLowerCase() === 'klara' && skier.lastName?.toLowerCase() === 'tengstrand') ||
        (skier.firstName?.toLowerCase() === 'felix' && skier.lastName?.toLowerCase() === 'bergström') ||
        (skier.firstName?.toLowerCase() === 'ellinor' && skier.lastName?.toLowerCase() === 'strömstedt')
      ) {
        return {
          allowed: true,
          role: skier.role === 'admin' ? 'admin' : 'styrelse',
          name: skier.guardianName || `${skier.firstName} ${skier.lastName}`,
          reason: `Tillåten via SportAdmin-koppling (${skier.groupName || skier.role})`
        };
      }
    }
  }

  return {
    allowed: false,
    reason: 'E-postadressen saknar behörighet som Styrelse eller TA i SportAdmin'
  };
}
