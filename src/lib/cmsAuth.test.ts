import { describe, it, expect } from 'vitest';
import { canUserEditCms, isSuperAdmin } from './cmsAuth';

describe('CMS Authorization', () => {
  describe('Explicit editor config', () => {
    it('allows explicit superadmins from config', () => {
      const auth = canUserEditCms('admin@lidingofreeskiers.se');
      expect(auth.allowed).toBe(true);
      expect(auth.role).toBe('superadmin');
      expect(auth.reason).toContain('superadmin');
    });

    it('allows explicit editors from config', () => {
      const auth = canUserEditCms('kontakt@lidingofreeskiers.se');
      expect(auth.allowed).toBe(true);
      expect(auth.role).toBe('editor');
    });

    it('handles mixed case and surrounding whitespace in email', () => {
      const auth = canUserEditCms('  Admin@LidingoFreeskiers.SE  ');
      expect(auth.allowed).toBe(true);
      expect(auth.role).toBe('superadmin');
    });

    it('supports custom editor lists when passed', () => {
      const customEditors = [
        { email: 'custom.guest@freeskiers.se', name: 'Gäst', role: 'editor' as const }
      ];
      const auth = canUserEditCms('custom.guest@freeskiers.se', customEditors);
      expect(auth.allowed).toBe(true);
      expect(auth.role).toBe('editor');
    });
  });

  describe('SportAdmin automatic authorization', () => {
    it('grants editor role to members with styrelse role in SportAdmin', () => {
      // ann.sainer@gmail.com is registered with role "styrelse" in sportadminAccounts
      const auth = canUserEditCms('ann.sainer@gmail.com');
      expect(auth.allowed).toBe(true);
      expect(auth.role).toBe('editor');
      expect(auth.reason.toLowerCase()).toContain('sportadmin');
    });

    it('grants editor role to demo account with styrelse role', () => {
      // stefan@lidingofreeskiers.se is registered with role "styrelse" in demoAccounts
      const auth = canUserEditCms('stefan@lidingofreeskiers.se');
      expect(auth.allowed).toBe(true);
      expect(auth.role).toBe('editor');
    });

    it('grants editor role to board members found via alternate emails', () => {
      const customAccountWithAlt = {
        email: 'primary@example.com',
        guardianName: 'Test Board',
        phone: '123',
        role: 'styrelse' as const,
        skiers: [],
        alternateEmails: ['board.alt@example.com']
      };
      const auth = canUserEditCms('board.alt@example.com', undefined, [customAccountWithAlt]);
      expect(auth.allowed).toBe(true);
      expect(auth.role).toBe('editor');
    });

    it('grants editor role to members with board / coach-lead keywords in groupName', () => {
      const customAccounts = [
        {
          email: 'lead.coach@freeskiers.se',
          guardianName: 'Huvudtränare',
          phone: '070-000000',
          role: 'tränare' as const,
          skiers: [
            {
              id: 'FS-TEST-1',
              firstName: 'Test',
              lastName: 'Lead',
              birthYear: 2000,
              groupName: 'Huvudtränare & Tränaransvarig',
              groupLevel: 'tranare' as const,
              season: '2026/2027',
              status: 'active' as const,
              role: 'tränare' as const,
              memberSince: '2020',
              insuranceStatus: 'RF'
            }
          ]
        }
      ];
      const auth = canUserEditCms('lead.coach@freeskiers.se', undefined, customAccounts);
      expect(auth.allowed).toBe(true);
      expect(auth.role).toBe('editor');
    });
  });

  describe('Rejections and invalid inputs', () => {
    it('rejects unknown emails', () => {
      const auth = canUserEditCms('random.person@example.com');
      expect(auth.allowed).toBe(false);
      expect(auth.role).toBeUndefined();
      expect(auth.reason).toBeTruthy();
    });

    it('rejects regular members without board or leadership roles', () => {
      // magdalena@langenskiold.com is a regular member / parent with no board role
      const auth = canUserEditCms('magdalena@langenskiold.com');
      expect(auth.allowed).toBe(false);
      expect(auth.role).toBeUndefined();
    });

    it('rejects empty or whitespace-only email', () => {
      const empty = canUserEditCms('');
      expect(empty.allowed).toBe(false);
      expect(empty.role).toBeUndefined();

      const spaces = canUserEditCms('   ');
      expect(spaces.allowed).toBe(false);
      expect(spaces.role).toBeUndefined();
    });
  });

  describe('isSuperAdmin helper', () => {
    it('returns true for superadmins and false for editors or unknown emails', () => {
      expect(isSuperAdmin('admin@lidingofreeskiers.se')).toBe(true);
      expect(isSuperAdmin('kontakt@lidingofreeskiers.se')).toBe(false);
      expect(isSuperAdmin('ann.sainer@gmail.com')).toBe(false);
      expect(isSuperAdmin('random@example.com')).toBe(false);
    });
  });
});
