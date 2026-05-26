import type { Metadata } from "next";
import ExamLanding from "../exam-landing";
import { createMetadata, examPages } from "../seo";

const page = examPages.find((item) => item.slug === "pricing")!;

export const metadata: Metadata = {
  ...createMetadata({
    title: page.title,
    description: page.description,
    path: "/pricing",
    keywords: [
      page.keyword,
      "JAMB app free Nigeria",
      "exam prep app Nigeria",
      "best app to pass JAMB",
      "study app for Nigerian students",
    ],
  }),
};

export default function PricingPage() {
  return <ExamLanding {...page} />;
}
