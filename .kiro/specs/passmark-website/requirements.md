# Requirements Document

## Introduction

Passmark is Nigeria's AI-powered exam prep platform for WAEC, JAMB, NECO, and professional exam candidates. This document defines the requirements for building the full Passmark marketing website — a 10-page Next.js 16 (App Router) site with Tailwind CSS v4, GSAP + ScrollTrigger animations, and Lenis smooth scroll. The site targets `passmark.live` with the tagline "Hit Your Passmark" and must be fully responsive, performant, and SEO-optimised.

## Glossary

- **Website**: The Passmark marketing website at `passmark.live`
- **App_Router**: Next.js 16 App Router (`app/` directory)
- **Design_System**: The defined set of color tokens, typography tokens, and spacing tokens specified in this document
- **GSAP**: GreenSock Animation Platform, used for all JavaScript-driven animations
- **ScrollTrigger**: GSAP plugin that triggers animations based on scroll position
- **Lenis**: Smooth-scroll library connected to GSAP's ticker
- **CustomCursor**: A custom 12px green circle cursor with GSAP lerp follow, desktop-only
- **Navbar**: The global top navigation bar with logo, nav links, auth buttons, and mobile hamburger
- **Footer**: The global 4-column dark-background footer with social links and nav links
- **MarqueeStrip**: A seamless infinite-scroll horizontal strip, pause-on-hover, configurable direction and speed
- **LenisProvider**: A Client Component context provider that initialises Lenis and connects it to GSAP ScrollTrigger
- **Pass_AI**: Passmark's AI-powered study assistant feature
- **hugeicons**: The `hugeicons-react` icon package used for all icons — no emojis permitted
- **Server_Component**: A Next.js React Server Component (default in App Router)
- **Client_Component**: A Next.js React Client Component marked with `"use client"`
- **Reduced_Motion**: The `prefers-reduced-motion: reduce` CSS media query / JS `matchMedia` check

## Requirements

---

### Requirement 1: Design System & Global Tokens

**User Story:** As a developer, I want a single source of truth for all design tokens, so that every page and component uses consistent colors, typography, and spacing.

#### Acceptance Criteria

1. THE Website SHALL define the following custom color tokens in `app/globals.css` using Tailwind v4 `@theme` syntax: `primary` (#006036), `primary-container` (#1A7A4A), `primary-fixed` (#9BF6BA), `on-primary` (#FFFFFF), `secondary` (#835500), `secondary-container` (#FEAE2C), `on-secondary` (#FFFFFF), `on-secondary-container` (#6B4500), `surface` (#F7F9FC), `surface-container` (#ECEEF1), `surface-container-low` (#F2F4F7), `surface-container-lowest` (#FFFFFF), `surface-container-high` (#E6E8EB), `on-surface` (#191C1E), `on-surface-variant` (#3F4941), `outline-variant` (#BEC9BE), `on-secondary-fixed-variant` (#633F00), `inverse-surface` (#2D3133), `inverse-on-surface` (#EFF1F4), `error` (#BA1A1A), `error-container` (#FFDAD6).
2. THE Website SHALL load the following Google Fonts via `next/font/google` with CSS variable exposure: Syne (weights 700, 800) as `--font-syne`, Plus Jakarta Sans (weights 400, 500, 600, 700) as `--font-jakarta`, and JetBrains Mono (weight 500) as `--font-mono`.
3. THE Website SHALL define typography utility classes in `globals.css` matching the specified tokens: `display-xl` (64px / lh 1.1 / tracking -0.02em / weight 800 / Syne), `display-xl-mobile` (40px / lh 1.1 / tracking -0.01em / weight 800 / Syne), `headline-lg` (32px / lh 1.2 / weight 700 / Syne), `headline-md` (24px / lh 1.3 / weight 700 / Syne), `body-lg` (18px / lh 1.6 / weight 400 / Plus Jakarta Sans), `body-md` (16px / lh 1.5 / weight 400 / Plus Jakarta Sans), `button` (16px / lh 1 / tracking 0.02em / weight 600 / Plus Jakarta Sans), `label-mono` (14px / lh 1.4 / tracking 0.05em / weight 500 / JetBrains Mono).
4. THE Website SHALL define spacing tokens: `stack-sm` (12px), `stack-md` (24px), `stack-lg` (48px), `margin-mobile` (16px), `margin-desktop` (40px), `container-max` (1280px), `gutter` (24px).
5. THE Website SHALL define breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px).
6. THE Website SHALL apply a grain texture overlay globally via a pseudo-element in `globals.css`.
7. THE Website SHALL use `hugeicons-react` for all icons — no emoji characters are permitted anywhere in the codebase.

---

### Requirement 2: Root Layout & Global Providers

