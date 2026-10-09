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
  memberYear: number = 2026
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
  memberYear: number = 2026
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

  // Determine group from person.groups or by birth year
  const mainGroup = person.groups?.[0]?.groupName;
  let groupName = mainGroup || 'Helgskidskola';
  let groupLevel: MemberSkier['groupLevel'] = 'bla';

  if (birthYear <= 1990) {
    groupName = mainGroup || 'IK Lidingö Freeskiers Förälder & Stödmedlem';
    groupLevel = 'familj';
  } else if (birthYear >= 2020) {
    groupName = mainGroup || 'Helgskidskola – Grön Grupp';
    groupLevel = 'gron';
  } else if (birthYear === 2018 || birthYear === 2019) {
    groupName = mainGroup || 'Helgskidskola – Blå Grupp';
    groupLevel = 'bla';
  } else if (birthYear === 2016 || birthYear === 2017) {
    groupName = mainGroup || 'Helgskidskola – Röd Grupp';
    groupLevel = 'rod';
  } else {
    groupName = mainGroup || 'Freeskiers Skidklubb';
    groupLevel = 'skidklubb';
  }

  const paymentDate = person.paidMembershipAtUtc 
    ? person.paidMembershipAtUtc.slice(0, 10) 
    : undefined;

  const skier: MemberSkier = {
    id: `FS-2026-${(index + 1).toString().padStart(4, '0')}`,
    firstName: person.firstName || 'Medlem',
    lastName: person.lastName || 'Freeskiers',
    birthYear,
    groupName,
    groupLevel,
    season: '2026/2027',
    status: person.isMember ? 'active' : 'pending',
    role: birthYear <= 1990 ? 'familjemedlem' : 'åkare',
    memberSince: person.addedAtUtc ? person.addedAtUtc.slice(0, 4) : '2026',
    insuranceStatus: 'Folksam Olycksfallsförsäkring via Svenska Skidförbundet',
    trainingTime: groupLevel === 'skidklubb' ? 'Tisdagar & Torsdagar 18:00 – 19:30' : 'Helger (Jan–Feb)',
    location: 'Ekholmsnäsbacken'
  };

  if (paymentDate) {
    skier.paymentDate = paymentDate;
  }

  return skier;
}
