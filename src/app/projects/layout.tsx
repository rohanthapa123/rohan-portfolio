import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Projects | Rohan Thapa",
    description: "Explore the portfolio of projects by Rohan Thapa. From full-stack web applications to innovative solutions using React, Next.js, Node.js, TypeScript, MongoDB, and more. See real-world implementations and case studies.",
    keywords: [
        "Rohan Thapa Projects",
        "Web Development Portfolio",
        "React Projects",
        "Next.js Applications",
        "Full Stack Projects",
        "Node.js Projects",
        "TypeScript Projects",
        "Portfolio Nepal Developer",
        "Open Source Projects",
    ],
    openGraph: {
        title: "Projects by Rohan Thapa | Software Engineer Portfolio",
        description: "Browse through my collection of full-stack web applications and projects. Built with React, Next.js, Node.js, TypeScript, and modern web technologies.",
        url: "https://rohanthapa.com.np/projects",
        type: "website",
        images: [
            {
                url: "https://cdn.rohanthapa.com.np/portfolio-og.jpg",
                width: 1200,
                height: 630,
                alt: "Rohan Thapa Projects Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Projects by Rohan Thapa | Software Engineer",
        description: "Explore my portfolio of full-stack web applications built with React, Next.js, Node.js, and modern technologies.",
        images: ["https://cdn.rohanthapa.com.np/portfolio-og.jpg"],
    },
    alternates: {
        canonical: "https://rohanthapa.com.np/projects",
    },
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
