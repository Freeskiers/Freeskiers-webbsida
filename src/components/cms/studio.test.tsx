import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual<any>("@tanstack/react-router");
  return {
    ...actual,
    Link: ({ to, children, ...props }: any) => {
      return React.createElement("a", { href: typeof to === "string" ? to : "#", ...props }, children);
    },
    useMatches: () => [{ routeId: "/admin", pathname: "/admin" }],
    useNavigate: () => vi.fn(),
    Outlet: () => React.createElement("div", { "data-testid": "outlet" }, "Outlet Content"),
  };
});

import {
  FreeskiersStudioPage,
  getModifiedSections,
  SECTION_LABELS,
  CmsTabKey,
} from "./FreeskiersStudioPage";
import { CmsPreviewProvider, CMS_DRAFT_KEY } from "@/contexts/CmsPreviewContext";
import { MemberAuthProvider } from "@/components/member/MemberAuthContext";
import { getCmsContent } from "@/lib/cmsContent";
import type { SiteContent } from "@/types/cms";
import { Route as AdminCmsRoute } from "@/routes/admin/cms";
import { AdminDashboardPage } from "@/components/admin/AdminDashboardPage";

// In-memory mock storage for node test environment
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

  get length(): number {
    return Object.keys(this.store).length;
  }

  key(index: number): string | null {
    return Object.keys(this.store)[index] ?? null;
  }
}

