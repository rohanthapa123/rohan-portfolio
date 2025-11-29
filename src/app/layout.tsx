import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import type { Metadata } from "next";
import { Fira_Code, Roboto } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const fira_code = Fira_Code({
  variable: '--font-fira_code',
  subsets: ['latin']
})

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"), // replace with your real domain
  title: {
    default: "Rohan Thapa | Full-Stack Developer & Tech Enthusiast",
    template: "%s | Rohan Thapa",
  },
  description:
    "Portfolio of Rohan Thapa – Full-Stack Developer skilled in React, Next.js, Node.js, TypeORM, MongoDB, and more. Explore my projects, blogs, notes, and experience.",
  keywords: [
    "Rohan Thapa",
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
    "Kathmandu Nepal Developer",
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
    title: "Rohan Thapa | Full-Stack Developer & Tech Enthusiast",
    description:
      "Welcome to my portfolio website. I build scalable full-stack applications using React, Next.js, Node.js, and Java. Explore my projects, skills, blogs, and notes.",
    siteName: "Rohan Thapa Portfolio",
    images: [
      {
        url: "https://rohanthapa.com.np/og-image.png", // add an OG image for sharing
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
    title: "Rohan Thapa | Full-Stack Developer & Tech Enthusiast",
    description:
      "Explore the portfolio of Rohan Thapa – Full-Stack Developer skilled in React, Next.js, Node.js, and more.",
    images: ["https://rohanthapa.com.np/og-image.png"],
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
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/HelveticaCondensed.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />

      </head>
      <body
        className={`${roboto.variable} ${fira_code.variable} antialiased`}
      >
        <ReactQueryProvider>
          <PageTransition>
            <Navbar />
            {/* <SmoothScrollProvider> */}
            {children}
            {/* </SmoothScrollProvider> */}
            <Footer />
          </PageTransition>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