**User Story:** As a visitor, I want smooth scrolling and a consistent layout shell on every page, so that navigation feels polished and the site loads predictably.

#### Acceptance Criteria

1. THE App_Router root layout (`app/layout.tsx`) SHALL render the `LenisProvider`, `CustomCursor`, `Navbar`, and `Footer` as global wrappers around all page content.
2. THE LenisProvider SHALL be a Client_Component that initialises a Lenis instance, connects it to GSAP's `ScrollTrigger.scrollerProxy`, and calls `ScrollTrigger.refresh()` on resize.
3. THE LenisProvider SHALL call `lenis.destroy()` and clean up the GSAP ticker callback in its `useEffect` cleanup function.
4. THE CustomCursor SHALL be a Client_Component that renders a 12px green circle following the mouse pointer with GSAP lerp interpolation, visible only on non-touch desktop devices.
5. WHEN the CustomCursor hovers over an interactive card element, THE CustomCursor SHALL expand to a 40px ring and display an "Explore →" pill label.
6. WHEN `Reduced_Motion` is enabled, THE CustomCursor SHALL disable all GSAP animations and fall back to the default system cursor.
7. THE root layout SHALL export a `metadata` object with `title`, `description`, `openGraph`, and `twitter` fields for the site default.
8. THE root layout SHALL import `globals.css` and apply the three font CSS variables to the `<html>` element's `className`.

---

### Requirement 3: Navbar Component

**User Story:** As a visitor, I want a clear, accessible navigation bar on every page, so that I can reach any section of the site quickly.

#### Acceptance Criteria

1. THE Navbar SHALL display the Passmark logo on the left, navigation links in the centre (Home, Features, Pricing, About, Download), and "Log In" + "Sign Up" buttons on the right on viewports ≥ `md` breakpoint.
2. THE Navbar SHALL display only the Passmark logo and a hamburger menu icon on viewports < `md` breakpoint.
3. WHEN the hamburger icon is activated on mobile, THE Navbar SHALL render a full-screen green overlay with navigation links and auth buttons, animated with GSAP.
4. WHEN the page loads, THE Navbar SHALL animate sliding down from above the viewport using GSAP.
5. WHEN the user scrolls down more than 80px, THE Navbar SHALL apply a semi-transparent background with backdrop blur.
6. WHEN the user scrolls back to the top (< 80px), THE Navbar SHALL remove the scroll-aware background.
7. THE Navbar SHALL use `next/link` for all internal navigation links.
8. THE Navbar SHALL be a Client_Component to support scroll detection and GSAP animations.

---

### Requirement 4: Footer Component

**User Story:** As a visitor, I want a comprehensive footer on every page, so that I can find secondary links, social profiles, and legal pages.

#### Acceptance Criteria

1. THE Footer SHALL render a 4-column grid layout on desktop viewports (≥ `lg`), a 2-column layout on tablet (≥ `md`), and a 1-column layout on mobile.
2. THE Footer SHALL include: a brand column (logo, tagline, social icon links), a Product column (Features, Pricing, Download), a Company column (About, Contact, Blog), and a Legal column (Privacy Policy, Terms of Service).
3. THE Footer SHALL use a dark background (`inverse-surface` token) with `inverse-on-surface` text.
4. THE Footer SHALL display social links using `hugeicons-react` icons (no emoji).
5. THE Footer SHALL display a copyright notice at the bottom.

---

### Requirement 5: Home Page (/)

**User Story:** As a prospective student, I want a compelling home page that communicates Passmark's value proposition, so that I understand the product and am motivated to sign up.

#### Acceptance Criteria

1. THE Home_Page SHALL render 9 distinct sections in order: Hero, Social Proof Marquee, Problem Section, Features Section, Pass AI Showcase, Gamification Section, Pricing Preview, Testimonials, and Download CTA.
2. THE Hero_Section SHALL render a 2-column layout (text left, phone mockup right) on desktop, stacking vertically on viewports < `md`.
3. THE Hero_Section SHALL display a gradient headline, two CTA buttons ("Get Started Free" and "See How It Works"), social proof avatars, and two floating stat cards.
4. WHEN the Hero_Section mounts, THE Hero_Section SHALL animate the headline with GSAP letter stagger, the phone mockup with a CSS float loop keyframe, and the stat cards with a GSAP stagger fade-in.
5. WHEN the user moves the mouse over the Hero_Section on desktop, THE Hero_Section SHALL apply a GSAP mousemove parallax to the phone mockup with a maximum offset of ±15px and smooth lerp.
6. THE Social_Proof_Marquee SHALL render a green-background `MarqueeStrip` scrolling exam names (WAEC, JAMB, NECO, GCE, ICAN, ACCA, CIPM, ICAN, WAEC CBT, Post-UTME).
7. THE Problem_Section SHALL render a dark background with 3 stat cards displaying count-up animations triggered by `ScrollTrigger` when the section enters the viewport.
8. THE Features_Section SHALL implement a sticky-scroll layout: the left panel remains fixed while 8 feature cards scroll on the right, each sliding in from the right via `ScrollTrigger`.
9. THE Pass_AI_Showcase SHALL render a dark background with a chat mockup that displays a typewriter effect cycling through AI responses, and an English/Pidgin language toggle that restarts the typewriter.
10. THE Gamification_Section SHALL render 4 feature cards and a horizontally scrollable level progression strip showing 12 levels.
11. THE Pricing_Preview SHALL render 3 plan cards as a teaser linking to the full Pricing page.
12. THE Testimonials_Section SHALL render two `MarqueeStrip` rows scrolling in opposite directions.
13. THE Download_CTA_Section SHALL render a split layout (green panel + dark panel) with app store links.
14. WHEN `Reduced_Motion` is enabled, THE Home_Page SHALL disable all GSAP scroll and entrance animations.
15. THE Home_Page SHALL export a `metadata` object with page-specific `title`, `description`, `openGraph`, and `twitter` fields.

