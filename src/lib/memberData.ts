export interface MemberSkier {
  id: string; // e.g. "FS-2026-1042"
  firstName: string;
  lastName: string;
  birthYear: number;
  groupName: string; // e.g. "Freeskiers Skidklubb (Vardagar)" or "Helgskidskola – Röd Grupp"
  groupLevel: 'gron' | 'bla' | 'rod' | 'skidklubb' | 'tranare' | 'familj';
  season: string; // "2026/2027"
  status: 'active' | 'pending' | 'expired';
  role: 'åkare' | 'tränare' | 'styrelse' | 'familjemedlem';
  memberSince: string;
  insuranceStatus: string;
  trainingTime?: string;
  location?: string;
  allergy?: string;
  paymentDate?: string;
}

export interface MemberAccount {
  email: string;
  guardianName: string;
  phone: string;
  role: 'medlem' | 'tränare' | 'styrelse';
  skiers: MemberSkier[];
  alternateEmails?: string[];
}

export const demoAccounts: MemberAccount[] = [
  {
    email: 'stefan@lidingofreeskiers.se',
    guardianName: 'Stefan Aaröe',
    phone: '070-555 12 34',
    role: 'styrelse',
    skiers: [
      {
        id: 'FS-2026-1042',
        firstName: 'Liam',
        lastName: 'Aaröe',
        birthYear: 2014,
        groupName: 'Freeskiers Skidklubb',
        groupLevel: 'skidklubb',
        season: '2026/2027',
        status: 'active',
        role: 'åkare',
        memberSince: '2021',
        insuranceStatus: 'Folksam Olycksfallsförsäkring via Svenska Skidförbundet',
        trainingTime: 'Tisdagar & Torsdagar 18:00 – 19:30',
        location: 'Ekholmsnäsbacken Snowpark'
      },
      {
        id: 'FS-2026-1043',
        firstName: 'Ella',
        lastName: 'Aaröe',
        birthYear: 2017,
        groupName: 'Helgskidskola – Röd Grupp',
        groupLevel: 'rod',
        season: '2026/2027',
        status: 'active',
        role: 'åkare',
        memberSince: '2023',
        insuranceStatus: 'Folksam Olycksfallsförsäkring via Svenska Skidförbundet',
        trainingTime: 'Söndagar 10:30 – 11:45 (Jan–Feb)',
        location: 'Ekholmsnäsbacken Stora Backen'
      }
    ]
  },
  {
    email: 'medlem@freeskiers.se',
    guardianName: 'Anna Lindqvist',
    phone: '070-888 44 22',
    role: 'medlem',
    skiers: [
      {
        id: 'FS-2026-2189',
        firstName: 'Hugo',
        lastName: 'Lindqvist',
        birthYear: 2018,
        groupName: 'Helgskidskola – Blå Grupp',
        groupLevel: 'bla',
        season: '2026/2027',
        status: 'active',
        role: 'åkare',
        memberSince: '2024',
        insuranceStatus: 'Folksam Olycksfallsförsäkring via Svenska Skidförbundet',
        trainingTime: 'Lördagar 09:00 – 10:15 (Jan–Feb)',
        location: 'Ekholmsnäsbacken'
      }
    ]
  },
  {
    email: 'tranare@freeskiers.se',
    guardianName: 'Filippa Berg',
    phone: '073-111 99 88',
    role: 'tränare',
    skiers: [
      {
        id: 'FS-2026-0084',
        firstName: 'Filippa',
        lastName: 'Berg',
        birthYear: 2006,
        groupName: 'Certifierad Tränare & Ledare',
        groupLevel: 'tranare',
        season: '2026/2027',
        status: 'active',
        role: 'tränare',
        memberSince: '2016',
        insuranceStatus: 'Ledarförsäkring via Svenska Skidförbundet & RF',
        trainingTime: 'Tisdagar & Torsdagar 17:45 – 19:45',
        location: 'Ekholmsnäsbacken'
      }
    ]
  }
];

// Helper to generate a dynamic account for any arbitrary email address
export const createDynamicAccount = (email: string): MemberAccount => {
  const username = email.split('@')[0] || 'Medlem';
  const capitalized = username.charAt(0).toUpperCase() + username.slice(1);
  const randomId = Math.floor(1000 + Math.random() * 9000);

  return {
    email: email.toLowerCase().trim(),
    guardianName: `${capitalized} Medlem`,
    phone: '070-123 45 67',
    role: 'medlem',
    skiers: [
      {
        id: `FS-2026-${randomId}`,
        firstName: capitalized,
        lastName: 'Freeskier',
        birthYear: 2016,
        groupName: 'Helgskidskola – Blå Grupp',
        groupLevel: 'bla',
        season: '2026/2027',
        status: 'active',
        role: 'åkare',
        memberSince: '2025',
        insuranceStatus: 'Folksam Olycksfallsförsäkring via Svenska Skidförbundet',
        trainingTime: 'Söndagar 09:00 – 10:15 (Jan–Feb)',
        location: 'Ekholmsnäsbacken'
      }
    ]
  };
};

import { sportadminAccounts } from './sportadminData';
export { sportadminAccounts };

export const allMemberAccounts: MemberAccount[] = [
  ...demoAccounts,
  ...sportadminAccounts
];

export const findMemberAccount = (email: string): MemberAccount | undefined => {
  const clean = email.toLowerCase().trim();
  if (!clean) return undefined;

  // 1. Check demo accounts first
  const demoMatch = demoAccounts.find(a => a.email.toLowerCase() === clean);
  if (demoMatch) return demoMatch;

  // 2. Direct match on primary email in SportAdmin
  const saDirect = sportadminAccounts.find(a => a.email.toLowerCase() === clean);
  if (saDirect) return saDirect;

  // 3. Match on alternate emails (co-guardian or skier email)
  const saAlt = sportadminAccounts.find(a =>
    a.alternateEmails?.some(alt => alt.toLowerCase() === clean)
  );
  if (saAlt) return saAlt;

  return undefined;
};

// Curated accounts for instant 1-click testing in the UI
export const featuredDemoAccounts: MemberAccount[] = [
  demoAccounts[0]!, // Stefan Aaröe (Styrelse / 2 åkare)
  findMemberAccount('jennifer.farde@gmail.com') ?? demoAccounts[0]!, // Jennifer & Johan Ståhle (Familjekonto / 4 medlemmar)
  findMemberAccount('petter.samlin@altor.com') ?? demoAccounts[0]!, // Petter Samlin (3 åkare / Cesar, Astrid, Sofie)
  findMemberAccount('beatricewestermark@hotmail.com') ?? demoAccounts[1]!, // Beatrice Lindgren (Helgskidskola / Molly)
  findMemberAccount('carolinne.sjostedt@gmail.com') ?? demoAccounts[1]!, // Carolinne Sjöstedt (Skidklubb / James)
  demoAccounts[2]!, // Filippa Berg (Certifierad tränare)
];


