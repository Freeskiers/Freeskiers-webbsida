import React, { useState, useMemo } from "react";
import {
  HelpCircle,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Search,
  Edit2,
  Check,
  Tag,
} from "lucide-react";
import type { SiteContent, CmsFaqItem } from "@/types/cms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export interface FaqManagerFormProps {
  draft: SiteContent;
  onChange: (updated: SiteContent) => void;
  className?: string;
}

const DEFAULT_CATEGORIES = [
  "Helgskidskola",
  "Skidklubb",
  "Bokning & Avbokning",
  "Utrustning",
  "Höstsäsong",
  "Allmänt",
];

export const FaqManagerForm: React.FC<FaqManagerFormProps> = ({
  draft,
  onChange,
  className = "",
}) => {
  const faqItems = useMemo(() => draft.faq || [], [draft.faq]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [editingId, setEditingId] = useState<string | null>(null);

  const availableCategories = useMemo(() => {
    const set = new Set<string>(DEFAULT_CATEGORIES);
    faqItems.forEach((item) => {
      if (item.category) set.add(item.category);
    });
    return Array.from(set);
  }, [faqItems]);

  const updateFaq = (newItems: CmsFaqItem[]) => {
    onChange({
      ...draft,
      faq: newItems,
    });
  };

  const handleAddFaq = () => {
    const newId = `faq-${Date.now().toString(36)}`;
    const newItem: CmsFaqItem = {
      id: newId,
      question: "Ny fråga",
      answer: "Svar på frågan...",
      category: selectedCategory !== "all" ? selectedCategory : "Allmänt",
    };

    updateFaq([newItem, ...faqItems]);
    setEditingId(newId);
  };

  const handleDeleteFaq = (id: string, question: string) => {
    if (!confirm(`Vill du ta bort frågan "${question}"?`)) return;
    updateFaq(faqItems.filter((item) => item.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };

  const handleUpdateItem = (id: string, partial: Partial<CmsFaqItem>) => {
    updateFaq(faqItems.map((item) => (item.id === id ? { ...item, ...partial } : item)));
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= faqItems.length) return;

    const list = [...faqItems];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    updateFaq(list);
  };

  const filteredItems = faqItems.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <Card className={`border-border bg-card shadow-sm ${className}`}>
      <CardHeader className="space-y-1 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <HelpCircle className="size-5" />
            </span>
            <div>
              <CardTitle className="text-lg font-bold text-foreground">
                Vanliga frågor (FAQ)
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Besvara frågor om skidskola, priser, utrustning och avbokningsregler.
              </CardDescription>
            </div>
          </div>

          <Button
            type="button"
            size="sm"
            onClick={handleAddFaq}
            className="h-8 gap-1.5 text-xs font-semibold"
          >
            <Plus className="size-3.5" />
            Lägg till ny fråga
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search & Categories */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Sök bland frågor eller svar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 pl-8 text-xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              Alla ({faqItems.length})
            </button>
            {availableCategories.map((cat) => {
              const count = faqItems.filter((i) => i.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat} {count > 0 ? `(${count})` : ""}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ list */}
        <div className="space-y-3">
          {filteredItems.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-8 text-center text-xs text-muted-foreground">
              Inga frågor matchar vald kategori eller sökning.
            </div>
          ) : (
            filteredItems.map((item) => {
              const origIndex = faqItems.findIndex((i) => i.id === item.id);
              const isEditing = editingId === item.id;

              return (
                <div
                  key={item.id}
                  className={`rounded-xl border transition-all ${
                    isEditing
                      ? "border-primary/60 bg-muted/20 shadow-xs p-4"
                      : "border-border bg-card p-3 hover:border-border/80"
                  }`}
                >
                  {isEditing ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-border pb-2">
                        <span className="text-xs font-bold text-foreground">
                          Redigera fråga och svar
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

                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-foreground">Kategori</Label>
                        <div className="flex flex-wrap gap-1.5 pb-1">
                          {availableCategories.map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => handleUpdateItem(item.id, { category: cat })}
                              className={`rounded-md border px-2 py-0.5 text-[11px] transition-colors ${
                                item.category === cat
                                  ? "border-primary bg-primary/10 text-primary font-bold"
                                  : "border-border text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                        <Input
                          type="text"
                          value={item.category}
                          onChange={(e) => handleUpdateItem(item.id, { category: e.target.value })}
                          placeholder="Egen kategori..."
                          className="h-8 text-xs font-medium"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-foreground">Fråga</Label>
                        <Input
                          type="text"
                          value={item.question}
                          onChange={(e) => handleUpdateItem(item.id, { question: e.target.value })}
                          placeholder="T.ex. Vad händer om backen inte öppnar?"
                          className="h-8 text-xs font-bold"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-foreground">Svar</Label>
                        <Textarea
                          rows={3}
                          value={item.answer}
                          onChange={(e) => handleUpdateItem(item.id, { answer: e.target.value })}
                          placeholder="Beskrivande svar..."
                          className="text-xs leading-relaxed"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 rounded bg-accent/20 px-1.5 py-0.5 text-[10px] font-bold text-accent">
                            <Tag className="size-2.5" />
                            {item.category}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-foreground">
                            {item.question}
                          </h4>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{item.answer}</p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 self-end sm:self-start">
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
                          disabled={origIndex === faqItems.length - 1}
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
                          onClick={() => setEditingId(item.id)}
                          className="h-8 px-2 text-xs"
                        >
                          <Edit2 className="size-3.5 mr-1" />
                          Ändra
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteFaq(item.id, item.question)}
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
