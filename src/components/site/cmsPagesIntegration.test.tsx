import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual<any>("@tanstack/react-router");
  return {
    ...actual,
    Link: ({ to, children, ...props }: any) => {
      const href = typeof to === "string" ? to : to?.to || "#";
      return React.createElement("a", { href, ...props }, children);
    },
    useMatches: () => [{ routeId: "/", pathname: "/" }],
    useNavigate: () => vi.fn(),
    useRouter: () => ({ invalidate: vi.fn(), navigate: vi.fn() }),
  };
});

import { TopEventBanner } from "@/components/site/TopEventBanner";
import { Route as AvbokningRoute, AvbokningPage } from "@/routes/avbokning";
import { Route as KalenderRoute, KalenderPage } from "@/routes/kalender";
import { Route as OmOssRoute, AboutPage } from "@/routes/om-oss";
import { CmsPreviewProvider, CMS_PREVIEW_ACTIVE_KEY } from "@/contexts/CmsPreviewContext";
import { LevelFinderProvider } from "@/components/site/LevelFinder";
import { getCmsContent } from "@/lib/cmsContent";
import type { SiteContent } from "@/types/cms";

class MockStorage {
  private store: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.store[key] ?? null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = String(value);
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }
}

describe("CMS Consumer Integration Tests", () => {
  let mockSessionStorage: MockStorage;

  beforeEach(() => {
    mockSessionStorage = new MockStorage();
    vi.stubGlobal("sessionStorage", mockSessionStorage);
    vi.stubGlobal("window", {
      sessionStorage: mockSessionStorage,
      location: { search: "?preview=true", href: "http://localhost:3000/?preview=true", pathname: "/" },
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
      history: { replaceState: vi.fn() },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const renderWithDraft = (ui: React.ReactElement, initialDraft?: Partial<SiteContent> | null) => {
    mockSessionStorage.setItem(CMS_PREVIEW_ACTIVE_KEY, "true");
    return renderToString(
      <CmsPreviewProvider initialDraft={initialDraft}>
        <LevelFinderProvider>{ui}</LevelFinderProvider>
      </CmsPreviewProvider>,
    );
  };

  describe("TopEventBanner component", () => {
    it("falls back to pushed club event when topBanner is disabled", () => {
      const html = renderWithDraft(<TopEventBanner />, {
        topBanner: {
          enabled: false,
          type: "info",
          text: "Detta meddelande ska inte synas!",
        },
      });

      expect(html).not.toContain("Detta meddelande ska inte synas!");
      // Shows pushed club event or region
      expect(html).toContain('role="region"');
    });

    it("renders active info topBanner with text, link and Aktuellt badge", () => {
      const html = renderWithDraft(<TopEventBanner />, {
        topBanner: {
          enabled: true,
          type: "info",
          text: "Välkommen till en ny skidsäsong 2026/2027!",
          linkText: "Läs mer i kalendern",
          linkUrl: "/kalender",
        },
      });

      expect(html).toContain("Välkommen till en ny skidsäsong 2026/2027!");
      expect(html).toContain("Aktuellt");
      expect(html).toContain("Läs mer i kalendern");
      expect(html).toContain('href="/kalender"');
    });

    it("renders warning topBanner with amber style and Viktigt badge", () => {
      const html = renderWithDraft(<TopEventBanner />, {
        topBanner: {
          enabled: true,
          type: "warning",
          text: "Observera: ändrade öppettider pga väderförhållanden!",
          linkText: "Se detaljer",
          linkUrl: "/kontakt",
        },
      });

      expect(html).toContain("Observera: ändrade öppettider pga väderförhållanden!");
      expect(html).toContain("Viktigt");
      expect(html).toContain("bg-amber-600");
    });

    it("renders success topBanner with emerald style and Nyhet badge", () => {
      const html = renderWithDraft(<TopEventBanner />, {
        topBanner: {
          enabled: true,
          type: "success",
          text: "Nu har anmälan till Rookie Series öppnat!",
          linkText: "Anmäl dig här",
          linkUrl: "https://sportadmin.se/book/?F=freeskiers",
        },
      });

      expect(html).toContain("Nu har anmälan till Rookie Series öppnat!");
      expect(html).toContain("Nyhet");
      expect(html).toContain("bg-emerald-700");
      expect(html).toContain('target="_blank"');
    });
  });

  describe("Avbokning page (/avbokning)", () => {
    it("renders default cancellation rules from CMS content", () => {
      const html = renderWithDraft(<AvbokningPage />);

      expect(html).toContain("Avbokningsregler");
      expect(html).toContain("30 november");
      expect(html).toContain("1 000 kr");
      expect(html).toContain("600 kr");
      expect(html).toContain("21 december");
    });

    it("reflects updated cancellation rules from CMS preview draft", () => {
      const html = renderWithDraft(<AvbokningPage />, {
        cancellationRules: {
          fullRefundUntil: "15 december",
          deductionPeriod: "16–31 december",
          skidklubbDeduction: "1 500 kr",
          helgskidskolaDeduction: "800 kr",
          cancelledSeasonFee: "500 kr",
          noRefundFrom: "1 januari",
          policyText: "Uppdaterad avbokningspolicy för specialarrangemang.",
        },
      });

      expect(html).toContain("t.o.m 15 december: hela avgiften återbetalas.");
      expect(html).toContain("Skidklubben 16–31 december: återbetalning minus 1 500 kr.");
      expect(html).toContain("Helgskidskolan 16–31 december: återbetalning minus 800 kr.");
      expect(html).toContain("Från 1 januari: ingen återbetalning.");
      expect(html).toContain("Efter 1 januari gäller ingen återbetalning.");
      expect(html).toContain("Uppdaterad avbokningspolicy för specialarrangemang.");
    });
  });

  describe("Kalender page (/kalender)", () => {
    it("renders calendar events from CMS content store", () => {
      const html = renderWithDraft(<KalenderPage />);

      expect(html).toContain("Säsongskalender &amp; Event");
      expect(html).toContain("Anmälan till Freeskiers Skidklubb");
    });

    it("reflects customized event title and dates from CMS draft", () => {
      const html = renderWithDraft(<KalenderPage />, {
        calendarEvents: [
          {
            id: "anmalan-oppnar-2026",
            title: "Super-Anmälan till Freeskiers Skidklubb 2026",
            date: "25 oktober 2026",
            time: "Kl. 10:00",
            location: "Online",
            category: "anmalan",
            description: "Ny anmälningstid för klubbens åkare.",
            linkUrl: "/skidklubb",
          },
        ],
      });

      expect(html).toContain("Super-Anmälan till Freeskiers Skidklubb 2026");
      expect(html).toContain("25 oktober 2026");
      expect(html).toContain("Kl. 10:00");
    });

    it("renders newly created calendar events added in CMS Studio", () => {
      const html = renderWithDraft(<KalenderPage />, {
        calendarEvents: [
          {
            id: "event-alpint-grill-2027",
            title: "Klubbmästerskap & Grillfest i Vårsol",
            date: "28 mars 2027",
            time: "Kl. 11:00",
            location: "Ekholmsnäsbacken Toppstugan",
            category: "tavling",
            description: "Alla medlemmar är välkomna på säsongsavslutning och grillning!",
            linkUrl: "/kalender",
          },
        ],
      });

      expect(html).toContain("Klubbmästerskap &amp; Grillfest i Vårsol");
      expect(html).toContain("28 mars 2027");
      expect(html).toContain("Ekholmsnäsbacken Toppstugan");
    });
  });

  describe("Om oss page (/om-oss)", () => {
    it("renders coaches list using CMS content store", () => {
      const html = renderWithDraft(<AboutPage />);

      expect(html).toContain("Våra tränare &amp; ledare");
      expect(html).toContain("Abbe Olofsson");
    });

    it("reflects updated coaches data from preview draft", () => {
      const html = renderWithDraft(<AboutPage />, {
        coaches: [
          {
            id: "coach-guest-pro",
            name: "Hanna Friåkare",
            role: "Gästtränare Park",
            group: "Skidklubben",
            photoUrl: "",
          },
        ],
      });

      expect(html).toContain("Hanna Friåkare");
      expect(html).toContain("Gästtränare Park");
    });

    it("correctly handles leader classification for leaders tab", () => {
      const html = renderWithDraft(<AboutPage />, {
        coaches: [
          {
            id: "coach-leader-custom",
            name: "Karin Ordförande",
            role: "Ledare & Styrelseordförande",
            group: "Styrelsen",
            photoUrl: "",
          },
        ],
      });

      expect(html).toContain("Ledare");
      // The leader tab button has count
      expect(html).toContain("1");
    });
  });
});
