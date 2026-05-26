import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import SocialProofMarquee from "@/components/home/SocialProofMarquee";
import ProblemSection from "@/components/home/ProblemSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import PassAIShowcase from "@/components/home/PassAIShowcase";
import GamificationSection from "@/components/home/GamificationSection";
import PricingPreview from "@/components/home/PricingPreview";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import DownloadCTA from "@/components/home/DownloadCTA";
import PassmarkSignature from "@/components/home/PassmarkSignature";
import { createMetadata, longTailKeywords, secondaryKeywords, siteUrl } from "./seo";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Passmark - Hit Your Passmark",
    description:
      "Practice JAMB past questions, WAEC past questions, NECO past questions and JAMB CBT practice with Passmark. AI explanations in English and Pidgin, offline study and free exam prep for Nigeria.",
    keywords: [
      "JAMB past questions",
      "WAEC past questions",
      "NECO past questions",
      "JAMB CBT practice",
      "past questions Nigeria",
      ...secondaryKeywords,
      ...longTailKeywords,
    ],
  }),
};

const homeFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I practice JAMB past questions on Passmark?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Passmark helps Nigerian students practice JAMB past questions, CBT mock exams and topic drills with instant explanations.",
      },
    },
    {
      "@type": "Question",
      name: "Does Passmark include WAEC and NECO past questions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Passmark supports WAEC past questions, NECO past questions and other Nigerian exam prep workflows.",
      },
    },
    {
      "@type": "Question",
      name: "Does Passmark work offline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Passmark is built for Nigerian students and includes offline-first study flows so students can keep practicing with limited data.",
      },
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: siteUrl,
  name: "Passmark",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/blog?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([homeFaq, websiteSchema]) }}
      />
      <HeroSection />
      <SocialProofMarquee />
      <ProblemSection />
      <div id="features"><FeaturesSection /></div>
      <PassAIShowcase />
      <div id="community"><GamificationSection /></div>
      <div id="pricing"><PricingPreview /></div>
      <TestimonialsSection />
      <div id="download"><DownloadCTA /></div>
      <PassmarkSignature />
    </main>
  );
}
