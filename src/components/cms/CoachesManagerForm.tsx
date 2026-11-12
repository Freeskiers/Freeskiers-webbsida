import React, { useState, useMemo } from "react";
import {
  Users,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Search,
  Edit2,
  Check,
  UserCheck,
} from "lucide-react";
import type { SiteContent, CmsCoach } from "@/types/cms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { resolvePhotoUrl } from "@/lib/club-data";
import { ImageUploadField } from "./ImageUploadField";

export interface CoachesManagerFormProps {
  draft: SiteContent;
  onChange: (updated: SiteContent) => void;
  className?: string;
}

const COMMON_GROUPS = ["Skidklubb", "Helgskidskola", "Höstsäsong", "Styrelse & Kansli", "Alla"];

export const CoachesManagerForm: React.FC<CoachesManagerFormProps> = ({
  draft,
  onChange,
  className = "",
}) => {
  const coaches = useMemo(() => draft.coaches || [], [draft.coaches]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [editingId, setEditingId] = useState<string | null>(null);

  const availableGroups = useMemo(() => {
    const set = new Set<string>(COMMON_GROUPS);
    coaches.forEach((c) => {
      if (c.group) set.add(c.group);
    });
    return Array.from(set);
  }, [coaches]);

  const updateCoaches = (newCoaches: CmsCoach[]) => {
    onChange({
      ...draft,
      coaches: newCoaches,
    });
  };

  const handleAddCoach = () => {
    const newId = `coach-${Date.now().toString(36)}`;
    const newCoach: CmsCoach = {
      id: newId,
      name: "Ny Tränare",
      role: "Tränare",
      group: selectedGroup !== "all" ? selectedGroup : "Skidklubb",
      photoUrl: "",
    };

    updateCoaches([newCoach, ...coaches]);
    setEditingId(newId);
  };

  const handleDeleteCoach = (id: string, name: string) => {
    if (!confirm(`Är du säker på att du vill ta bort tränaren "${name}"?`)) return;
    updateCoaches(coaches.filter((c) => c.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };

  const handleUpdateCoach = (id: string, partial: Partial<CmsCoach>) => {
    updateCoaches(coaches.map((c) => (c.id === id ? { ...c, ...partial } : c)));
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= coaches.length) return;

    const list = [...coaches];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    updateCoaches(list);
  };

  const filteredCoaches = coaches.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.group.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === "all" || c.group === selectedGroup;
    return matchesSearch && matchesGroup;
  });

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
                Tränarteam & Ledare
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Presentera föreningens tränare med roller, ansvarsgrupper och porträttbilder.
              </CardDescription>
            </div>
          </div>

          <Button
            type="button"
            size="sm"
            onClick={handleAddCoach}
            className="h-8 gap-1.5 text-xs font-semibold"
          >
            <Plus className="size-3.5" />
            Lägg till tränare
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search & Groups */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Sök tränare på namn eller roll..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 pl-8 text-xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <button
              type="button"
              onClick={() => setSelectedGroup("all")}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
                selectedGroup === "all"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              Alla ({coaches.length})
            </button>
            {availableGroups.map((grp) => {
              const count = coaches.filter((c) => c.group === grp).length;
              return (
                <button
                  key={grp}
                  type="button"
                  onClick={() => setSelectedGroup(grp)}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                    selectedGroup === grp
                      ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {grp} {count > 0 ? `(${count})` : ""}
                </button>
              );
            })}
          </div>
        </div>

        {/* Coaches list */}
        <div className="space-y-3">
          {filteredCoaches.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-8 text-center text-xs text-muted-foreground">
              Inga tränare matchar vald sökning eller grupp.
            </div>
          ) : (
            filteredCoaches.map((coach) => {
              const origIndex = coaches.findIndex((c) => c.id === coach.id);
              const isEditing = editingId === coach.id;

              return (
                <div
                  key={coach.id}
                  className={`rounded-xl border transition-all ${
                    isEditing
                      ? "border-primary/60 bg-muted/20 shadow-xs p-4"
                      : "border-border bg-card p-3 hover:border-border/80"
                  }`}
                >
                  {isEditing ? (
                    /* Coach Editor */
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-border pb-2.5">
                        <span className="text-xs font-bold text-foreground">
                          Redigera tränare: {coach.name}
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
                          <Label className="text-xs font-semibold text-foreground">Namn</Label>
                          <Input
                            type="text"
                            value={coach.name}
                            onChange={(e) => handleUpdateCoach(coach.id, { name: e.target.value })}
                            placeholder="För- och efternamn"
                            className="h-8 text-xs font-bold"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-xs font-semibold text-foreground">Roll</Label>
                          <Input
                            type="text"
                            value={coach.role}
                            onChange={(e) => handleUpdateCoach(coach.id, { role: e.target.value })}
                            placeholder="T.ex. Huvudtränare Skidklubb"
                            className="h-8 text-xs"
                          />
                        </div>

                        <div className="space-y-1.5 sm:col-span-2">
                          <Label className="text-xs font-semibold text-foreground">Grupp</Label>
                          <div className="flex flex-wrap gap-1.5 pb-1">
                            {availableGroups.map((grp) => (
                              <button
                                key={grp}
                                type="button"
                                onClick={() => handleUpdateCoach(coach.id, { group: grp })}
                                className={`rounded-md border px-2 py-0.5 text-[11px] transition-colors ${
                                  coach.group === grp
                                    ? "border-primary bg-primary/10 text-primary font-bold"
                                    : "border-border text-muted-foreground hover:text-foreground"
                                }`}
                              >
                                {grp}
                              </button>
                            ))}
                          </div>
                          <Input
                            type="text"
                            value={coach.group}
                            onChange={(e) => handleUpdateCoach(coach.id, { group: e.target.value })}
                            placeholder="Egen grupp eller tillhörighet..."
                            className="h-8 text-xs"
                          />
                        </div>

                        <div className="space-y-1.5 sm:col-span-2 pt-1">
                          <ImageUploadField
                            label="Porträttfoto (Avatar)"
                            description="Beskärs och optimeras automatiskt till max 800px bredd."
                            preset="avatar"
                            value={coach.photoUrl}
                            onChange={(url) => handleUpdateCoach(coach.id, { photoUrl: url })}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Coach Row */
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="size-12 shrink-0 overflow-hidden rounded-full border border-border bg-muted/40">
                          {coach.photoUrl ? (
                            <img
                              src={resolvePhotoUrl(coach.photoUrl)}
                              alt={coach.name}
                              className="size-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="flex size-full items-center justify-center bg-primary/10 text-primary">
                              <UserCheck className="size-5" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-foreground truncate">
                              {coach.name}
                            </h4>
                            <span className="rounded bg-accent/20 px-1.5 py-0.5 text-[10px] font-bold text-accent shrink-0">
                              {coach.group}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{coach.role}</p>
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
                          disabled={origIndex === coaches.length - 1}
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
                          onClick={() => setEditingId(coach.id)}
                          className="h-8 px-2 text-xs"
                        >
                          <Edit2 className="size-3.5 mr-1" />
                          Ändra
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCoach(coach.id, coach.name)}
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
