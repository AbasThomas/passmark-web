"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Download04Icon as Download,
  EyeIcon as Eye,
  Link02Icon as LinkIcon,
  Mail01Icon as Mail,
  RocketIcon as Rocket,
} from "hugeicons-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(
        ".about-hero-badge",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );

      gsap.fromTo(
        ".about-hero-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: "power2.out" }
      );

      gsap.fromTo(
        ".about-hero-desc",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: "power2.out" }
      );

      // Section animations
      gsap.utils.toArray<HTMLElement>(".about-section").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          }
        );
      });

      // Founder card animation
      gsap.fromTo(
        ".founder-image",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".founder-image",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".founder-details",
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".founder-details",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={sectionRef} className="min-h-screen bg-surface">
      {/* Hero Section */}
      <section className="relative px-4 md:px-10 py-20 max-w-[1280px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 z-10">
            <span className="about-hero-badge font-mono text-sm text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">
              Our Story
            </span>
            <h1 className="about-hero-title text-[clamp(40px,6vw,64px)] font-extrabold text-on-surface tracking-tight leading-[1.1]">
              Built for Nigerian Students, by <span className="text-primary">Nigerian Students.</span>
            </h1>
            <p className="about-hero-desc text-lg text-on-surface-variant max-w-xl leading-relaxed">
              We started in a crowded lecture hall in Akoka, frustrated by outdated resources and disconnected study groups. Passmark is the ecosystem we wished we had.
            </p>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl group-hover:bg-primary/10 transition-colors"></div>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-outline-variant/20 bg-white">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcKN7XXawaJY7oBnT5mDw0K_JIcaFVMHUFQ2lhS5je8jxC0YnXkdcs_TLi78u-9NDMvwT9xyuG8nhMGONqtiVcOCF1tB8UQ4fPgwGv8Z9CPB-7icYVRqdRD0WThjLZ8DDtC84vdfeRcDHvQU4Jlh3MjDSBwMk0-KnW-nqLOWg0ISCCt6M0NuT3ff1Nfvy9l364-_hiSsMbSic34zcJYWFaZAffjGnSeYSi67hx3lb5kNWiE537zXNPx--GfWgp_ztV1B_csknBVIY"
                alt="High-resolution, authentic photo of Nigerian university students collaborating in a modern study hall."
                width={600}
                height={400}
                className="w-full aspect-video object-cover group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Bento Style */}
      <section className="about-section bg-surface-container-low py-20 border-y border-outline-variant/10">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mission */}
            <div className="md:col-span-2 bg-white p-10 rounded-2xl flex flex-col justify-between shadow-lg border border-outline-variant/20 hover:-translate-y-1 transition-all relative overflow-hidden group">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-6">
                  <Rocket className="text-white" size={24} />
                </div>
                <h3 className="text-[clamp(24px,3vw,32px)] font-bold mb-4">Our Mission</h3>
                <p className="text-lg text-on-surface-variant leading-relaxed">
                  To democratize elite academic resources across Nigeria, ensuring that whether you're in Lagos, Kano, or Enugu, you have the digital tools to excel in your degree and beyond.
                </p>
              </div>
              <div className="mt-8 flex gap-4 relative z-10">
                <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-2/3"></div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>

            {/* Vision */}
            <div className="bg-primary text-white p-10 rounded-2xl shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6">
                <Eye className="text-primary" size={24} />
              </div>
              <h3 className="text-[clamp(24px,3vw,32px)] font-bold mb-4">Our Vision</h3>
              <p className="text-white/80 leading-relaxed">
                To become the central operating system for the Nigerian student—bridging the gap between university learning and global career readiness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Founder */}
      <section className="about-section py-20 px-4 md:px-10 max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-primary uppercase tracking-widest">Founder</span>
          <h2 className="text-[clamp(28px,4vw,32px)] font-bold mt-2">The Mind Behind the Mark</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Founder Image */}
            <div className="w-full md:w-1/2 group founder-image">
              <div className="relative overflow-hidden rounded-xl shadow-xl border border-outline-variant/20 bg-white aspect-4/5">
                <Image
                  src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg"
                  alt="Thomas Abas Portrait"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Founder Details */}
            <div className="w-full md:w-1/2 space-y-6 founder-details">
              <div className="space-y-1">
                <h4 className="text-[clamp(32px,4vw,40px)] font-extrabold text-on-surface">Thomas Abas</h4>
                <p className="font-mono text-sm text-primary font-bold tracking-widest uppercase">Founder &amp; Lead Architect</p>
              </div>
              
              <div className="h-1 w-12 bg-primary rounded-full"></div>
              
              <p className="text-lg text-on-surface-variant leading-relaxed">
                Thomas is a Lagos-based engineer turned educator who spent 4 years building academic software before founding Passmark. He's obsessed with solving the data-access gap for Nigerian students and can usually be found at a local tech hub or watching Arsenal on weekends.
              </p>
              
              <div className="flex gap-4 pt-4">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
                  aria-label="Website"
                >
                  <LinkIcon size={18} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Kit / Press */}
      <section className="about-section py-20 bg-surface-container-low border-y border-outline-variant/10">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10">
          <div className="bg-white p-12 rounded-3xl border-dashed border-2 border-outline-variant shadow-lg relative overflow-hidden group">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h2 className="text-[clamp(24px,3vw,32px)] font-bold">Media Kit</h2>
                <p className="text-on-surface-variant mt-2">Download our brand assets, photos, and official press releases.</p>
              </div>
              <div className="flex gap-4">
                <button className="bg-on-surface text-white py-4 px-8 rounded-lg font-bold flex items-center gap-2 shadow-xl hover:bg-primary transition-colors">
                  <Download size={20} />
                  Download All (.ZIP)
                </button>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-outline-variant/20 grid grid-cols-2 md:grid-cols-4 gap-6 opacity-40 grayscale transition-all">
              <div className="flex items-center justify-center font-bold text-xl tracking-tighter italic">TECHCABAL</div>
              <div className="flex items-center justify-center font-bold text-xl tracking-tighter">BusinessDay</div>
              <div className="flex items-center justify-center font-bold text-xl tracking-tighter italic uppercase">Pulse.ng</div>
              <div className="flex items-center justify-center font-bold text-xl tracking-tighter">Stears.</div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="about-section py-20 px-4 md:px-10">
        <div className="bg-secondary-container rounded-3xl p-12 lg:p-20 relative overflow-hidden text-on-secondary-container max-w-[1280px] mx-auto shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-on-secondary-container opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-[clamp(32px,5vw,56px)] font-extrabold mb-6 leading-tight">
              Ready to hit your <span className="underline decoration-wavy decoration-on-secondary-container">pass mark</span>?
            </h2>
            <p className="text-lg mb-10 opacity-90 leading-relaxed">
              Join 50,000+ Nigerian students already using Passmark to dominate their exams.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <button className="bg-on-secondary-container text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl">
                Join the Waitlist
              </button>
              <button className="border-2 border-on-secondary-container px-8 py-4 rounded-xl font-bold text-lg hover:bg-on-secondary-container hover:text-white transition-all">
                Contact Partnerships
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
