import type { Metadata } from "next";
import { JetBrains_Mono, IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppShell } from "@/components/layout/app-shell";
import { VisitedProvider } from "./visited-context";
import { JsonLd } from "@/components/json-ld";

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono",
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-header",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hackthic.iihn.fun"),
  title: {
    default: "Hackthic - Security Toolkits",
    template: "%s | Hackthic",
  },
  description: "Security Operations Dashboard for Bug Hunters. Comprehensive toolkit for reconnaissance, payload management, and reporting.",
  keywords: ["security", "hacking", "bug bounty", "pentesting", "recon", "payloads", "tools", "cybersecurity", "red team", "infosec"],
  authors: [{ name: "Hackthic Team" }],
  creator: "Hackthic Team",
  publisher: "Hackthic",
  openGraph: {
    title: "Hackthic - Security Toolkits",
    description: "Security Operations Dashboard for Bug Hunters",
    url: "https://hackthic.iihn.fun",
    siteName: "Hackthic",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hackthic Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hackthic - Security Toolkits",
    description: "Security Operations Dashboard for Bug Hunters",
    creator: "@hackthic",
    images: ["/opengraph-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://hackthic.iihn.fun",
  },


  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ibmPlexSans.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} antialiased font-sans bg-background text-foreground`}>
        <JsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <VisitedProvider>
            <AppShell>{children}</AppShell>
          </VisitedProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
