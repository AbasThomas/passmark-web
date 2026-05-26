import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts, createMetadata, siteUrl } from "../seo";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Passmark Blog - Exam Tips & Guides",
    description:
      "Read practical guides on how to pass JAMB, WAEC grading, JAMB CBT practice, Post-UTME cut-off marks, NECO prep and Nigerian exam strategy.",
    path: "/blog",
    keywords: [
      "how to pass JAMB",
      "how to pass WAEC",
      "JAMB 2026 registration",
      "WAEC grading system",
      "Post-UTME preparation",
    ],
  }),
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: blogPosts.map((post, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${siteUrl}/blog/${post.slug}`,
    name: post.title,
  })),
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#F7F9FC] px-4 pb-20 pt-32 text-[#191C1E] md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <section className="mx-auto max-w-[1120px]">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#006036]">
          Exam tips and guides
        </p>
        <h1 className="max-w-4xl text-[clamp(42px,7vw,82px)] font-black leading-[0.98] tracking-[-0.02em]">
          JAMB, WAEC, NECO and Post-UTME preparation guides.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#3F4941]">
          High-intent study guides for Nigerian students preparing with past
          questions, CBT practice, grading systems and smarter revision plans.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-[8px] border border-[#BEC9BE]/50 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl"
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#006036]">
                {post.keyword}
              </p>
              <h2 className="text-2xl font-black leading-tight">{post.title}</h2>
              <p className="mt-4 text-sm leading-6 text-[#3F4941]">
                {post.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#006036]">
                Read guide <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
