import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Search,
  MapPin,
  Clock,
  ExternalLink,
  Edit2,
  Check,
  X,
} from "lucide-react";
import type { SiteContent, CmsCalendarEvent } from "@/types/cms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export interface CalendarEventsFormProps {
  draft: SiteContent;
  onChange: (updated: SiteContent) => void;
  className?: string;
}

const CATEGORY_PRESETS = [
  { id: "anmalan", label: "Anmälan" },
  { id: "skidklubb", label: "Skidklubb" },
  { id: "skidskola", label: "Helgskidskola" },
  { id: "resa", label: "Klubbresa" },
  { id: "event", label: "Klubbevent" },
  { id: "ovrigt", label: "Övrigt" },
];

export const CalendarEventsForm: React.FC<CalendarEventsFormProps> = ({
  draft,
  onChange,
  className = "",
}) => {
  const events = draft.calendarEvents || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [editingId, setEditingId] = useState<string | null>(null);

  const updateEvents = (newEvents: CmsCalendarEvent[]) => {
    onChange({
      ...draft,
      calendarEvents: newEvents,
    });
  };

  const handleAddEvent = () => {
    const newId = `event-${Date.now().toString(36)}`;
    const newEvent: CmsCalendarEvent = {
      id: newId,
      title: "Nytt event",
      date: "Vintersäsong 2026/2027",
      time: "Kl. 10:00",
      location: "Ekholmsnäsbacken",
      category: "skidklubb",
      description: "Beskrivning av händelsen...",
      linkUrl: "",
    };

    updateEvents([newEvent, ...events]);
    setEditingId(newId);
  };

  const handleDeleteEvent = (id: string, title: string) => {
    if (!confirm(`Är du säker på att du vill ta bort "${title}"?`)) return;
    updateEvents(events.filter((e) => e.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };

  const handleUpdateField = (id: string, partial: Partial<CmsCalendarEvent>) => {
    updateEvents(events.map((e) => (e.id === id ? { ...e, ...partial } : e)));
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= events.length) return;

    const list = [...events];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    updateEvents(list);
  };

  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "all" || e.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <Card className={`border-border bg-card shadow-sm ${className}`}>
      <CardHeader className="space-y-1 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <CalendarIcon className="size-5" />
            </span>
            <div>
              <CardTitle className="text-lg font-bold text-foreground">
                Kalender & Aktuella Händelser
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Hantera datum för säsongsöppning, klubbresor, träning och event.
              </CardDescription>
            </div>
          </div>

          <Button
            type="button"
            size="sm"
            onClick={handleAddEvent}
            className="h-8 gap-1.5 text-xs font-semibold"
          >
            <Plus className="size-3.5" />
            Lägg till ny händelse
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Filters and search */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Sök händelse eller plats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 pl-8 text-xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              Alla ({events.length})
            </button>
            {CATEGORY_PRESETS.map((cat) => {
              const count = events.filter((e) => e.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.label} {count > 0 ? `(${count})` : ""}
                </button>
              );
            })}
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-3">
          {filteredEvents.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-8 text-center text-xs text-muted-foreground">
              Inga kalenderhändelser matchar sökningen.
            </div>
          ) : (
            filteredEvents.map((event) => {
              const origIndex = events.findIndex((e) => e.id === event.id);
              const isEditing = editingId === event.id;

              return (
                <div
                  key={event.id}
                  className={`rounded-xl border transition-all ${
                    isEditing
                      ? "border-primary/60 bg-muted/20 shadow-xs p-4"
                      : "border-border bg-card p-3 hover:border-border/80"
                  }`}
                >
                  {isEditing ? (
                    /* Inline Editor */
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-border pb-2.5">
                        <span className="text-xs font-bold text-foreground">
                          Redigera kalenderhändelse
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
                        <div className="space-y-1.5 sm:col-span-2">
                          <Label className="text-xs font-semibold text-foreground">Titel</Label>
                          <Input
                            type="text"
                            value={event.title}
                            onChange={(e) => handleUpdateField(event.id, { title: e.target.value })}
                            placeholder="T.ex. Säsongsstart Freeskiers Skidklubb"
                            className="h-8 text-xs font-semibold"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-xs font-semibold text-foreground">Datum</Label>
                          <Input
                            type="text"
                            value={event.date}
                            onChange={(e) => handleUpdateField(event.id, { date: e.target.value })}
                            placeholder="T.ex. 16 oktober 2026"
                            className="h-8 text-xs"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-xs font-semibold text-foreground">Tid</Label>
                          <Input
                            type="text"
                            value={event.time}
                            onChange={(e) => handleUpdateField(event.id, { time: e.target.value })}
                            placeholder="T.ex. Kl. 09:00"
                            className="h-8 text-xs"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-xs font-semibold text-foreground">Plats</Label>
                          <Input
                            type="text"
                            value={event.location}
                            onChange={(e) =>
                              handleUpdateField(event.id, { location: e.target.value })
                            }
                            placeholder="T.ex. Ekholmsnäsbacken"
                            className="h-8 text-xs"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-xs font-semibold text-foreground">Kategori</Label>
                          <Input
                            type="text"
                            value={event.category}
                            onChange={(e) =>
                              handleUpdateField(event.id, { category: e.target.value })
                            }
                            placeholder="anmalan / skidklubb / skidskola..."
                            className="h-8 text-xs"
                          />
                        </div>

                        <div className="space-y-1.5 sm:col-span-2">
                          <Label className="text-xs font-semibold text-foreground">
                            Länk-URL (valfritt)
                          </Label>
                          <Input
                            type="text"
                            value={event.linkUrl || ""}
                            onChange={(e) =>
                              handleUpdateField(event.id, { linkUrl: e.target.value })
                            }
                            placeholder="/skidklubb eller extern länk"
                            className="h-8 text-xs font-mono"
                          />
                        </div>

                        <div className="space-y-1.5 sm:col-span-2">
                          <Label className="text-xs font-semibold text-foreground">
                            Beskrivning
                          </Label>
                          <Textarea
                            rows={3}
                            value={event.description}
                            onChange={(e) =>
                              handleUpdateField(event.id, { description: e.target.value })
                            }
                            placeholder="Detaljerad beskrivning för deltagare..."
                            className="text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Row View */
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">
                            {event.category}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-foreground truncate">
                            {event.title}
                          </h4>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1 font-medium text-foreground/80">
                            <CalendarIcon className="size-3 text-primary" /> {event.date}
                          </span>
                          {event.time && (
                            <span className="inline-flex items-center gap-1">
                              <Clock className="size-3" /> {event.time}
                            </span>
                          )}
                          {event.location && (
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="size-3" /> {event.location}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {event.description}
                        </p>
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
                          disabled={origIndex === events.length - 1}
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
                          onClick={() => setEditingId(event.id)}
                          className="h-8 px-2 text-xs"
                        >
                          <Edit2 className="size-3.5 mr-1" />
                          Ändra
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteEvent(event.id, event.title)}
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
