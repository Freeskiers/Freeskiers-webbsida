import { createServerFn } from "@tanstack/react-start";
import {
  SPORTADMIN_BASE_URL,
  SportAdminClub,
  SportAdminPerson,
  SportAdminMemberStatus,
  mapSportAdminPersonToSkier
} from "./sportadminApi";
import { MemberSkier } from "./memberData";

export interface SportAdminConnectionResult {
  success: boolean;
  clubs?: SportAdminClub[];
  resolvedKeySource: 'env' | 'input' | 'none';
  error?: string;
  hasEnvKey: boolean;
}

export interface SportAdminSyncResult {
  success: boolean;
  count: number;
  totalPaidCount?: number;
  skiersCount?: number;
  coachesCount?: number;
  familyCount?: number;
  onlySkiers?: boolean;
  clubId?: number;
  clubName?: string;
  memberYear: number;
  skiers: MemberSkier[];
  rawPersons?: SportAdminPerson[];
  syncedAt: string;
  error?: string;
}

export interface SportAdminVerifyResult {
  success: boolean;
  isMember: boolean;
  memberFullName?: string | undefined;
  statuses?: SportAdminMemberStatus[] | undefined;
  error?: string | undefined;
}

export const DEFAULT_CLUB_SECRET = "htU1yq98vd7TzQmJYWmoHISSZ3T0MLJRCCrtJTSHZSpPCXOIcy";

/**
 * Server function: Test SportAdmin API authentication & retrieve connected clubs.
 * Bypasses browser CORS and keeps the API key secure.
 */
