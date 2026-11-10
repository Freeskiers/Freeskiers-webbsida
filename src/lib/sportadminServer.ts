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

export async function executeTestSportAdminConnection(
  data: { apiKey?: string | undefined } = {}
): Promise<SportAdminConnectionResult> {
  const envKey = (typeof process !== 'undefined' ? process.env?.['SPORTADMIN_API_KEY'] : '') || '';
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
}

export async function executeFetchLiveMembers(
  data: {
    apiKey?: string | undefined;
    clubId?: number | undefined;
    memberYear?: number | undefined;
    onlySkiers?: boolean | undefined;
  } = {}
): Promise<SportAdminSyncResult> {
  const envKey = (typeof process !== 'undefined' ? process.env?.['SPORTADMIN_API_KEY'] : '') || '';
  const inputKey = data?.apiKey?.trim() || '';
  const activeKey = inputKey || envKey || DEFAULT_CLUB_SECRET;

  const envYear = (typeof process !== 'undefined' ? process.env?.['SPORTADMIN_MEMBER_YEAR'] : '') || '2027';
  const memberYear = data?.memberYear || Number(envYear) || 2027;
  const onlySkiers = data?.onlySkiers === true;

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
    let targetClubId = data?.clubId || (typeof process !== 'undefined' ? Number(process.env?.['SPORTADMIN_CLUB_ID']) : NaN);
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

    const validPersons = rawPersons.filter((p) => {
      if (p.isMember === true) {
        if (p.groups && p.groups.length > 0 && p.groups.every(g => g.hasQuit)) return false;
        return true;
      }

      const hasFakturerasEjOrLeader = (p.groups || []).some((g) => {
        if (g.hasQuit) return false;
        const conn = (g.groupConnectionName || '').toLowerCase().trim();
        const gname = (g.groupName || '').toLowerCase().trim();
        const period = (g.periodName || '').toLowerCase();
        const isSeason = period.includes('2026/2027') || period.includes('26/27') || g.memberYear === 2027 || g.memberYear === 2026;
        return isSeason && (
          conn.includes('faktureras ej') ||
          conn.includes('styrelse') ||
          conn.includes('engagerad') ||
          g.dontInvoice === true ||
          gname.includes('tränare')
        );
      });

      return hasFakturerasEjOrLeader;
    });

    const allMapped = validPersons.map((p, idx) => mapSportAdminPersonToSkier(p, idx));

    const skiersCount = allMapped.filter(s => s.role === 'åkare').length;
    const coachesCount = allMapped.filter(s => s.role === 'tränare').length;
    const familyCount = allMapped.filter(s => s.role === 'familjemedlem').length;

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
}

export async function executeVerifyMemberStatus(
  data: { email: string; apiKey?: string; clubId?: number; memberYear?: number }
): Promise<SportAdminVerifyResult> {
  const envKey = (typeof process !== 'undefined' ? process.env?.['SPORTADMIN_API_KEY'] : '') || '';
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
    let targetClubId = data.clubId || (typeof process !== 'undefined' ? Number(process.env?.['SPORTADMIN_CLUB_ID']) : NaN);

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
}

/**
 * Direct HTTP handler for POST /api/sportadmin in src/server.ts.
 * Bypasses TanStack Start createServerFn and Supabase auth middleware completely.
 */
export async function handleSportAdminApiRequest(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'content-type': 'application/json; charset=utf-8' }
    });
  }

  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const action = payload.action as string | undefined;

    if (action === 'test') {
      const result = await executeTestSportAdminConnection({
        apiKey: typeof payload.apiKey === 'string' ? payload.apiKey : undefined
      });
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'content-type': 'application/json; charset=utf-8' }
      });
    }

    if (action === 'sync') {
      const result = await executeFetchLiveMembers({
        apiKey: typeof payload.apiKey === 'string' ? payload.apiKey : undefined,
        clubId: typeof payload.clubId === 'number' ? payload.clubId : undefined,
        memberYear: typeof payload.memberYear === 'number' ? payload.memberYear : undefined,
        onlySkiers: typeof payload.onlySkiers === 'boolean' ? payload.onlySkiers : undefined
      });
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'content-type': 'application/json; charset=utf-8' }
      });
    }

    if (action === 'verify') {
      const result = await executeVerifyMemberStatus({
        email: typeof payload.email === 'string' ? payload.email : '',
        apiKey: typeof payload.apiKey === 'string' ? payload.apiKey : undefined,
        clubId: typeof payload.clubId === 'number' ? payload.clubId : undefined,
        memberYear: typeof payload.memberYear === 'number' ? payload.memberYear : undefined
      });
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'content-type': 'application/json; charset=utf-8' }
      });
    }

    return new Response(JSON.stringify({ error: 'Unknown action' }), {
      status: 400,
      headers: { 'content-type': 'application/json; charset=utf-8' }
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: { 'content-type': 'application/json; charset=utf-8' }
    });
  }
}

export async function testSportAdminConnectionFn(
  opts: { data?: { apiKey?: string | undefined } } = {}
): Promise<SportAdminConnectionResult> {
  if (typeof window === 'undefined') {
    return executeTestSportAdminConnection(opts.data);
  }
  const res = await fetch('/api/sportadmin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'test', ...(opts.data ?? {}) })
  });
  return (await res.json()) as SportAdminConnectionResult;
}

export async function fetchLiveMembersFn(
  opts: {
    data?: {
      apiKey?: string | undefined;
      clubId?: number | undefined;
      memberYear?: number | undefined;
      onlySkiers?: boolean | undefined;
    };
  } = {}
): Promise<SportAdminSyncResult> {
  if (typeof window === 'undefined') {
    return executeFetchLiveMembers(opts.data);
  }
  const res = await fetch('/api/sportadmin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'sync', ...(opts.data ?? {}) })
  });
  return (await res.json()) as SportAdminSyncResult;
}

export async function verifyMemberStatusFn(
  opts: { data: { email: string; apiKey?: string; clubId?: number; memberYear?: number } }
): Promise<SportAdminVerifyResult> {
  if (typeof window === 'undefined') {
    return executeVerifyMemberStatus(opts.data);
  }
  const res = await fetch('/api/sportadmin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'verify', ...opts.data })
  });
  return (await res.json()) as SportAdminVerifyResult;
}
