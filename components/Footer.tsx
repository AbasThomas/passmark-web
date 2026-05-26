"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import {
  InstagramIcon,
  NewTwitterIcon,
  TiktokIcon,
  YoutubeIcon,
  CheckmarkCircle02Icon,
  ArrowRight01Icon,
} from "hugeicons-react";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
});

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const draw = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const img = ctx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 18;
      }
      ctx.putImageData(img, 0, 0);
    };
    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  const columns = [
    {
      heading: "Product",
      links: [
        { href: "/features",         label: "Features"      },
        { href: "/pricing",          label: "Pricing"       },
        { href: "/download",         label: "Download App"  },
        { href: "/features#ai",      label: "Pass AI"       },
        { href: "/features#league",  label: "Pass League"   },
        { href: "/features#offline", label: "Offline Mode"  },
      ],
    },
    {
      heading: "Company",
      links: [
        { href: "/about",   label: "About"   },
        { href: "/blog",    label: "Blog"    },
        { href: "/careers", label: "Careers" },
        { href: "/contact", label: "Contact" },
      ],
    },
    {
      heading: "Support",
      links: [
        { href: "/help",         label: "Help Centre"     },
        { href: "/privacy",      label: "Privacy Policy"  },
        { href: "/terms",        label: "Terms of Service"},
        { href: "/parent-guide", label: "Parent Guide"    },
      ],
    },
  ];

  const socials = [
    { href: "https://instagram.com/passmarkng",  Icon: InstagramIcon, label: "Instagram" },
    { href: "https://twitter.com/passmarkng",    Icon: NewTwitterIcon, label: "Twitter"   },
    { href: "https://tiktok.com/@passmarkng",    Icon: TiktokIcon,    label: "TikTok"    },
    { href: "https://youtube.com/@passmarkng",   Icon: YoutubeIcon,   label: "YouTube"   },
  ];

  return (
    <footer
      className={`${instrumentSerif.variable} relative overflow-hidden`}
      style={{ background: "#060F09", color: "#FAF7F2" }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        style={{ mixBlendMode: "overlay", opacity: 0.3 }}
      />

      {/* Subtle green radial */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 100%, rgba(26,122,74,0.12) 0%, transparent 65%)",
        }}
      />

      {/* ── CTA Banner ─────────────────────────────────────────────────────── */}
      <div
        className="relative z-10 border-b"
        style={{ borderColor: "rgba(250,247,242,0.08)" }}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 md:py-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <p
              className="text-xs uppercase tracking-[0.2em] font-mono"
              style={{ color: "#FEAE2C" }}
            >
              Ready to ace your exams?
            </p>
            <h2
              className="text-5xl md:text-7xl font-normal italic leading-[0.92] tracking-tight"
              style={{ fontFamily: "var(--font-instrument-serif), serif" }}
            >
              Start studying{" "}
              <span style={{ color: "#1A7A4A" }}>smarter</span>
              <span style={{ color: "rgba(250,247,242,0.25)" }}>.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/download"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "#1A7A4A",
                color: "#FAF7F2",
                boxShadow: "0 0 0 1.5px rgba(26,122,74,0.4), 4px 4px 0px 0px rgba(26,122,74,0.25)",
              }}
            >
              Download Free
              <ArrowRight01Icon className="w-4 h-4 transition-transform group-hover:translate-x-1" size={16} />
            </Link>

            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "transparent",
                color: "#FAF7F2",
                border: "1.5px solid rgba(250,247,242,0.15)",
              }}
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Grid ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 pt-14 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 pb-14 border-b" style={{ borderColor: "rgba(250,247,242,0.08)" }}>

          {/* Brand col */}
          <div className="col-span-1 lg:col-span-4 space-y-7">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                style={{ background: "#1A7A4A" }}
              >
                <CheckmarkCircle02Icon className="w-5 h-5" style={{ color: "#FAF7F2" }} size={20} />
              </div>
              <span
                className="text-xl font-normal"
                style={{ fontFamily: "var(--font-instrument-serif), serif" }}
              >
                Passmark
              </span>
            </Link>

            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(250,247,242,0.55)" }}>
              Nigeria's #1 exam prep platform. 48 years of past questions, AI-powered explanations, and national leagues — online and offline.
            </p>

            {/* Newsletter */}
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "#FEAE2C" }}>
                Passmark Gazette
              </p>
              <div className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-grow px-4 py-3 rounded-xl text-sm font-medium focus:outline-none transition-colors"
                  style={{
                    background: "rgba(250,247,242,0.05)",
                    border: "1.5px solid rgba(250,247,242,0.1)",
                    color: "#FAF7F2",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(26,122,74,0.6)")}
                  onBlur={e  => (e.currentTarget.style.borderColor = "rgba(250,247,242,0.1)")}
                />
                <button
                  type="button"
                  className="px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all hover:-translate-y-0.5 active:scale-95"
                  style={{ background: "#FEAE2C", color: "#060F09" }}
                >
                  Go
                </button>
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-1" />

          {/* Link columns */}
          <div className="col-span-1 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
            {columns.map(({ heading, links }) => (
              <div key={heading} className="space-y-5">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: "#FEAE2C" }}>
                  {heading}
                </h3>
                <ul className="space-y-3">
                  {links.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-sm transition-colors hover:underline"
                        style={{ color: "rgba(250,247,242,0.6)" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#FAF7F2")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(250,247,242,0.6)")}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────────────── */}
        <div className="relative pt-10 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Socials */}
          <div className="flex gap-3">
            {socials.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "rgba(250,247,242,0.05)",
                  border: "1.5px solid rgba(250,247,242,0.1)",
                  color: "rgba(250,247,242,0.7)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "#1A7A4A";
                  (e.currentTarget as HTMLElement).style.borderColor = "#1A7A4A";
                  (e.currentTarget as HTMLElement).style.color = "#FAF7F2";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(250,247,242,0.05)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(250,247,242,0.1)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(250,247,242,0.7)";
                }}
              >
                <Icon className="w-4 h-4" size={16} />
              </a>
            ))}
          </div>

          {/* Legal */}
          <div className="text-center space-y-1">
            <p className="text-xs font-mono uppercase tracking-wider" style={{ color: "rgba(250,247,242,0.35)" }}>
              © 2026 Passmark Technologies. All rights reserved.
            </p>
            <p className="text-xs font-mono uppercase tracking-wider" style={{ color: "rgba(254,174,44,0.6)" }}>
              Made with 💚 for Nigerian students.
            </p>
          </div>

          {/* Decorative wordmark */}
          <div
            aria-hidden="true"
            className="absolute right-0 bottom-0 select-none pointer-events-none font-normal italic leading-none"
            style={{
              fontFamily: "var(--font-instrument-serif), serif",
              fontSize: "clamp(80px, 14vw, 180px)",
              color: "rgba(250,247,242,0.03)",
              letterSpacing: "-0.03em",
            }}
          >
            Passmark.
          </div>
        </div>
      </div>
    </footer>
  );
}