export const testSportAdminConnectionFn = createServerFn({ method: "POST" })
  .validator((d: { apiKey?: string } = {}) => d)
  .handler(async ({ data }): Promise<SportAdminConnectionResult> => {
    const envKey = (typeof process !== 'undefined' ? process.env['SPORTADMIN_API_KEY'] : '') || '';
    const inputKey = data?.apiKey?.trim() || '';
    const activeKey = inputKey || envKey || DEFAULT_CLUB_SECRET;

    if (!activeKey) {
      return {
        success: false,
        resolvedKeySource: 'none',
        hasEnvKey: Boolean(envKey),
        error: 'Ingen API-nyckel hittades. Ange en nyckel i fältet eller sätt SPORTADMIN_API_KEY i .env.'
      };
    }

    try {
      const res = await fetch(`${SPORTADMIN_BASE_URL}/v4/Clubs`, {
        method: 'GET',
        headers: {
          'Authorization': activeKey,
          'Accept': 'application/json'
        }
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          return {
            success: false,
            resolvedKeySource: inputKey ? 'input' : 'env',
            hasEnvKey: Boolean(envKey),
            error: `Otillåtet anrop (${res.status} Unauthorized). Kontrollera att SportAdmin Client Secret är korrekt och aktiv.`
          };
        }
        return {
          success: false,
          resolvedKeySource: inputKey ? 'input' : 'env',
          hasEnvKey: Boolean(envKey),
          error: `SportAdmin API svarade med felkod ${res.status}: ${res.statusText}`
        };
      }

      const clubs: SportAdminClub[] = await res.json();
      return {
        success: true,
        clubs,
        resolvedKeySource: inputKey ? 'input' : 'env',
        hasEnvKey: Boolean(envKey)
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Kunde inte ansluta till api.sportadmin.se';
      return {
        success: false,
        resolvedKeySource: inputKey ? 'input' : 'env',
        hasEnvKey: Boolean(envKey),
        error: `Serverfel vid anrop till SportAdmin: ${msg}`
      };
    }
  });

/**
 * Server function: Fetch all registered members/persons for a club and year live from SportAdmin.
 */
export const fetchLiveMembersFn = createServerFn({ method: "POST" })
  .validator((d: { apiKey?: string; clubId?: number; memberYear?: number; onlySkiers?: boolean } = {}) => d)
  .handler(async ({ data }): Promise<SportAdminSyncResult> => {
    const envKey = (typeof process !== 'undefined' ? process.env['SPORTADMIN_API_KEY'] : '') || '';
    const inputKey = data?.apiKey?.trim() || '';
    const activeKey = inputKey || envKey || DEFAULT_CLUB_SECRET;

    const envYear = (typeof process !== 'undefined' ? process.env['SPORTADMIN_MEMBER_YEAR'] : '') || '2027';
    const memberYear = data?.memberYear || Number(envYear) || 2027;
    const onlySkiers = data?.onlySkiers === true; // Om true: importera enbart åkare. Standard: alla medlemmar

    if (!activeKey) {
      return {
        success: false,
        count: 0,
        memberYear,
        skiers: [],
        syncedAt: new Date().toISOString(),
        error: 'Ingen API-nyckel konfigurerad.'
      };
    }

    try {
      // 1. Resolve clubId if not provided
      let targetClubId = data?.clubId || (typeof process !== 'undefined' ? Number(process.env['SPORTADMIN_CLUB_ID']) : NaN);
      let clubName = 'IK Lidingö Freeskiers';

      if (!targetClubId || isNaN(targetClubId)) {
        const clubsRes = await fetch(`${SPORTADMIN_BASE_URL}/v4/Clubs`, {
          method: 'GET',
          headers: {
            'Authorization': activeKey,
            'Accept': 'application/json'
          }
        });

        if (clubsRes.ok) {
          const clubs: SportAdminClub[] = await clubsRes.json();
          if (clubs.length > 0) {
            targetClubId = clubs[0]!.clubId;
            clubName = clubs[0]!.name;
          }
        }
      }

      if (!targetClubId || isNaN(targetClubId)) {
        targetClubId = 2360;
        clubName = 'Lidingö Freeskiers';
      }

      // 2. Fetch Persons from SportAdmin
      const url = new URL(`${SPORTADMIN_BASE_URL}/v4/Persons`);
      url.searchParams.set('clubId', targetClubId.toString());
      url.searchParams.set('memberYear', memberYear.toString());

      const res = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Authorization': activeKey,
          'Accept': 'application/json'
        }
      });

      if (!res.ok) {
        return {
          success: false,
          count: 0,
          clubId: targetClubId,
          clubName,
          memberYear,
          skiers: [],
          syncedAt: new Date().toISOString(),
          error: `Fel vid hämtning av medlemmar (${res.status}): ${res.statusText}`
        };
      }

      const body = await res.json();
      const rawPersons: SportAdminPerson[] = Array.isArray(body) ? body : (body.persons || []);

      // Filtrera enligt klubbregler:
      // 1. Samtliga som definieras som medlemmar under personregister under aktuellt år 2027 (isMember === true)
      // 2. Alla som har gruppkoppling "faktureras ej", styrelse, tränare eller ledare under aktuell säsong 2026/2027
      const validPersons = rawPersons.filter((p) => {
        // 1. Samtliga som definieras som medlemmar under personregister under aktuellt år 2027
        if (p.isMember === true) {
          if (p.groups && p.groups.length > 0 && p.groups.every(g => g.hasQuit)) return false;
          return true;
        }

        // 2. Alla som har gruppkoppling "faktureras ej" eller är styrelse/ledare/tränare under aktuell säsong 2026/2027
        const hasFakturerasEjOrLeader = (p.groups || []).some((g) => {
          if (g.hasQuit) return false;
          const conn = (g.groupConnectionName || '').toLowerCase().trim();
          const period = (g.periodName || '').toLowerCase();
          const isSeason = period.includes('2026/2027') || period.includes('26/27') || g.memberYear === 2027 || g.memberYear === 2026;
          return isSeason && (
            conn.includes('faktureras ej') || 
            conn.includes('styrelse') || 
            conn.includes('tränare') || 
            conn.includes('ledare') || 
            conn.includes('engagerad') || 
            g.dontInvoice === true ||
            g.isLeader === true
          );
        });

        return hasFakturerasEjOrLeader;
      });

      const allMapped = validPersons.map((p, idx) => mapSportAdminPersonToSkier(p, idx));

      const skiersCount = allMapped.filter(s => s.role === 'åkare').length;
      const coachesCount = allMapped.filter(s => s.role === 'tränare').length;
      const familyCount = allMapped.filter(s => s.role === 'familjemedlem').length;

      // Om onlySkiers är sant, importera bara aktiva åkare för säsongen 2026/2027
      const finalSkiers: MemberSkier[] = onlySkiers 
        ? allMapped.filter(s => s.role === 'åkare')
        : allMapped;

      return {
        success: true,
        count: finalSkiers.length,
        totalPaidCount: validPersons.length,
        skiersCount,
        coachesCount,
        familyCount,
        onlySkiers,
        clubId: targetClubId,
        clubName,
        memberYear,
        skiers: finalSkiers,
        rawPersons,
        syncedAt: new Date().toISOString()
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Nätverksfel vid synk mot SportAdmin';
      return {
        success: false,
        count: 0,
        memberYear,
        skiers: [],
        syncedAt: new Date().toISOString(),
        error: msg
      };
    }
  });

