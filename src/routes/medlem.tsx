import { createFileRoute } from "@tanstack/react-router";
import { MedlemPortalPage } from "@/components/member/MedlemPortalPage";

export const Route = createFileRoute("/medlem")({
  head: () => ({
    meta: [
      { title: "Mina sidor & medlemskort – IK Lidingö Freeskiers" },
      { name: "description", content: "Logga in för ditt digitala medlemskort, dina åkare och klubbens medlemserbjudanden." },
      { property: "og:title", content: "Mina sidor & medlemskort – IK Lidingö Freeskiers" },
      { property: "og:description", content: "Digitalt medlemskort med QR-kod och medlemserbjudanden." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MedlemPortalPage,
});
