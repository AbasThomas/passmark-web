import type { Metadata } from "next";
import ExamLanding from "../exam-landing";
import { createMetadata, examPages } from "../seo";

const page = examPages.find((item) => item.slug === "neco")!;

export const metadata: Metadata = {
  ...createMetadata({
    title: page.title,
    description: page.description,
    path: "/neco",
    keywords: [
      page.keyword,
      "NECO past questions",
      "NECO past questions biology",
      "past questions Nigeria",
      "exam prep app Nigeria",
    ],
  }),
};

export default function NecoPage() {
  return <ExamLanding {...page} />;
}
