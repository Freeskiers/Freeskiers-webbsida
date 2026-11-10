import React, { useState } from "react";
import {
  Handshake,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Search,
  Edit2,
  Check,
  Globe,
  Tag,
  KeyRound,
} from "lucide-react";
import type { SiteContent, CmsPartner } from "@/types/cms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageUploadField } from "./ImageUploadField";

export interface PartnersManagerFormProps {
  draft: SiteContent;
  onChange: (updated: SiteContent) => void;
  className?: string;
}

export const PartnersManagerForm: React.FC<PartnersManagerFormProps> = ({
  draft,
  onChange,
  className = "",
}) => {
  const partners = draft.partners || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const updatePartners = (newPartners: CmsPartner[]) => {
    onChange({
      ...draft,
      partners: newPartners,
    });
  };

  const handleAddPartner = () => {
    const newId = `partner-${Date.now().toString(36)}`;
    const newPartner: CmsPartner = {
      id: newId,
      name: "Ny Partner",
      discountSummary: "10% medlemsrabatt",
      memberCode: "FREESKIERS",
      howToRedeem: "Visa medlemskort i butik eller ange kod i webbshoppen.",
      websiteUrl: "https://",
      logoUrl: "",
    };

    updatePartners([newPartner, ...partners]);
    setEditingId(newId);
  };

  const handleDeletePartner = (id: string, name: string) => {
    if (!confirm(`Är du säker på att du vill ta bort samarbetspartnern "${name}"?`)) return;
    updatePartners(partners.filter((p) => p.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };

  const handleUpdatePartner = (id: string, partial: Partial<CmsPartner>) => {
    updatePartners(partners.map((p) => (p.id === id ? { ...p, ...partial } : p)));
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= partners.length) return;

    const list = [...partners];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    updatePartners(list);
  };

  const filteredPartners = partners.filter((p) => {
    return (
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.discountSummary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.memberCode && p.memberCode.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <Card className={`border-border bg-card shadow-sm ${className}`}>
      <CardHeader className="space-y-1 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Handshake className="size-5" />
            </span>
            <div>
              <CardTitle className="text-lg font-bold text-foreground">
                Samarbetspartners & Medlemsförmåner
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Hantera klubbens partners, rabatter, onlinekoder och logotyper.
              </CardDescription>
            </div>
          </div>

          <Button
            type="button"
            size="sm"
            onClick={handleAddPartner}
            className="h-8 gap-1.5 text-xs font-semibold"
          >
            <Plus className="size-3.5" />
            Lägg till partner
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Sök partner eller rabatt..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 pl-8 text-xs"
          />
        </div>

        {/* Partner list */}
        <div className="space-y-3">
          {filteredPartners.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-8 text-center text-xs text-muted-foreground">
              Inga partners matchar sökningen.
            </div>
          ) : (
            filteredPartners.map((partner) => {
              const origIndex = partners.findIndex((p) => p.id === partner.id);
              const isEditing = editingId === partner.id;

              return (
                <div
                  key={partner.id}
                  className={`rounded-xl border transition-all ${
                    isEditing
                      ? "border-primary/60 bg-muted/20 shadow-xs p-4"
                      : "border-border bg-card p-3 hover:border-border/80"
                  }`}
                >
                  {isEditing ? (
                    /* Partner Editor */
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-border pb-2.5">
                        <span className="text-xs font-bold text-foreground">
                          Redigera partner: {partner.name}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingId(null)}
                          className="h-7 text-xs"
                        >
                          <Check className="mr-1 size-3.5 text-emerald-500" />
                          Klar
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label className="text-xs font-semibold text-foreground">
                            Företagsnamn
                          </Label>
                          <Input
                            type="text"
                            value={partner.name}
                            onChange={(e) =>
                              handleUpdatePartner(partner.id, { name: e.target.value })
                            }
                            placeholder="T.ex. Alpingaraget"
                            className="h-8 text-xs font-bold"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-xs font-semibold text-foreground">
                            Medlemsrabatt / Förmån
                          </Label>
                          <Input
                            type="text"
                            value={partner.discountSummary}
                            onChange={(e) =>
                              handleUpdatePartner(partner.id, { discountSummary: e.target.value })
                            }
                            placeholder="T.ex. 15% rabatt på hårdvara"
                            className="h-8 text-xs"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-xs font-semibold text-foreground flex items-center gap-1">
                            <KeyRound className="size-3 text-primary" /> Rabattkod online (valfritt)
                          </Label>
                          <Input
                            type="text"
                            value={partner.memberCode || ""}
                            onChange={(e) =>
                              handleUpdatePartner(partner.id, { memberCode: e.target.value })
                            }
                            placeholder="T.ex. FREESKIERS15"
                            className="h-8 text-xs font-mono"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-xs font-semibold text-foreground flex items-center gap-1">
                            <Globe className="size-3 text-primary" /> Webbplats-URL
                          </Label>
                          <Input
                            type="text"
                            value={partner.websiteUrl}
                            onChange={(e) =>
                              handleUpdatePartner(partner.id, { websiteUrl: e.target.value })
                            }
                            placeholder="https://..."
                            className="h-8 text-xs font-mono"
                          />
                        </div>

                        <div className="space-y-1.5 sm:col-span-2">
                          <Label className="text-xs font-semibold text-foreground">
                            Hur rabatten utnyttjas
                          </Label>
                          <Textarea
                            rows={2}
                            value={partner.howToRedeem}
                            onChange={(e) =>
                              handleUpdatePartner(partner.id, { howToRedeem: e.target.value })
                            }
                            placeholder="T.ex. Visa digitalt medlemskort i butik eller ange koden i webbshoppen vid utcheckning."
                            className="text-xs"
                          />
                        </div>

                        <div className="space-y-1.5 sm:col-span-2 pt-1">
                          <ImageUploadField
                            label="Partnerlogotyp"
                            description="Logotypen optimeras och visas i partnerkarusellen och medlemsportalen."
                            preset="logo"
                            value={partner.logoUrl || ""}
                            onChange={(url) => handleUpdatePartner(partner.id, { logoUrl: url })}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Partner Row */
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="size-12 shrink-0 overflow-hidden rounded-lg border border-border bg-white p-1 flex items-center justify-center">
                          {partner.logoUrl ? (
                            <img
                              src={partner.logoUrl}
                              alt={partner.name}
                              className="size-full object-contain"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="flex size-full items-center justify-center text-muted-foreground">
                              <Tag className="size-5" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-foreground truncate">
                              {partner.name}
                            </h4>
                            {partner.memberCode && (
                              <span className="rounded bg-accent/20 px-1.5 py-0.5 text-[10px] font-mono font-bold text-accent shrink-0">
                                Kod: {partner.memberCode}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-foreground/85 font-medium truncate">
                            {partner.discountSummary}
                          </p>
                          <p className="text-[11px] text-muted-foreground truncate">
                            {partner.howToRedeem}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                        <button
                          type="button"
                          disabled={origIndex === 0}
                          onClick={() => handleMove(origIndex, "up")}
                          className="p-1.5 text-muted-foreground hover:text-foreground disabled:opacity-30"
                          title="Flytta upp"
                        >
                          <ChevronUp className="size-4" />
                        </button>
                        <button
                          type="button"
                          disabled={origIndex === partners.length - 1}
                          onClick={() => handleMove(origIndex, "down")}
                          className="p-1.5 text-muted-foreground hover:text-foreground disabled:opacity-30"
                          title="Flytta ned"
                        >
                          <ChevronDown className="size-4" />
                        </button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingId(partner.id)}
                          className="h-8 px-2 text-xs"
                        >
                          <Edit2 className="size-3.5 mr-1" />
                          Ändra
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePartner(partner.id, partner.name)}
                          className="h-8 px-2 text-xs text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};
