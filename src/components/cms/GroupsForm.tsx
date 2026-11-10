import React, { useState } from "react";
import {
  Users,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Calendar,
  DollarSign,
  Link as LinkIcon,
  CheckCircle2,
  ListPlus,
  Shield,
} from "lucide-react";
import type { SiteContent, CmsGroupInfo } from "@/types/cms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { isCoreGroup, deleteGroupFromGroups } from "@/lib/cmsGroups";
import { ImageUploadField } from "./ImageUploadField";

export interface GroupsFormProps {
  draft: SiteContent;
  onChange: (updated: SiteContent) => void;
  className?: string;
}

export const GroupsForm: React.FC<GroupsFormProps> = ({ draft, onChange, className = "" }) => {
  const groups = draft.groups || {};
  const groupKeys = Object.keys(groups);

  const [activeGroupKey, setActiveGroupKey] = useState<string>(() => {
    return groupKeys[0] || "helgskidskola";
  });

  const activeGroup: CmsGroupInfo | undefined = groups[activeGroupKey] || groups[groupKeys[0]];
  const effectiveKey = activeGroup ? (groups[activeGroupKey] ? activeGroupKey : groupKeys[0]) : "";
  const isCurrentCore = isCoreGroup(effectiveKey);

  const updateCurrentGroup = (partial: Partial<CmsGroupInfo>) => {
    if (!effectiveKey) return;
    const updated = {
      ...groups,
      [effectiveKey]: {
        ...groups[effectiveKey],
        ...partial,
      },
    };
    onChange({
      ...draft,
      groups: updated,
    });
  };

  const handleAddGroup = () => {
    const rawKey = `ny-grupp-${Date.now().toString(36)}`;
    const newGroup: CmsGroupInfo = {
      slug: rawKey,
      name: "Ny Träningsgrupp",
      price: "1 500 kr",
      priceNote: "Inkluderar medlemskap",
      registrationOpens: "Löpande",
      schedule: "Lördagar kl. 10.00–12.00",
      requirements: ["Hjälm är obligatoriskt", "Passar alla nivåer"],
      bookingUrl: "https://sportadmin.se/book/?F=7631cd86-189b-4c49-bfc0-3ba70fe1f127",
      photoUrl: "",
    };

    onChange({
      ...draft,
      groups: {
        ...groups,
        [rawKey]: newGroup,
      },
    });
    setActiveGroupKey(rawKey);
  };

  const handleDeleteGroup = (keyToDelete: string) => {
    const res = deleteGroupFromGroups(groups, keyToDelete);
    if (!res.success) {
      alert(res.error);
      return;
    }

    if (
      !confirm(
        `Är du säker på att du vill ta bort gruppen "${groups[keyToDelete]?.name || keyToDelete}"?`,
      )
    ) {
      return;
    }

    const remainingKeys = Object.keys(res.groups);
    onChange({
      ...draft,
      groups: res.groups,
    });

    if (activeGroupKey === keyToDelete) {
      setActiveGroupKey(remainingKeys[0] || "");
    }
  };

  // Requirements handlers
  const handleAddRequirement = () => {
    if (!activeGroup) return;
    const currentReqs = activeGroup.requirements || [];
    updateCurrentGroup({
      requirements: [...currentReqs, ""],
    });
  };

  const handleUpdateRequirement = (index: number, value: string) => {
    if (!activeGroup) return;
    const currentReqs = [...(activeGroup.requirements || [])];
    currentReqs[index] = value;
    updateCurrentGroup({ requirements: currentReqs });
  };

  const handleRemoveRequirement = (index: number) => {
    if (!activeGroup) return;
    const currentReqs = [...(activeGroup.requirements || [])];
    currentReqs.splice(index, 1);
    updateCurrentGroup({ requirements: currentReqs });
  };

  const handleMoveRequirement = (index: number, direction: "up" | "down") => {
    if (!activeGroup) return;
    const currentReqs = [...(activeGroup.requirements || [])];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= currentReqs.length) return;

    const temp = currentReqs[index];
    currentReqs[index] = currentReqs[targetIdx];
    currentReqs[targetIdx] = temp;
    updateCurrentGroup({ requirements: currentReqs });
  };

  return (
    <Card className={`border-border bg-card shadow-sm ${className}`}>
      <CardHeader className="space-y-1 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Users className="size-5" />
            </span>
            <div>
              <CardTitle className="text-lg font-bold text-foreground">
                Träningsgrupper & Verksamhet
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Priser, scheman, förkunskapskrav och bokningslänkar för varje grupp.
              </CardDescription>
            </div>
          </div>

          <Button
            type="button"
            size="sm"
            onClick={handleAddGroup}
            className="h-8 gap-1.5 text-xs font-semibold"
          >
            <Plus className="size-3.5" />
            Lägg till ny grupp
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Group Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-border pb-3">
          {groupKeys.map((key) => {
            const grp = groups[key];
            const isSelected = key === effectiveKey;
            const isCore = isCoreGroup(key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveGroupKey(key)}
                className={`relative rounded-lg px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {isCore && <Shield className="size-3 opacity-70" />}
                <span>{grp?.name || key}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Group Editor */}
        {activeGroup ? (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-foreground">{activeGroup.name}</h3>
                  {isCurrentCore ? (
                    <span className="inline-flex items-center gap-1 rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                      <Shield className="size-3" />
                      Kärngrupp – krävs för webbplatsens rutter
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      Anpassad grupp
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  Sökväg: /{activeGroup.slug}
                </span>
              </div>

              {isCurrentCore ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled
                  className="h-8 text-xs opacity-60 cursor-not-allowed text-muted-foreground self-start sm:self-auto"
                  title="Kärngrupper krävs för webbplatsens rutter och kan inte raderas."
                >
                  <Shield className="mr-1.5 size-3.5 text-primary" />
                  Kärngrupp (skyddad)
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteGroup(effectiveKey)}
                  className="h-8 text-xs text-destructive hover:bg-destructive/10 self-start sm:self-auto"
                >
                  <Trash2 className="mr-1.5 size-3.5" />
                  Ta bort denna grupp
                </Button>
              )}
            </div>

            {/* Basic details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="group-name" className="text-xs font-semibold text-foreground">
                  Gruppnamn
                </Label>
                <Input
                  id="group-name"
                  type="text"
                  value={activeGroup.name || ""}
                  onChange={(e) => updateCurrentGroup({ name: e.target.value })}
                  placeholder="T.ex. Freeskiers Skidklubb"
                  className="h-9 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="group-slug" className="text-xs font-semibold text-foreground">
                    Slug / URL-identifierare
                  </Label>
                  {isCurrentCore && (
                    <span className="text-[10px] text-muted-foreground">Låst för rutt</span>
                  )}
                </div>
                <Input
                  id="group-slug"
                  type="text"
                  disabled={isCurrentCore}
                  value={activeGroup.slug || ""}
                  onChange={(e) =>
                    !isCurrentCore &&
                    updateCurrentGroup({ slug: e.target.value.toLowerCase().trim() })
                  }
                  placeholder="t.ex. skidklubb"
                  className={`h-9 text-xs font-mono ${
                    isCurrentCore ? "bg-muted/50 cursor-not-allowed opacity-80" : ""
                  }`}
                  title={
                    isCurrentCore
                      ? "Kärngruppens URL-slug är bunden till webbplatsens sida och kan inte ändras."
                      : undefined
                  }
                />
              </div>
            </div>

            {/* Price & Schedule */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="group-price"
                  className="text-xs font-semibold text-foreground flex items-center gap-1"
                >
                  <DollarSign className="size-3 text-primary" /> Pris
                </Label>
                <Input
                  id="group-price"
                  type="text"
                  value={activeGroup.price || ""}
                  onChange={(e) => updateCurrentGroup({ price: e.target.value })}
                  placeholder="T.ex. 2 980 kr"
                  className="h-9 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="group-registrationOpens"
                  className="text-xs font-semibold text-foreground flex items-center gap-1"
                >
                  <Calendar className="size-3 text-primary" /> Anmälan öppnar
                </Label>
                <Input
                  id="group-registrationOpens"
                  type="text"
                  value={activeGroup.registrationOpens || ""}
                  onChange={(e) => updateCurrentGroup({ registrationOpens: e.target.value })}
                  placeholder="T.ex. 1 november kl. 09.00"
                  className="h-9 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="group-priceNote" className="text-xs font-semibold text-foreground">
                Prisnotis & eventuella tillägg
              </Label>
              <Input
                id="group-priceNote"
                type="text"
                value={activeGroup.priceNote || ""}
                onChange={(e) => updateCurrentGroup({ priceNote: e.target.value })}
                placeholder="T.ex. Åk 1–5: 3 130 kr (1 pass/v). Åk 6–9: 4 390 kr (2 pass/v). Liftkort ingår."
                className="h-9 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="group-schedule" className="text-xs font-semibold text-foreground">
                Schematider & Upplägg
              </Label>
              <Textarea
                id="group-schedule"
                rows={2}
                value={activeGroup.schedule || ""}
                onChange={(e) => updateCurrentGroup({ schedule: e.target.value })}
                placeholder="T.ex. 5 helgtillfällen på lördagar eller söndagar under januari–februari..."
                className="text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="group-bookingUrl"
                className="text-xs font-semibold text-foreground flex items-center gap-1"
              >
                <LinkIcon className="size-3 text-primary" /> Bokningslänk (SportAdmin)
              </Label>
              <Input
                id="group-bookingUrl"
                type="text"
                value={activeGroup.bookingUrl || ""}
                onChange={(e) => updateCurrentGroup({ bookingUrl: e.target.value })}
                placeholder="https://sportadmin.se/book/?F=..."
                className="h-9 text-xs font-mono"
              />
            </div>

            {/* Photo upload */}
            <div className="pt-2">
              <ImageUploadField
                label="Gruppbild / Headerbild"
                description="Visas på gruppens presentationssida och i kortöversikter."
                preset="hero"
                value={activeGroup.photoUrl || ""}
                onChange={(newPhoto) => updateCurrentGroup({ photoUrl: newPhoto })}
              />
            </div>

            {/* Requirements list */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-primary" />
                    Förkunskapskrav & Information (punktlista)
                  </Label>
                  <p className="text-[11px] text-muted-foreground">
                    Punktlistan som visas för föräldrar och deltagare.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddRequirement}
                  className="h-7 text-xs gap-1"
                >
                  <ListPlus className="size-3" />
                  Lägg till punkt
                </Button>
              </div>

              {activeGroup.requirements && activeGroup.requirements.length > 0 ? (
                <div className="space-y-2">
                  {activeGroup.requirements.map((req, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 rounded-lg border border-border bg-muted/20 p-1.5"
                    >
                      <span className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary shrink-0">
                        {idx + 1}
                      </span>
                      <Input
                        type="text"
                        value={req}
                        onChange={(e) => handleUpdateRequirement(idx, e.target.value)}
                        placeholder="Skriv ett krav eller rekommendation..."
                        className="h-8 flex-1 text-xs border-0 bg-transparent shadow-none focus-visible:ring-1"
                      />
                      <div className="flex items-center gap-0.5 shrink-0">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMoveRequirement(idx, "up")}
                          className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                          title="Flytta upp"
                        >
                          <ChevronUp className="size-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === activeGroup.requirements.length - 1}
                          onClick={() => handleMoveRequirement(idx, "down")}
                          className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                          title="Flytta ned"
                        >
                          <ChevronDown className="size-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveRequirement(idx)}
                          className="p-1 text-destructive/70 hover:text-destructive"
                          title="Ta bort krav"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                  Inga förkunskapskrav angivna ännu. Klicka på "Lägg till punkt" för att skapa ett.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-xs text-muted-foreground">
            Inga grupper hittades. Klicka på "Lägg till ny grupp" ovan.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
