import { createFileRoute } from "@tanstack/react-router";
import { Showcase } from "@/components/showcase/Showcase";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HYPAY — Travel money, without the markup" },
      { name: "description", content: "HYPAY is the travel payments app that removes hidden fees and delays. Spend, pay, and move money across borders — transparent, instant, everywhere. Join the waitlist." },
      { property: "og:title", content: "HYPAY — Travel money, without the markup" },
      { property: "og:description", content: "Spend, pay, and move money across borders — instantly, transparently, without the 3–7% you're losing today. Early access opens soon." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Showcase />;
}
