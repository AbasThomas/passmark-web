# Design Document

## Overview

### Purpose

This design document specifies the technical architecture for the Passmark marketing website — a 10-page Next.js 16 (App Router) site targeting `passmark.live`. The site showcases Passmark's AI-powered exam prep platform for Nigerian students preparing for WAEC, JAMB, NECO, and professional exams.

### Key Design Goals

1. **Performance-First**: Achieve zero Cumulative Layout Shift (CLS), fast Largest Contentful Paint (LCP), and optimal Core Web Vitals scores
2. **Animation Excellence**: Deliver smooth, polished animations using GSAP + ScrollTrigger with Lenis smooth scroll
3. **Accessibility**: Support reduced motion preferences, semantic HTML, and WCAG 2.1 AA compliance
4. **Mobile-First Responsive**: Ensure full functionality from 375px mobile viewports to 1920px+ desktop displays
5. **Developer Experience**: Maintain clear Server/Client Component boundaries, type safety, and reusable component architecture

### Technology Stack

- **Framework**: Next.js 16 (App Router, React 19)
- **Styling**: Tailwind CSS v4 with `@theme` directive for custom tokens
- **Animations**: GSAP 3.x with ScrollTrigger plugin
- **Smooth Scroll**: Lenis (~3kB) connected to GSAP ticker
- **Icons**: hugeicons-react (4,400+ stroke icons)
- **Fonts**: Google Fonts via next/font/google (Syne, Plus Jakarta Sans, JetBrains Mono)
- **Language**: TypeScript 5.x with strict mode
- **Image Optimization**: next/image with automatic WebP/AVIF conversion

### Research Summary

