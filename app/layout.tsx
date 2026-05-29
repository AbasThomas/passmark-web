import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { allKeywords, ogImage, siteName, siteUrl } from "./seo";

const gordita = localFont({
  src: [
    {
      path: "./Gordita-Font/Gordita-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Gordita-Font/Gordita-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./Gordita-Font/Gordita-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Gordita-Font/Gordita-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./Gordita-Font/Gordita-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Gordita-Font/Gordita-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./Gordita-Font/Gordita-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Gordita-Font/Gordita-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./Gordita-Font/Gordita-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./Gordita-Font/Gordita-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-gordita",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  authors: [{ name: "Passmark Technologies", url: siteUrl }],
  creator: "Passmark Technologies",
  publisher: "Passmark Technologies",
  category: "Education",
  title: {
    default: "Passmark - Hit Your Passmark",
    template: "%s | Passmark",
  },
  description:
    "Passmark is Nigeria's smartest exam prep app. Practice JAMB, WAEC, NECO and Post-UTME past questions with AI explanations in English and Pidgin. Works offline. Free to start.",
  keywords: allKeywords,
  alternates: {
    canonical: siteUrl,
  },
  robots: {
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
    title: "Passmark - Hit Your Passmark",
    description:
      "Practice JAMB, WAEC, NECO and Post-UTME past questions with AI explanations in English and Pidgin. Works offline. Free to start.",
    url: siteUrl,
    siteName,
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Passmark exam prep app for Nigerian students",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@passmarkng",
    title: "Passmark - Hit Your Passmark",
    description:
      "Nigeria's smartest exam prep app for JAMB, WAEC, NECO, CBT practice and AI tutoring.",
    images: [ogImage],
  },
  other: {
    "geo.region": "NG",
    "geo.country": "Nigeria",
    "theme-color": "#006036",
  },
  appleWebApp: {
    capable: true,
    title: "Passmark",
    statusBarStyle: "black-translucent",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      logo: ogImage,
      sameAs: ["https://passmark.live"],
    },
    {
      "@type": "WebApplication",
      "@id": `${siteUrl}/#webapplication`,
      name: "Passmark",
      url: siteUrl,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Android",
      inLanguage: "en-NG",
      image: ogImage,
      description:
        "Nigeria's exam prep app for JAMB past questions, WAEC past questions, NECO past questions, CBT practice, AI tutoring and offline study.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "NGN",
        category: "Free exam prep app",
      },
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      areaServed: {
        "@type": "Country",
        name: "Nigeria",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={gordita.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
          <LenisProvider>
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