---

### Requirement 6: Pricing Page (/pricing)

**User Story:** As a prospective student, I want to compare subscription plans clearly, so that I can choose the plan that fits my budget and needs.

#### Acceptance Criteria

1. THE Pricing_Page SHALL render 7 plan cards with name, price, feature list, and a CTA button each.
2. THE Pricing_Page SHALL include a monthly/annual billing toggle that simultaneously updates all displayed prices across all 7 cards.
3. THE Pricing_Page SHALL render a full feature comparison table below the plan cards.
4. THE Pricing_Page SHALL render an FAQ accordion section.
5. THE Pricing_Page SHALL render a CTA banner at the bottom.
6. WHEN a plan card is hovered on desktop, THE Pricing_Page SHALL apply a lift (translateY) animation to that card.
7. THE Pricing_Page SHALL export a `metadata` object with page-specific SEO fields.

---

### Requirement 7: Features Page (/features)

**User Story:** As a prospective student, I want a detailed breakdown of Passmark's features, so that I can evaluate whether the platform meets my study needs.

#### Acceptance Criteria

1. THE Features_Page SHALL render a hero section, a Pass AI deep-dive section, a Question Bank bento grid, a CBT Mock Exams section, and an Offline Mode section.
2. THE Features_Page SHALL use `hugeicons-react` icons throughout — no emoji.
3. THE Features_Page SHALL export a `metadata` object with page-specific SEO fields.

---

### Requirement 8: About Page (/about)

**User Story:** As a prospective student or partner, I want to learn about Passmark's mission, team, and history, so that I can trust the platform.

#### Acceptance Criteria

1. THE About_Page SHALL render: a hero section, a Mission/Vision bento grid, a stats bar, a team section with 4 member cards, a timeline section, a media kit section, and a contact CTA.
2. THE About_Page SHALL export a `metadata` object with page-specific SEO fields.

---

### Requirement 9: Download Page (/download)

**User Story:** As a student, I want a dedicated download page, so that I can easily find and install the Passmark mobile app.

#### Acceptance Criteria

1. THE Download_Page SHALL render a split layout with platform feature highlights, app screenshots, and social proof.
2. THE Download_Page SHALL include App Store and Google Play download links.
3. THE Download_Page SHALL export a `metadata` object with page-specific SEO fields.

---

### Requirement 10: Auth Pages (/login and /signup)

**User Story:** As a returning or new user, I want clean, validated login and sign-up forms, so that I can access my Passmark account securely.

#### Acceptance Criteria

1. THE Login_Page SHALL render a 2-column layout (marketing panel left, form right) on desktop, collapsing to a single-column form on mobile.
2. THE Signup_Page SHALL render a 2-column layout (marketing panel left, form right) on desktop, collapsing to a single-column form on mobile.
3. THE Login_Page SHALL include email and password fields with client-side validation and inline error messages.
4. THE Signup_Page SHALL include full name, email, password, and confirm-password fields with client-side validation and inline error messages.
5. WHEN a form field fails validation, THE Auth_Form SHALL display a descriptive error message adjacent to the field using `error` color token.
6. THE Login_Page and Signup_Page SHALL each include a "Continue with Google" OAuth button using a `hugeicons-react` Google icon.
7. THE Login_Page SHALL export a `metadata` object with page-specific SEO fields.
8. THE Signup_Page SHALL export a `metadata` object with page-specific SEO fields.

---

### Requirement 11: Legal Pages (/privacy and /terms)

**User Story:** As a visitor, I want to read Passmark's privacy policy and terms of service in a readable format, so that I understand my rights and obligations.

#### Acceptance Criteria

