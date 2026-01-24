export default function Head() {
    return (
        <>
            <link
                rel="preload"
                href="/fonts/HelveticaCondensed.woff2"
                as="font"
                type="font/woff2"
                crossOrigin=""
            />

            <link
                rel="preload"
                href="https://cdn.rohanthapa.com.np/portfolio-og.jpg"
                as="image"
                type="image/jpeg"
                crossOrigin=""
            />

            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "Person",
                        name: "Rohan Thapa",
                        url: "https://rohanthapa.com.np",
                        image: "https://cdn.rohanthapa.com.np/portfolio-og.jpg",
                        jobTitle: ["Software Engineer", "Full Stack Developer"],
                        knowsAbout: [
                            "React",
                            "Next.js",
                            "Node.js",
                            "TypeScript",
                            "Java",
                            "Spring Boot",
                            "MongoDB",
                            "PostgreSQL",
                            "TypeORM",
                        ],
                        address: {
                            "@type": "PostalAddress",
                            addressLocality: "Kathmandu",
                            addressCountry: "Nepal",
                        },
                        sameAs: [
                            "https://www.linkedin.com/in/rohanthapa/",
                            "https://github.com/rohanthapa123",
                            "https://www.instagram.com/rohanthapa.2",
                            "https://www.facebook.com/rohanthapa69",
                        ],
                    }),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        name: "Rohan Thapa Portfolio",
                        url: "https://rohanthapa.com.np",
                        publisher: { "@type": "Person", name: "Rohan Thapa" },
                    }),
                }}
            />
        </>
    );
}