**Next.js 16 App Router**: Server Components are the default rendering mode, reducing client-side JavaScript bundle size. Client Components (marked with `"use client"`) should be used only for interactivity, browser APIs, or hooks. The App Router provides built-in prefetching, streaming, and client-side transitions for fast navigation ([source](https://nextjs.org/docs/app/building-your-application/rendering/server-components)).

**Tailwind CSS v4**: Introduces a "CSS-first" configuration approach using the `@theme` directive to define custom design tokens directly in CSS files, eliminating the need for `tailwind.config.js`. All design tokens become CSS custom properties at build time ([source](https://tailwindcss.com/blog/tailwindcss-v4)).

**GSAP + Lenis Integration**: Lenis handles momentum-based smooth scrolling while GSAP ScrollTrigger manages scroll-triggered animations. The integration requires connecting Lenis to GSAP's ticker via `gsap.ticker.add()` and using `ScrollTrigger.scrollerProxy()` for proper scroll position tracking ([source](https://devdreaming.com/blogs/nextjs-smooth-scrolling-with-lenis-gsap)).

**hugeicons-react**: Provides 4,400+ free stroke-rounded icons with SSR support for Next.js App Router. Icons are tree-shakeable and ship with TypeScript definitions ([source](https://hugeicons.com/docs/changelog/packages/react)).

**Performance Optimization**: next/image automatically optimizes images with lazy loading, responsive sizing, and modern format conversion. next/font/google downloads fonts at build time and hosts them as static assets, eliminating external network requests ([source](https://nextjs.org/docs/app/getting-started/images-and-fonts)).


---

## Architecture

### Application Structure

```
app/
├── layout.tsx                 # Root layout with providers, navbar, footer
├── page.tsx                   # Home page (/)
├── globals.css                # Tailwind v4 @theme tokens, typography utilities
├── pricing/
│   └── page.tsx              # Pricing page (/pricing)
├── features/
│   └── page.tsx              # Features page (/features)
├── about/
│   └── page.tsx              # About page (/about)
├── download/
│   └── page.tsx              # Download page (/download)
├── login/
│   └── page.tsx              # Login page (/login)
├── signup/
│   └── page.tsx              # Signup page (/signup)
├── privacy/
│   └── page.tsx              # Privacy Policy (/privacy)
├── terms/
│   └── page.tsx              # Terms of Service (/terms)
└── contact/
    └── page.tsx              # Contact page (/contact)

components/
├── providers/
│   └── LenisProvider.tsx     # Client Component: Lenis + GSAP integration
├── layout/
│   ├── Navbar.tsx            # Client Component: Navigation with scroll detection
│   ├── Footer.tsx            # Server Component: Global footer
│   └── CustomCursor.tsx      # Client Component: GSAP cursor follow
├── home/
│   ├── HeroSection.tsx       # Client Component: GSAP animations
│   ├── SocialProofMarquee.tsx
│   ├── ProblemSection.tsx    # Client Component: ScrollTrigger count-up
│   ├── FeaturesSection.tsx   # Client Component: Sticky scroll layout
│   ├── PassAIShowcase.tsx    # Client Component: Typewriter effect
│   ├── GamificationSection.tsx
│   ├── PricingPreview.tsx
│   ├── TestimonialsSection.tsx
│   └── DownloadCTA.tsx
├── pricing/
│   ├── PlanCard.tsx
│   ├── BillingToggle.tsx     # Client Component: State management
│   ├── ComparisonTable.tsx
│   └── FAQAccordion.tsx      # Client Component: Accordion state
├── shared/
│   ├── MarqueeStrip.tsx      # Client Component: CSS animation
│   ├── Button.tsx            # Server Component: Reusable button
│   └── FormField.tsx         # Client Component: Validation state
└── ...
```

### Server vs Client Component Strategy

**Server Components (Default)**:
- All page layouts and static content sections
- Footer, static text blocks, SEO metadata
- Reduces JavaScript bundle size, improves initial load performance

**Client Components (`"use client"`)**:
- Components requiring browser APIs (window, document, matchMedia)
- Components using React hooks (useState, useEffect, useRef)
- Components with GSAP animations or event listeners
- Form components with validation state
- Interactive UI elements (accordions, toggles, modals)

**Boundary Optimization**:
- Keep Client Components as leaf nodes in the component tree
- Pass Server Components as children to Client Components when possible
- Avoid importing Server Components into Client Components


### Routing Architecture

Next.js 16 App Router uses file-system based routing with automatic code splitting per route:

- **Static Routes**: All pages are statically generated at build time (no dynamic segments)
- **Metadata**: Each page exports a `metadata` object for SEO (title, description, OpenGraph, Twitter)
- **Navigation**: All internal links use `next/link` for client-side transitions with automatic prefetching
- **Layouts**: Root layout wraps all pages with global providers (Lenis, CustomCursor, Navbar, Footer)

### Animation Architecture

**GSAP Context Management**:
```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    // All GSAP animations here
  }, containerRef);
  
  return () => ctx.revert(); // Cleanup on unmount
}, []);
```

**ScrollTrigger Integration**:
- Lenis instance connected to GSAP ticker: `gsap.ticker.add((time) => lenis.raf(time * 1000))`
- ScrollTrigger uses Lenis as scroller proxy: `ScrollTrigger.scrollerProxy()`
- ScrollTrigger refreshed on window resize: `ScrollTrigger.refresh()`

**Reduced Motion Support**:
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  // Disable GSAP animations, return early
}
```

### State Management

**No Global State Library**: The site is primarily content-driven with minimal client state

**Local State Patterns**:
- Form validation: `useState` for field errors and submission state
- UI toggles: `useState` for accordion open/closed, billing period selection
- Animation refs: `useRef` for GSAP targets and Lenis instance

**URL State**:
- No query parameters or URL-based state required for this marketing site


---

## Components and Interfaces

### Core Provider Components

#### LenisProvider

**Type**: Client Component  
**Purpose**: Initialize Lenis smooth scroll and connect to GSAP ScrollTrigger  
**Location**: `components/providers/LenisProvider.tsx`

**Interface**:
```typescript
interface LenisProviderProps {
  children: React.ReactNode;
}
```

**Implementation Details**:
- Creates Lenis instance with `useRef` to persist across renders
- Connects to GSAP ticker in `useEffect`: `gsap.ticker.add((time) => lenis.raf(time * 1000))`
- Sets up `ScrollTrigger.scrollerProxy()` for Lenis integration
- Calls `ScrollTrigger.refresh()` on window resize
- Cleanup: `lenis.destroy()` and remove ticker callback in effect cleanup
- Wraps children in context provider for potential child component access

**Dependencies**: `lenis`, `gsap`, `gsap/ScrollTrigger`

---

#### CustomCursor

**Type**: Client Component  
**Purpose**: Render custom 12px green circle cursor with GSAP lerp follow  
**Location**: `components/layout/CustomCursor.tsx`

**Interface**:
```typescript
interface CustomCursorProps {
  // No props - fully self-contained
}
```

**Implementation Details**:
- Detects touch devices: `window.matchMedia('(pointer: coarse)')` - hide on touch
- Detects reduced motion: `window.matchMedia('(prefers-reduced-motion: reduce')` - disable animations
- Tracks mouse position with `mousemove` event listener
- GSAP `gsap.to()` with lerp interpolation for smooth follow (duration: 0.3s, ease: "power2.out")
- Hover detection: Listens for `mouseenter`/`mouseleave` on elements with `data-cursor-hover` attribute
- Hover state: Expands to 40px ring, displays "Explore →" pill label
- Renders fixed-position div with pointer-events-none

**Styling**:
- Base: 12px circle, `bg-primary`, `rounded-full`, `fixed`, `z-50`, `pointer-events-none`
- Hover: 40px ring, border-2, flex center, pill label with padding

---

### Layout Components

#### Navbar

**Type**: Client Component  
**Purpose**: Global navigation with scroll-aware background and mobile menu  
**Location**: `components/layout/Navbar.tsx`

**Interface**:
```typescript
interface NavbarProps {
  // No props - reads from global state/context if needed
}
```

**Implementation Details**:
- **Desktop Layout (≥ md)**: Logo left, nav links center, auth buttons right
- **Mobile Layout (< md)**: Logo left, hamburger icon right
- **Scroll Detection**: `useEffect` with scroll event listener, tracks `scrollY > 80`
- **Scroll State**: Applies `bg-surface/80 backdrop-blur-md` when scrolled
- **Mobile Menu**: Full-screen overlay with GSAP slide-in animation (translateY from -100%)
- **Mount Animation**: GSAP `from` animation sliding down from above viewport
- **Navigation Links**: Home, Features, Pricing, About, Download (using `next/link`)
- **Auth Buttons**: "Log In" (outline), "Sign Up" (filled primary)

**State**:
```typescript
const [isScrolled, setIsScrolled] = useState(false);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
```


#### Footer

**Type**: Server Component  
**Purpose**: Global footer with navigation links, social links, and legal pages  
**Location**: `components/layout/Footer.tsx`

**Interface**:
```typescript
interface FooterProps {
  // No props - static content
}
```

**Implementation Details**:
- **Layout**: 4-column grid on desktop (≥ lg), 2-column on tablet (≥ md), 1-column on mobile
- **Columns**:
  1. Brand: Logo, tagline "Hit Your Passmark", social icons (Twitter, LinkedIn, Instagram, Facebook)
  2. Product: Features, Pricing, Download
  3. Company: About, Contact, Blog
  4. Legal: Privacy Policy, Terms of Service
- **Styling**: Dark background (`bg-inverse-surface`), light text (`text-inverse-on-surface`)
- **Social Icons**: hugeicons-react icons (no emoji)
- **Copyright**: Bottom row with current year and "© Passmark. All rights reserved."

---

### Shared Components

#### MarqueeStrip

**Type**: Client Component  
**Purpose**: Reusable seamless infinite-scroll horizontal strip  
**Location**: `components/shared/MarqueeStrip.tsx`

**Interface**:
```typescript
interface MarqueeStripProps {
  items: (string | React.ReactNode)[];
  direction?: 'left' | 'right';
  speed?: number; // pixels per second
  pauseOnHover?: boolean;
  className?: string;
}
```

**Implementation Details**:
- **Duplication**: Renders `items` array twice to ensure seamless loop
- **Animation**: CSS `@keyframes` animation (not JavaScript) for performance
- **Direction**: `animation-direction: normal` (left) or `reverse` (right)
- **Speed**: Calculates animation duration based on content width and speed prop
- **Pause on Hover**: CSS `animation-play-state: paused` on hover if `pauseOnHover` is true
- **Reduced Motion**: Disables animation when `prefers-reduced-motion: reduce`

**CSS Animation**:
```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```

---

#### Button

**Type**: Server Component  
**Purpose**: Reusable button with consistent styling  
**Location**: `components/shared/Button.tsx`

**Interface**:
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string; // If provided, renders as Link
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}
```

**Variants**:
- `primary`: `bg-primary text-on-primary hover:bg-primary-container`
- `secondary`: `bg-secondary-container text-on-secondary hover:bg-secondary`
- `outline`: `border-2 border-outline-variant text-on-surface hover:bg-surface-container`
- `ghost`: `text-on-surface hover:bg-surface-container`

**Sizes**:
- `sm`: `px-4 py-2 text-sm`
- `md`: `px-6 py-3 text-base` (default)
- `lg`: `px-8 py-4 text-lg`


#### FormField

**Type**: Client Component  
**Purpose**: Reusable form input with validation and error display  
**Location**: `components/shared/FormField.tsx`

**Interface**:
```typescript
interface FormFieldProps {
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea';
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}
```

**Implementation Details**:
- Renders label, input/textarea, and error message
- Error styling: `border-error text-error` when error prop is present
- Focus styling: `focus:ring-2 focus:ring-primary focus:border-primary`
- Accessible: Associates label with input via `htmlFor` and `id`

---

### Home Page Components

#### HeroSection

**Type**: Client Component  
**Purpose**: Hero section with gradient headline, CTAs, and animated phone mockup  
**Location**: `components/home/HeroSection.tsx`

**Implementation Details**:
- **Layout**: 2-column grid on desktop (≥ md), stacked on mobile
- **Left Column**: Gradient headline, subheading, 2 CTA buttons, social proof avatars, stat cards
- **Right Column**: Phone mockup with CSS float animation
- **GSAP Animations**:
  - Headline: Letter stagger animation using `SplitText` plugin
  - Phone mockup: Float loop keyframe + mousemove parallax (±15px offset with lerp)
  - Stat cards: Stagger fade-in from bottom
- **Stat Cards**: Floating cards with "10K+ Students" and "95% Pass Rate"
- **Social Proof**: Avatar stack with "+2,000 students joined this week"

**Gradient Headline**:
```css
background: linear-gradient(135deg, #006036 0%, #1A7A4A 50%, #9BF6BA 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

---

#### FeaturesSection

**Type**: Client Component  
**Purpose**: Sticky-scroll layout with fixed left panel and scrolling feature cards  
**Location**: `components/home/FeaturesSection.tsx`

**Implementation Details**:
- **Layout**: 2-column grid on desktop (≥ md), single column on mobile
- **Left Panel**: Sticky positioned, contains section heading and description
- **Right Panel**: 8 feature cards, each with icon, title, description
- **ScrollTrigger Animation**: Each card slides in from right as it enters viewport
- **Mobile**: Left panel not sticky, cards stack vertically without scroll animations

**Feature Cards** (8 total):
1. Pass AI - AI-powered study assistant
2. 50K+ Questions - Comprehensive question bank
3. CBT Mock Exams - Realistic exam simulation
4. Offline Mode - Study without internet
5. Progress Tracking - Visual analytics
6. Gamification - Earn points and badges
7. Study Streaks - Build consistent habits
8. Community - Connect with peers


#### PassAIShowcase

**Type**: Client Component  
**Purpose**: Dark section showcasing Pass AI with typewriter effect and language toggle  
**Location**: `components/home/PassAIShowcase.tsx`

**Implementation Details**:
- **Layout**: 2-column grid on desktop, stacked on mobile
- **Left Column**: Heading, description, language toggle (English/Pidgin)
- **Right Column**: Chat mockup with typewriter effect
- **Typewriter Effect**: Cycles through 3 AI responses with character-by-character reveal
- **Language Toggle**: Switches between English and Pidgin responses, restarts typewriter
- **Chat Mockup**: User message bubble + AI response bubble with typing indicator

**AI Responses** (English):
1. "Let me break down photosynthesis for you..."
2. "Here's a mnemonic for the periodic table..."
3. "Let's solve this quadratic equation step by step..."

**AI Responses** (Pidgin):
1. "Make I explain photosynthesis for you..."
2. "See mnemonic wey go help you remember periodic table..."
3. "Make we solve this quadratic equation step by step..."

---

#### ProblemSection

**Type**: Client Component  
**Purpose**: Dark section with count-up stat animations  
**Location**: `components/home/ProblemSection.tsx`

**Implementation Details**:
- **Layout**: 3-column grid on desktop, single column on mobile
- **Stat Cards**: 3 cards with large numbers and descriptions
- **ScrollTrigger Count-Up**: Animates numbers from 0 to target when section enters viewport
- **Stats**:
  1. "73%" - Students fail JAMB on first attempt
  2. "₦45,000" - Average spent on exam prep materials
  3. "6 months" - Time wasted on ineffective study methods

**Count-Up Animation**:
```typescript
gsap.to(statRef.current, {
  textContent: targetValue,
  duration: 2,
  ease: "power1.out",
  snap: { textContent: 1 },
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top 80%",
  }
});
```

---

### Pricing Page Components

#### PlanCard

**Type**: Server Component  
**Purpose**: Display subscription plan details  
**Location**: `components/pricing/PlanCard.tsx`

**Interface**:
```typescript
interface PlanCardProps {
  name: string;
  price: { monthly: number; annual: number };
  features: string[];
  cta: string;
  highlighted?: boolean;
  billingPeriod: 'monthly' | 'annual';
}
```

**Implementation Details**:
- Displays plan name, price (based on billingPeriod), feature list with checkmarks, CTA button
- Highlighted variant: Border accent, "Most Popular" badge
- Hover animation: `hover:translate-y-[-8px] transition-transform`


#### BillingToggle

**Type**: Client Component  
**Purpose**: Toggle between monthly and annual billing  
**Location**: `components/pricing/BillingToggle.tsx`

**Interface**:
```typescript
interface BillingToggleProps {
  value: 'monthly' | 'annual';
  onChange: (value: 'monthly' | 'annual') => void;
}
```

**Implementation Details**:
- Renders two buttons: "Monthly" and "Annual"
- Active button: `bg-primary text-on-primary`
- Inactive button: `bg-transparent text-on-surface-variant`
- Smooth transition between states

---

#### FAQAccordion

**Type**: Client Component  
**Purpose**: Expandable FAQ items  
**Location**: `components/pricing/FAQAccordion.tsx`

**Interface**:
```typescript
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}
```

**Implementation Details**:
- Each item: Question button + collapsible answer panel
- State: `useState` to track which item is open (single-open accordion)
- Animation: GSAP height animation on expand/collapse
- Icon: Chevron rotates 180° when open

---

## Data Models

### Design Tokens

All design tokens are defined in `app/globals.css` using Tailwind v4 `@theme` directive:

```css
@theme {
  /* Color Tokens */
  --color-primary: #006036;
  --color-primary-container: #1A7A4A;
  --color-primary-fixed: #9BF6BA;
  --color-on-primary: #FFFFFF;
  --color-secondary: #835500;
  --color-secondary-container: #FEAE2C;
  --color-on-secondary: #FFFFFF;
  --color-on-secondary-container: #6B4500;
  --color-surface: #F7F9FC;
  --color-surface-container: #ECEEF1;
  --color-surface-container-low: #F2F4F7;
  --color-surface-container-lowest: #FFFFFF;
  --color-surface-container-high: #E6E8EB;
  --color-on-surface: #191C1E;
  --color-on-surface-variant: #3F4941;
  --color-outline-variant: #BEC9BE;
  --color-on-secondary-fixed-variant: #633F00;
  --color-inverse-surface: #2D3133;
  --color-inverse-on-surface: #EFF1F4;
  --color-error: #BA1A1A;
  --color-error-container: #FFDAD6;
  
  /* Spacing Tokens */
  --spacing-stack-sm: 12px;
  --spacing-stack-md: 24px;
  --spacing-stack-lg: 48px;
  --spacing-margin-mobile: 16px;
  --spacing-margin-desktop: 40px;
  --spacing-container-max: 1280px;
  --spacing-gutter: 24px;
  
  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}
```


### Typography Utilities

Custom typography classes defined in `app/globals.css`:

```css
.display-xl {
  font-family: var(--font-syne);
  font-size: 64px;
  line-height: 1.1;
  letter-spacing: -0.02em;
  font-weight: 800;
}

.display-xl-mobile {
  font-family: var(--font-syne);
  font-size: 40px;
  line-height: 1.1;
  letter-spacing: -0.01em;
  font-weight: 800;
}

.headline-lg {
  font-family: var(--font-syne);
  font-size: 32px;
  line-height: 1.2;
  font-weight: 700;
}

.headline-md {
  font-family: var(--font-syne);
  font-size: 24px;
  line-height: 1.3;
  font-weight: 700;
}

.body-lg {
  font-family: var(--font-jakarta);
  font-size: 18px;
  line-height: 1.6;
  font-weight: 400;
}

.body-md {
  font-family: var(--font-jakarta);
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
}

.button {
  font-family: var(--font-jakarta);
  font-size: 16px;
  line-height: 1;
  letter-spacing: 0.02em;
  font-weight: 600;
}

.label-mono {
  font-family: var(--font-mono);
  font-size: 14px;
  line-height: 1.4;
  letter-spacing: 0.05em;
  font-weight: 500;
}
```

### Font Loading

Fonts loaded in `app/layout.tsx` using `next/font/google`:

```typescript
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-mono',
  display: 'swap',
});

// Applied to <html> element:
// className={`${syne.variable} ${jakarta.variable} ${mono.variable}`}
```


### Page Metadata Structure

Each page exports a `metadata` object for SEO:

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title | Passmark',
  description: 'Page description for SEO',
  openGraph: {
    title: 'Page Title | Passmark',
    description: 'Page description for SEO',
    url: 'https://passmark.live/page-path',
    siteName: 'Passmark',
    images: [
      {
        url: 'https://passmark.live/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Passmark - Hit Your Passmark',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Title | Passmark',
    description: 'Page description for SEO',
    images: ['https://passmark.live/og-image.png'],
  },
};
```

### Form Validation Models

**Login Form**:
```typescript
interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}
```

**Signup Form**:
```typescript
interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignupFormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}
```

**Contact Form**:
```typescript
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}
```

**Validation Rules**:
- Email: RFC 5322 regex pattern
- Password: Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number
- Confirm Password: Must match password field
- Required fields: All fields marked as required must be non-empty


---

## Error Handling

### Client-Side Error Boundaries

**Root Error Boundary** (`app/error.tsx`):
- Catches unhandled errors in any page or component
- Displays user-friendly error message with "Try Again" button
- Logs error details to console in development mode
- In production, could integrate with error tracking service (e.g., Sentry)

```typescript
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="headline-lg mb-4">Something went wrong!</h2>
        <button onClick={reset} className="button bg-primary text-on-primary">
          Try Again
        </button>
      </div>
    </div>
  );
}
```

### Form Validation Errors

**Inline Error Display**:
- Each form field displays validation errors immediately below the input
- Error text uses `text-error` color token
- Error border uses `border-error` color token
- Errors clear when user corrects the input

**Validation Timing**:
- Email: Validated on blur
- Password: Validated on blur
- Confirm Password: Validated on blur and on password field change
- Form submission: Validates all fields before submission

### Animation Fallbacks

**Reduced Motion**:
- All GSAP animations check `prefers-reduced-motion: reduce` before executing
- If reduced motion is enabled, animations are skipped entirely
- Static layout remains functional without animations

**GSAP Load Failure**:
- If GSAP fails to load, components gracefully degrade to static content
- No JavaScript errors thrown
- Site remains fully functional without animations

### Image Loading Errors

**next/image Error Handling**:
- Provide fallback `onError` handler for remote images
- Display placeholder or alt text if image fails to load
- Log error to console for debugging

### Browser Compatibility

**Minimum Supported Browsers**:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Polyfills**:
- No polyfills required (Next.js handles modern JavaScript transpilation)
- CSS features use progressive enhancement (e.g., backdrop-filter with fallback)


---

## Testing Strategy

### Overview

The Passmark marketing website is primarily a **UI-driven, content-focused site** with animations, form validation, and responsive layouts. Property-based testing (PBT) is **not applicable** for this feature because:

1. **UI Rendering**: The site is primarily concerned with visual presentation, layout, and styling — not pure functions with testable properties
2. **Animations**: GSAP animations are visual effects that cannot be meaningfully tested with universal properties
3. **Form Validation**: Client-side validation is simple pattern matching better suited for example-based tests
4. **Static Content**: Most pages are static content with no complex data transformations

**Appropriate Testing Approaches**:
- **Snapshot Tests**: For component rendering and layout structure
- **Example-Based Unit Tests**: For form validation, utility functions, and specific user interactions
- **Integration Tests**: For page navigation, form submission flows, and component interactions
- **Visual Regression Tests**: For responsive layouts and animation states
- **Accessibility Tests**: For WCAG compliance and semantic HTML

### Unit Testing

**Test Framework**: Jest + React Testing Library

**Component Tests**:
1. **Button Component**:
   - Renders with correct variant styles
   - Handles click events
   - Renders as Link when href prop is provided
   - Displays icon in correct position

2. **FormField Component**:
   - Displays label and input correctly
   - Shows error message when error prop is present
   - Applies error styling when error is present
   - Calls onChange handler with correct value

3. **MarqueeStrip Component**:
   - Renders items correctly
   - Duplicates items for seamless loop
   - Applies correct animation direction
   - Pauses on hover when pauseOnHover is true
   - Disables animation when reduced motion is enabled

**Form Validation Tests**:
1. **Email Validation**:
   - Valid email: `test@example.com` → no error
   - Invalid email: `invalid-email` → error message
   - Empty email (required): `` → error message

2. **Password Validation**:
   - Valid password: `Password123` → no error
   - Too short: `Pass1` → error message
   - No uppercase: `password123` → error message
   - No number: `Password` → error message

3. **Confirm Password Validation**:
   - Matching passwords → no error
   - Non-matching passwords → error message

**Utility Function Tests**:
- `cn()` classname utility: Merges class names correctly
- `formatPrice()`: Formats numbers as currency
- `validateEmail()`: Returns true/false for email validity

