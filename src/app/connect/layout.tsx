import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Connect | Rohan Thapa",
    description: "Get in touch with Rohan Thapa for collaboration, project inquiries, or just to say hello. I'm always open to discussing new opportunities, creative ideas, and innovative projects. Contact me via email or social media.",
    keywords: [
        "Contact Rohan Thapa",
        "Hire Full Stack Developer",
        "Web Developer for Hire Nepal",
        "Freelance Developer Nepal",
        "Project Collaboration",
        "Get in Touch",
        "Developer Contact",
        "Rohan Thapa Email",
    ],
    openGraph: {
        title: "Connect with Rohan Thapa | Let's Build Something Amazing",
        description: "Have a project in mind? Let's connect and create something amazing together. Reach out for collaborations, project inquiries, or opportunities.",
        url: "https://rohanthapa.com.np/connect",
        type: "website",
        images: [
            {
                url: "https://cdn.rohanthapa.com.np/portfolio-og.jpg",
                width: 1200,
                height: 630,
                alt: "Connect with Rohan Thapa",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Connect with Rohan Thapa | Software Engineer",
        description: "Let's collaborate on your next project. Get in touch for web development opportunities and creative partnerships.",
        images: ["https://cdn.rohanthapa.com.np/portfolio-og.jpg"],
    },
    alternates: {
        canonical: "https://rohanthapa.com.np/connect",
    },
};

export default function ConnectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
