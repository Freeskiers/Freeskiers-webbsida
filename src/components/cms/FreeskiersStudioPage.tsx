import React, { useState, useMemo, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  Eye,
  RotateCcw,
  UploadCloud,
  Megaphone,
  Users,
  FileText,
  Calendar,
  HelpCircle,
  GraduationCap,
  Building2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Key,
  Info,
  Check,
  Layers,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { useCmsPreview } from "@/contexts/CmsPreviewContext";
import { getCmsContent, mergeCmsPreview } from "@/lib/cmsContent";
import { canUserEditCms, isSuperAdmin } from "@/lib/cmsAuth";
import { INITIAL_CMS_EDITORS } from "@/config/cms-editors";
import { useMemberAuth } from "@/components/member/MemberAuthContext";
import type { SiteContent } from "@/types/cms";

// CMS Bruttoplan Form Components
import { TopBannerForm } from "./TopBannerForm";
import { GroupsForm } from "./GroupsForm";
import { CancellationRulesForm } from "./CancellationRulesForm";
import { CalendarEventsForm } from "./CalendarEventsForm";
import { FaqManagerForm } from "./FaqManagerForm";
import { CoachesManagerForm } from "./CoachesManagerForm";
import { PartnersManagerForm } from "./PartnersManagerForm";
import { GeneralHeroForm } from "./GeneralHeroForm";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export type CmsTabKey =
  | "topBanner"
  | "groups"
  | "cancellationRules"
  | "calendarEvents"
  | "faq"
  | "coaches"
  | "partners"
  | "hero"
  | "editors";

export interface FreeskiersStudioPageProps {
  embedded?: boolean;
  initialDraft?: Partial<SiteContent> | null;
  initialTab?: CmsTabKey;
}

export const SECTION_LABELS: Record<keyof SiteContent, string> = {
  topBanner: "Toppbanner",
  hero: "Startsida Hero",
  groups: "Träningsgrupper",
  cancellationRules: "Avbokningsregler",
  calendarEvents: "Kalender & Läger",
  faq: "Vanliga Frågor (FAQ)",
  coaches: "Tränare",
  partners: "Partners & Rabatter",
};

/**
 * Compares current draft against baseline content to identify modified sections.
 */
export function getModifiedSections(draft: Partial<SiteContent> | null): Array<keyof SiteContent> {
  if (!draft) return [];
  const base = getCmsContent();
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
  return keys.filter(
    (key) => draft[key] !== undefined && JSON.stringify(draft[key]) !== JSON.stringify(base[key]),
  );
}

export const FreeskiersStudioPage: React.FC<FreeskiersStudioPageProps> = ({
  embedded = false,
  initialDraft,
  initialTab = "topBanner",
}) => {
  const { currentUser, logout, login } = useMemberAuth();
  const context = useCmsPreview();
  const [localDraft, setLocalDraft] = useState<Partial<SiteContent> | null>(() => {
    return initialDraft !== undefined ? initialDraft : null;
  });

  const draftContent =
    initialDraft !== undefined ? (localDraft ?? initialDraft) : context.draftContent;

  const setDraftContent = useCallback(
    (updated: Partial<SiteContent> | null) => {
      if (initialDraft !== undefined) {
        setLocalDraft(updated);
      }
      context.setDraftContent(updated);
    },
    [initialDraft, context],
  );

  const clearDraft = useCallback(() => {
    if (initialDraft !== undefined) {
      setLocalDraft(null);
    }
    context.clearDraft();
  }, [initialDraft, context]);

  const activatePreview = context.activatePreview;

  // Active Tab
  const [activeTab, setActiveTab] = useState<CmsTabKey>(initialTab);

  // Admin Access Gate
  const [adminPinInput, setAdminPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [sessionUnlocked, setSessionUnlocked] = useState(() => {
    if (typeof sessionStorage === "undefined") return false;
    try {
      return sessionStorage.getItem("freeskiers_admin_unlocked") === "true";
    } catch {
      return false;
    }
  });

  const isAuthorized = useMemo(() => {
    if (sessionUnlocked) return true;
    if (currentUser && (currentUser.role === "admin" || currentUser.role === "styrelse")) {
      return true;
    }
    return false;
  }, [currentUser, sessionUnlocked]);

  // Handle direct PIN unlock on standalone route
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = adminPinInput.trim().toLowerCase();
    if (clean === "2026" || clean === "freeskiers" || clean === "admin") {
      setSessionUnlocked(true);
      setPinError(false);
      try {
        sessionStorage.setItem("freeskiers_admin_unlocked", "true");
        sessionStorage.setItem("freeskiers_admin_pin", adminPinInput.trim());
      } catch {
        // ignore
      }
      if (!currentUser) {
        login("admin@lidingofreeskiers.se");
      }
    } else {
      setPinError(true);
    }
  };

  // Content working copy
  const workingContent = useMemo<SiteContent>(() => {
    return mergeCmsPreview(draftContent);
  }, [draftContent]);

  const handleDraftChange = useCallback(
    (updated: SiteContent) => {
      setDraftContent(updated);
    },
    [setDraftContent],
  );

  // Modified sections computation
  const modifiedSections = useMemo(() => {
    return getModifiedSections(draftContent);
  }, [draftContent]);

  const isDirty = modifiedSections.length > 0;

  // Publish Modal State
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [publishEmail, setPublishEmail] = useState(() => {
    if (currentUser?.email) return currentUser.email;
    return "admin@lidingofreeskiers.se";
  });
  const [publishPin, setPublishPin] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      return sessionStorage.getItem("freeskiers_admin_pin") || "2026";
    } catch {
      return "2026";
    }
  });
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [publishSuccess, setPublishSuccess] = useState<{
    message: string;
    commitHash?: string;
  } | null>(null);

  // Reset Confirmation Dialog State
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  // Preview Action
  const handlePreview = () => {
    activatePreview(workingContent);
    if (typeof window !== "undefined") {
      window.location.href = "/?preview=true";
    }
  };

  // Publish Execution
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publishEmail.trim() || !publishPin.trim()) {
      setPublishError("Ange både e-post och kanslikod för att publicera.");
      return;
    }

    setIsPublishing(true);
    setPublishError(null);
    setPublishSuccess(null);

    try {
      const res = await fetch("/api/cms/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: publishEmail.trim(),
          pin: publishPin.trim(),
          content: workingContent,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setPublishError(
          data.error || data.message || `Publicering misslyckades med status ${res.status}`,
        );
        setIsPublishing(false);
        return;
      }

      // Persist PIN in session for subsequent publishes
      try {
        sessionStorage.setItem("freeskiers_admin_pin", publishPin.trim());
      } catch {
        // ignore
      }

      clearDraft();
      setPublishSuccess({
        message: data.message || "Ändringarna har publicerats och sparats i git!",
        commitHash: data.commitHash,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Ett fel uppstod vid kontakt med servern.";
      setPublishError(msg);
    } finally {
      setIsPublishing(false);
    }
  };

  // User auth info
  const effectiveEmail = currentUser?.email || "admin@lidingofreeskiers.se";
  const userAuth = canUserEditCms(effectiveEmail);
  const isSuper = isSuperAdmin(effectiveEmail);

  // ===========================================================================
  // 1. LOCKED VIEW (ADMIN AUTH GATE)
  // ===========================================================================
  if (!isAuthorized) {
    return (
      <div className="bg-slate-50 min-h-[80vh] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-freeskiers-navy text-freeskiers-cyan flex items-center justify-center mx-auto mb-4 shadow-soft">
              <Lock className="w-8 h-8" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-freeskiers-cyan/15 text-freeskiers-navy text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-freeskiers-cyan" />
              <span>Freeskiers Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-freeskiers-navy tracking-tight">
              Innehållshantering
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Endast för godkända redaktörer och administratörer i IK Lidingö Freeskiers.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Kanslikod / PIN
              </label>
              <input
                type="password"
                required
                value={adminPinInput}
                onChange={(e) => {
                  setAdminPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="Ange kanslikod (test: 2026)..."
                className="w-full px-4 py-3 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-freeskiers-cyan font-medium text-slate-800"
              />
              {pinError && (
                <p className="text-xs text-rose-600 font-semibold mt-1.5 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Felaktig kanslikod. Försök igen.</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-freeskiers-navy hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold text-sm shadow-soft transition-all"
            >
              <span>Lås upp Freeskiers Studio</span>
              <ArrowRight className="w-4 h-4 text-freeskiers-cyan" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <Link
              to="/admin"
              className="text-xs font-medium text-slate-500 hover:text-freeskiers-navy transition-colors inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Tillbaka till Kanslicenter</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ===========================================================================
  // 2. MAIN FREESKIERS STUDIO UI
  // ===========================================================================
  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      {/* Top Header / Breadcrumb (only on standalone route) */}
      {!embedded && (
        <section className="bg-freeskiers-navy text-white border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-freeskiers-lightcyan uppercase tracking-wider mb-2">
                  <Link to="/" className="hover:underline">
                    Hem
                  </Link>
                  <span>/</span>
                  <Link to="/admin" className="hover:underline">
                    Kanslicenter
                  </Link>
                  <span>/</span>
                  <span>Freeskiers Studio</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-freeskiers-cyan/20 border border-freeskiers-cyan/40 text-freeskiers-lightcyan text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-freeskiers-lightcyan" />
                  <span>Bruttoplan CMS v1</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3">
                  <span>Freeskiers Studio</span>
                </h1>
                <p className="text-slate-300 text-sm mt-1 max-w-2xl">
                  Redigera klubbens officiella texter, träningsgrupper, avbokningsregler, tränare,
                  kalender och partners i realtid med versionshanterad git-publicering.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/admin"
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kanslicenter (/admin)</span>
                </Link>
                <button
                  onClick={() => {
                    setSessionUnlocked(false);
                    try {
                      sessionStorage.removeItem("freeskiers_admin_unlocked");
                    } catch {
                      // ignore
                    }
                    logout();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-bold transition-all border border-rose-500/40 flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logga ut</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Studio Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* =================================================================== */}
        {/* ACTION BAR: IDENTITY, STATUS & PUBLISH CONTROLS                     */}
        {/* =================================================================== */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            {/* Left: Branding & User Identity */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2.5 bg-slate-100 border border-slate-200 rounded-2xl px-3.5 py-2">
                <div className="w-8 h-8 rounded-xl bg-freeskiers-navy text-freeskiers-cyan flex items-center justify-center font-bold text-xs shadow-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Inloggad Redaktör
                  </div>
                  <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <span>{effectiveEmail}</span>
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-bold px-1.5 py-0 uppercase ${
                        isSuper
                          ? "bg-purple-50 text-purple-700 border-purple-200"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                      }`}
                    >
                      {isSuper ? "Superadmin" : "Redaktör"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Dirty status badge */}
              <div
                className={`flex items-center gap-2 rounded-2xl px-3.5 py-2 border ${
                  isDirty
                    ? "bg-amber-50 text-amber-900 border-amber-200"
                    : "bg-emerald-50 text-emerald-900 border-emerald-200"
                }`}
              >
                {isDirty ? (
                  <>
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                    </span>
                    <div className="text-xs font-semibold">
                      <span className="font-bold">{modifiedSections.length}</span>{" "}
                      {modifiedSections.length === 1 ? "ändrad sektion" : "ändrade sektioner"}{" "}
                      i utkast
                    </div>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-semibold">I synk med produktion</span>
                  </>
                )}
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* 1. Preview button */}
              <Button
                type="button"
                variant="outline"
                onClick={handlePreview}
                className="gap-2 border-slate-300 hover:bg-slate-100 font-bold text-xs h-10 px-4 rounded-xl shadow-xs"
                title="Förhandsgranska webbplatsen med dina ändringar i utkastet"
              >
                <Eye className="w-4 h-4 text-freeskiers-navy" />
                <span>👁️ Förhandsgranska</span>
              </Button>

              {/* 2. Reset draft button */}
              <Button
                type="button"
                variant="outline"
                disabled={!isDirty}
                onClick={() => setIsResetDialogOpen(true)}
                className="gap-1.5 border-slate-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 font-bold text-xs h-10 px-3.5 rounded-xl disabled:opacity-40"
                title="Återställ alla ändringar i utkastet till aktuell produktionsversion"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>↺ Återställ</span>
              </Button>

              {/* 3. Publish button */}
              <Button
                type="button"
                onClick={() => {
                  setPublishError(null);
                  setPublishSuccess(null);
                  setIsPublishModalOpen(true);
                }}
                className={`gap-2 font-bold text-xs h-10 px-5 rounded-xl shadow-soft transition-all ${
                  isDirty
                    ? "bg-freeskiers-navy hover:bg-slate-800 text-white animate-pulse"
                    : "bg-slate-800 hover:bg-slate-700 text-white"
                }`}
              >
                <UploadCloud className="w-4 h-4 text-freeskiers-cyan" />
                <span>🚀 Publicera ändringar</span>
              </Button>
            </div>
          </div>

          {/* List of modified tags if dirty */}
          {isDirty && (
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Osparade sektioner:
              </span>
              {modifiedSections.map((sec) => (
                <span
                  key={sec}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100/70 border border-amber-200 text-amber-900 text-xs font-semibold"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                  <span>{SECTION_LABELS[sec]}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* =================================================================== */}
        {/* TABS NAVIGATION                                                     */}
        {/* =================================================================== */}
        <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-xs mb-6 overflow-x-auto">
          <div className="flex items-center gap-1 min-w-max">
            {/* Tab 1: TopBanner */}
            <button
              type="button"
              onClick={() => setActiveTab("topBanner")}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "topBanner"
                  ? "bg-freeskiers-navy text-white shadow-soft"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Megaphone className="w-3.5 h-3.5" />
              <span>Toppbanner</span>
              {modifiedSections.includes("topBanner") && (
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              )}
            </button>

            {/* Tab 2: Groups */}
            <button
              type="button"
              onClick={() => setActiveTab("groups")}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "groups"
                  ? "bg-freeskiers-navy text-white shadow-soft"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Träningsgrupper</span>
              {modifiedSections.includes("groups") && (
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              )}
            </button>

            {/* Tab 3: Cancellation Rules */}
            <button
              type="button"
              onClick={() => setActiveTab("cancellationRules")}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "cancellationRules"
                  ? "bg-freeskiers-navy text-white shadow-soft"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Avbokningsregler</span>
              {modifiedSections.includes("cancellationRules") && (
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              )}
            </button>

            {/* Tab 4: Calendar */}
            <button
              type="button"
              onClick={() => setActiveTab("calendarEvents")}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "calendarEvents"
                  ? "bg-freeskiers-navy text-white shadow-soft"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Kalender & Läger</span>
              {modifiedSections.includes("calendarEvents") && (
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              )}
            </button>

            {/* Tab 5: FAQ */}
            <button
              type="button"
              onClick={() => setActiveTab("faq")}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "faq"
                  ? "bg-freeskiers-navy text-white shadow-soft"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FAQ</span>
              {modifiedSections.includes("faq") && (
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              )}
            </button>

            {/* Tab 6: Coaches */}
            <button
              type="button"
              onClick={() => setActiveTab("coaches")}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "coaches"
                  ? "bg-freeskiers-navy text-white shadow-soft"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Tränare</span>
              {modifiedSections.includes("coaches") && (
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              )}
            </button>

            {/* Tab 7: Partners */}
            <button
              type="button"
              onClick={() => setActiveTab("partners")}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "partners"
                  ? "bg-freeskiers-navy text-white shadow-soft"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Partners</span>
              {modifiedSections.includes("partners") && (
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              )}
            </button>

            {/* Tab 8: General Hero */}
            <button
              type="button"
              onClick={() => setActiveTab("hero")}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "hero"
                  ? "bg-freeskiers-navy text-white shadow-soft"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Startsida Hero</span>
              {modifiedSections.includes("hero") && (
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              )}
            </button>

            {/* Tab 9: Editors & Permissions (Superadmin) */}
            <button
              type="button"
              onClick={() => setActiveTab("editors")}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "editors"
                  ? "bg-freeskiers-navy text-white shadow-soft"
                  : "text-purple-700 hover:bg-purple-50"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Redaktörer & Behörigheter</span>
            </button>
          </div>
        </div>

        {/* =================================================================== */}
        {/* TAB CONTENT PANELS                                                  */}
        {/* =================================================================== */}
        <div className="space-y-6">
          {activeTab === "topBanner" && (
            <TopBannerForm draft={workingContent} onChange={handleDraftChange} />
          )}

          {activeTab === "groups" && (
            <GroupsForm draft={workingContent} onChange={handleDraftChange} />
          )}

          {activeTab === "cancellationRules" && (
            <CancellationRulesForm draft={workingContent} onChange={handleDraftChange} />
          )}

          {activeTab === "calendarEvents" && (
            <CalendarEventsForm draft={workingContent} onChange={handleDraftChange} />
          )}

          {activeTab === "faq" && (
            <FaqManagerForm draft={workingContent} onChange={handleDraftChange} />
          )}

          {activeTab === "coaches" && (
            <CoachesManagerForm draft={workingContent} onChange={handleDraftChange} />
          )}

          {activeTab === "partners" && (
            <PartnersManagerForm draft={workingContent} onChange={handleDraftChange} />
          )}

          {activeTab === "hero" && (
            <GeneralHeroForm draft={workingContent} onChange={handleDraftChange} />
          )}

          {activeTab === "editors" && (
            <div className="space-y-6">
              <Card className="border-slate-200 shadow-sm rounded-3xl">
                <CardHeader>
                  <div className="flex items-center gap-2 text-purple-700 text-xs font-bold uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Behörighet & Roller</span>
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-black text-slate-900">
                    Redaktörer och Kansliåtkomst
                  </CardTitle>
                  <CardDescription>
                    Hantera vem som har rätt att redigera webbplatsens innehåll och publicera till
                    produktionsmiljön.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Current user role card */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase">Din status</div>
                      <div className="text-sm font-bold text-slate-800 mt-0.5">
                        {effectiveEmail}
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">{userAuth.reason}</div>
                    </div>
                    <Badge
                      className={`text-xs px-3 py-1 font-bold ${
                        isSuper ? "bg-purple-600 text-white" : "bg-blue-600 text-white"
                      }`}
                    >
                      {isSuper ? "Superadmin" : "Redaktör"}
                    </Badge>
                  </div>

                  {/* Explicit editors table */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">
                      Explicita redaktörer (Konfiguration)
                    </h3>
                    <div className="border border-slate-200 rounded-2xl overflow-hidden">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 text-slate-700 font-bold uppercase border-b border-slate-200">
                          <tr>
                            <th className="py-3 px-4">E-post</th>
                            <th className="py-3 px-4">Namn</th>
                            <th className="py-3 px-4">Roll</th>
                            <th className="py-3 px-4">Behörigheter</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-800">
                          {INITIAL_CMS_EDITORS.map((ed) => (
                            <tr key={ed.email} className="hover:bg-slate-50">
                              <td className="py-3 px-4 font-mono font-medium">{ed.email}</td>
                              <td className="py-3 px-4 font-bold">{ed.name}</td>
                              <td className="py-3 px-4">
                                <span
                                  className={`inline-block px-2 py-0.5 rounded-md font-bold uppercase text-[10px] ${
                                    ed.role === "superadmin"
                                      ? "bg-purple-100 text-purple-800"
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                                >
                                  {ed.role}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-slate-500">
                                {ed.role === "superadmin"
                                  ? "Fullständiga publicerings- och behörighetsrättigheter"
                                  : "Innehållsredigering och utkast"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Automatic SportAdmin sync explanation */}
                  <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 text-xs text-blue-950 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-blue-900">
                      <Info className="w-4 h-4 text-blue-700" />
                      <span>Automatisk behörighet via SportAdmin</span>
                    </div>
                    <p className="leading-relaxed">
                      Utöver explicita redaktörer får konton och målsmän med ledarroller i
                      SportAdmin automatiskt redaktörsåtkomst:
                    </p>
                    <ul className="list-disc list-inside space-y-1 pl-1 text-blue-900 font-medium">
                      <li>Konton eller åkare med roll <strong>Styrelse</strong> eller <strong>Admin</strong></li>
                      <li>Tränare med roll <strong>Huvudtränare</strong> eller <strong>Tränaransvarig</strong></li>
                    </ul>
                  </div>

                  {/* PIN & Git security */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <Key className="w-4 h-4 text-freeskiers-navy" />
                      <span>Säkerhet vid publicering (Git Commit)</span>
                    </div>
                    <p className="leading-relaxed">
                      Varje publicering validerar giltig kanslikod (PIN) och e-postadress. Servern
                      skapar en automatisk git-commit i repot med redaktörens namn och e-post,
                      vilket säkerställer full spårbarhet och möjlighet att rulla tillbaka vid behov.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* RESET CONFIRMATION ALERT DIALOG                                      */}
      {/* ===================================================================== */}
      <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <AlertDialogContent className="rounded-3xl max-w-md">
          <AlertDialogHeader>
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-2">
              <RotateCcw className="w-6 h-6" />
            </div>
            <AlertDialogTitle className="text-xl font-black text-slate-900">
              Återställ utkast?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600 text-xs sm:text-sm">
              Alla osparade ändringar i ditt lokala utkast kommer att raderas och ersättas med
              webbplatsens nuvarande produktionsinnehåll. Denna åtgärd kan inte ångras.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="rounded-xl font-bold text-xs">Avbryt</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                clearDraft();
                setIsResetDialogOpen(false);
              }}
              className="rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-700 text-white"
            >
              Ja, återställ utkast
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ===================================================================== */}
      {/* PUBLISH CONFIRMATION MODAL                                            */}
      {/* ===================================================================== */}
      <Dialog open={isPublishModalOpen} onOpenChange={setIsPublishModalOpen}>
        <DialogContent className="rounded-3xl max-w-lg p-6 sm:p-8">
          <DialogHeader>
            <div className="w-12 h-12 rounded-2xl bg-freeskiers-navy text-freeskiers-cyan flex items-center justify-center mb-2 shadow-soft">
              <UploadCloud className="w-6 h-6" />
            </div>
            <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight">
              Publicera ändringar
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-slate-500">
              Bekräfta dina ändringar för att skriva till webbplatsens innehåll och skapa en
              versionshanterad git-commit.
            </DialogDescription>
          </DialogHeader>

          {/* Success state */}
          {publishSuccess ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {publishSuccess.message || "Publicering genomförd!"}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Innehållet har sparats till produktion och utkastet är nu i full synk.
                </p>
                {publishSuccess.commitHash && (
                  <div className="mt-3 inline-block px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-slate-700 text-xs font-mono font-bold">
                    Commit: {publishSuccess.commitHash.slice(0, 7)}
                  </div>
                )}
              </div>
              <Button
                type="button"
                onClick={() => {
                  setIsPublishModalOpen(false);
                  setPublishSuccess(null);
                }}
                className="w-full bg-freeskiers-navy hover:bg-slate-800 text-white font-bold text-xs h-11 rounded-xl shadow-soft mt-2"
              >
                Klart & Stäng
              </Button>
            </div>
          ) : (
            <form onSubmit={handlePublish} className="space-y-5 py-2">
              {/* Summary of modified sections */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Ändrade sektioner att publicera:
                </div>
                {modifiedSections.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {modifiedSections.map((sec) => (
                      <span
                        key={sec}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-bold"
                      >
                        <span>✓</span>
                        <span>{SECTION_LABELS[sec]}</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">
                    Inga modifierade sektioner detekterades i utkastet jämfört med produktion.
                  </p>
                )}
              </div>

              {/* Editor email */}
              <div>
                <Label
                  htmlFor="publish-email"
                  className="text-xs font-bold uppercase text-slate-700"
                >
                  Redaktörens e-post
                </Label>
                <Input
                  id="publish-email"
                  type="email"
                  required
                  value={publishEmail}
                  onChange={(e) => setPublishEmail(e.target.value)}
                  placeholder="redaktor@lidingofreeskiers.se"
                  className="mt-1.5 rounded-xl text-sm"
                  disabled={isPublishing}
                />
              </div>

              {/* Kanslikod / PIN */}
              <div>
                <Label htmlFor="publish-pin" className="text-xs font-bold uppercase text-slate-700">
                  Kanslikod / PIN
                </Label>
                <Input
                  id="publish-pin"
                  type="password"
                  required
                  value={publishPin}
                  onChange={(e) => setPublishPin(e.target.value)}
                  placeholder="Ange kanslikod (t.ex. 2026)"
                  className="mt-1.5 rounded-xl text-sm"
                  disabled={isPublishing}
                />
              </div>

              {/* Error banner */}
              {publishError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                  <div className="leading-snug font-medium">{publishError}</div>
                </div>
              )}

              {/* Progress message */}
              {isPublishing && (
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-center gap-2.5 animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span className="font-semibold">
                    Publicerar ändringar till git och sparar innehållsfil...
                  </span>
                </div>
              )}

              <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsPublishModalOpen(false)}
                  disabled={isPublishing}
                  className="rounded-xl font-bold text-xs h-11"
                >
                  Avbryt
                </Button>
                <Button
                  type="submit"
                  disabled={isPublishing || !publishEmail.trim() || !publishPin.trim()}
                  className="rounded-xl font-bold text-xs h-11 bg-freeskiers-navy hover:bg-slate-800 text-white gap-2 shadow-soft"
                >
                  {isPublishing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Publicerar...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4 text-freeskiers-cyan" />
                      <span>Bekräfta & Publicera</span>
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
