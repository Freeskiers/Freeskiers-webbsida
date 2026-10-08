import { createFileRoute } from "@tanstack/react-router";
import { VerifieraMedlemPage } from "@/components/member/VerifieraMedlemPage";

export const Route = createFileRoute("/verifiera")({
  head: () => ({
    meta: [
      { title: "Verifiera medlem – IK Lidingö Freeskiers" },
      { name: "description", content: "Kontrollera att ett medlemskort i IK Lidingö Freeskiers är giltigt." },
      { property: "og:title", content: "Verifiera medlem – IK Lidingö Freeskiers" },
      { property: "og:description", content: "Kontroll av digitalt medlemskort." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: VerifieraMedlemPage,
});
