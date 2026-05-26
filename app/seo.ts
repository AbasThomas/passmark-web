import type { Metadata } from "next";

export const siteUrl = "https://passmark.live";
export const siteName = "Passmark";
export const ogImage = `${siteUrl}/og-image`;

export const primaryKeywords = [
  "JAMB past questions",
  "WAEC past questions",
  "NECO past questions",
  "JAMB CBT practice",
  "past questions Nigeria",
  "WAEC practice questions",
  "Post-UTME past questions",
];

export const secondaryKeywords = [
  "AI tutor Nigeria",
  "exam prep app Nigeria",
  "JAMB 2026 preparation",
  "WAEC 2026 preparation",
  "how to pass JAMB",
  "how to pass WAEC",
  "JAMB score calculator",
  "WAEC grading system",
  "Nigerian exam prep app",
  "best app to pass JAMB",
  "study app for Nigerian students",
  "ICAN past questions",
  "Post-UTME preparation",
];

export const longTailKeywords = [
  "JAMB past questions 2024 2025 PDF",
  "WAEC chemistry past questions and answers",
  "how to pass JAMB in one sitting",
  "JAMB CBT practice app free download",
  "WAEC past questions English language",
  "AI tutor for JAMB preparation",
  "best JAMB app Nigeria 2026",
  "NECO past questions biology",
  "how many questions in JAMB 2026",
  "WAEC grading A1 B2 C4 explained",
  "Post-UTME past questions UI LASU OAU",
  "study app that works offline Nigeria",
];

export const allKeywords = [
  ...primaryKeywords,
  ...secondaryKeywords,
  ...longTailKeywords,
];

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  noIndex = false,
}: SeoInput): Metadata {
  const url = `${siteUrl}${path}`;
  const mergedKeywords = Array.from(new Set([...keywords, ...primaryKeywords]));

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "en_NG",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Passmark - JAMB, WAEC and NECO exam prep app for Nigerian students",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@passmarkng",
      title,
      description,
      images: [ogImage],
    },
    other: {
      "geo.region": "NG",
      "geo.country": "Nigeria",
      "theme-color": "#006036",
    },
  };
}

export const examPages = [
  {
    slug: "jamb",
    title: "JAMB CBT Practice & Past Questions — Passmark",
    h1: "JAMB CBT practice and past questions",
    keyword: "JAMB past questions CBT",
    description:
      "Practice JAMB past questions, CBT mock exams, AI explanations, score tracking and offline revision for JAMB 2026 preparation.",
    bullets: [
      "JAMB CBT practice with timed mock exams",
      "Past questions and answers for high-intent revision",
      "AI tutor explanations in English and Pidgin",
      "Offline study mode for Nigerian students",
    ],
  },
  {
    slug: "waec",
    title: "WAEC Past Questions 1978-2026 — Passmark",
    h1: "WAEC past questions and answers",
    keyword: "WAEC past questions",
    description:
      "Study WAEC past questions from 1978 to 2026 with subject practice, AI explanations, flashcards and offline revision.",
    bullets: [
      "WAEC chemistry, English, biology, maths and more",
      "Practice questions with answers and explanations",
      "WAEC 2026 preparation plans",
      "Offline-first revision for low-data study",
    ],
  },
  {
    slug: "neco",
    title: "NECO Past Questions & Answers — Passmark",
    h1: "NECO past questions for focused revision",
    keyword: "NECO past questions",
    description:
      "Prepare with NECO past questions, subject drills, AI explanations and progress tracking built for Nigerian secondary school students.",
    bullets: [
      "NECO biology, chemistry, physics, maths and English practice",
      "Answers with clear explanations",
      "Daily revision streaks and flashcards",
      "Study anywhere with offline mode",
    ],
  },
  {
    slug: "pricing",
    title: "Passmark Pricing — Free & Pro Plans",
    h1: "Free and Pro exam prep plans",
    keyword: "JAMB app free Nigeria",
    description:
      "Start Passmark free for JAMB, WAEC, NECO and Post-UTME prep, then upgrade for deeper AI tutoring, offline packs and advanced practice.",
    bullets: [
      "Free plan for core exam practice",
      "Pro tools for AI tutoring and deeper analytics",
      "Offline packs for low-data study",
      "Built for Nigerian students and parents",
    ],
  },
];

export const blogPosts = [
  {
    slug: "how-to-pass-jamb-in-one-sitting",
    title: "How to Pass JAMB in One Sitting (2026 Guide)",
    keyword: "how to pass JAMB",
    description:
      "A practical 2026 guide to passing JAMB in one sitting with past questions, CBT practice, topic tracking and weekly mock exams.",
  },
  {
    slug: "waec-grading-system-a1-to-f9",
    title: "WAEC Grading System Explained - A1 to F9",
    keyword: "WAEC grading system",
    description:
      "Understand WAEC grades from A1 to F9, what each grade means, and how students should plan revision for stronger results.",
  },
  {
    slug: "jamb-2026-registration-guide",
    title: "JAMB 2026 Registration Guide",
    keyword: "JAMB 2026 registration",
    description:
      "What Nigerian students should know about JAMB 2026 registration, profile setup, subject choices and CBT preparation.",
  },
  {
    slug: "best-subjects-to-score-300-in-jamb",
    title: "Best Subjects to Score 300+ in JAMB",
    keyword: "JAMB score 300",
    description:
      "How to choose, plan and practice JAMB subjects when your goal is a 300+ score.",
  },
  {
    slug: "waec-vs-neco-which-is-harder",
    title: "WAEC vs NECO - Which is Harder?",
    keyword: "WAEC vs NECO",
    description:
      "A clear comparison of WAEC and NECO difficulty, grading, question style and preparation strategy.",
  },
  {
    slug: "how-jamb-cbt-works",
    title: "How JAMB CBT Works (Full Breakdown)",
    keyword: "JAMB CBT how it works",
    description:
      "Learn how JAMB CBT works, how many questions to expect, how timing works and how to practice before exam day.",
  },
  {
    slug: "top-10-most-failed-waec-subjects",
    title: "Top 10 Most Failed WAEC Subjects",
    keyword: "most failed WAEC subjects",
    description:
      "The WAEC subjects students often struggle with and how to build a better revision plan.",
  },
  {
    slug: "study-for-jamb-in-30-days",
    title: "How to Study for JAMB in 30 Days",
    keyword: "how to study for JAMB",
    description:
      "A 30-day JAMB study plan using past questions, mock exams, daily drills and targeted topic review.",
  },
  {
    slug: "post-utme-cut-off-marks-2026",
    title: "Post-UTME Cut-off Marks 2026",
    keyword: "Post-UTME cut off marks",
    description:
      "A student-friendly guide to Post-UTME cut-off marks, school targets and preparation strategy for 2026 admission.",
  },
  {
    slug: "ican-past-questions-free-download",
    title: "ICAN Past Questions - Free Download",
    keyword: "ICAN past questions",
    description:
      "How ICAN candidates can use past questions, timed practice and explanations to prepare more efficiently.",
  },
];
