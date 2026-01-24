import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import type { Metadata } from "next";
import { Fira_Code, Roboto } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const fira_code = Fira_Code({
  variable: '--font-fira_code',
  subsets: ['latin']
})

export const metadata: Metadata = {
  metadataBase: new URL("https://rohanthapa.com.np"), // replace with your real domain
  title: {
    default: "Rohan Thapa | Software Engineer (Full-Stack) in Kathmandu, Nepal",
    template: "%s | Rohan Thapa",
  },
  description:
    "Rohan Thapa is a software engineer in Kathmandu, Nepal. Full-stack developer specializing in React, Next.js, Node.js, TypeScript, and Java. View projects, blogs, and contact details.",
  keywords: [
    "Rohan Thapa",
    "Software Engineer",
    "Kathmandu Nepal Developer",
    "Nepal",
    "Nepali",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "TypeScript",
    "Java",
    "Spring Boot",
    "MongoDB",
    "Portfolio",
    "Projects",
    "Blogs",
  ],
  authors: [{ name: "Rohan Thapa", url: "https://rohanthapa.com.np" }],
  creator: "Rohan Thapa",
  publisher: "Rohan Thapa",
  generator: "Next.js",
  applicationName: "Rohan Thapa Portfolio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rohanthapa.com.np",
    title: "Rohan Thapa | Software Engineer (Full-Stack) in Kathmandu, Nepal",
    description:
      "Rohan Thapa is a software engineer in Kathmandu, Nepal. Full-stack developer specializing in React, Next.js, Node.js, TypeScript, and Java. View projects, blogs, and contact details.",
    siteName: "Rohan Thapa Portfolio",
    images: [
      {
        url: "https://cdn.rohanthapa.com.np/portfolio-og.jpg", // add an OG image for sharing
        width: 1200,
        height: 630,
        alt: "Rohan Thapa Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle", // replace with your Twitter if any
    creator: "@yourtwitterhandle",
    title: "Rohan Thapa | Software Engineer (Full-Stack) in Kathmandu, Nepal",
    description:
      "Rohan Thapa is a software engineer in Kathmandu, Nepal. Full-stack developer specializing in React, Next.js, Node.js, TypeScript, and Java. View projects, blogs, and contact details.",
    images: ["https://cdn.rohanthapa.com.np/portfolio-og.jpg"],
  },
  alternates: {
    canonical: "https://rohanthapa.com.np",
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
  category: "technology",
  other: {
    "google-site-verification": "NOguZ7TOeqqN3UgAUpOFhgG56m1BF2Yow0h1vDDntLI",
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${fira_code.variable} antialiased`}
      >
        <ReactQueryProvider>
          <PageTransition>
            <Navbar />
            <SmoothScrollProvider>
              {children}
              <Footer />
            </SmoothScrollProvider>
          </PageTransition>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
