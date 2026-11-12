import path from "node:path";
import fs from "node:fs";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import type { SiteContent } from "../types/cms";
import { canUserEditCms } from "./cmsAuth";
import { INITIAL_CMS_EDITORS } from "../config/cms-editors";
import { sportadminAccounts } from "./sportadminData";

const execAsync = promisify(exec);

export interface CmsImagePayload {
  filename: string;
  data: string; // base64 string or data URL
}

export interface CmsPublishPayload {
  email?: string;
  pin?: string;
  adminPin?: string;
  name?: string;
  authorName?: string;
  content?: SiteContent;
  images?: CmsImagePayload[] | Record<string, string>;
}

export interface CmsPublishOptions {
  contentFilePath?: string;
  cmsPhotosDir?: string;
  skipGit?: boolean;
  skipPush?: boolean;
}

export interface CmsPublishResponse {
  success: boolean;
  message?: string;
  commitHash?: string;
  error?: string;
  errors?: string[];
  pushed?: boolean;
}

/**
 * Validates PIN against allowed admin keys:
 * - '2026'
 * - 'freeskiers'
 * - 'admin'
 * - CMS_ADMIN_PIN or ADMIN_PIN environment variables
 */
export function isValidCmsPin(pin?: string): boolean {
  if (typeof pin !== "string") return false;
  const cleanPin = pin.trim().toLowerCase();
  if (!cleanPin) return false;

  const validPins = new Set(["2026", "freeskiers", "admin"]);

  if (typeof process !== "undefined" && process.env) {
    if (process.env.CMS_ADMIN_PIN) {
      validPins.add(process.env.CMS_ADMIN_PIN.trim().toLowerCase());
    }
    if (process.env.ADMIN_PIN) {
      validPins.add(process.env.ADMIN_PIN.trim().toLowerCase());
    }
  }

  return validPins.has(cleanPin);
}

/**
 * Validates the structure and required keys of a SiteContent object.
 */
