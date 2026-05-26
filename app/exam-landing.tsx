import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type ExamLandingProps = {
  h1: string;
  keyword: string;
  description: string;
  bullets: string[];
};

export default function ExamLanding({ h1, keyword, description, bullets }: ExamLandingProps) {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Does Passmark help with ${keyword}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. Passmark is built to help Nigerian students prepare with ${keyword}, practice questions, mock exams and AI explanations.`,
        },
      },
      {
        "@type": "Question",
        name: "Can I study offline?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Passmark supports offline-first study flows so students can keep practicing when data or power is unreliable.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F7F9FC] text-[#191C1E]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <section className="px-4 pb-20 pt-32 md:px-10 md:pb-28">
        <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#006036]">
              {keyword}
            </p>
            <h1 className="max-w-3xl text-[clamp(42px,7vw,82px)] font-black leading-[0.98] tracking-[-0.02em]">
              {h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#3F4941]">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/download"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[#006036] px-6 text-sm font-bold text-white"
              >
                Download Passmark <ArrowRight size={16} />
              </Link>
              <Link
                href="/features"
                className="inline-flex h-12 items-center rounded-full border border-[#006036]/20 px-6 text-sm font-bold text-[#006036]"
              >
                Explore features
              </Link>
            </div>
          </div>

          <div className="rounded-[8px] border border-[#BEC9BE]/50 bg-white p-6 shadow-xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-[#006036]">
              What you get
            </p>
            <div className="space-y-4">
              {bullets.map((bullet) => (
                <div key={bullet} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#006036]" />
                  <p className="text-sm leading-6 text-[#3F4941]">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
