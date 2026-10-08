import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";

const AGENDO_SCRIPT_ID = "agendo-booking-widget";
const AGENDO_PROFILE_ID = "252";

type Props = {
  label?: string;
  className?: string;
};

/**
 * Renders a site-styled button that opens the Agendo booking panel.
 * The native Agendo widget button is kept in a hidden container and
 * clicked programmatically so the look stays consistent with the site.
 */
export function AgendoBooking({ label = "Boka privatlektion", className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) container.innerHTML = "";

    if (!document.getElementById(AGENDO_SCRIPT_ID)) {
      const rootStyles = getComputedStyle(document.documentElement);
      const script = document.createElement("script");
      script.id = AGENDO_SCRIPT_ID;
      script.src = "https://booking.agendo.io/agendo_loader.js";
      script.dataset["profileId"] = AGENDO_PROFILE_ID;
      script.dataset["buttonText"] = "Boka";
      script.dataset["buttonPrimaryColor"] = rootStyles.getPropertyValue("--primary").trim();
      script.dataset["buttonSecondaryColor"] = rootStyles.getPropertyValue("--background").trim();
      script.dataset["buttonTextPrimaryColor"] = rootStyles.getPropertyValue("--primary-deep").trim();
      script.dataset["buttonTextSecondaryColor"] = rootStyles.getPropertyValue("--primary-foreground").trim();
      script.defer = true;
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById(AGENDO_SCRIPT_ID)?.remove();
      document.getElementById("agendo-iframe-container")?.remove();
      document.getElementById("agendo-widget-style")?.remove();
      if (container) container.innerHTML = "";
    };
  }, []);

  const openBooking = () => {
    const native = document.querySelector<HTMLButtonElement>(".agendo-button-container button");
    if (native) {
      native.click();
      return;
    }
    let tries = 0;
    const timer = window.setInterval(() => {
      const btn = document.querySelector<HTMLButtonElement>(".agendo-button-container button");
      if (btn) {
        window.clearInterval(timer);
        btn.click();
      } else if (++tries > 20) {
        window.clearInterval(timer);
      }
    }, 250);
  };

  return (
    <>
      <Button
        variant="cta"
        size="xl"
        className={`rounded-full ${className ?? ""}`}
        onClick={openBooking}
      >
        {label}
      </Button>
      <div ref={containerRef} className="agendo-button-container hidden" aria-hidden="true" />
    </>
  );
}
