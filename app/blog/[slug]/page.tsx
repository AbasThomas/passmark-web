import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { blogPosts, createMetadata, siteUrl } from "../../seo";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return createMetadata({
      title: "Exam Prep Guide",
      description: "Passmark exam preparation guide for Nigerian students.",
      path: "/blog",
    });
  }

  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: [post.keyword, "JAMB past questions", "WAEC past questions", "exam prep app Nigeria"],
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    author: {
      "@type": "Organization",
      name: "Passmark",
    },
    publisher: {
      "@type": "Organization",
      name: "Passmark",
    },
  };

  return (
    <main className="min-h-screen bg-[#F7F9FC] px-4 pb-20 pt-32 text-[#191C1E] md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="mx-auto max-w-[860px]">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#006036]">
          {post.keyword}
        </p>
        <h1 className="text-[clamp(40px,7vw,76px)] font-black leading-[0.98] tracking-[-0.02em]">
          {post.title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-[#3F4941]">{post.description}</p>

        <div className="mt-10 rounded-[8px] border border-[#BEC9BE]/50 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black">Quick study plan</h2>
          <div className="mt-6 space-y-4">
            {[
              "Start with the exact exam format and question timing.",
              "Practice past questions daily and tag every weak topic.",
              "Use explanations to understand why an answer is correct.",
              "Take weekly mock exams and review mistakes immediately.",
            ].map((item) => (
              <div key={item} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#006036]" />
                <p className="text-sm leading-6 text-[#3F4941]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/download"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-[#006036] px-6 text-sm font-bold text-white"
          >
            Download Passmark <ArrowRight size={16} />
          </Link>
          <Link
            href="/blog"
            className="inline-flex h-12 items-center rounded-full border border-[#006036]/20 px-6 text-sm font-bold text-[#006036]"
          >
            More guides
          </Link>
        </div>
      </article>
    </main>
  );
}
