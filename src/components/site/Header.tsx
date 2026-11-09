import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import logo from "@/assets/logo/freeskiers-logo-2027-blue.png";
import { TopEventBanner } from "@/components/site/TopEventBanner";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/skidklubb", label: "Skidklubb" },
  { to: "/helgskidskola", label: "Helgskidskola" },
  { to: "/kalender", label: "Kalender" },
  { to: "/privatlektion", label: "Privatlektion" },
  { to: "/om-oss", label: "Om oss" },
  { to: "/kontakt", label: "Kontakt" },
  { to: "/medlem", label: "Medlem" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);


  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <TopEventBanner />
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <img
            src={logo}
            alt="Lidingö Freeskiers"
            width={1099}
            height={587}
            className="h-11 w-auto object-contain sm:h-12"
          />
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

        <Button
          variant="cta"
          className="ml-2 hidden rounded-full xl:inline-flex"
          asChild
        >
          <Link to="/webbshop">Webbshop</Link>
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
            className="mt-3 w-full rounded-full"
            asChild
          >
            <Link to="/webbshop" onClick={() => setOpen(false)}>
              Webbshop
            </Link>
          </Button>
        </div>



      ) : null}
    </header>
  );
}
