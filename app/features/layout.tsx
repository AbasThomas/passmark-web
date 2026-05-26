import type { Metadata } from "next";
import { createMetadata } from "../seo";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Pass AI - Your AI Tutor for WAEC & JAMB",
    description:
      "Explore Passmark features for JAMB CBT practice, WAEC past questions, NECO prep, AI tutor explanations, flashcards, offline study and parent progress tracking.",
    path: "/features",
    keywords: [
      "AI tutor Nigeria",
      "AI tutor for JAMB preparation",
      "exam prep app Nigeria",
      "best app to pass JAMB",
      "study app that works offline Nigeria",
    ],
  }),
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
