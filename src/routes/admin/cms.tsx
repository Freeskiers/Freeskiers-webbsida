import { createFileRoute } from "@tanstack/react-router";
import { FreeskiersStudioPage } from "@/components/cms/FreeskiersStudioPage";

export const Route = createFileRoute("/admin/cms")({
  head: () => ({
    meta: [
      { title: "Freeskiers Studio – Innehållshantering & Webbplatsredigering" },
      {
        name: "description",
        content:
          "Innehållshantering och redigering för IK Lidingö Freeskiers. Uppdatera grupper, priser, kalender, FAQ och information.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: FreeskiersStudioPage,
});
