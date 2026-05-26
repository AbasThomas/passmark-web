import type { Metadata } from "next";
import { createMetadata } from "../seo";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Download Passmark - Free on Android & iOS",
    description:
      "Download Passmark for free and practice JAMB CBT, WAEC past questions, NECO past questions and Post-UTME prep with offline study tools.",
    path: "/download",
    keywords: [
      "JAMB app download",
      "JAMB CBT practice app free download",
      "exam prep app Nigeria",
      "best JAMB app Nigeria 2026",
      "study app that works offline Nigeria",
    ],
  }),
};

export default function DownloadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
