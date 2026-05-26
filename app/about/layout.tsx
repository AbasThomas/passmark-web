import type { Metadata } from "next";
import { createMetadata } from "../seo";

export const metadata: Metadata = {
  ...createMetadata({
    title: "About Passmark - Nigerian Exam Prep App",
    description:
      "Learn how Passmark helps Nigerian students prepare for JAMB, WAEC, NECO and Post-UTME with past questions, AI tutoring and offline study.",
    path: "/about",
    keywords: ["Nigerian exam prep app", "study app for Nigerian students", "AI tutor Nigeria"],
  }),
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
