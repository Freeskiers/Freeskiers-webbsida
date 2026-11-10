import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { SiteContent } from "../types/cms";
import { getCmsContent, mergeCmsPreview } from "../lib/cmsContent";

export const CMS_DRAFT_KEY = "freeskiers_cms_draft";
export const CMS_PREVIEW_ACTIVE_KEY = "freeskiers_cms_preview_active";

export interface CmsPreviewContextValue {
  /**
   * Merged content (local draft merged with baseline if preview is active,
   * otherwise baseline production content).
   */
  content: SiteContent;
  /**
   * Whether in-browser preview mode is currently active.
   */
  isPreviewActive: boolean;
  /**
   * The current draft object stored in state/sessionStorage, or null if no draft.
   */
  draftContent: Partial<SiteContent> | null;
  /**
   * Updates a single field or nested path in the draft (e.g. "topBanner.text").
   */
  updateDraftField: (path: string, value: unknown) => void;
  /**
   * Replaces the draft content with the provided object, or clears it if null.
   */
  setDraftContent: (draft: Partial<SiteContent> | null) => void;
  /**
   * Activates preview mode, optionally setting an initial draft.
   */
  activatePreview: (initialDraft?: Partial<SiteContent>) => void;
  /**
   * Exits preview mode without deleting the draft in sessionStorage.
   */
  exitPreview: () => void;
  /**
   * Clears the draft in state and sessionStorage, and exits preview mode.
   */
  clearDraft: () => void;
  /**
   * Attempts to publish the current draft to the server publishing endpoint.
   */
  publishDraft: (credentials?: {
    email?: string;
    pin?: string;
  }) => Promise<{ success: boolean; message?: string; commitHash?: string }>;
}

const CmsPreviewContext = createContext<CmsPreviewContextValue | undefined>(undefined);

function getSessionStorageItem(key: string): string | null {
  if (typeof sessionStorage === "undefined") return null;
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function setSessionStorageItem(key: string, value: string): void {
  if (typeof sessionStorage === "undefined") return;
  try {
    sessionStorage.setItem(key, value);
  } catch (err) {
    console.error("Failed to write to sessionStorage", err);
  }
}

function removeSessionStorageItem(key: string): void {
  if (typeof sessionStorage === "undefined") return;
  try {
    sessionStorage.removeItem(key);
  } catch (err) {
    console.error("Failed to remove from sessionStorage", err);
  }
}

/**
 * Sets a value at a dot-notated path on an object immutably.
 */
export function setNestedPathValue(base: any, path: string, val: unknown): any {
  if (!path) return val;
  const parts = path.split(".");
  const root = { ...(base || {}) };
  let current: any = root;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    current[part] =
      current[part] && typeof current[part] === "object"
        ? Array.isArray(current[part])
          ? [...current[part]]
          : { ...current[part] }
        : {};
    current = current[part];
  }
  current[parts[parts.length - 1]] = val;
  return root;
}

