import React from "react";
import { Megaphone, Info, AlertTriangle, CheckCircle2, ExternalLink, Eye } from "lucide-react";
import type { SiteContent, CmsTopBanner } from "@/types/cms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export interface TopBannerFormProps {
  draft: SiteContent;
  onChange: (updated: SiteContent) => void;
  className?: string;
}

export const TopBannerForm: React.FC<TopBannerFormProps> = ({
  draft,
  onChange,
  className = "",
}) => {
  const topBanner: CmsTopBanner = draft.topBanner || {
    enabled: false,
    type: "info",
    text: "",
    linkText: "",
    linkUrl: "",
  };

  const updateBanner = (partial: Partial<CmsTopBanner>) => {
    onChange({
      ...draft,
      topBanner: {
        ...topBanner,
        ...partial,
      },
    });
  };

  const bannerTypeStyles = {
    info: {
      border: "border-blue-500/30",
      bg: "bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100",
      badge: "bg-blue-500 text-white",
      icon: Info,
      label: "Information",
    },
    warning: {
      border: "border-amber-500/40",
      bg: "bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-100",
      badge: "bg-amber-500 text-white",
      icon: AlertTriangle,
      label: "Varning / Viktigt",
    },
    success: {
      border: "border-emerald-500/40",
      bg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100",
      badge: "bg-emerald-600 text-white",
      icon: CheckCircle2,
      label: "Framgång / Nyhet",
    },
  };

  const currentTypeConfig = bannerTypeStyles[topBanner.type] || bannerTypeStyles.info;
  const TypeIcon = currentTypeConfig.icon;

  return (
    <Card className={`border-border bg-card shadow-sm ${className}`}>
      <CardHeader className="space-y-1 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Megaphone className="size-5" />
            </span>
            <div>
              <CardTitle className="text-lg font-bold text-foreground">
                Toppbanner (Notislist)
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Visas överst på hela webbplatsen för viktiga meddelanden och anmälningsinformation.
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Label
              htmlFor="topbanner-toggle"
              className="text-xs font-semibold cursor-pointer text-muted-foreground"
            >
              {topBanner.enabled ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Aktiv
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                  Dold
                </span>
              )}
            </Label>
            <Switch
              id="topbanner-toggle"
              checked={Boolean(topBanner.enabled)}
              onCheckedChange={(checked) => updateBanner({ enabled: checked })}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Type Selector */}
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-foreground">Typ av meddelande</Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {(["info", "warning", "success"] as const).map((typeKey) => {
              const cfg = bannerTypeStyles[typeKey];
              const Icon = cfg.icon;
              const isSelected = topBanner.type === typeKey;
              return (
                <button
                  key={typeKey}
                  type="button"
                  onClick={() => updateBanner({ type: typeKey })}
                  className={`flex items-center gap-2 rounded-xl border p-2.5 text-left text-xs font-medium transition-all ${
                    isSelected
                      ? "border-primary bg-primary/10 text-primary font-semibold shadow-xs"
                      : "border-border bg-card hover:bg-muted/40 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon
                    className={`size-4 ${isSelected ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <span>{cfg.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Message Text */}
        <div className="space-y-1.5">
          <Label htmlFor="topbanner-text" className="text-xs font-semibold text-foreground">
            Meddelandetext
          </Label>
          <Textarea
            id="topbanner-text"
            rows={2}
            value={topBanner.text || ""}
            onChange={(e) => updateBanner({ text: e.target.value })}
            placeholder="T.ex. Anmälan till vintersäsongens Helgskidskola öppnar 1 november kl. 09.00!"
            className="text-sm resize-none"
          />
        </div>

        {/* Link config */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="topbanner-linkText" className="text-xs font-semibold text-foreground">
              Länktext (valfritt)
            </Label>
            <Input
              id="topbanner-linkText"
              type="text"
              value={topBanner.linkText || ""}
              onChange={(e) => updateBanner({ linkText: e.target.value })}
              placeholder="T.ex. Läs mer i kalendern"
              className="h-9 text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="topbanner-linkUrl" className="text-xs font-semibold text-foreground">
              Länk-URL (valfritt)
            </Label>
            <Input
              id="topbanner-linkUrl"
              type="text"
              value={topBanner.linkUrl || ""}
              onChange={(e) => updateBanner({ linkUrl: e.target.value })}
              placeholder="/kalender eller https://..."
              className="h-9 text-xs font-mono"
            />
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="rounded-xl border border-border/80 bg-muted/20 p-3 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Eye className="size-3.5" />
            <span>Förhandsvisning av bannern</span>
            {!topBanner.enabled && (
              <span className="text-[11px] font-normal text-amber-600 dark:text-amber-400">
                (Dold för besökare just nu)
              </span>
            )}
          </div>

          <div
            className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 rounded-lg border p-2.5 text-xs transition-all ${
              currentTypeConfig.bg
            } ${currentTypeConfig.border}`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <TypeIcon className="size-4 shrink-0" />
              <span className="font-medium leading-relaxed">
                {topBanner.text || "(Ingen text angiven ännu)"}
              </span>
            </div>

            {topBanner.linkText && (
              <div className="shrink-0 flex items-center gap-1 font-bold underline underline-offset-2">
                <span>{topBanner.linkText}</span>
                <ExternalLink className="size-3" />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
