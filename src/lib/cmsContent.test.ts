import { describe, it, expect } from 'vitest';
import { defaultSiteContent, getCmsContent, mergeCmsPreview } from './cmsContent';

describe('CMS Content Store', () => {
  it('returns default content with all required sections', () => {
    const content = getCmsContent();
    expect(content.topBanner).toBeDefined();
    expect(content.cancellationRules).toBeDefined();
    expect(content.groups).toBeDefined();
    expect(content.faq).toBeInstanceOf(Array);
    expect(content.coaches).toBeInstanceOf(Array);
    expect(content.partners).toBeInstanceOf(Array);
    expect(content.calendarEvents).toBeInstanceOf(Array);
    expect(content.hero).toBeDefined();
  });

  it('contains expected baseline values for groups and cancellation rules', () => {
    const content = getCmsContent();
    expect(content.groups['helgskidskola']?.price).toBe('2 980 kr');
    expect(content.groups['skidklubb']?.price).toBe('3 130 kr');
    expect(content.groups['hostsasong']?.price).toBe('795 kr');
    expect(content.groups['privatlektion']?.price).toBe('850 kr');

    expect(content.cancellationRules.skidklubbDeduction).toBe('1 000 kr');
    expect(content.cancellationRules.helgskidskolaDeduction).toBe('600 kr');
    expect(content.cancellationRules.cancelledSeasonFee).toBe('400 kr');
  });

  it('returns an isolated copy so mutations do not leak', () => {
    const content1 = getCmsContent();
    content1.topBanner.text = 'Modified in test';

    const content2 = getCmsContent();
    expect(content2.topBanner.text).not.toBe('Modified in test');
  });

  it('exports defaultSiteContent matching getCmsContent', () => {
    expect(defaultSiteContent).toBeDefined();
    expect(defaultSiteContent.hero.title).toBe(getCmsContent().hero.title);
  });

  it('merges preview draft over default content', () => {
    const merged = mergeCmsPreview({
      topBanner: {
        enabled: true,
        text: 'Test Banner Preview',
        type: 'warning',
        linkText: 'Klicka här',
        linkUrl: '/test'
      }
    });
    expect(merged.topBanner.text).toBe('Test Banner Preview');
    expect(merged.topBanner.enabled).toBe(true);
    expect(merged.topBanner.type).toBe('warning');
    // Other sections remain default
    expect(merged.groups['helgskidskola']?.price).toBe('2 980 kr');
  });

  it('handles empty or partial draft in mergeCmsPreview', () => {
    const unmodified = mergeCmsPreview(null);
    expect(unmodified.topBanner.text).toBe(defaultSiteContent.topBanner.text);

    const mergedPartialGroup = mergeCmsPreview({
      groups: {
        helgskidskola: {
          ...defaultSiteContent.groups['helgskidskola'],
          price: '3 500 kr'
        }
      } as any
    });
    expect(mergedPartialGroup.groups['helgskidskola']?.price).toBe('3 500 kr');
    expect(mergedPartialGroup.groups['skidklubb']?.price).toBe('3 130 kr');
  });
});
