"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instrument_Serif } from "next/font/google";
import { gsap } from "gsap";
import {
  ArrowUpRight01Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  Menu01Icon,
} from "hugeicons-react";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
});

const NAV_LINKS = [
  { href: "/#features",   label: "Features"   },
  { href: "/#pricing",    label: "Pricing"    },
  { href: "/#community",  label: "Community"  },
  { href: "/#download",   label: "Download"   },
];

export default function Navbar() {
  const pathname   = usePathname();
  const navRef     = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  /* ── Mount animation ── */
  useEffect(() => {
    if (!navRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, delay: 0.2, ease: "power3.out" }
    );
  }, []);

  /* ── Scroll ── */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── Mobile overlay animation ── */
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    if (menuOpen) {
      el.style.display = "flex";
      gsap.fromTo(el,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(".mob-link",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.07, delay: 0.12, duration: 0.35, ease: "power2.out" }
      );
    } else {
      gsap.to(el, {
        opacity: 0, y: -8, duration: 0.22, ease: "power2.in",
        onComplete: () => { if (el) el.style.display = "none"; },
      });
    }
  }, [menuOpen]);

  const scrolledStyles: React.CSSProperties = scrolled
    ? {
        background: "rgba(7,17,10,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(250,247,242,0.07)",
      }
    : { background: "transparent" };

  return (
    <>
      <nav
        ref={navRef}
        className={`${instrumentSerif.variable} fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
        style={{ opacity: 1, ...scrolledStyles }}
      >
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 h-[68px] flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
              style={{ background: "#1A7A4A" }}
            >
              <CheckmarkCircle02Icon size={16} style={{ color: "#FAF7F2" }} />
            </div>
            <span
              className="text-lg"
              style={{
                fontFamily: "var(--font-instrument-serif), serif",
                color: scrolled ? "#FAF7F2" : "#FAF7F2",
              }}
            >
              Passmark
            </span>
          </Link>

          {/* Desktop links — all anchor to landing-page sections */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => {
              // Active when on the homepage (where all sections live)
              const active = pathname === "/";
              return (
                <Link
                  key={href}
                  href={href}
                  className="relative text-sm transition-colors duration-150 pb-px"
                  style={{
                    color: active
                      ? "rgba(250,247,242,0.80)"
                      : "rgba(250,247,242,0.45)",
                    fontWeight: 500,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#FAF7F2")}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = active
                      ? "rgba(250,247,242,0.80)"
                      : "rgba(250,247,242,0.45)";
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/#download"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-px active:scale-95"
              style={{
                background: "#1A7A4A",
                color: "#FAF7F2",
              }}
            >
              Download
              <ArrowUpRight01Icon
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-px group-hover:-translate-y-px"
              />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
            style={{ color: "#FAF7F2" }}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <Cancel01Icon size={20} /> : <Menu01Icon size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        ref={overlayRef}
        className={`${instrumentSerif.variable} fixed inset-0 z-40 flex-col px-6 pt-24 pb-10`}
        style={{ display: "none", background: "#07110A" }}
      >
        {/* Close */}
        <button
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
          style={{ color: "rgba(250,247,242,0.6)", background: "rgba(250,247,242,0.06)" }}
          onClick={() => setMenuOpen(false)}
        >
          <Cancel01Icon size={18} />
        </button>

        {/* Logo */}
        <div className="absolute top-4 left-5 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#1A7A4A" }}>
            <CheckmarkCircle02Icon size={16} style={{ color: "#FAF7F2" }} />
          </div>
          <span
            className="text-lg"
            style={{ fontFamily: "var(--font-instrument-serif), serif", color: "#FAF7F2" }}
          >
            Passmark
          </span>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-1 mt-4">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="mob-link py-4 text-4xl font-normal border-b transition-colors"
              style={{
                fontFamily: "var(--font-instrument-serif), serif",
                fontStyle: "italic",
                // All links are "active" on the homepage since they're all sections there
                color: pathname === "/" ? "#FAF7F2" : "rgba(250,247,242,0.35)",
                borderColor: "rgba(250,247,242,0.06)",
              }}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="mob-link mt-auto pt-8">
          <Link
            href="/#download"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-sm font-semibold tracking-wide transition-all active:scale-95"
            style={{ background: "#1A7A4A", color: "#FAF7F2" }}
          >
            Download
            <ArrowUpRight01Icon size={15} />
          </Link>
          <p
            className="text-center mt-4 text-xs font-mono uppercase tracking-widest"
            style={{ color: "rgba(250,247,242,0.2)" }}
          >
            Free to download · Android APK · Beta
          </p>
        </div>
      </div>
    </>
  );
}