export function validateSiteContent(content: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!content || typeof content !== "object" || Array.isArray(content)) {
    return { valid: false, errors: ["Innehållet måste vara ett giltigt objekt"] };
  }

  const c = content as Partial<SiteContent>;

  // 1. topBanner
  if (!c.topBanner || typeof c.topBanner !== "object") {
    errors.push("topBanner saknas eller är ogiltig");
  } else {
    if (typeof c.topBanner.enabled !== "boolean") {
      errors.push("topBanner.enabled måste vara boolean");
    }
    if (typeof c.topBanner.text !== "string") {
      errors.push("topBanner.text måste vara en sträng");
    }
    if (!["info", "warning", "success"].includes(c.topBanner.type)) {
      errors.push('topBanner.type måste vara "info", "warning" eller "success"');
    }
  }

  // 2. hero
  if (!c.hero || typeof c.hero !== "object") {
    errors.push("hero-sektionen saknas");
  } else {
    if (typeof c.hero.title !== "string") errors.push("hero.title måste vara en sträng");
    if (typeof c.hero.subtitle !== "string") errors.push("hero.subtitle måste vara en sträng");
    if (typeof c.hero.primaryCtaText !== "string")
      errors.push("hero.primaryCtaText måste vara en sträng");
    if (typeof c.hero.primaryCtaUrl !== "string")
      errors.push("hero.primaryCtaUrl måste vara en sträng");
  }

  // 3. groups
  if (!c.groups || typeof c.groups !== "object" || Array.isArray(c.groups)) {
    errors.push("groups saknas eller är ogiltig");
  } else {
    for (const [slug, group] of Object.entries(c.groups)) {
      if (!group || typeof group !== "object") {
        errors.push(`groups.${slug} är ogiltig`);
      } else {
        if (typeof group.name !== "string") errors.push(`groups.${slug}.name måste vara en sträng`);
        if (typeof group.price !== "string")
          errors.push(`groups.${slug}.price måste vara en sträng`);
        if (typeof group.bookingUrl !== "string")
          errors.push(`groups.${slug}.bookingUrl måste vara en sträng`);
      }
    }
  }

  // 4. cancellationRules
  if (!c.cancellationRules || typeof c.cancellationRules !== "object") {
    errors.push("cancellationRules saknas");
  } else {
    const rules = c.cancellationRules;
    if (typeof rules.fullRefundUntil !== "string")
      errors.push("cancellationRules.fullRefundUntil saknas");
    if (typeof rules.skidklubbDeduction !== "string")
      errors.push("cancellationRules.skidklubbDeduction saknas");
    if (typeof rules.helgskidskolaDeduction !== "string")
      errors.push("cancellationRules.helgskidskolaDeduction saknas");
    if (typeof rules.policyText !== "string") errors.push("cancellationRules.policyText saknas");
  }

  // 5. calendarEvents
  if (!Array.isArray(c.calendarEvents)) {
    errors.push("calendarEvents måste vara en array");
  } else {
    c.calendarEvents.forEach((ev, idx) => {
      if (
        !ev ||
        typeof ev !== "object" ||
        typeof ev.id !== "string" ||
        typeof ev.title !== "string"
      ) {
        errors.push(`calendarEvents[${idx}] saknar id eller title`);
      }
    });
  }

  // 6. faq
  if (!Array.isArray(c.faq)) {
    errors.push("faq måste vara en array");
  } else {
    c.faq.forEach((item, idx) => {
      if (
        !item ||
        typeof item !== "object" ||
        typeof item.question !== "string" ||
        typeof item.answer !== "string"
      ) {
        errors.push(`faq[${idx}] saknar question eller answer`);
      }
    });
  }

  // 7. coaches
  if (!Array.isArray(c.coaches)) {
    errors.push("coaches måste vara en array");
  } else {
    c.coaches.forEach((coach, idx) => {
      if (
        !coach ||
        typeof coach !== "object" ||
        typeof coach.name !== "string" ||
        typeof coach.role !== "string"
      ) {
        errors.push(`coaches[${idx}] saknar name eller role`);
      }
    });
  }

  // 8. partners
  if (!Array.isArray(c.partners)) {
    errors.push("partners måste vara en array");
  } else {
    c.partners.forEach((partner, idx) => {
      if (!partner || typeof partner !== "object" || typeof partner.name !== "string") {
        errors.push(`partners[${idx}] saknar name`);
      }
    });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Resolves a human-readable author name from payload or editor configs.
 */
function resolveAuthorName(email: string, payloadName?: string): string {
  if (payloadName && payloadName.trim()) {
    return payloadName.trim();
  }
  const cleanEmail = email.toLowerCase().trim();
  const explicit = INITIAL_CMS_EDITORS.find((e) => e.email.toLowerCase().trim() === cleanEmail);
  if (explicit && explicit.name) {
    return explicit.name;
  }
  const account = sportadminAccounts.find((a) => a.email?.toLowerCase().trim() === cleanEmail);
  if (account && account.guardianName) {
    return account.guardianName;
  }
  return email || "Redaktör";
}

/**
 * Executes git add, commit, and push for published CMS files.
 */
export async function executeGitPublish(
  authorName: string,
  options?: CmsPublishOptions,
): Promise<{ committed: boolean; commitHash?: string; pushed?: boolean; error?: string }> {
  if (options?.skipGit) {
    return { committed: false };
  }

  try {
    const cwd = process.cwd();

    // Check if git is available and we are inside a git repository
    try {
      await execAsync("git rev-parse --is-inside-work-tree", { cwd });
    } catch {
      return { committed: false, error: "Git är inte tillgängligt i denna miljö" };
    }

    const defaultContentRel = "src/data/site-content.json";
    const defaultPhotosRel = "src/assets/photos/cms";

    // Git add content file
    await execAsync(`git add "${defaultContentRel}"`, { cwd });

    // Git add photos directory if it exists
    const fullPhotosPath = path.resolve(cwd, defaultPhotosRel);
    if (fs.existsSync(fullPhotosPath)) {
      await execAsync(`git add "${defaultPhotosRel}"`, { cwd });
    }

    // Check if there are staged changes
    let hasChanges = false;
    try {
      await execAsync("git diff --cached --quiet", { cwd });
      // Exit code 0 means no changes staged
      hasChanges = false;
    } catch {
      // Exit code 1 means changes exist
      hasChanges = true;
    }

    let commitHash: string | undefined;

    if (hasChanges) {
      const sanitizedName = authorName.replace(/["`$\\]/g, "").trim() || "Redaktör";
      await execAsync(`git commit -m "CMS: Innehåll uppdaterat av ${sanitizedName}"`, { cwd });

      const revResult = await execAsync("git rev-parse HEAD", { cwd });
      commitHash = revResult.stdout.trim();
    } else {
      const revResult = await execAsync("git rev-parse HEAD", { cwd });
      commitHash = revResult.stdout.trim();
    }

    // Push to remotes if enabled
    let pushed = false;
    let pushError: string | undefined;

    if (!options?.skipPush) {
      try {
        await execAsync("git push lovable-repo main:main main:lovable && git push origin main:main main:lovable", { cwd });
        pushed = true;
      } catch {
        // Fallback if lovable branch does not exist or single branch push is preferred
        try {
          await execAsync("git push lovable-repo main && git push origin main", { cwd });
          pushed = true;
        } catch (pushErr: unknown) {
          pushError = pushErr instanceof Error ? pushErr.message : String(pushErr);
          console.warn(
            "CMS git push kunde inte slutföras direkt (ändringar sparade lokalt):",
            pushError,
          );
        }
      }
    }

    return {
      committed: hasChanges,
      commitHash,
      pushed,
      error: pushError,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn("CMS git-hantering varnade:", msg);
    return { committed: false, error: msg };
  }
}

/**
 * Handles publishing CMS content to disk, decoding images, and recording Git commit.
 */
export async function publishCmsContent(
  payload: CmsPublishPayload,
  options?: CmsPublishOptions,
): Promise<CmsPublishResponse> {
  const email = (payload.email || "").trim();
  const pin = (payload.pin || payload.adminPin || "").trim();

  // 1. Verify credentials presence
  if (!email || !pin) {
    return {
      success: false,
      error: "E-post och kanslikod krävs för publicering",
    };
  }

  // 2. Validate PIN
  if (!isValidCmsPin(pin)) {
    return {
      success: false,
      error: "Felaktig kanslikod",
    };
  }

  // 3. Authorize user email
  const auth = canUserEditCms(email);
  if (!auth.allowed) {
    return {
      success: false,
      error: auth.reason || "Behörighet saknas för denna e-postadress",
    };
  }

  // 4. Validate content structure
  if (!payload.content) {
    return {
      success: false,
      error: "Inget innehåll angivet att publicera",
    };
  }

  const validation = validateSiteContent(payload.content);
  if (!validation.valid) {
    return {
      success: false,
      error: "Ogiltig innehållsstruktur",
      errors: validation.errors,
    };
  }

  // 5. Write content to site-content.json
  const contentPath =
    options?.contentFilePath || path.resolve(process.cwd(), "src/data/site-content.json");
  try {
    fs.mkdirSync(path.dirname(contentPath), { recursive: true });
    fs.writeFileSync(contentPath, JSON.stringify(payload.content, null, 2) + "\n", "utf8");
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Kunde inte skriva till innehållsfilen:", msg);
    return {
      success: false,
      error: `Kunde inte spara till disk: ${msg}`,
    };
  }

  // 6. Decode and save any base64 images
  const photosDir = options?.cmsPhotosDir || path.resolve(process.cwd(), "src/assets/photos/cms");
  if (payload.images) {
    try {
      fs.mkdirSync(photosDir, { recursive: true });
    } catch (dirErr: unknown) {
      console.warn("Kunde inte skapa bildmapp för CMS:", dirErr);
    }

    const imageList: CmsImagePayload[] = Array.isArray(payload.images)
      ? payload.images
      : Object.entries(payload.images).map(([filename, data]) => ({ filename, data }));

    for (let idx = 0; idx < imageList.length; idx++) {
      const img = imageList[idx];
      if (!img || !img.filename || !img.data) continue;

      let safeName = path.basename(img.filename).replace(/[^a-zA-Z0-9._-]/g, "_");
      const ext = path.extname(safeName).toLowerCase();
      const ALLOWED_EXTS = [".webp", ".jpg", ".jpeg", ".png", ".gif", ".svg"];
      if (!ALLOWED_EXTS.includes(ext)) {
        safeName = `${path.parse(safeName).name || "image"}.webp`;
      }
      if (!safeName || safeName === "." || safeName === "..") {
        safeName = `cms_image_${Date.now()}_${idx}.webp`;
      }

      try {
        const base64Data = img.data.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        fs.writeFileSync(path.join(photosDir, safeName), buffer);
      } catch (imgErr) {
        console.warn(`Kunde inte spara bild ${safeName}:`, imgErr);
      }
    }
  }

  // 7. Git commit and push
  const authorName = resolveAuthorName(email, payload.name || payload.authorName);
  const gitResult = await executeGitPublish(authorName, options);

  if (gitResult.pushed === false && gitResult.error) {
    return {
      success: true,
      message: `Ändringarna sparades lokalt, men kunde inte pushas till fjärr-repo: ${gitResult.error}`,
      commitHash: gitResult.commitHash,
      pushed: false,
      error: gitResult.error,
    };
  }

  return {
    success: true,
    message: "Ändringarna är publicerade!",
    commitHash: gitResult.commitHash,
    pushed: gitResult.pushed,
  };
}

/**
 * Direct HTTP handler for POST /api/cms/publish in src/server.ts.
 */
export async function handleCmsPublishRequest(
  request: Request,
  options?: CmsPublishOptions,
): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ success: false, error: "Endast POST är tillåtet" }), {
      status: 405,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  let payload: CmsPublishPayload;
  try {
    payload = (await request.json()) as CmsPublishPayload;
  } catch {
    return new Response(JSON.stringify({ success: false, error: "Ogiltigt JSON-anrop" }), {
      status: 400,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  // Merge headers if provided
  const headerEmail = request.headers.get("x-cms-email");
  const headerPin = request.headers.get("x-cms-pin");
  if (headerEmail && !payload.email) payload.email = headerEmail;
  if (headerPin && !payload.pin) payload.pin = headerPin;

  const email = (payload.email || "").trim();
  const pin = (payload.pin || payload.adminPin || "").trim();

  // Authentication & authorization checks before content validation
  if (!email || !pin) {
    return new Response(
      JSON.stringify({ success: false, error: "E-post och kanslikod krävs för publicering" }),
      {
        status: 401,
        headers: { "content-type": "application/json; charset=utf-8" },
      },
    );
  }

  if (!isValidCmsPin(pin)) {
    return new Response(JSON.stringify({ success: false, error: "Felaktig kanslikod" }), {
      status: 401,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  const auth = canUserEditCms(email);
  if (!auth.allowed) {
    return new Response(
      JSON.stringify({
        success: false,
        error: auth.reason || "E-postadressen saknar redaktörsbehörighet",
      }),
      {
        status: 403,
        headers: { "content-type": "application/json; charset=utf-8" },
      },
    );
  }

  if (!payload.content) {
    return new Response(
      JSON.stringify({ success: false, error: "Inget innehåll angivet att publicera" }),
      {
        status: 400,
        headers: { "content-type": "application/json; charset=utf-8" },
      },
    );
  }

  const validation = validateSiteContent(payload.content);
  if (!validation.valid) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Ogiltig innehållsstruktur",
        details: validation.errors,
      }),
      {
        status: 400,
        headers: { "content-type": "application/json; charset=utf-8" },
      },
    );
  }

  try {
    const result = await publishCmsContent(payload, options);
    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 500,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(
      JSON.stringify({
        success: false,
        error: `Oväntat serverfel: ${msg}`,
      }),
      {
        status: 500,
        headers: { "content-type": "application/json; charset=utf-8" },
      },
    );
  }
}
