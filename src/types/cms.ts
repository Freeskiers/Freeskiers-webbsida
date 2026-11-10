export interface CmsTopBanner {
  enabled: boolean;
  type: 'info' | 'warning' | 'success';
  text: string;
  linkText?: string;
  linkUrl?: string;
}

export interface CmsGroupInfo {
  slug: string;
  name: string;
  price: string;
  priceNote?: string;
  registrationOpens: string;
  schedule: string;
  requirements: string[];
  photoUrl?: string;
  bookingUrl: string;
}

export interface CmsCancellationRules {
  fullRefundUntil: string;
  skidklubbDeduction: string;
  helgskidskolaDeduction: string;
  cancelledSeasonFee: string;
  deductionPeriod: string;
  noRefundFrom: string;
  policyText: string;
}

export interface CmsCalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  linkUrl?: string;
}

export interface CmsFaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface CmsCoach {
  id: string;
  name: string;
  role: string;
  group: string;
  photoUrl: string;
}

export interface CmsPartner {
  id: string;
  name: string;
  discountSummary: string;
  memberCode?: string;
  howToRedeem: string;
  websiteUrl: string;
  logoUrl?: string;
}

export interface CmsHeroSection {
  title: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  heroPhotoUrl?: string;
}

export interface SiteContent {
  topBanner: CmsTopBanner;
  hero: CmsHeroSection;
  groups: Record<string, CmsGroupInfo>;
  cancellationRules: CmsCancellationRules;
  calendarEvents: CmsCalendarEvent[];
  faq: CmsFaqItem[];
  coaches: CmsCoach[];
  partners: CmsPartner[];
}
