import type { Metadata } from "next";
import { createMetadata } from "../seo";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Login",
    description: "Log in to Passmark and continue your JAMB, WAEC, NECO and Post-UTME exam prep.",
    path: "/login",
    noIndex: true,
  }),
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
