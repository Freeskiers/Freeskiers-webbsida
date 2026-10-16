/**
 * SportAdmin API v4 Client & Integration Service
 * Official Swagger Documentation: https://api.sportadmin.se/index.html?urls.primaryName=v4
 */

import { MemberSkier } from './memberData';

export const SPORTADMIN_BASE_URL = 'https://api.sportadmin.se';

// ============================================================================
// Types matching SportAdmin v4 OpenAPI Schemas
// ============================================================================

export interface SportAdminClub {
  clubId: number;
  name: string;
}

export interface SportAdminGuardian {
  name?: string | null;
  relation?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
}

export interface SportAdminGroup {
  groupName?: string | null;
  groupConnectionName?: string | null;
  isLeader?: boolean | null;
  periodName?: string | null;
  memberYear?: number | null;
  hasQuit?: boolean;
  dontInvoice?: boolean;
  createdAtUtc?: string | null;
}

export interface SportAdminPerson {
  ssn?: string | null;
  uniqueId?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  isMember: boolean;
  addedAtUtc?: string | null;
  paidMembershipAtUtc?: string | null;
  emailVerifiedAtUtc?: string | null;
  guardians?: SportAdminGuardian[];
  groups?: SportAdminGroup[];
}

export interface SportAdminMemberCard {
  title: string;
  validTo: string;
  group?: string | null;
  groupConnection?: string | null;
  showBirthYear?: boolean;
  showMemberNumber?: boolean;
}

export interface SportAdminOffer {
  title: string;
  description: string;
  url: string;
  useImage: boolean;
  imageUrl?: string | null;
  validFrom: string;
  validTo: string;
  organizationName: string;
  organizationImage?: string | null;
}

export interface SportAdminMemberStatus {
  isMember: boolean;
  uniqueUserId?: string | null;
  memberFullName: string;
  memberNumber?: number | null;
  birthYear?: number | null;
  uniquePeriodId?: string | null;
  memberCards?: SportAdminMemberCard[];
  offers?: SportAdminOffer[];
}

export interface SportAdminParentGroup {
  groupName: string;
  groupUniqueId: string;
}

export interface SportAdminActivity {
  activityId?: string;
  name?: string;
  startDateTime?: string;
  endDateTime?: string;
  location?: string;
  description?: string;
  activityType?: number; // 1 = Training, 2 = Competition
}

// ============================================================================
// API Service Methods
// ============================================================================

/**
 * Test authentication and get connected clubs for an API key
 * Calls: GET /v4/Clubs
 */
export async function testSportAdminConnection(apiKey: string): Promise<{ success: boolean; clubs?: SportAdminClub[]; error?: string }> {
  try {
    const res = await fetch(`${SPORTADMIN_BASE_URL}/v4/Clubs`, {
      method: 'GET',
      headers: {
        'Authorization': apiKey.trim(),
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        return { success: false, error: 'Ogiltig API-nyckel (401/403 Unauthorized). Kontrollera SportAdmin-nyckeln.' };
      }
      return { success: false, error: `SportAdmin svarade med felkod ${res.status}: ${res.statusText}` };
    }

    const clubs: SportAdminClub[] = await res.json();
    return { success: true, clubs };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kunde inte nå api.sportadmin.se';
    return { success: false, error: message };
  }
}

/**
 * Check membership status live for an email address
 * Calls: GET /v4/Membership?email=...&memberYear=...&clubId=...
 */
export async function getLiveMembershipStatus(
  apiKey: string,
  clubId: number,
  email: string,
  memberYear: number = 2027
): Promise<{ success: boolean; statuses?: SportAdminMemberStatus[]; error?: string }> {
  try {
    const url = new URL(`${SPORTADMIN_BASE_URL}/v4/Membership`);
    url.searchParams.set('email', email.trim());
    url.searchParams.set('memberYear', memberYear.toString());
    url.searchParams.set('clubId', clubId.toString());

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': apiKey.trim(),
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      return { success: false, error: `Fel vid hämtning (${res.status}): ${res.statusText}` };
    }

    const statuses: SportAdminMemberStatus[] = await res.json();
    return { success: true, statuses };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Nätverksfel vid kontakt med SportAdmin';
    return { success: false, error: message };
  }
}

/**
 * Fetch all registered persons for a club year
 * Calls: GET /v4/Persons?memberYear=...&clubId=...
 */
export async function fetchLivePersons(
  apiKey: string,
  clubId: number,
  memberYear: number = 2027
): Promise<{ success: boolean; persons?: SportAdminPerson[]; count?: number; error?: string }> {
  try {
    const url = new URL(`${SPORTADMIN_BASE_URL}/v4/Persons`);
    url.searchParams.set('memberYear', memberYear.toString());
    url.searchParams.set('clubId', clubId.toString());

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': apiKey.trim(),
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      return { success: false, error: `Fel vid hämtning (${res.status}): ${res.statusText}` };
    }

    const data = await res.json();
    return { 
      success: true, 
      persons: data.persons || [], 
      count: data.count || data.persons?.length || 0 
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Nätverksfel vid kontakt med SportAdmin';
    return { success: false, error: message };
  }
}

/**
 * Helper to map a SportAdmin Person to our Freeskiers MemberSkier
 */
