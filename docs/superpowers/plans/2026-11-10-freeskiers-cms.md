# Freeskiers Studio CMS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a simple, robust, Git-backed content management system ("Freeskiers Studio") where authorized board members and coaches can edit site texts, prices, dates, rules, FAQ, and images without risking breaking the site's layout or code.

**Architecture:** Site content is centralized into `src/data/site-content.json` with TypeScript types and fallbacks in `src/lib/cmsContent.ts`. Editors edit fields in a tabbed admin UI (`/admin/cms`), test changes in an in-browser live Preview mode (`sessionStorage`), and publish by triggering a server endpoint `POST /api/cms/publish` that commits and pushes directly to Git (`lovable-repo` and `origin`). Board members in SportAdmin get automatic editing rights.

**Tech Stack:** React 19, TanStack Router, TanStack Start / Nitro, Tailwind CSS, Lucide icons, Vitest.

**Spec:** [`docs/superpowers/specs/2026-11-10-freeskiers-cms-design.md`](file:///Users/stefanaaroe76/Documents/GitHub/Freeskiers/Freeskiers-webbsida/docs/superpowers/specs/2026-11-10-freeskiers-cms-design.md)

## Global Constraints

- Never break Lovable sync: commits must push cleanly to both `lovable-repo` (`main` and `lovable`) and `origin` (`main` and `lovable`).
- Protect site structure: the CMS only edits data fields in `src/data/site-content.json` and stores uploaded images in `src/assets/photos/cms/`. No `.tsx` or layout files are exposed to CMS edits.
- Zero external database dependencies: works entirely via Git-backed storage and browser drafts.
- Do not run commands that bypass the sandbox unless necessary for git commits/pushes.

---

### Task 1: Content Schema & Baseline Data Store

**Files:**
- Create: `src/types/cms.ts`
- Create: `src/data/site-content.json`
- Create: `src/lib/cmsContent.ts`
- Test: `src/lib/cmsContent.test.ts`

**Interfaces:**
- Produces: `SiteContent` interface, `defaultSiteContent` object, `getCmsContent(): SiteContent`, `mergeCmsPreview(draft: Partial<SiteContent>): SiteContent`

- [ ] **Step 1: Write test for CMS content retrieval and preview merging**

```ts
// src/lib/cmsContent.test.ts
import { describe, it, expect } from 'vitest';
import { getCmsContent, mergeCmsPreview } from './cmsContent';

describe('CMS Content Store', () => {
  it('returns default content with all required sections', () => {
    const content = getCmsContent();
    expect(content.topBanner).toBeDefined();
    expect(content.cancellationRules).toBeDefined();
    expect(content.groups).toBeDefined();
    expect(content.faq).toBeInstanceOf(Array);
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
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/cmsContent.test.ts`  
Expected: FAIL (modules not found)

- [ ] **Step 3: Define CMS types in `src/types/cms.ts`**

```ts
// src/types/cms.ts
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
```

- [ ] **Step 4: Create baseline `src/data/site-content.json` populated from `club-data.ts`**

Populate with club's current real values:
- Top banner: disabled by default, sample message.
- Groups: `helgskidskola`, `skidklubb`, `hostsasong`, `privatlektion` with current prices (2 980 kr, 3 130 kr, etc.).
- Cancellation rules: Skidklubben 1 000 kr, Helgskidskolan 600 kr, 400 kr om backen inte öppnar.
- Calendar events from `clubEvents`.
- FAQ from existing FAQ in `club-data.ts`.

- [ ] **Step 5: Implement `src/lib/cmsContent.ts`**

Export `getCmsContent(): SiteContent` and `mergeCmsPreview(draft)`.

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run src/lib/cmsContent.test.ts`  
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/types/cms.ts src/data/site-content.json src/lib/cmsContent.ts src/lib/cmsContent.test.ts
git commit -m "feat(cms): add content schema and baseline data store"
```

---

### Task 2: Live In-Browser Preview Context & Floating Banner

**Files:**
- Create: `src/contexts/CmsPreviewContext.tsx`
- Create: `src/components/cms/CmsPreviewBanner.tsx`
- Modify: `src/routes/__root.tsx:1-50`

**Interfaces:**
- Produces: `useCmsContent()`, `useCmsPreview()`, `CmsPreviewProvider`

- [ ] **Step 1: Create `src/contexts/CmsPreviewContext.tsx`**

Provides:
- `content`: Returns merged content (local draft from `sessionStorage` if previewing, otherwise production `site-content.json`).
- `isPreviewActive`: boolean indicating whether user is previewing a draft.
- `draftContent`: current draft object in state.
- `updateDraftField(path, value)`: updates draft in `sessionStorage`.
- `activatePreview()` / `exitPreview()` / `clearDraft()`.

- [ ] **Step 2: Create `src/components/cms/CmsPreviewBanner.tsx`**

Floating bottom pill/banner visible when `isPreviewActive === true`:
- Displays: `👁️ Förhandsgranskning aktiv – du ser dina osparade ändringar`
- Buttons:
  - `Gå tillbaka till redigeraren` (links to `/admin/cms`)
  - `Publicera ändringar` (opens direct publish confirmation)
  - `Avsluta förhandsgranskning`

- [ ] **Step 3: Mount `CmsPreviewProvider` and `CmsPreviewBanner` in `src/routes/__root.tsx`**

Wrap route root outlet so all pages have access to live draft content when in preview mode.

- [ ] **Step 4: Verify build**

Run: `npm run build`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/contexts/CmsPreviewContext.tsx src/components/cms/CmsPreviewBanner.tsx src/routes/__root.tsx
git commit -m "feat(cms): add live in-browser preview context and banner"
```

---

### Task 3: Editor Authorization (SportAdmin Role + Explicit List)

**Files:**
- Create: `src/config/cms-editors.ts`
- Create: `src/lib/cmsAuth.ts`
- Test: `src/lib/cmsAuth.test.ts`

**Interfaces:**
- Produces: `canUserEditCms(email: string): { allowed: boolean; role: 'superadmin' | 'editor'; reason: string }`

- [ ] **Step 1: Write failing test for editor authorization**

```ts
// src/lib/cmsAuth.test.ts
import { describe, it, expect } from 'vitest';
import { canUserEditCms } from './cmsAuth';

describe('CMS Authorization', () => {
  it('allows explicit superadmins from config', () => {
    const auth = canUserEditCms('admin@lidingofreeskiers.se');
    expect(auth.allowed).toBe(true);
    expect(auth.role).toBe('superadmin');
  });

  it('rejects unknown emails', () => {
    const auth = canUserEditCms('random.person@example.com');
    expect(auth.allowed).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/cmsAuth.test.ts`  
Expected: FAIL

- [ ] **Step 3: Implement `src/config/cms-editors.ts` and `src/lib/cmsAuth.ts`**

```ts
// src/config/cms-editors.ts
export interface CmsEditorEntry {
  email: string;
  name: string;
  role: 'superadmin' | 'editor';
}

export const INITIAL_CMS_EDITORS: CmsEditorEntry[] = [
  { email: 'admin@lidingofreeskiers.se', name: 'Kansli Freeskiers', role: 'superadmin' },
  { email: 'kontakt@lidingofreeskiers.se', name: 'Klubbinfo', role: 'editor' },
];
```

In `src/lib/cmsAuth.ts`:
- Check explicit list.
- Check SportAdmin skiers/members database (`sportadminSkiers` / `sportadminAccounts`) for active season group connection containing `"styrelse"`, `"tränaransvarig"` or `"huvudtränare"`. If matched, grant `role: 'editor'`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/cmsAuth.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/config/cms-editors.ts src/lib/cmsAuth.ts src/lib/cmsAuth.test.ts
git commit -m "feat(cms): add SportAdmin-integrated editor authorization"
```

---

### Task 4: Server Publishing Endpoint & Git Commits

**Files:**
- Create: `src/lib/cmsServer.ts`
- Modify: `src/server.ts:40-60`
- Test: `src/lib/cmsServer.test.ts`

**Interfaces:**
- Produces: `handleCmsPublishRequest(request: Request): Promise<Response>`

- [ ] **Step 1: Write unit test for CMS publish payload validation**

Test that malformed payloads or missing auth are rejected with HTTP 400/401, while valid payloads are accepted.

- [ ] **Step 2: Implement `src/lib/cmsServer.ts`**

`handleCmsPublishRequest`:
- Validates that caller is authorized (email check + PIN check).
- Validates the updated `SiteContent` structure.
- Writes updated content to `src/data/site-content.json`.
- If base64 images are included, decodes and writes them to `src/assets/photos/cms/<filename>`.
- Executes `git` commit and push:
  `git add src/data/site-content.json src/assets/photos/cms/ && git commit -m "CMS: Innehåll uppdaterat av <name>" && git push lovable-repo main && git push origin main`
- Returns `{ success: true, message: "Ändringarna är publicerade!", commitHash }`.

- [ ] **Step 3: Route `POST /api/cms/publish` in `src/server.ts`**

Add check: `if (url.pathname === '/api/cms/publish') return await handleCmsPublishRequest(request);`

- [ ] **Step 4: Verify build**

Run: `npm run build`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/cmsServer.ts src/server.ts
git commit -m "feat(cms): add server publishing endpoint with Git commit/push"
```

---

### Task 5: Form Sections & Image Upload Optimizer

**Files:**
- Create: `src/components/cms/ImageUploadField.tsx`
- Create: `src/components/cms/TopBannerForm.tsx`
- Create: `src/components/cms/GroupsForm.tsx`
- Create: `src/components/cms/CancellationRulesForm.tsx`
- Create: `src/components/cms/CalendarEventsForm.tsx`
- Create: `src/components/cms/FaqManagerForm.tsx`
- Create: `src/components/cms/CoachesManagerForm.tsx`
- Create: `src/components/cms/PartnersManagerForm.tsx`

**Interfaces:**
- Each form receives `draft: SiteContent`, `onChange: (updated: SiteContent) => void`, and renders clean, labeled input fields with instant feedback.
- `ImageUploadField` accepts an image, resizes on HTML5 Canvas to max width 1600px / 800px, converts to WebP/JPEG, and emits base64 data.

- [ ] **Step 1: Implement `src/components/cms/ImageUploadField.tsx`**

Drag & drop or file picker. Canvas resizing & compression. Preview thumbnail.

- [ ] **Step 2: Implement `TopBannerForm.tsx` & `CancellationRulesForm.tsx`**

- Banner toggle, type selector (info/warning/success), text input, link URL.
- Cancellation dates, deductions (Skidklubb 1000 kr, Helgskidskola 600 kr, un-opened slope 400 kr), policy texts.

- [ ] **Step 3: Implement `GroupsForm.tsx`, `CalendarEventsForm.tsx`, `FaqManagerForm.tsx`**

Price and schedule editors for each group. Add/edit/delete events and FAQ items with sort ordering.

- [ ] **Step 4: Implement `CoachesManagerForm.tsx` & `PartnersManagerForm.tsx`**

Coach name, role, photo upload. Partner name, discount description, online promo code, logo upload.

- [ ] **Step 5: Verify build**

Run: `npm run build`  
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/cms/
git commit -m "feat(cms): add form components and client-side image optimizer"
```

---

### Task 6: Freeskiers Studio Main UI & Admin Integration

**Files:**
- Create: `src/components/cms/FreeskiersStudioPage.tsx`
- Create: `src/routes/admin/cms.tsx`
- Modify: `src/components/admin/AdminDashboardPage.tsx`

**Interfaces:**
- Produces: Complete CMS Studio page with tab navigation, dirty-state indicator, "Förhandsgranska", "Återställ", and "Publicera" flow with confirmation modal.

- [ ] **Step 1: Create `src/components/cms/FreeskiersStudioPage.tsx`**

- Header bar: Freeskiers Studio title, user identity pill, last published timestamp.
- Action buttons:
  - `👁️ Förhandsgranska webbplatsen` (navigates to `/` with preview mode active).
  - `↺ Återställ utkast` (resets draft to production data).
  - `🚀 Publicera ändringar` (opens summary modal with list of modified sections).
- Tabbed layout matching the 8 brutto categories.
- Publish modal with progress spinner and success confirmation.

- [ ] **Step 2: Create route `src/routes/admin/cms.tsx`**

Route with metadata, protected by admin auth gate.

- [ ] **Step 3: Add "Innehåll / CMS" tab inside `src/components/admin/AdminDashboardPage.tsx`**

Allows accessing CMS directly from `/admin` alongside member sync and live tools.

- [ ] **Step 4: Verify build**

Run: `npm run build`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/cms/FreeskiersStudioPage.tsx src/routes/admin/cms.tsx src/components/admin/AdminDashboardPage.tsx
git commit -m "feat(cms): integrate Freeskiers Studio in Admin portal"
```

---

### Task 7: Wire Site Pages to CMS Data & Verification

**Files:**
- Modify: `src/components/site/TopEventBanner.tsx`
- Modify: `src/routes/avbokning.tsx`
- Modify: `src/routes/kalender.tsx`
- Modify: `src/routes/om-oss.tsx`

- [ ] **Step 1: Wire `TopEventBanner` to read from CMS content (or draft if in preview)**
- [ ] **Step 2: Wire `/avbokning` to read cancellation rules from CMS content**
- [ ] **Step 3: Wire `/kalender` to read events from CMS content**
- [ ] **Step 4: Run full test suite and build verification**

Run: `npm run build`  
Expected: Exit code 0, clean build.

- [ ] **Step 5: Commit and push to remotes**

```bash
git add .
git commit -m "feat(cms): wire pages to CMS content store and verify build"
git push lovable-repo main:main main:lovable
git push origin main:main main:lovable
```
