import { Camera } from "lucide-react";

import { gallery, INSTAGRAM_URL } from "@/lib/club-data";

export function PhotoGallery() {
  return (
    <section className="py-20">
      <div className="mx-auto mb-10 max-w-2xl px-4 text-center">
        <p className="text-eyebrow flex items-center justify-center gap-1.5">
          <Camera className="size-4" /> Glimtar från backen
        </p>
        <h2 className="mt-2 text-3xl sm:text-4xl">Livet och gemenskapen i Freeskiers</h2>
      </div>

      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-5">
        {gallery.map((p) => (
          <figure key={p.src} className="overflow-hidden last:col-span-2 sm:last:col-span-1">
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-72"
            />
          </figure>
        ))}
      </div>

      <p className="mt-8 text-center text-sm">
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="font-semibold text-primary hover:text-accent">
          Följ mer från backen på Instagram →
        </a>
      </p>
    </section>
  );
}