1. THE Privacy_Page SHALL render a document layout with a sticky table-of-contents sidebar on desktop and a full-width document body.
2. THE Terms_Page SHALL render a document layout with a sticky table-of-contents sidebar on desktop and a full-width document body.
3. THE Privacy_Page SHALL export a `metadata` object with page-specific SEO fields.
4. THE Terms_Page SHALL export a `metadata` object with page-specific SEO fields.

---

### Requirement 12: Contact Page (/contact)

**User Story:** As a visitor, I want to contact the Passmark team, so that I can ask questions or report issues.

#### Acceptance Criteria

1. THE Contact_Page SHALL render a 2-column layout: contact information (address, email, social links) on the left and a contact form on the right, stacking vertically on mobile.
2. THE Contact_Form SHALL include name, email, subject, and message fields with client-side validation.
3. WHEN a contact form field fails validation, THE Contact_Form SHALL display a descriptive inline error message.
4. THE Contact_Page SHALL export a `metadata` object with page-specific SEO fields.

---

### Requirement 13: MarqueeStrip Component

**User Story:** As a developer, I want a reusable seamless marquee component, so that I can display scrolling content strips on multiple pages without code duplication.

#### Acceptance Criteria

1. THE MarqueeStrip SHALL accept props for: `items` (array of strings or React nodes), `direction` ("left" | "right"), `speed` (number, pixels per second), and `pauseOnHover` (boolean).
2. THE MarqueeStrip SHALL duplicate the `items` array in the rendered output to ensure seamless looping with no visible gap.
3. WHEN `pauseOnHover` is true and the user hovers over the strip, THE MarqueeStrip SHALL pause the animation.
4. WHEN `Reduced_Motion` is enabled, THE MarqueeStrip SHALL stop the scrolling animation.
5. THE MarqueeStrip SHALL implement the scroll animation using CSS `animation` (not JavaScript) for performance.

---

### Requirement 14: Performance & Image Optimisation

**User Story:** As a visitor on a mobile network, I want the site to load quickly with no layout shift, so that I have a smooth browsing experience.

#### Acceptance Criteria

1. THE Website SHALL use `next/image` for all images, providing `width`, `height`, and `alt` attributes; remote image hostnames SHALL be declared in `next.config.ts` `remotePatterns`.
2. THE Website SHALL use `next/font/google` for all Google Fonts to eliminate external font network requests.
3. THE Website SHALL clean up all GSAP contexts using `ctx.revert()` in `useEffect` cleanup functions to prevent memory leaks.
4. THE Website SHALL implement GSAP tree-shaking by importing only the specific GSAP modules used (e.g. `gsap/ScrollTrigger`, `gsap/SplitText`).
5. THE Website SHALL produce zero Cumulative Layout Shift (CLS) from images or fonts on initial page load.

---

### Requirement 15: Accessibility & Reduced Motion

**User Story:** As a user with vestibular disorders or motion sensitivity, I want the site to respect my system motion preferences, so that I am not harmed by excessive animation.

#### Acceptance Criteria

1. WHEN `Reduced_Motion` is enabled, THE Website SHALL disable all GSAP entrance animations, scroll-triggered animations, marquee animations, and the custom cursor GSAP follow.
2. THE Website SHALL use semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<header>`) throughout all pages.
3. THE Website SHALL provide descriptive `alt` text for all `next/image` instances.
4. THE Website SHALL ensure all interactive elements (buttons, links, form fields) have visible focus indicators.
5. THE Website SHALL ensure colour contrast ratios meet WCAG 2.1 AA standards for all text/background combinations defined in the Design_System.

---

### Requirement 16: Mobile Responsiveness

**User Story:** As a student browsing on a mobile phone (375px–390px viewport), I want every page to be fully usable and visually correct, so that I can explore Passmark on any device.

#### Acceptance Criteria

1. THE Hero_Section SHALL stack its two columns vertically on viewports < `md` (768px).
2. THE Features_Section sticky-scroll layout SHALL collapse to a single-column card list on viewports < `md`.
3. THE Pricing_Page plan cards SHALL switch to a horizontal scroll with CSS snap on viewports < `md`.
4. THE CustomCursor SHALL be hidden and disabled on touch devices (detected via `window.matchMedia('(pointer: coarse)')`).
5. THE Bento_Grid layouts on the Features and About pages SHALL collapse to a single column on viewports < `md`.
6. THE Footer SHALL render a 2-column layout on tablet (≥ `md`) and a 1-column layout on mobile (< `md`).
7. THE Split_Layouts (Download, Auth, Contact) SHALL stack vertically on viewports < `md`.
8. THE Website SHALL use responsive font sizes, switching from `display-xl` (64px) to `display-xl-mobile` (40px) on viewports < `md`.
