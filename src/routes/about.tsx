import { createFileRoute } from "@tanstack/react-router";
import { AboutUs } from "@/components/showcase/scenes/AboutUs";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — HYPAY by Halith Technologies" },
      {
        name: "description",
        content:
          "Halith Technologies India Private Limited builds blockchain-powered payment infrastructure. HyPay is our flagship cross-border payments platform.",
      },
      { property: "og:title", content: "About — HYPAY by Halith Technologies" },
      {
        property: "og:description",
        content:
          "Bridging traditional finance with the digital economy through fast, secure, cost-effective global payments.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutRoute,
});

function AboutRoute() {
  return <AboutUs />;
}
