import React from "react";
import { Sparkles, Link as LinkIcon, Eye, ArrowRight, ExternalLink } from "lucide-react";
import type { SiteContent, CmsHeroSection } from "@/types/cms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { resolvePhotoUrl } from "@/lib/club-data";
import { ImageUploadField } from "./ImageUploadField";

export interface GeneralHeroFormProps {
  draft: SiteContent;
  onChange: (updated: SiteContent) => void;
  className?: string;
}

export const GeneralHeroForm: React.FC<GeneralHeroFormProps> = ({
  draft,
  onChange,
  className = "",
}) => {
  const hero: CmsHeroSection = draft.hero || {
    title: "",
    subtitle: "",
    primaryCtaText: "",
    primaryCtaUrl: "",
    secondaryCtaText: "",
    secondaryCtaUrl: "",
    heroPhotoUrl: "",
  };

  const updateHero = (partial: Partial<CmsHeroSection>) => {
    onChange({
      ...draft,
      hero: {
        ...hero,
        ...partial,
      },
    });
  };

  return (
    <Card className={`border-border bg-card shadow-sm ${className}`}>
      <CardHeader className="space-y-1 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Sparkles className="size-5" />
          </span>
          <div>
            <CardTitle className="text-lg font-bold text-foreground">
              Startsida Hero (Huvudsektion)
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Rubriker, ingresser, call-to-action-knappar och bakgrundsbild för startsidans överdel.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Title */}
        <div className="space-y-1.5">
          <Label htmlFor="hero-title" className="text-xs font-semibold text-foreground">
            Huvudrubrik
          </Label>
          <Input
            id="hero-title"
            type="text"
            value={hero.title}
            onChange={(e) => updateHero({ title: e.target.value })}
            placeholder="T.ex. 100% skidglädje & gemenskap för barn och unga"
            className="h-9 text-xs font-bold"
          />
        </div>

        {/* Subtitle */}
        <div className="space-y-1.5">
          <Label htmlFor="hero-subtitle" className="text-xs font-semibold text-foreground">
            Underrubrik / Ingress
          </Label>
          <Textarea
            id="hero-subtitle"
            rows={3}
            value={hero.subtitle}
            onChange={(e) => updateHero({ subtitle: e.target.value })}
            placeholder="Kort beskrivning som väcker intresse för föreningen..."
            className="text-xs leading-relaxed"
          />
        </div>

        {/* Buttons grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-border bg-muted/20 p-3.5">
          {/* Primary CTA */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <span className="flex size-2 rounded-full bg-primary" />
              Primär knapp (Huvudval)
            </h4>

            <div className="space-y-1.5">
              <Label htmlFor="hero-primaryText" className="text-xs text-muted-foreground">
                Knapptext
              </Label>
              <Input
                id="hero-primaryText"
                type="text"
                value={hero.primaryCtaText}
                onChange={(e) => updateHero({ primaryCtaText: e.target.value })}
                placeholder="T.ex. Freeskiers Skidklubb"
                className="h-8 text-xs font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="hero-primaryUrl"
                className="text-xs text-muted-foreground flex items-center gap-1"
              >
                <LinkIcon className="size-3" /> Länk / URL
              </Label>
              <Input
                id="hero-primaryUrl"
                type="text"
                value={hero.primaryCtaUrl}
                onChange={(e) => updateHero({ primaryCtaUrl: e.target.value })}
                placeholder="/skidklubb"
                className="h-8 text-xs font-mono"
              />
            </div>
          </div>

          {/* Secondary CTA */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <span className="flex size-2 rounded-full bg-accent" />
              Sekundär knapp
            </h4>

            <div className="space-y-1.5">
              <Label htmlFor="hero-secondaryText" className="text-xs text-muted-foreground">
                Knapptext
              </Label>
              <Input
                id="hero-secondaryText"
                type="text"
                value={hero.secondaryCtaText}
                onChange={(e) => updateHero({ secondaryCtaText: e.target.value })}
                placeholder="T.ex. Anmäl till Helgskidskolan"
                className="h-8 text-xs font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="hero-secondaryUrl"
                className="text-xs text-muted-foreground flex items-center gap-1"
              >
                <LinkIcon className="size-3" /> Länk / URL
              </Label>
              <Input
                id="hero-secondaryUrl"
                type="text"
                value={hero.secondaryCtaUrl}
                onChange={(e) => updateHero({ secondaryCtaUrl: e.target.value })}
                placeholder="/helgskidskola"
                className="h-8 text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Hero Photo */}
        <div className="pt-2">
          <ImageUploadField
            label="Bakgrundsbild för Hero"
            description="Visas i full bredd på startsidan. Optimeras till max 1600px bredd."
            preset="hero"
            value={hero.heroPhotoUrl || ""}
            onChange={(url) => updateHero({ heroPhotoUrl: url })}
          />
        </div>

        {/* Live Preview */}
        <div className="space-y-2 rounded-xl border border-border bg-muted/20 p-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Eye className="size-3.5" />
            <span>Förhandsgranskning av Hero</span>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-border/80 bg-heading p-6 text-snow shadow-inner">
            {hero.heroPhotoUrl && (
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
                style={{ backgroundImage: `url(${resolvePhotoUrl(hero.heroPhotoUrl)})` }}
              />
            )}
            <div className="relative z-10 space-y-3 max-w-xl">
              <h2 className="text-lg sm:text-xl font-extrabold leading-tight text-white">
                {hero.title || "(Ingen rubrik angiven)"}
              </h2>
              <p className="text-xs sm:text-sm text-snow/85 line-clamp-3">
                {hero.subtitle || "(Ingen underrubrik angiven)"}
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {hero.primaryCtaText && (
                  <div className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-sm">
                    {hero.primaryCtaText}
                    <ArrowRight className="size-3" />
                  </div>
                )}
                {hero.secondaryCtaText && (
                  <div className="inline-flex items-center gap-1.5 rounded-lg border border-snow/30 bg-snow/10 px-3 py-1.5 text-xs font-bold text-white">
                    {hero.secondaryCtaText}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
