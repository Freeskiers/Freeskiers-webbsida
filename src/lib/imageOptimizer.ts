export interface ImageProcessOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  mimeType?: "image/webp" | "image/jpeg";
}

/**
 * Calculates resized dimensions while preserving the original aspect ratio.
 */
export function calculateResizedDimensions(
  origWidth: number,
  origHeight: number,
  maxWidth?: number,
  maxHeight?: number,
): { width: number; height: number } {
  if (origWidth <= 0 || origHeight <= 0) {
    return { width: Math.max(1, origWidth), height: Math.max(1, origHeight) };
  }

  let width = origWidth;
  let height = origHeight;

  if (maxWidth && width > maxWidth) {
    const ratio = maxWidth / width;
    width = maxWidth;
    height = Math.round(height * ratio);
  }

  if (maxHeight && height > maxHeight) {
    const ratio = maxHeight / height;
    height = maxHeight;
    width = Math.round(width * ratio);
  }

  return {
    width: Math.max(1, width),
    height: Math.max(1, height),
  };
}

/**
 * Client-side canvas image resize and compression.
 * Returns base64 Data URL (WebP or JPEG).
 */
export async function processImageFile(
  file: File,
  options: ImageProcessOptions = {},
): Promise<string> {
  const { maxWidth = 1600, maxHeight, quality = 0.85, mimeType = "image/webp" } = options;

  if (!file.type.startsWith("image/")) {
    throw new Error("Filen måste vara en giltig bildfil (JPG, PNG, WebP eller GIF).");
  }

  // If in non-browser environment
  if (typeof window === "undefined" || typeof FileReader === "undefined") {
    throw new Error("Bildbehandling stöds endast i webbläsarmiljö.");
  }

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error("Kunde inte läsa bildfilen från din enhet."));
    };

    reader.onload = () => {
      const resultStr = reader.result as string;
      const img = new Image();

      img.onerror = () => {
        reject(new Error("Kunde inte läsa in bildens innehåll."));
      };

      img.onload = () => {
        const origWidth = img.naturalWidth || img.width;
        const origHeight = img.naturalHeight || img.height;

        const { width, height } = calculateResizedDimensions(
          origWidth,
          origHeight,
          maxWidth,
          maxHeight,
        );

        try {
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            // Fallback if 2d context unavailable
            resolve(resultStr);
            return;
          }

          // Optional smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";

          ctx.drawImage(img, 0, 0, width, height);

          let output = canvas.toDataURL(mimeType, quality);
          // If browser does not support WebP canvas export, fallback to JPEG
          if (mimeType === "image/webp" && !output.startsWith("data:image/webp")) {
            output = canvas.toDataURL("image/jpeg", quality);
          }

          resolve(output);
        } catch {
          // If canvas operations fail (memory or security restrictions), return original
          resolve(resultStr);
        }
      };

      img.src = resultStr;
    };

    reader.readAsDataURL(file);
  });
}