describe("Freeskiers Studio UI & Admin Integration", () => {
  let originalSessionStorage: Storage | undefined;
  let originalLocalStorage: Storage | undefined;

  beforeEach(() => {
    originalSessionStorage = globalThis.sessionStorage;
    originalLocalStorage = globalThis.localStorage;
    globalThis.sessionStorage = new MockStorage() as unknown as Storage;
    globalThis.localStorage = new MockStorage() as unknown as Storage;
  });

  afterEach(() => {
    globalThis.sessionStorage = originalSessionStorage as Storage;
    globalThis.localStorage = originalLocalStorage as Storage;
    vi.restoreAllMocks();
  });

  const renderWithProviders = (
    ui: React.ReactElement,
    initialDraft?: Partial<SiteContent> | null,
  ) => {
    return renderToString(
      <MemberAuthProvider>
        <CmsPreviewProvider initialDraft={initialDraft}>{ui}</CmsPreviewProvider>
      </MemberAuthProvider>,
    );
  };

  describe("getModifiedSections logic", () => {
    it("returns an empty array when draft is null or empty", () => {
      expect(getModifiedSections(null)).toEqual([]);
      expect(getModifiedSections({})).toEqual([]);
    });

    it("returns an empty array when draft matches baseline exactly", () => {
      const baseline = getCmsContent();
      expect(getModifiedSections(baseline)).toEqual([]);
    });

    it("detects single modified section in topBanner", () => {
      const baseline = getCmsContent();
      const draft: Partial<SiteContent> = {
        topBanner: {
          ...baseline.topBanner,
          text: "Ny viktig banderoll för Freeskiers!",
        },
      };

      const modified = getModifiedSections(draft);
      expect(modified).toEqual(["topBanner"]);
      expect(SECTION_LABELS[modified[0]]).toBe("Toppbanner");
    });

    it("detects multiple modified sections simultaneously", () => {
      const baseline = getCmsContent();
      const draft: Partial<SiteContent> = {
        hero: {
          ...baseline.hero,
          title: "Välkommen till Sveriges bästa park!",
        },
        cancellationRules: {
          ...baseline.cancellationRules,
          skidklubbDeduction: "600 kr",
        },
        faq: [
          ...baseline.faq,
          {
            id: "faq-test-new",
            question: "Ny testfråga?",
            answer: "Ja, detta är ett svar.",
            category: "Allmänt",
          },
        ],
      };

      const modified = getModifiedSections(draft);
      expect(modified).toContain("hero");
      expect(modified).toContain("cancellationRules");
      expect(modified).toContain("faq");
      expect(modified).not.toContain("topBanner");
      expect(modified).not.toContain("coaches");
    });

    it("has friendly Swedish labels for all 8 brutto sections", () => {
      const keys: (keyof SiteContent)[] = [
        "topBanner",
        "hero",
        "groups",
        "cancellationRules",
        "calendarEvents",
        "faq",
        "coaches",
        "partners",
      ];

      for (const key of keys) {
        expect(SECTION_LABELS[key]).toBeDefined();
        expect(typeof SECTION_LABELS[key]).toBe("string");
        expect(SECTION_LABELS[key].length).toBeGreaterThan(0);
      }
    });
  });

  describe("FreeskiersStudioPage Authentication Gate", () => {
    it("renders the locked PIN gate when user is not authorized", () => {
      sessionStorage.removeItem("freeskiers_admin_unlocked");
      localStorage.removeItem("freeskiers_member_user_v1");

      const html = renderWithProviders(<FreeskiersStudioPage />);

      expect(html).toContain("Innehållshantering");
      expect(html).toContain("Kanslikod / PIN");
      expect(html).toContain("Lås upp Freeskiers Studio");
      expect(html).toContain("Tillbaka till Kanslicenter");
    });

    it("unlocks and renders full studio UI when session is unlocked", () => {
      sessionStorage.setItem("freeskiers_admin_unlocked", "true");
      sessionStorage.setItem("freeskiers_admin_pin", "2026");

      const html = renderWithProviders(<FreeskiersStudioPage />);

      expect(html).toContain("Freeskiers Studio");
      expect(html).toContain("Inloggad Redaktör");
      expect(html).toContain("I synk med produktion");
      expect(html).toContain("Förhandsgranska");
      expect(html).toContain("Återställ");
      expect(html).toContain("Publicera ändringar");
    });
  });

  describe("FreeskiersStudioPage Actions & Dirty State", () => {
    beforeEach(() => {
      sessionStorage.setItem("freeskiers_admin_unlocked", "true");
    });

    it("renders clean state when there are no draft modifications", () => {
      const html = renderWithProviders(<FreeskiersStudioPage />);

      expect(html).toContain("I synk med produktion");
      expect(html).not.toContain("ändrad sektion i utkast");
    });

    it("renders dirty indicator pill and modified section badges when draft has changes", () => {
      const baseline = getCmsContent();
      const draft = {
        topBanner: {
          ...baseline.topBanner,
          text: "Ny topptext i utkast!",
        },
        groups: {
          ...baseline.groups,
          skidklubb: {
            ...baseline.groups.skidklubb,
            price: "5 500 kr",
          },
        },
      };

      const html = renderWithProviders(<FreeskiersStudioPage initialDraft={draft} />);

      expect(html).toContain("ändrade sektioner");
      expect(html).toContain("i utkast");
      expect(html).toContain("Osparade sektioner:");
      expect(html).toContain("Toppbanner");
      expect(html).toContain("Träningsgrupper");
    });

    it("renders all 9 navigation tabs with correct titles", () => {
      const html = renderWithProviders(<FreeskiersStudioPage />);

      expect(html).toContain("Toppbanner");
      expect(html).toContain("Träningsgrupper");
      expect(html).toContain("Avbokningsregler");
      expect(html).toContain("Kalender &amp; Läger");
      expect(html).toContain("FAQ");
      expect(html).toContain("Tränare");
      expect(html).toContain("Partners");
      expect(html).toContain("Startsida Hero");
      expect(html).toContain("Redaktörer &amp; Behörigheter");
    });

    it("renders default active tab (Toppbanner) form with input controls", () => {
      const html = renderWithProviders(<FreeskiersStudioPage />);

      expect(html).toContain("Toppbanner (Notislist)");
      expect(html).toContain("Meddelandetext");
      expect(html).toContain("Förhandsvisning av bannern");
    });

    it("renders last published timestamp in header action bar", () => {
      sessionStorage.setItem("freeskiers_cms_last_published", "2026-11-10 17:35");

      const html = renderWithProviders(<FreeskiersStudioPage />);

      expect(html).toContain("Senast publicerad:");
      expect(html).toContain("2026-11-10 17:35");
    });
  });

  describe("Admin Route & Dashboard Integration", () => {
    it("exports TanStack createFileRoute for /admin/cms with expected metadata", () => {
      expect(AdminCmsRoute).toBeDefined();
      expect(typeof AdminCmsRoute).toBe("object");

      // Verify route options and head metadata
      const options = (AdminCmsRoute as any).options;
      expect(options).toBeDefined();
      expect(typeof options.head).toBe("function");

      const headResult = options.head();
      expect(headResult.meta).toBeDefined();

      const titleMeta = headResult.meta.find((m: any) => m.title);
      expect(titleMeta.title).toContain("Freeskiers Studio");

      const robotsMeta = headResult.meta.find((m: any) => m.name === "robots");
      expect(robotsMeta.content).toBe("noindex, nofollow");
    });

    it("renders AdminDashboardPage with the Innehåll / CMS tab when unlocked", () => {
      sessionStorage.setItem("freeskiers_admin_unlocked", "true");

      const html = renderWithProviders(<AdminDashboardPage />);

      expect(html).toContain("Medlemmar &amp; SportAdmin API");
      expect(html).toContain("Innehåll / CMS (Freeskiers Studio)");
      expect(html).toContain("/admin/cms");
    });

    it("renders FreeskiersStudioPage embedded without duplicate headers", () => {
      sessionStorage.setItem("freeskiers_admin_unlocked", "true");
      expect(typeof (AdminCmsRoute as any).options.component).toBe("function");

      const html = renderWithProviders(<FreeskiersStudioPage embedded={true} />);

      // Should contain Freeskiers Studio action bar
      expect(html).toContain("Freeskiers Studio");
      expect(html).toContain("Inloggad Redaktör");
      expect(html).toContain("Senast publicerad:");

      // Should NOT contain duplicate dark hero breadcrumbs
      expect(html).not.toContain("Hem / Kanslicenter / Freeskiers Studio");
    });
  });
});