/**
 * Server function: Check live membership status for an email directly with SportAdmin.
 */
export const verifyMemberStatusFn = createServerFn({ method: "POST" })
  .validator((d: { email: string; apiKey?: string; clubId?: number; memberYear?: number }) => d)
  .handler(async ({ data }): Promise<SportAdminVerifyResult> => {
    const envKey = (typeof process !== 'undefined' ? process.env['SPORTADMIN_API_KEY'] : '') || '';
    const activeKey = data.apiKey?.trim() || envKey || DEFAULT_CLUB_SECRET;
    const memberYear = data.memberYear || 2027;
    const cleanEmail = data.email?.toLowerCase().trim();

    if (!cleanEmail) {
      return { success: false, isMember: false, error: 'Ingen e-postadress angiven.' };
    }

    if (!activeKey) {
      return { success: false, isMember: false, error: 'Ingen API-nyckel tillgänglig för SportAdmin-verifiering.' };
    }

    try {
      let targetClubId = data.clubId || (typeof process !== 'undefined' ? Number(process.env['SPORTADMIN_CLUB_ID']) : NaN);

      if (!targetClubId || isNaN(targetClubId)) {
        const clubsRes = await fetch(`${SPORTADMIN_BASE_URL}/v4/Clubs`, {
          method: 'GET',
          headers: { 'Authorization': activeKey, 'Accept': 'application/json' }
        });
        if (clubsRes.ok) {
          const clubs: SportAdminClub[] = await clubsRes.json();
          if (clubs.length > 0) targetClubId = clubs[0]!.clubId;
        }
      }

      if (!targetClubId || isNaN(targetClubId)) {
        targetClubId = 2360;
      }

      const url = new URL(`${SPORTADMIN_BASE_URL}/v4/Membership`);
      url.searchParams.set('email', cleanEmail);
      url.searchParams.set('clubId', targetClubId.toString());
      url.searchParams.set('memberYear', memberYear.toString());

      const res = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Authorization': activeKey,
          'Accept': 'application/json'
        }
      });

      if (!res.ok) {
        return { success: false, isMember: false, error: `SportAdmin fel (${res.status}): ${res.statusText}` };
      }

      const statuses: SportAdminMemberStatus[] = await res.json();
      const isMember = statuses.some(s => s.isMember);
      const memberFullName = statuses.find(s => s.isMember)?.memberFullName || statuses[0]?.memberFullName;

      return {
        success: true,
        isMember,
        memberFullName,
        statuses
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Kunde inte kontakta SportAdmin';
      return { success: false, isMember: false, error: msg };
    }
  });
