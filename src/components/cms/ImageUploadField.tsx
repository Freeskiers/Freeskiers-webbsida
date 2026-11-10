import React, { useState, useRef, useCallback } from "react";
import {
  UploadCloud,
  X,
  Link as LinkIcon,
  Loader2,
  Check,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { processImageFile, type ImageProcessOptions } from "@/lib/imageOptimizer";

export type { ImageProcessOptions };

export interface ImageUploadFieldProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  description?: string;
  placeholder?: string;
  preset?: "hero" | "avatar" | "logo";
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  disabled?: boolean;
  className?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  value = "",
  onChange,
  label,
  description,
  placeholder = "https://... eller /assets/photos/...",
  preset = "hero",
  maxWidth,
  maxHeight,
  quality,
  disabled = false,
  className = "",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [manualUrl, setManualUrl] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Derive preset configurations
  const effectiveMaxWidth =
    maxWidth ?? (preset === "hero" ? 1600 : preset === "avatar" ? 800 : 800);
  const effectiveQuality = quality ?? (preset === "logo" ? 0.9 : 0.85);

  const handleFile = useCallback(
    async (file: File) => {
      setErrorMessage(null);
      setIsProcessing(true);

      try {
        const compressedBase64 = await processImageFile(file, {
          maxWidth: effectiveMaxWidth,
          maxHeight,
          quality: effectiveQuality,
          mimeType: "image/webp",
        });

        onChange(compressedBase64);
        setManualUrl(compressedBase64);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Ett fel uppstod vid bildoptimering.";
        setErrorMessage(msg);
      } finally {
        setIsProcessing(false);
      }
    },
    [effectiveMaxWidth, maxHeight, effectiveQuality, onChange],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
    // reset input value so re-selecting same file triggers event
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !isProcessing) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled || isProcessing) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleClear = () => {
    onChange("");
    setManualUrl("");
    setErrorMessage(null);
  };

  const handleApplyManualUrl = () => {
    onChange(manualUrl.trim());
    setErrorMessage(null);
  };

  const isBase64 = value?.startsWith("data:image");

  return (
    <div className={`space-y-2.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold text-foreground">{label}</Label>
          <span className="text-xs text-muted-foreground">
            {preset === "hero"
              ? "Max bredd 1600px"
              : preset === "avatar"
                ? "Max bredd 800px"
                : "Max bredd 800px"}
          </span>
        </div>
      )}

      {description && <p className="text-xs text-muted-foreground">{description}</p>}

      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={disabled || isProcessing}
        onChange={handleFileChange}
      />

      {/* Preview Card if image exists */}
      {value ? (
        <div className="relative overflow-hidden rounded-xl border border-border bg-card/60 p-3 shadow-xs transition-all">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div
              className={`relative overflow-hidden rounded-lg border border-border bg-muted/40 shrink-0 ${
                preset === "avatar"
                  ? "size-20 rounded-full"
                  : preset === "logo"
                    ? "h-16 w-32 object-contain p-1"
                    : "h-24 w-40 object-cover"
              }`}
            >
              <img
                src={value}
                alt="Förhandsgranskning"
                className={`h-full w-full ${
                  preset === "avatar"
                    ? "object-cover"
                    : preset === "logo"
                      ? "object-contain"
                      : "object-cover"
                }`}
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>

            <div className="flex-1 min-w-0 space-y-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-md bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent">
                  <Check className="size-3" />
                  {isBase64 ? "Optimerad & uppladdad" : "Bildlänk vald"}
                </span>
                {isBase64 && (
                  <span className="text-[11px] text-muted-foreground">
                    (~{Math.round(value.length / 1024)} kB)
                  </span>
                )}
              </div>
              <p className="truncate text-xs text-muted-foreground font-mono" title={value}>
                {isBase64 ? "data:image/webp;base64,..." : value}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={disabled || isProcessing}
                onClick={() => fileInputRef.current?.click()}
                className="h-8 text-xs font-medium"
              >
                <RefreshCw className="mr-1.5 size-3.5" />
                Byt bild
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled || isProcessing}
                onClick={handleClear}
                className="h-8 text-xs text-destructive hover:bg-destructive/10"
              >
                <X className="mr-1 size-3.5" />
                Ta bort
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* Drag & Drop Upload Zone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && !isProcessing && fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          className={`group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-all cursor-pointer ${
            isDragging
              ? "border-primary bg-primary/10 shadow-md scale-[1.01]"
              : "border-border hover:border-primary/60 hover:bg-muted/30"
          } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {isProcessing ? (
            <div className="flex flex-col items-center gap-2 py-3">
              <Loader2 className="size-8 animate-spin text-primary" />
              <p className="text-xs font-semibold text-foreground">
                Optimerar och komprimerar bild på klienten...
              </p>
              <p className="text-[11px] text-muted-foreground">
                Anpassar till max {effectiveMaxWidth}px bredd som WebP
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <UploadCloud className="size-5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs sm:text-sm font-semibold text-foreground">
                  Dra & släpp en bild här, eller klicka för att bläddra
                </p>
                <p className="text-[11px] text-muted-foreground">
                  PNG, JPG eller WebP • Skalas automatiskt till max {effectiveMaxWidth}px bredd
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error display */}
      {errorMessage && (
        <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-2.5 text-xs text-destructive">
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Manual URL toggle and input */}
      <div className="pt-0.5">
        {!showUrlInput ? (
          <button
            type="button"
            onClick={() => setShowUrlInput(true)}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <LinkIcon className="size-3" />
            <span>Eller ange direkt bildlänk / filsökväg manuellt</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/20 p-2 text-xs">
            <Input
              type="text"
              value={manualUrl}
              onChange={(e) => setManualUrl(e.target.value)}
              placeholder={placeholder}
              className="h-8 text-xs font-mono"
            />
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={handleApplyManualUrl}
              className="h-8 px-2.5 text-xs font-medium"
            >
              Använd
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => setShowUrlInput(false)}
              className="h-8 px-2 text-xs text-muted-foreground"
            >
              Dölj
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
