import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "About | Rohan Thapa",
    description: "Learn more about Rohan Thapa – a software engineer based in Kathmandu, Nepal. Discover my journey, skills in React, Next.js, Node.js, TypeScript, Java, Spring Boot, and my approach to building scalable web applications.",
    keywords: [
        "About Rohan Thapa",
        "Full Stack Developer Nepal",
        "Web Developer Kathmandu",
        "React Developer Nepal",
        "Next.js Expert",
        "TypeScript Developer",
        "Backend Developer",
        "Software Engineer Nepal",
    ],
    openGraph: {
        title: "About Rohan Thapa | Software Engineer",
        description: "Passionate Software Engineer specializing in modern web technologies. Based in Kathmandu, Nepal, building scalable applications with React, Next.js, and Node.js.",
        url: "https://rohanthapa.com.np/about",
        type: "profile",
        images: [
            {
                url: "https://cdn.rohanthapa.com.np/portfolio-og.jpg",
                width: 1200,
                height: 630,
                alt: "Rohan Thapa - Full-Stack Developer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "About Rohan Thapa | Software Engineer",
        description: "Passionate Software Engineer from Nepal specializing in React, Next.js, Node.js, and modern web technologies.",
        images: ["https://cdn.rohanthapa.com.np/portfolio-og.jpg"],
    },
    alternates: {
        canonical: "https://rohanthapa.com.np/about",
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
