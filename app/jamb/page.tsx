import type { Metadata } from "next";
import ExamLanding from "../exam-landing";
import { createMetadata, examPages } from "../seo";

const page = examPages.find((item) => item.slug === "jamb")!;

export const metadata: Metadata = {
  ...createMetadata({
    title: page.title,
    description: page.description,
    path: "/jamb",
    keywords: [
      page.keyword,
      "JAMB past questions",
      "JAMB CBT practice",
      "JAMB 2026 preparation",
      "how to pass JAMB",
      "JAMB past questions 2024 2025 PDF",
    ],
  }),
};

export default function JambPage() {
  return <ExamLanding {...page} />;
}
