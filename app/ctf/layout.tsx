import type { Metadata } from "next";
import { CTFAppShell } from "@/components/layout/ctf-app-shell";

export const metadata: Metadata = {
  title: "CTF Arena | Hackthic",
  description: "Hackthic Capture The Flag Arena. Practice your skills with challenges.",
};

export default function CTFLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CTFAppShell>{children}</CTFAppShell>
  );
}
