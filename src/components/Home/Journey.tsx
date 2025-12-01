"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type JourneyItem = {
    id: number;
    date: string;
    title: string;
    description: string;
};

const journeyData: JourneyItem[] = [
    {
        id: 1,
        date: "Q3 2018",
        title: "Started Coding",
        description:
            "Wrote my first line of code in C++ and instantly got hooked. I spent hours experimenting with logic, understanding basic algorithms, and solving beginner-level problems.",
    },
    {
        id: 2,
        date: "Q4 2018",
        title: "Web Development",
        description:
            "Dived into HTML, CSS, and vanilla JavaScript. Built my first static website and explored how the web actually works—from layouts to responsive design.",
    },
    {
        id: 3,
        date: "Q1 2019",
        title: "First Freelance Project",
        description:
            "Created a landing page for a local business. Learned to gather requirements, communicate with clients, and deliver a polished product on time.",
    },
    {
        id: 4,
        date: "Q3 2019",
        title: "React & Modern UI",
        description:
            "Started learning React, component architecture, and state management. Shifted focus toward creating smooth user experiences and visually appealing interfaces.",
    },
    {
        id: 5,
        date: "Q2 2020",
        title: "Full Stack Journey",
        description:
            "Ventured into backend development with Node.js, Express, and databases. Built my first full-stack application and learned how APIs, authentication, and data flow actually work.",
    },
    {
        id: 6,
        date: "Q4 2021",
        title: "Professional Career",
        description:
            "Started working as a Junior Developer in a tech company. Collaborated on enterprise projects, followed best practices, and improved my debugging, architecture, and teamwork skills.",
    },
    {
        id: 7,
        date: "Present",
        title: "Senior Developer",
        description:
            "Currently leading teams, designing scalable systems, mentoring junior developers, and building high-quality digital experiences with modern technologies.",
    },
];


gsap.registerPlugin(ScrollTrigger);

export const Journey = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === "undefined" || window.innerWidth < 768) return;

        let tl: gsap.core.Timeline | null = null;

        const initScrollTrigger = () => {
            const container = containerRef.current;
            const slider = sliderRef.current;

            if (!container || !slider) return;

            const totalWidth = slider.scrollWidth;
            const viewportWidth = window.innerWidth;
            const scrollDistance = totalWidth - viewportWidth;

            // Kill existing timeline if any
            if (tl) tl.kill();

            tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    // scroller and pinType are handled by global defaults in SmoothScrollProvider
                    start: "top-=100 top",
                    end: () => `+=${scrollDistance}`,
                    scrub: 1,
                    pin: true,
                    pinType: "transform",

                    // anticipatePin: 1,
                    invalidateOnRefresh: true,
                    // markers: true,
                }
            });

            tl.to(slider, { x: -scrollDistance, ease: "none" });

            ScrollTrigger.refresh();
        };

        // Wait for Locomotive Scroll to be ready
        const checkInterval: NodeJS.Timeout = setInterval(() => {
            if (window.locoScroll) {
                clearInterval(checkInterval);
                setTimeout(initScrollTrigger, 100);
            }
        }, 100);

        return () => {
            clearInterval(checkInterval);
            if (tl) tl.kill();
            ScrollTrigger.getAll().forEach(t => {
                if (t.trigger === containerRef.current) t.kill();
            });
        };
    }, []);




    return (
        <section className="relative bg-black text-white" data-scroll-section>

            {/* Desktop Horizontal */}
            <div className="hidden md:block">
                <div ref={containerRef} className="relative h-screen bg-black">
                    <div className="h-screen flex items-center overflow-hidden">

                        {/* Title */}
                        <h2 className="absolute top-12 left-12 text-7xl md:text-[8rem] tracking-tighter font-semibold">
                            Journey
                        </h2>

                        {/* Horizontal slider */}
                        <div ref={sliderRef} className="flex gap-24 px-24 items-center will-change-transform">
                            {journeyData.map((item) => (
                                <div key={item.id} className="min-w-[400px] relative flex flex-col items-start">

                                    <div className="absolute top-[3.5rem] left-[-6px] w-3 h-3 bg-blue-500 rounded-full" />

                                    <div className="mb-8 pl-4 border-l border-white/20 h-12 flex items-end">
                                        <span className="text-xl font-bold bg-white/10 px-4 py-1 rounded-full">
                                            {item.date}
                                        </span>
                                    </div>

                                    <div className="w-[120%] h-[1px] bg-white/20 absolute top-[3.7rem]" />

                                    <div className="mt-8 pl-4 border-l border-white/20 pt-4">
                                        <h3 className="text-3xl font-bold mb-2">{item.title}</h3>
                                        <p className="text-white/60 text-lg leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            {/* Mobile Vertical Timeline */}
            <div className="md:hidden px-6 py-20">
                <h2 className="text-6xl font-semibold tracking-tight mb-16">Journey</h2>

                <div className="flex flex-col relative border-l border-white/20 pl-6 space-y-16">

                    {journeyData.map(item => (
                        <div key={item.id} className="relative">
                            <div className="absolute left-[-10px] top-[6px] w-3 h-3 bg-blue-500 rounded-full"></div>

                            <p className="text-lg font-bold bg-white/10 inline-block px-3 py-1 rounded-full">
                                {item.date}
                            </p>

                            <h3 className="text-3xl font-semibold mt-4">{item.title}</h3>
                            <p className="text-white/60 mt-2 leading-relaxed">{item.description}</p>
                        </div>
                    ))}

                </div>
            </div>

        </section>
    );
};
