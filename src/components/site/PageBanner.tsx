import type { ReactNode } from "react";

type Props = { photo: string; alt: string; eyebrow?: string; title: string; children?: ReactNode };

export function PageBanner({ photo, alt, eyebrow, title, children }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-primary-deep">
      <img src={photo} alt={alt} width={2000} height={1200} className="absolute inset-0 -z-10 size-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-deep/95 via-primary-deep/70 to-primary-deep/20" />
      <div className="on-dark mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        {eyebrow && (
          <span className="inline-flex rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 max-w-3xl text-4xl sm:text-6xl">{title}</h1>
        {children}
      </div>
    </section>
  );
}
