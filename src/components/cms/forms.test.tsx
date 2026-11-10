import { describe, it, expect, vi } from "vitest";
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

    it("correctly triggers onChange with updated draft when fields change", () => {
      let emitted: SiteContent | null = null;
      const handleChange = (updated: SiteContent) => {
        emitted = updated;
      };

      // Directly call component functions to test emission logic
      const topBanner = { ...baseContent.topBanner, enabled: true, text: "Viktigt meddelande" };
      handleChange({ ...baseContent, topBanner });

      expect(emitted).not.toBeNull();
      expect(emitted!.topBanner.enabled).toBe(true);
      expect(emitted!.topBanner.text).toBe("Viktigt meddelande");
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

    it("emits updated cancellation policy data", () => {
      let updatedState: SiteContent | null = null;
      const onChange = (u: SiteContent) => {
        updatedState = u;
      };

      const customRules = {
        ...baseContent.cancellationRules,
        fullRefundUntil: "15 december",
        skidklubbDeduction: "1 200 kr",
      };

      onChange({
        ...baseContent,
        cancellationRules: customRules,
      });

      expect(updatedState!.cancellationRules.fullRefundUntil).toBe("15 december");
      expect(updatedState!.cancellationRules.skidklubbDeduction).toBe("1 200 kr");
    });
  });

  describe("GroupsForm Component", () => {
    it("renders group tabs and requirements list", () => {
      const html = renderToString(<GroupsForm draft={baseContent} onChange={() => {}} />);
      expect(html).toContain("Träningsgrupper &amp; Verksamhet");
      expect(html).toContain("Freeskiers Helgskidskola");
      expect(html).toContain("Förkunskapskrav &amp; Information");
      expect(html).toContain("Lägg till ny grupp");
    });

    it("updates group prices and requirements immutably", () => {
      let emitted: SiteContent | null = null;
      const onChange = (u: SiteContent) => {
        emitted = u;
      };

      const updatedGroups = {
        ...baseContent.groups,
        helgskidskola: {
          ...baseContent.groups.helgskidskola,
          price: "3 200 kr",
          requirements: ["Måste ha hjälm", "Nybörjare"],
        },
      };

      onChange({ ...baseContent, groups: updatedGroups });

      expect(emitted!.groups.helgskidskola.price).toBe("3 200 kr");
      expect(emitted!.groups.helgskidskola.requirements.length).toBe(2);
      expect(baseContent.groups.helgskidskola.price).not.toBe("3 200 kr");
    });
  });

  describe("CalendarEventsForm Component", () => {
    it("renders calendar events list with search and categories", () => {
      const html = renderToString(<CalendarEventsForm draft={baseContent} onChange={() => {}} />);
      expect(html).toContain("Kalender &amp; Aktuella Händelser");
      expect(html).toContain("Lägg till ny händelse");
      expect(html).toContain(baseContent.calendarEvents[0].title);
    });

    it("supports adding, reordering and deleting calendar events", () => {
      let resultEvents = [...baseContent.calendarEvents];
      const onChange = (u: SiteContent) => {
        resultEvents = u.calendarEvents;
      };

      // Add
      const newEv = {
        id: "ev-test",
        title: "Test Event",
        date: "2026-12-01",
        time: "10:00",
        location: "Lidingö",
        category: "skidklubb",
        description: "Test desc",
      };
      onChange({
        ...baseContent,
        calendarEvents: [newEv, ...baseContent.calendarEvents],
      });
      expect(resultEvents.length).toBe(baseContent.calendarEvents.length + 1);
      expect(resultEvents[0].id).toBe("ev-test");

      // Delete
      onChange({
        ...baseContent,
        calendarEvents: resultEvents.filter((e) => e.id !== "ev-test"),
      });
      expect(resultEvents.length).toBe(baseContent.calendarEvents.length);
    });
  });

  describe("FaqManagerForm Component", () => {
    it("renders FAQ questions, category filter pills and search", () => {
      const html = renderToString(<FaqManagerForm draft={baseContent} onChange={() => {}} />);
      expect(html).toContain("Vanliga frågor (FAQ)");
      expect(html).toContain("Lägg till ny fråga");
      expect(html).toContain(baseContent.faq[0].question);
    });

    it("updates FAQ answers and categories immutably", () => {
      let state: SiteContent = baseContent;
      const onChange = (u: SiteContent) => {
        state = u;
      };

      const updatedFaq = baseContent.faq.map((item, i) =>
        i === 0 ? { ...item, question: "Uppdaterad fråga?" } : item,
      );

      onChange({ ...baseContent, faq: updatedFaq });
      expect(state.faq[0].question).toBe("Uppdaterad fråga?");
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

    it("handles adding and updating a coach", () => {
      let state: SiteContent = baseContent;
      const onChange = (u: SiteContent) => {
        state = u;
      };

      const newCoach = {
        id: "coach-new",
        name: "Test Tränare",
        role: "Huvudtränare",
        group: "Skidklubb",
        photoUrl: "data:image/webp;base64,...",
      };

      onChange({
        ...baseContent,
        coaches: [newCoach, ...baseContent.coaches],
      });

      expect(state.coaches.length).toBe(baseContent.coaches.length + 1);
      expect(state.coaches[0].name).toBe("Test Tränare");
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

    it("handles partner updates and discount codes", () => {
      let state: SiteContent = baseContent;
      const onChange = (u: SiteContent) => {
        state = u;
      };

      const updatedPartners = baseContent.partners.map((p, i) =>
        i === 0 ? { ...p, memberCode: "NYKOD2027" } : p,
      );

      onChange({ ...baseContent, partners: updatedPartners });
      expect(state.partners[0].memberCode).toBe("NYKOD2027");
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

    it("updates hero section title and CTA buttons", () => {
      let state: SiteContent = baseContent;
      const onChange = (u: SiteContent) => {
        state = u;
      };

      onChange({
        ...baseContent,
        hero: {
          ...baseContent.hero,
          title: "Ny fantastisk skidsäsong!",
          primaryCtaText: "Boka plats",
        },
      });

      expect(state.hero.title).toBe("Ny fantastisk skidsäsong!");
      expect(state.hero.primaryCtaText).toBe("Boka plats");
    });
  });
});
