import type { Metadata } from "next";
import ExamLanding from "../exam-landing";
import { createMetadata, examPages } from "../seo";

const page = examPages.find((item) => item.slug === "waec")!;

export const metadata: Metadata = {
  ...createMetadata({
    title: page.title,
    description: page.description,
    path: "/waec",
    keywords: [
      page.keyword,
      "WAEC past questions",
      "WAEC practice questions",
      "WAEC 2026 preparation",
      "how to pass WAEC",
      "WAEC chemistry past questions and answers",
      "WAEC past questions English language",
    ],
  }),
};

export default function WaecPage() {
  return <ExamLanding {...page} />;
}
