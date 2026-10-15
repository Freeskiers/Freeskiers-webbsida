import { createFileRoute } from "@tanstack/react-router";
import { AdminDashboardPage } from "@/components/admin/AdminDashboardPage";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Kansli & SportAdmin Administration – IK Lidingö Freeskiers" },
      { name: "description", content: "Administration av medlemsregister, SportAdmin API v4 live-synk och medlemsdata för IK Lidingö Freeskiers." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboardPage,
});
