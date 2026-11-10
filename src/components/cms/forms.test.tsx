import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import { getCmsContent } from "@/lib/cmsContent";
import type { SiteContent } from "@/types/cms";
import {
  calculateResizedDimensions,
  ImageUploadField,
  TopBannerForm,
  CancellationRulesForm,
  GroupsForm,
  CalendarEventsForm,
  FaqManagerForm,
  CoachesManagerForm,
  PartnersManagerForm,
  GeneralHeroForm,
  CORE_GROUP_SLUGS,
  isCoreGroup,
  deleteGroupFromGroups,
} from "./index";

describe("CMS Form Components & Image Upload Optimizer", () => {
  const baseContent: SiteContent = getCmsContent();

  describe("calculateResizedDimensions", () => {
    it("preserves dimensions when below max width and height", () => {
      const res = calculateResizedDimensions(800, 600, 1600, 1200);
      expect(res).toEqual({ width: 800, height: 600 });
    });

    it("scales down width when exceeding maxWidth while preserving aspect ratio", () => {
      // 3200 x 1600 (2:1 aspect ratio) with max 1600 -> 1600 x 800
      const res = calculateResizedDimensions(3200, 1600, 1600);
      expect(res).toEqual({ width: 1600, height: 800 });
    });

    it("scales down height when exceeding maxHeight while preserving aspect ratio", () => {
      // 800 x 1600 (1:2 aspect ratio) with max 800 height -> 400 x 800
      const res = calculateResizedDimensions(800, 1600, undefined, 800);
      expect(res).toEqual({ width: 400, height: 800 });
    });

    it("respects both maxWidth and maxHeight constraints simultaneously", () => {
      // 2000 x 3000 constrained to 1000 x 1000
      const res = calculateResizedDimensions(2000, 3000, 1000, 1000);
      expect(res.width).toBeLessThanOrEqual(1000);
      expect(res.height).toBeLessThanOrEqual(1000);
      // Aspect ratio 2:3 -> 667 x 1000
      expect(res.height).toBe(1000);
      expect(res.width).toBe(667);
    });

    it("handles zero or negative dimensions safely", () => {
      const res = calculateResizedDimensions(0, -10, 1600);
      expect(res.width).toBeGreaterThanOrEqual(1);
      expect(res.height).toBeGreaterThanOrEqual(1);
    });
  });

  describe("ImageUploadField Component", () => {
    it("renders drag & drop upload zone without crashing in SSR", () => {
      const html = renderToString(
        <ImageUploadField label="Hero-bild" value="" onChange={() => {}} preset="hero" />,
      );
      expect(html).toContain("Hero-bild");
      expect(html).toContain("Dra &amp; släpp en bild här");
      expect(html).toContain("Max bredd 1600px");
    });

    it("renders thumbnail preview when image value is provided", () => {
      const html = renderToString(
        <ImageUploadField
          label="Tränarfoto"
          value="/assets/photos/coach-1.jpg"
          onChange={() => {}}
          preset="avatar"
        />,
      );
      expect(html).toContain("Tränarfoto");
      expect(html).toContain("Förhandsgranskning");
      expect(html).toContain("Byt bild");
      expect(html).toContain("Ta bort");
      expect(html).toContain("Max bredd 800px");
    });

    it("shows optimized base64 indicator when base64 data url is supplied", () => {
      const base64Sample =
        "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
      const html = renderToString(
        <ImageUploadField label="Logotyp" value={base64Sample} onChange={() => {}} preset="logo" />,
      );
      expect(html).toContain("Optimerad &amp; uppladdad");
    });
  });

  describe("TopBannerForm Component", () => {
    it("renders banner title, message input and preview", () => {
      const html = renderToString(<TopBannerForm draft={baseContent} onChange={() => {}} />);
      expect(html).toContain("Toppbanner (Notislist)");
      expect(html).toContain("Typ av meddelande");
      expect(html).toContain("Meddelandetext");
      expect(html).toContain("Förhandsvisning av bannern");
    });

    it("renders modified draft state with active warning banner in HTML", () => {
      const customDraft: SiteContent = {
        ...baseContent,
        topBanner: {
          enabled: true,
          type: "warning",
          text: "Backen stängd idag på grund av hård vind!",
          linkText: "Se väderrapport",
          linkUrl: "/status",
        },
      };

      const html = renderToString(<TopBannerForm draft={customDraft} onChange={() => {}} />);

      // Verify active badge, custom text, and warning styling in HTML
      expect(html).toContain("Aktiv");
      expect(html).toContain("Backen stängd idag på grund av hård vind!");
      expect(html).toContain("Se väderrapport");
      expect(html).toContain("border-amber-500");
    });
  });

  describe("CancellationRulesForm Component", () => {
    it("renders all cancellation timeline phases and deduction inputs", () => {
      const html = renderToString(
        <CancellationRulesForm draft={baseContent} onChange={() => {}} />,
      );
      expect(html).toContain("Avbokningsregler &amp; Återbetalning");
      expect(html).toContain("Fas 1: Full återbetalning");
      expect(html).toContain("Fas 2: Avdrag tillämpas");
      expect(html).toContain("Fas 3: Ingen återbetalning");
      expect(html).toContain(baseContent.cancellationRules.fullRefundUntil);
      expect(html).toContain(baseContent.cancellationRules.skidklubbDeduction);
      expect(html).toContain(baseContent.cancellationRules.helgskidskolaDeduction);
    });

    it("renders custom policy dates, deductions, and policy text in HTML", () => {
      const customDraft: SiteContent = {
        ...baseContent,
        cancellationRules: {
          fullRefundUntil: "10 december",
          deductionPeriod: "11–23 december",
          noRefundFrom: "24 december",
          skidklubbDeduction: "1 250 kr",
          helgskidskolaDeduction: "750 kr",
          cancelledSeasonFee: "500 kr",
          policyText: "Specialpolicy för säsongen 2026/2027.",
        },
      };

      const html = renderToString(
        <CancellationRulesForm draft={customDraft} onChange={() => {}} />,
      );

      expect(html).toContain("10 december");
      expect(html).toContain("11–23 december");
      expect(html).toContain("24 december");
      expect(html).toContain("1 250 kr");
      expect(html).toContain("750 kr");
      expect(html).toContain("500 kr");
      expect(html).toContain("Specialpolicy för säsongen 2026/2027.");
    });
  });

  describe("GroupsForm Component & Core Group Protection", () => {
    it("renders group tabs and requirements list", () => {
      const html = renderToString(<GroupsForm draft={baseContent} onChange={() => {}} />);
      expect(html).toContain("Träningsgrupper &amp; Verksamhet");
      expect(html).toContain("Freeskiers Helgskidskola");
      expect(html).toContain("Förkunskapskrav &amp; Information");
      expect(html).toContain("Lägg till ny grupp");
    });

    it("identifies all core groups and protects them from deletion", () => {
      // 4 core groups must be recognized
      expect(CORE_GROUP_SLUGS).toEqual([
        "helgskidskola",
        "skidklubb",
        "hostsasong",
        "privatlektion",
      ]);

      CORE_GROUP_SLUGS.forEach((slug) => {
        expect(isCoreGroup(slug)).toBe(true);
      });
      expect(isCoreGroup("ny-grupp-123")).toBe(false);

      // Attempting to delete a core group must fail
      const deleteResult = deleteGroupFromGroups(baseContent.groups, "skidklubb");
      expect(deleteResult.success).toBe(false);
      expect(deleteResult.error).toContain("kärngrupp");
      expect(deleteResult.groups.skidklubb).toBeDefined();

      // Deleting a custom group must succeed
      const groupsWithCustom = {
        ...baseContent.groups,
        "custom-camp": {
          slug: "custom-camp",
          name: "Påskcamp",
          price: "1 900 kr",
          registrationOpens: "Februari",
          schedule: "Vecka 15",
          requirements: ["Parallella skidor"],
          bookingUrl: "https://sportadmin.se",
        },
      };
      const customDeleteResult = deleteGroupFromGroups(groupsWithCustom, "custom-camp");
      expect(customDeleteResult.success).toBe(true);
      expect(customDeleteResult.groups["custom-camp"]).toBeUndefined();
      expect(customDeleteResult.groups.helgskidskola).toBeDefined();
    });

    it("renders core group protection badge and modified group price in HTML", () => {
      const customDraft: SiteContent = {
        ...baseContent,
        groups: {
          ...baseContent.groups,
          helgskidskola: {
            ...baseContent.groups.helgskidskola,
            price: "3 450 kr",
            requirements: ["Hjälm och ryggskydd krävs", "Åkglädje i fokus"],
          },
        },
      };

      const html = renderToString(<GroupsForm draft={customDraft} onChange={() => {}} />);

      // Core group badge must be present
      expect(html).toContain("Kärngrupp – krävs för webbplatsens rutter");
      expect(html).toContain("Kärngrupp (skyddad)");
      expect(html).toContain("3 450 kr");
      expect(html).toContain("Hjälm och ryggskydd krävs");
      expect(html).toContain("Åkglädje i fokus");
    });
  });

  describe("CalendarEventsForm Component", () => {
    it("renders calendar events list with search and categories", () => {
      const html = renderToString(<CalendarEventsForm draft={baseContent} onChange={() => {}} />);
      expect(html).toContain("Kalender &amp; Aktuella Händelser");
      expect(html).toContain("Lägg till ny händelse");
      expect(html).toContain(baseContent.calendarEvents[0].title);
    });

    it("renders customized calendar events with custom title, date and location in HTML", () => {
      const customEvent = {
        id: "event-alpint-2027",
        title: "Klubbmästerskap & Grillfest 2027",
        date: "28 mars 2027",
        time: "Kl. 11:00–16:00",
        location: "Ekholmsnäsbackens park",
        category: "event",
        description: "Årets stora avslutning med railsession och hamburgare.",
        linkUrl: "/kalender/km-2027",
      };

      const customDraft: SiteContent = {
        ...baseContent,
        calendarEvents: [customEvent, ...baseContent.calendarEvents],
      };

      const html = renderToString(<CalendarEventsForm draft={customDraft} onChange={() => {}} />);

      expect(html).toContain("Klubbmästerskap &amp; Grillfest 2027");
      expect(html).toContain("28 mars 2027");
      expect(html).toContain("Kl. 11:00–16:00");
      expect(html).toContain("Ekholmsnäsbackens park");
      expect(html).toContain("Årets stora avslutning med railsession");
    });
  });

  describe("FaqManagerForm Component", () => {
    it("renders FAQ questions, category filter pills and search", () => {
      const html = renderToString(<FaqManagerForm draft={baseContent} onChange={() => {}} />);
      expect(html).toContain("Vanliga frågor (FAQ)");
      expect(html).toContain("Lägg till ny fråga");
      expect(html).toContain(baseContent.faq[0].question);
    });

    it("renders custom FAQ item and newly added category in HTML", () => {
      const customFaqItem = {
        id: "faq-liftkort-info",
        question: "Ingår liftkort i träningsavgiften?",
        answer: "Ja, liftkort under träningspassen ingår alltid i avgiften för Skidklubben.",
        category: "Liftkort & Utrustning",
      };

      const customDraft: SiteContent = {
        ...baseContent,
        faq: [customFaqItem, ...baseContent.faq],
      };

      const html = renderToString(<FaqManagerForm draft={customDraft} onChange={() => {}} />);

      expect(html).toContain("Ingår liftkort i träningsavgiften?");
      expect(html).toContain("Ja, liftkort under träningspassen ingår alltid");
      expect(html).toContain("Liftkort &amp; Utrustning");
    });
  });

  describe("CoachesManagerForm Component", () => {
    it("renders coaches list with avatar and role information", () => {
      const html = renderToString(<CoachesManagerForm draft={baseContent} onChange={() => {}} />);
      expect(html).toContain("Tränarteam &amp; Ledare");
      expect(html).toContain("Lägg till tränare");
      expect(html).toContain(baseContent.coaches[0].name);
      expect(html).toContain(baseContent.coaches[0].role);
    });

    it("renders customized coach entry with custom role, name and avatar in HTML", () => {
      const customCoach = {
        id: "coach-johan-nord",
        name: "Johan Nordström",
        role: "Tränaransvarig Slopestyle",
        group: "Skidklubb",
        photoUrl: "/assets/photos/coaches/johan-nord.jpg",
      };

      const customDraft: SiteContent = {
        ...baseContent,
        coaches: [customCoach, ...baseContent.coaches],
      };

      const html = renderToString(<CoachesManagerForm draft={customDraft} onChange={() => {}} />);

      expect(html).toContain("Johan Nordström");
      expect(html).toContain("Tränaransvarig Slopestyle");
      expect(html).toContain("/assets/photos/coaches/johan-nord.jpg");
    });
  });

  describe("PartnersManagerForm Component", () => {
    it("renders partners list with discounts and online codes", () => {
      const html = renderToString(<PartnersManagerForm draft={baseContent} onChange={() => {}} />);
      expect(html).toContain("Samarbetspartners &amp; Medlemsförmåner");
      expect(html).toContain("Lägg till partner");
      expect(html).toContain(baseContent.partners[0].name);
      expect(html).toContain("15% rabatt på skidutrustning");
    });

    it("renders customized partner discount, online code and instructions in HTML", () => {
      const customPartner = {
        id: "partner-stadium-lidingo",
        name: "Stadium Lidingö",
        discountSummary: "20% rabatt på alla skidjackor och hjälmar",
        memberCode: "FREESKIERS20",
        howToRedeem: "Visa medlemskortet i kassan eller uppge kod online.",
        websiteUrl: "https://stadium.se",
        logoUrl: "/assets/partners/stadium.png",
      };

      const customDraft: SiteContent = {
        ...baseContent,
        partners: [customPartner, ...baseContent.partners],
      };

      const html = renderToString(<PartnersManagerForm draft={customDraft} onChange={() => {}} />);

      expect(html).toContain("Stadium Lidingö");
      expect(html).toContain("20% rabatt på alla skidjackor och hjälmar");
      expect(html).toContain("FREESKIERS20");
      expect(html).toContain("Visa medlemskortet i kassan eller uppge kod online.");
    });
  });

  describe("GeneralHeroForm Component", () => {
    it("renders hero title, subtitle, CTA buttons and live preview", () => {
      const html = renderToString(<GeneralHeroForm draft={baseContent} onChange={() => {}} />);
      expect(html).toContain("Startsida Hero (Huvudsektion)");
      expect(html).toContain("Huvudrubrik");
      expect(html).toContain("Underrubrik / Ingress");
      expect(html).toContain("Primär knapp");
      expect(html).toContain("Förhandsgranskning av Hero");
      expect(html).toContain("100% skidglädje");
    });

    it("renders customized hero title and CTA button texts in HTML", () => {
      const customDraft: SiteContent = {
        ...baseContent,
        hero: {
          title: "Välkommen till Sveriges roligaste skidklubb!",
          subtitle: "Vi lär barn och unga att älska skidåkning i Ekholmsnäsbacken.",
          primaryCtaText: "Upptäck våra grupper",
          primaryCtaUrl: "/skidklubb",
          secondaryCtaText: "Läs om Helgskidskolan",
          secondaryCtaUrl: "/helgskidskola",
          heroPhotoUrl: "/assets/photos/custom-hero.jpg",
        },
      };

      const html = renderToString(<GeneralHeroForm draft={customDraft} onChange={() => {}} />);

      expect(html).toContain("Välkommen till Sveriges roligaste skidklubb!");
      expect(html).toContain("Vi lär barn och unga att älska skidåkning i Ekholmsnäsbacken.");
      expect(html).toContain("Upptäck våra grupper");
      expect(html).toContain("Läs om Helgskidskolan");
      expect(html).toContain("/assets/photos/custom-hero.jpg");
    });
  });
});
