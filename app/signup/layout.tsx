import type { Metadata } from "next";
import { createMetadata } from "../seo";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Sign Up",
    description:
      "Create a Passmark account to start practicing JAMB past questions, WAEC past questions, NECO questions and CBT mock exams.",
    path: "/signup",
    noIndex: true,
  }),
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
