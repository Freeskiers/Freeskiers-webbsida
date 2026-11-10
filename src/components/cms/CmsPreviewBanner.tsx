import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye, ArrowLeft, UploadCloud, X, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useCmsPreview } from "@/contexts/CmsPreviewContext";
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
import { Button } from "@/components/ui/button";

export const CmsPreviewBanner: React.FC = () => {
  const { isPreviewActive, exitPreview, publishDraft } = useCmsPreview();
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  if (!isPreviewActive) {
    return null;
  }

  const handleConfirmPublish = async () => {
    setIsPublishing(true);
    try {
      const result = await publishDraft();
      if (result.success) {
        toast.success(result.message || "Ändringarna har publicerats!");
        setIsPublishDialogOpen(false);
      } else {
        toast.error(
          result.message ||
            "Kunde inte publicera automatiskt. Öppna redigeraren (/admin/cms) för att slutföra.",
        );
      }
    } catch (err: any) {
      toast.error(err?.message || "Ett fel uppstod vid publicering.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <>
      <aside
        role="region"
        aria-label="Förhandsgranskning aktiv"
        className="fixed bottom-20 sm:bottom-4 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-2rem)] max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-300"
      >
        <div className="flex flex-col gap-3 rounded-2xl border-2 border-accent bg-card/95 p-3.5 shadow-2xl backdrop-blur-md dark:bg-card/95 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-3">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-foreground">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
              <Eye className="size-4" />
            </span>
            <span className="leading-snug">
              👁️ Förhandsgranskning aktiv – du ser dina osparade ändringar
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 text-xs font-bold border-foreground/20 hover:bg-accent/10"
            >
              <Link to={"/admin/cms" as any}>
                <ArrowLeft className="size-3.5" />
                Gå tillbaka till redigeraren
              </Link>
            </Button>

            <Button
              type="button"
              variant="default"
              size="sm"
              className="h-8 gap-1.5 text-xs font-bold bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => setIsPublishDialogOpen(true)}
            >
              <UploadCloud className="size-3.5" />
              Publicera ändringar
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 gap-1 text-xs text-muted-foreground hover:text-foreground"
              onClick={exitPreview}
              title="Avsluta förhandsgranskning"
            >
              <X className="size-3.5" />
              Avsluta förhandsgranskning
            </Button>
          </div>
        </div>
      </aside>

      <AlertDialog open={isPublishDialogOpen} onOpenChange={setIsPublishDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Publicera ändringar</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2 text-sm text-muted-foreground">
              <span>
                Vill du publicera dina osparade ändringar direkt till live-webbplatsen?
              </span>
              <span className="block text-xs text-muted-foreground/80">
                Ändringarna sparas i webbplatsens datakälla och versionshanteras i git.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
            <AlertDialogCancel disabled={isPublishing}>Avbryt</AlertDialogCancel>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => setIsPublishDialogOpen(false)}
            >
              <Link to={"/admin/cms" as any}>Granska i redigeraren</Link>
            </Button>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleConfirmPublish();
              }}
              disabled={isPublishing}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {isPublishing ? (
                <>
                  <Loader2 className="mr-2 size-3.5 animate-spin" />
                  Publicerar...
                </>
              ) : (
                <>
                  <Check className="mr-1.5 size-3.5" />
                  Bekräfta och publicera
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