export function mapSportAdminPersonToSkier(person: SportAdminPerson, index: number): MemberSkier {
  const pnr = person.ssn || '';
  const birthYear = pnr.length >= 4 && !isNaN(Number(pnr.slice(0, 4))) 
    ? Number(pnr.slice(0, 4)) 
    : 2016;

  // Determine active groups
  const activeGroups = person.groups?.filter(g => !g.hasQuit) || [];
  const activeGroupObj = activeGroups[0] || person.groups?.[0];
  const groupNames = activeGroups.map(g => (g.groupName || '').toLowerCase());
  const groupConnectionNames = activeGroups.map(g => (g.groupConnectionName || '').toLowerCase());
  const mainGroup = activeGroupObj?.groupName;
  const gLower = (mainGroup || '').toLowerCase();

  const isTrainer = groupNames.some(g => g.includes('tränare')) || groupConnectionNames.some(c => c.includes('tränare') || c.includes('ledare'));
  const isParentGroup = groupNames.some(g => g.includes('föräldra') || g.includes('engagerade'));
  const isSkiGroup = groupNames.some(g => g.includes('skidor') || g.includes('snowboard') || g.includes('skidklubb') || g.includes('helgskidskola'));
  const hasFakturerasEj = activeGroups.some(g => {
    const conn = (g.groupConnectionName || '').toLowerCase().trim();
    return conn.includes('faktureras ej') || g.dontInvoice === true;
  });

  let role: MemberSkier['role'] = 'åkare';
  let groupLevel: MemberSkier['groupLevel'] = 'bla';
  let groupName = mainGroup || 'IK Lidingö Freeskiers';

  if (isTrainer) {
    role = 'tränare';
    groupLevel = 'tranare';
    groupName = mainGroup || 'Certifierad Tränare & Ledare';
  } else if (isParentGroup) {
    role = 'familjemedlem';
    groupLevel = 'familj';
    groupName = mainGroup || 'Föräldraengagemang & Stödmedlem';
  } else if (activeGroups.length === 0 && birthYear <= 2000) {
    role = 'familjemedlem';
    groupLevel = 'familj';
    groupName = 'Stödmedlem / Förälder';
  } else if (birthYear <= 1990 && !isSkiGroup) {
    role = 'familjemedlem';
    groupLevel = 'familj';
    groupName = 'Förälder & Stödmedlem';
  } else {
    // Åkare
    role = 'åkare';
    if (!mainGroup) {
      groupName = 'Åkare (Inväntar grupptilldelning)';
    }
    if (gLower.includes('åk 1')) {
      groupLevel = 'gron';
    } else if (gLower.includes('åk 2') || gLower.includes('åk 3') || gLower.includes('åk 4')) {
      groupLevel = 'bla';
    } else if (gLower.includes('åk 5') || gLower.includes('åk 6')) {
      groupLevel = 'rod';
    } else if (gLower.includes('åk 7') || gLower.includes('åk 8') || gLower.includes('åk 9') || gLower.includes('snowboard')) {
      groupLevel = 'skidklubb';
    } else if (birthYear >= 2019) {
      groupLevel = 'gron';
    } else if (birthYear === 2017 || birthYear === 2018) {
      groupLevel = 'bla';
    } else if (birthYear === 2015 || birthYear === 2016) {
      groupLevel = 'rod';
    } else {
      groupLevel = 'skidklubb';
    }
  }

  const paymentDate = person.paidMembershipAtUtc 
    ? person.paidMembershipAtUtc.slice(0, 10) 
    : (hasFakturerasEj ? 'Faktureras ej' : undefined);

  const isAutumn = gLower.includes('höst') || gLower.includes('vikingahallen');
  let trainingTime = 'Helger & Vardagskvällar (Ekholmsnäsbacken)';

  if (isAutumn) {
    trainingTime = 'Måndagar & Torsdagar 18:00 – 19:30 (Inomhus Vikingahallen)';
  } else if (gLower.includes('onsdag')) {
    trainingTime = 'Onsdagar 18:00 – 19:30 (Ekholmsnäsbacken)';
  } else if (gLower.includes('måndag')) {
    trainingTime = 'Måndagar 18:00 – 19:30 (Ekholmsnäsbacken)';
  } else if (gLower.includes('tisdag') || gLower.includes('torsdag')) {
    trainingTime = 'Tisdagar & Torsdagar 18:00 – 19:30 (Ekholmsnäsbacken)';
  } else if (groupLevel === 'gron') {
    trainingTime = 'Lördagar & Söndagar (Jan–Feb)';
  }

  const location = gLower.includes('vikingahallen') 
    ? 'Vikingahallen Lidingö' 
    : 'Ekholmsnäsbacken';

  const primaryGuardian = person.guardians?.[0];
  const guardianName = primaryGuardian?.name || `${person.firstName || ''} ${person.lastName || ''}`.trim() || 'Målsman';
  const guardianPhone = primaryGuardian?.phoneNumber || person.phoneNumber || '';
  const guardianEmail = primaryGuardian?.email || person.email || '';

  const skier: MemberSkier = {
    id: `FS-2026-${(index + 1).toString().padStart(4, '0')}`,
    firstName: person.firstName || 'Medlem',
    lastName: person.lastName || 'Freeskiers',
    birthYear,
    groupName,
    groupLevel,
    season: '2026/2027',
    status: (person.isMember || hasFakturerasEj) ? 'active' : 'pending',
    role,
    memberSince: person.addedAtUtc ? person.addedAtUtc.slice(0, 4) : '2026',
    insuranceStatus: 'Folksam Olycksfallsförsäkring via Svenska Skidförbundet',
    trainingTime,
    location,
    paymentDate,
    guardianName,
    guardianPhone,
    guardianEmail
  };

  return skier;
}
