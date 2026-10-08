import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import logo from "@/assets/freeskiers-logo-horizontal.png.asset.json";
import { TopEventBanner } from "@/components/site/TopEventBanner";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/skidklubb", label: "Skidklubb" },
  { to: "/helgskidskola", label: "Helgskidskola" },
  { to: "/kalender", label: "Kalender" },
  { to: "/privatlektion", label: "Privatlektion" },
  { to: "/om-oss", label: "Om oss" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);


  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <TopEventBanner />
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo.url} alt="Lidingö Freeskiers" width={630} height={634} className="size-12" />
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-bold text-heading">Lidingö Freeskiers</span>
            <span className="block text-[11px] text-muted-foreground">Ekholmsnäsbacken</span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-0.5 xl:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-lg px-2.5 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Webbshop-länk väntar – sätt href när adressen finns */}
        <Button
          variant="cta"
          aria-disabled="true"
          title="Webbshopen öppnar snart"
          className="ml-2 hidden cursor-default rounded-full opacity-90 xl:inline-flex"
        >
          Webbshop
        </Button>


        <button

          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Meny"
          className="ml-auto inline-flex size-10 items-center justify-center rounded-lg border border-border text-primary xl:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-background px-4 pb-5 pt-2 xl:hidden">
          <nav className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium"
                activeProps={{ className: "text-primary" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button
            variant="cta"
            size="lg"
            aria-disabled="true"
            title="Webbshopen öppnar snart"
            className="mt-3 w-full cursor-default rounded-full opacity-90"
          >
            Webbshop
          </Button>
        </div>



      ) : null}
    </header>
  );
}
