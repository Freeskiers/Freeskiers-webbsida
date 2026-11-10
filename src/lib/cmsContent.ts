import type { SiteContent } from '../types/cms';
import baselineContent from '../data/site-content.json';

export type { SiteContent } from '../types/cms';
export * from '../types/cms';

export const defaultSiteContent: SiteContent = baselineContent as SiteContent;

/**
 * Returns a clone of baseline CMS content.
 */
export function getCmsContent(): SiteContent {
  return JSON.parse(JSON.stringify(defaultSiteContent)) as SiteContent;
}

/**
 * Merges a preview draft over baseline CMS content.
 */
export function mergeCmsPreview(draft?: Partial<SiteContent> | null): SiteContent {
  const base = getCmsContent();
  if (!draft) return base;

  return {
    ...base,
    ...draft,
    topBanner: draft.topBanner
      ? { ...base.topBanner, ...draft.topBanner }
      : base.topBanner,
    hero: draft.hero
      ? { ...base.hero, ...draft.hero }
      : base.hero,
    cancellationRules: draft.cancellationRules
      ? { ...base.cancellationRules, ...draft.cancellationRules }
      : base.cancellationRules,
    groups: draft.groups
      ? Object.fromEntries(
          Object.entries(base.groups).map(([k, v]) => [
            k,
            draft.groups?.[k] ? { ...v, ...draft.groups[k] } : v,
          ]).concat(
            Object.entries(draft.groups).filter(([k]) => !(k in base.groups))
          )
        )
      : base.groups,
    calendarEvents: draft.calendarEvents ?? base.calendarEvents,
    faq: draft.faq ?? base.faq,
    coaches: draft.coaches ?? base.coaches,
    partners: draft.partners ?? base.partners,
  };
}