export const CmsPreviewProvider: React.FC<{
  children: React.ReactNode;
  initialDraft?: Partial<SiteContent> | null;
}> = ({ children, initialDraft }) => {
  const [isPreviewActive, setIsPreviewActive] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("preview") === "true") {
        return true;
      }
      return getSessionStorageItem(CMS_PREVIEW_ACTIVE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const [draftContent, setDraftContentState] = useState<Partial<SiteContent> | null>(() => {
    if (initialDraft !== undefined) return initialDraft;
    const saved = getSessionStorageItem(CMS_DRAFT_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("preview") === "true") {
        setIsPreviewActive(true);
        setSessionStorageItem(CMS_PREVIEW_ACTIVE_KEY, "true");
      }
    } catch {
      // ignore
    }

    const handleCustomUpdate = () => {
      try {
        const saved = window.sessionStorage.getItem(CMS_DRAFT_KEY);
        setDraftContentState(saved ? JSON.parse(saved) : null);
        setIsPreviewActive(window.sessionStorage.getItem(CMS_PREVIEW_ACTIVE_KEY) === "true");
      } catch {
        // ignore
      }
    };

    window.addEventListener("cms-draft-update", handleCustomUpdate);
    return () => {
      window.removeEventListener("cms-draft-update", handleCustomUpdate);
    };
  }, []);

  const setDraftContent = useCallback((draft: Partial<SiteContent> | null) => {
    setDraftContentState(draft);
    if (draft) {
      setSessionStorageItem(CMS_DRAFT_KEY, JSON.stringify(draft));
    } else {
      removeSessionStorageItem(CMS_DRAFT_KEY);
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cms-draft-update"));
    }
  }, []);

  const updateDraftField = useCallback((path: string, value: unknown) => {
    setDraftContentState((prevDraft) => {
      const updated = setNestedPathValue(prevDraft ?? {}, path, value);
      setSessionStorageItem(CMS_DRAFT_KEY, JSON.stringify(updated));
      return updated;
    });
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cms-draft-update"));
    }
  }, []);

  const activatePreview = useCallback(
    (initialDraft?: Partial<SiteContent>) => {
      if (initialDraft !== undefined) {
        setDraftContent(initialDraft);
      }
      setIsPreviewActive(true);
      setSessionStorageItem(CMS_PREVIEW_ACTIVE_KEY, "true");
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("cms-draft-update"));
      }
    },
    [setDraftContent],
  );

  const exitPreview = useCallback(() => {
    setIsPreviewActive(false);
    setSessionStorageItem(CMS_PREVIEW_ACTIVE_KEY, "false");
    if (typeof window !== "undefined") {
      try {
        const url = new URL(window.location.href);
        if (url.searchParams.has("preview")) {
          url.searchParams.delete("preview");
          window.history.replaceState(
            {},
            "",
            url.pathname + (url.search ? url.search : "") + url.hash,
          );
        }
      } catch {
        // ignore
      }
      window.dispatchEvent(new Event("cms-draft-update"));
    }
  }, []);

  const clearDraft = useCallback(() => {
    setDraftContentState(null);
    setIsPreviewActive(false);
    removeSessionStorageItem(CMS_DRAFT_KEY);
    setSessionStorageItem(CMS_PREVIEW_ACTIVE_KEY, "false");
    if (typeof window !== "undefined") {
      try {
        const url = new URL(window.location.href);
        if (url.searchParams.has("preview")) {
          url.searchParams.delete("preview");
          window.history.replaceState(
            {},
            "",
            url.pathname + (url.search ? url.search : "") + url.hash,
          );
        }
      } catch {
        // ignore
      }
      window.dispatchEvent(new Event("cms-draft-update"));
    }
  }, []);

  const publishDraft = useCallback(
    async (credentials?: {
      email?: string;
      pin?: string;
    }): Promise<{ success: boolean; message?: string; commitHash?: string }> => {
      if (!draftContent) {
        return { success: false, message: "Inget utkast att publicera." };
      }
      try {
        const payload = mergeCmsPreview(draftContent);
        const res = await fetch("/api/cms/publish", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: payload,
            email: credentials?.email,
            pin: credentials?.pin,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          return {
            success: false,
            message: data.error || data.message || `Publicering misslyckades (${res.status})`,
          };
        }
        clearDraft();
        return {
          success: true,
          message: data.message || "Ändringarna har publicerats!",
          commitHash: data.commitHash,
        };
      } catch (err: any) {
        return {
          success: false,
          message: err?.message || "Ett fel uppstod vid kontakt med servern.",
        };
      }
    },
    [draftContent, clearDraft],
  );

  const content = useMemo<SiteContent>(() => {
    if (!isPreviewActive) {
      return getCmsContent();
    }
    return mergeCmsPreview(draftContent);
  }, [isPreviewActive, draftContent]);

  const value = useMemo<CmsPreviewContextValue>(
    () => ({
      content,
      isPreviewActive,
      draftContent,
      updateDraftField,
      setDraftContent,
      activatePreview,
      exitPreview,
      clearDraft,
      publishDraft,
    }),
    [
      content,
      isPreviewActive,
      draftContent,
      updateDraftField,
      setDraftContent,
      activatePreview,
      exitPreview,
      clearDraft,
      publishDraft,
    ],
  );

  return <CmsPreviewContext.Provider value={value}>{children}</CmsPreviewContext.Provider>;
};

export function useCmsPreview(): CmsPreviewContextValue {
  const ctx = useContext(CmsPreviewContext);
  if (!ctx) {
    throw new Error("useCmsPreview must be used within a CmsPreviewProvider");
  }
  return ctx;
}

export function useCmsContent(): SiteContent & { content: SiteContent } {
  const ctx = useContext(CmsPreviewContext);
  const data = ctx ? ctx.content : getCmsContent();
  if (data && typeof data === "object" && !("content" in data)) {
    Object.defineProperty(data, "content", {
      get() {
        return this;
      },
      enumerable: false,
      configurable: true,
    });
  }
  return data as SiteContent & { content: SiteContent };
}
