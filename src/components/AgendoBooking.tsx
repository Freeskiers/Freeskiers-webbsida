import React, { useEffect, useRef } from "react";
import { Calendar } from "lucide-react";

const AGENDO_SCRIPT_ID = "agendo-booking-widget";
const AGENDO_PROFILE_ID = "252";

type Props = {
  label?: string;
  className?: string;
};

/**
 * AgendoBooking
 * Renders a site-styled button that opens the official Agendo booking panel (profile 252).
 * The native Agendo widget button is kept in a hidden container and clicked programmatically
 * so the look stays consistent with the Freeskiers brand design.
 */
export const AgendoBooking: React.FC<Props> = ({
  label = "Boka privatlektion",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) container.innerHTML = "";

    if (!document.getElementById(AGENDO_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = AGENDO_SCRIPT_ID;
      script.src = "https://booking.agendo.io/agendo_loader.js";
      script.dataset["profileId"] = AGENDO_PROFILE_ID;
      script.dataset["buttonText"] = "Boka";
      script.dataset["buttonPrimaryColor"] = "#098ACB";
      script.dataset["buttonSecondaryColor"] = "#FFFFFF";
      script.dataset["buttonTextPrimaryColor"] = "#1B365D";
      script.dataset["buttonTextSecondaryColor"] = "#FFFFFF";
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
      <button
        type="button"
        onClick={openBooking}
        className={`inline-flex items-center justify-center gap-2 bg-freeskiers-cyan hover:bg-freeskiers-lightcyan text-white py-3.5 px-8 rounded-full font-bold text-base shadow-soft hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 ${className}`}
      >
        <Calendar className="w-5 h-5 text-white" />
        <span>{label}</span>
      </button>
      <div ref={containerRef} className="agendo-button-container hidden" aria-hidden="true" />
    </>
  );
};
