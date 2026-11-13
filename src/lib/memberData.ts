export interface MemberSkier {
  id: string; // e.g. "FS-2026-1042"
  firstName: string;
  lastName: string;
  birthYear: number;
  groupName: string; // e.g. "Freeskiers Skidklubb (Vardagar)" or "Helgskidskola – Röd Grupp"
  groupLevel: 'gron' | 'bla' | 'rod' | 'skidklubb' | 'tranare' | 'familj' | 'admin';
  season: string; // "2026/2027"
  status: 'active' | 'pending' | 'expired';
  role: 'åkare' | 'tränare' | 'styrelse' | 'familjemedlem' | 'admin';
  memberSince: string;
  insuranceStatus: string;
  trainingTime?: string;
  location?: string;
  allergy?: string;
  paymentDate?: string | undefined;
  guardianName?: string;
  guardianPhone?: string;
  guardianEmail?: string;
}

export interface MemberAccount {
  email: string;
  guardianName: string;
  phone: string;
  role: 'medlem' | 'tränare' | 'styrelse' | 'admin';
  skiers: MemberSkier[];
  alternateEmails?: string[];
}

export const adminAccount: MemberAccount = {
  email: 'admin@lidingofreeskiers.se',
  guardianName: 'Kansli & Klubbadmin',
  phone: '08-767 00 00',
  role: 'admin',
  skiers: [
    {
      id: 'FS-ADMIN-2026',
      firstName: 'Klubbadministratör',
      lastName: 'Freeskiers',
      birthYear: 2016,
      groupName: 'Klubbledning & Kansli',
      groupLevel: 'admin',
      season: '2026/2027',
      status: 'active',
      role: 'admin',
      memberSince: '2016',
      insuranceStatus: 'Förenings- och ledarförsäkring via Svenska Skidförbundet & RF',
      trainingTime: 'Alla sektioner & träningspass',
      location: 'Ekholmsnäsbacken & Kansli',
      paymentDate: '2026-10-04'
    }
  ]
};

export const demoAccounts: MemberAccount[] = [
  adminAccount
];

import { 
  sportadminAccounts, 
  sportadminSkiers, 
  allUniqueMemberEmails, 
  type SportAdminSkierRecord 
} from './sportadminData';

export { sportadminAccounts, sportadminSkiers, allUniqueMemberEmails, type SportAdminSkierRecord };

export const allMemberAccounts: MemberAccount[] = [
  adminAccount,
  ...sportadminAccounts
];

export const findMemberAccount = (email: string): MemberAccount | undefined => {
  const clean = email.toLowerCase().trim();
  if (!clean) return undefined;

  // 1. Check admin account (Kansli)
  if (clean === adminAccount.email.toLowerCase()) return adminAccount;

  // 2. Stefan Aaröe club aliases (Ordförande / Styrelse i SportAdmin)
  if (
    clean === 'stefan@lidingofreeskiers.se' ||
    clean === 'stefan@everybodyknows.se' ||
    clean === 'stefan.aaroe@me.com'
  ) {
    const stefanSa = sportadminAccounts.find(a => a.email.toLowerCase() === 'stefan.aaroe@me.com');
    if (stefanSa) {
      return {
        ...stefanSa,
        email: clean,
        role: 'styrelse',
        alternateEmails: [
          'stefan@lidingofreeskiers.se',
          'stefan@everybodyknows.se',
          'stefan.aaroe@me.com',
          ...(stefanSa.alternateEmails || [])
        ]
      };
    }
  }

  // 3. Direct match on primary email in SportAdmin
  const saDirect = sportadminAccounts.find(a => a.email.toLowerCase() === clean);
  if (saDirect) return saDirect;

  // 4. Match on alternate emails (co-guardian or skier email in SportAdmin)
  const saAlt = sportadminAccounts.find(a =>
    a.alternateEmails?.some(alt => alt.toLowerCase() === clean)
  );
  if (saAlt) return saAlt;

  // 5. Match on any skier's guardianEmail in SportAdmin
  const saSkierGuardian = sportadminAccounts.find(a =>
    a.skiers.some(s => s.guardianEmail?.toLowerCase() === clean)
  );
  if (saSkierGuardian) return saSkierGuardian;

  return undefined;
};

// Curated verified accounts for testing in the UI
export const featuredDemoAccounts: MemberAccount[] = [
  adminAccount, // Kansli & Klubbadmin (admin@lidingofreeskiers.se)
  findMemberAccount('stefan.aaroe@me.com') ?? adminAccount, // Stefan Aaröe (Styrelse / Ruben & Stefan)
  findMemberAccount('jennifer.farde@gmail.com') ?? adminAccount, // Jennifer & Johan Ståhle (Familjekonto / 4 medlemmar)
  findMemberAccount('petter.samlin@altor.com') ?? adminAccount, // Petter Samlin (3 åkare / Cesar, Astrid, Sofie)
  findMemberAccount('beatricewestermark@hotmail.com') ?? adminAccount, // Beatrice Lindgren (Helgskidskola / Molly)
  findMemberAccount('carolinne.sjostedt@gmail.com') ?? adminAccount, // Carolinne Sjöstedt (Skidklubb / James)
];


