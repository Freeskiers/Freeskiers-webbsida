import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import {
  handleCmsPublishRequest,
  validateSiteContent,
  isValidCmsPin,
  executeGitPublish,
} from "./cmsServer";
import { getCmsContent } from "./cmsContent";
import type { SiteContent } from "../types/cms";

describe("CMS Server Publishing Endpoint", () => {
  let tempDir: string;
  let testContentFile: string;
  let testPhotosDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "cms-server-test-"));
    testContentFile = path.join(tempDir, "site-content.json");
    testPhotosDir = path.join(tempDir, "photos", "cms");
  });

  afterEach(() => {
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch {
      // ignore cleanup errors
    }
  });

  describe("PIN Validation", () => {
    it("accepts 2026, freeskiers, and admin PINs regardless of case or whitespace", () => {
      expect(isValidCmsPin("2026")).toBe(true);
      expect(isValidCmsPin(" 2026 ")).toBe(true);
      expect(isValidCmsPin("freeskiers")).toBe(true);
      expect(isValidCmsPin("FREESKIERS")).toBe(true);
      expect(isValidCmsPin("admin")).toBe(true);
      expect(isValidCmsPin(" ADMIN ")).toBe(true);
    });

    it("rejects invalid or empty PINs", () => {
      expect(isValidCmsPin("")).toBe(false);
      expect(isValidCmsPin("1234")).toBe(false);
      expect(isValidCmsPin("wrong")).toBe(false);
      expect(isValidCmsPin(undefined as unknown as string)).toBe(false);
    });
  });

  describe("Content Validation", () => {
    it("validates baseline site content successfully", () => {
      const baseline = getCmsContent();
      const result = validateSiteContent(baseline);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("rejects null or non-object content", () => {
      expect(validateSiteContent(null).valid).toBe(false);
      expect(validateSiteContent(undefined).valid).toBe(false);
      expect(validateSiteContent("string").valid).toBe(false);
      expect(validateSiteContent([]).valid).toBe(false);
    });

    it("rejects content with invalid topBanner", () => {
      const baseline = getCmsContent();
      const invalid = {
        ...baseline,
        topBanner: { ...baseline.topBanner, type: "critical" as any },
      };
      const result = validateSiteContent(invalid);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes("topBanner.type"))).toBe(true);
    });

    it("rejects content with missing sections", () => {
      const result = validateSiteContent({ topBanner: { enabled: false, type: "info", text: "" } });
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it("rejects content with invalid arrays for events, faqs, coaches, partners", () => {
      const baseline = getCmsContent();
      const invalid = {
        ...baseline,
        calendarEvents: "not-an-array" as any,
      };
      const result = validateSiteContent(invalid);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes("calendarEvents"))).toBe(true);
    });
  });

  describe("handleCmsPublishRequest HTTP handling", () => {
    it("rejects non-POST HTTP methods with 405 Method Not Allowed", async () => {
      const req = new Request("https://freeskiers.se/api/cms/publish", {
        method: "GET",
      });
      const res = await handleCmsPublishRequest(req);
      expect(res.status).toBe(405);
      const data = await res.json();
      expect(data.error).toContain("POST");
    });

    it("rejects invalid JSON body with 400 Bad Request", async () => {
      const req = new Request("https://freeskiers.se/api/cms/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "this is not json { [",
      });
      const res = await handleCmsPublishRequest(req);
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toBeDefined();
    });

    it("rejects missing email or PIN with 401 Unauthorized", async () => {
      const reqWithoutPin = new Request("https://freeskiers.se/api/cms/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "admin@lidingofreeskiers.se" }),
      });
      const res1 = await handleCmsPublishRequest(reqWithoutPin);
      expect(res1.status).toBe(401);

      const reqWithoutEmail = new Request("https://freeskiers.se/api/cms/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: "2026" }),
      });
      const res2 = await handleCmsPublishRequest(reqWithoutEmail);
      expect(res2.status).toBe(401);
    });

    it("rejects incorrect PIN with 401 Unauthorized", async () => {
      const req = new Request("https://freeskiers.se/api/cms/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "admin@lidingofreeskiers.se",
          pin: "9999",
          content: getCmsContent(),
        }),
      });
      const res = await handleCmsPublishRequest(req);
      expect(res.status).toBe(401);
      const data = await res.json();
      expect(data.error).toContain("kanslikod");
    });

    it("rejects unauthorized user email with 403 Forbidden", async () => {
      const req = new Request("https://freeskiers.se/api/cms/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "unauthorized.stranger@example.com",
          pin: "2026",
          content: getCmsContent(),
        }),
      });
      const res = await handleCmsPublishRequest(req);
      expect(res.status).toBe(403);
      const data = await res.json();
      expect(data.error).toBeDefined();
    });

    it("rejects invalid content payload with 400 Bad Request", async () => {
      const req = new Request("https://freeskiers.se/api/cms/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "admin@lidingofreeskiers.se",
          pin: "2026",
          content: { topBanner: "invalid" },
        }),
      });
      const res = await handleCmsPublishRequest(req);
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toContain("innehållsstruktur");
      expect(data.details).toBeDefined();
    });

    it("processes valid payload: writes file to disk and returns success", async () => {
      const baseline = getCmsContent();
      const updatedContent: SiteContent = {
        ...baseline,
        topBanner: {
          enabled: true,
          type: "warning",
          text: "Varning för storm i backen!",
        },
      };

      const req = new Request("https://freeskiers.se/api/cms/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "admin@lidingofreeskiers.se",
          pin: "2026",
          name: "Kansli Freeskiers",
          content: updatedContent,
        }),
      });

      const res = await handleCmsPublishRequest(req, {
        contentFilePath: testContentFile,
        cmsPhotosDir: testPhotosDir,
        skipGit: true,
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.message).toContain("publicerade");

      // Verify file written to disk
      expect(fs.existsSync(testContentFile)).toBe(true);
      const saved = JSON.parse(fs.readFileSync(testContentFile, "utf8"));
      expect(saved.topBanner.text).toBe("Varning för storm i backen!");
      expect(saved.topBanner.enabled).toBe(true);
    });

    it("accepts adminPin alias and headers for auth", async () => {
      const updatedContent = getCmsContent();
      const req = new Request("https://freeskiers.se/api/cms/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-cms-email": "admin@lidingofreeskiers.se",
          "x-cms-pin": "freeskiers",
        },
        body: JSON.stringify({
          content: updatedContent,
        }),
      });

      const res = await handleCmsPublishRequest(req, {
        contentFilePath: testContentFile,
        cmsPhotosDir: testPhotosDir,
        skipGit: true,
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
    });

    it("decodes base64 images into cms photos directory", async () => {
      const updatedContent = getCmsContent();
      // 1x1 transparent PNG in base64
      const samplePng =
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
      const sampleDataUrl = `data:image/png;base64,${samplePng}`;

      const req = new Request("https://freeskiers.se/api/cms/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "admin@lidingofreeskiers.se",
          pin: "2026",
          content: updatedContent,
          images: [
            { filename: "test-event-banner.png", data: sampleDataUrl },
            { filename: "../../traversal-attack.png", data: samplePng },
          ],
        }),
      });

      const res = await handleCmsPublishRequest(req, {
        contentFilePath: testContentFile,
        cmsPhotosDir: testPhotosDir,
        skipGit: true,
      });

      expect(res.status).toBe(200);
      expect(fs.existsSync(path.join(testPhotosDir, "test-event-banner.png"))).toBe(true);
      // Path traversal should have been sanitized to filename only in testPhotosDir
      expect(fs.existsSync(path.join(testPhotosDir, "traversal-attack.png"))).toBe(true);
      expect(fs.existsSync(path.join(tempDir, "traversal-attack.png"))).toBe(false);
    });

    it("supports images provided as an object dictionary", async () => {
      const updatedContent = getCmsContent();
      const samplePng =
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

      const req = new Request("https://freeskiers.se/api/cms/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "admin@lidingofreeskiers.se",
          pin: "2026",
          content: updatedContent,
          images: {
            "coach-avatar.png": samplePng,
          },
        }),
      });

      const res = await handleCmsPublishRequest(req, {
        contentFilePath: testContentFile,
        cmsPhotosDir: testPhotosDir,
        skipGit: true,
      });

      expect(res.status).toBe(200);
      expect(fs.existsSync(path.join(testPhotosDir, "coach-avatar.png"))).toBe(true);
    });
  });

  describe("executeGitPublish", () => {
    it("gracefully handles dry-run / skipPush mode in local repo", async () => {
      const result = await executeGitPublish("Test Author", {
        skipPush: true,
      });
      // In this repo, HEAD is valid git commit
      expect(result.committed !== undefined).toBe(true);
      expect(typeof result.commitHash === "string" || result.commitHash === undefined).toBe(true);
    });
  });
});
