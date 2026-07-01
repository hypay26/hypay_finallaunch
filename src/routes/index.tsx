import { createFileRoute } from "@tanstack/react-router";
import { Showcase } from "@/components/showcase/Showcase";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nebula — Borderless Commerce, In Motion" },
      { name: "description", content: "A cinematic showcase of Nebula's borderless payments platform: cross-border finance, global availability, and a store engine built for the next web." },
      { property: "og:title", content: "Nebula — Borderless Commerce" },
      { property: "og:description", content: "Cross-border finance, global availability, and a store engine for the next web." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Showcase />;
}
