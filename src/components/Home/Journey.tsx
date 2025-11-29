"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
        description: "Wrote my first line of code in C++. Fascinated by logic and problem solving.",
    },
    {
        id: 2,
        date: "Q4 2018",
        title: "Web Development",
        description: "Dived into HTML, CSS, and JavaScript. Built my first static website.",
    },
    {
        id: 3,
        date: "Q1 2019",
        title: "First Freelance Project",
        description: "Built a landing page for a local business. Learned about client communication.",
    },
    {
        id: 4,
        date: "Q3 2019",
        title: "React & Modern UI",
        description: "Started learning React and modern frontend libraries. Focused on UX/UI.",
    },
    {
        id: 5,
        date: "Q2 2020",
        title: "Full Stack Journey",
        description: "Explored Node.js and databases. Built my first full-stack application.",
    },
    {
        id: 6,
        date: "Q4 2021",
        title: "Professional Career",
        description: "Joined a tech company as a Junior Developer. Worked on enterprise software.",
    },
    {
        id: 7,
        date: "Present",
        title: "Senior Developer",
        description: "Leading teams, architecting scalable solutions, and mentoring juniors.",
    },
];

export const Journey = () => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-55%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-black text-white">
            <div className="sticky top-12 flex h-screen items-center overflow-hidden">

                {/* Title */}
                <div className="absolute top-12 left-12 z-10">
                    <h2 className="text-[8rem] leading-[0.8]  uppercase font-semibold tracking-tighter">
                        Journey
                    </h2>
                </div>

                <motion.div style={{ x }} className="flex gap-24 px-24 items-center">
                    {journeyData.map((item, index) => (
                        <div key={item.id} className="relative flex flex-col items-start min-w-[400px]">
                            {/* Timeline Point */}
                            <div className="absolute top-[3.5rem] left-[-6px] w-3 h-3 bg-blue-500 rounded-full z-10" />

                            {/* Top Content (Date) */}
                            <div className="mb-8 pl-4 border-l border-white/20 h-12 flex items-end">
                                <span className="text-xl font-bold bg-white/10 px-4 py-1 rounded-full">
                                    {item.date}
                                </span>
                            </div>

                            {/* Horizontal Line Segment */}
                            <div className="w-[120%] h-[1px] bg-white/20 absolute top-[3.7rem] left-0 -z-0" />

                            {/* Bottom Content (Title & Desc) */}
                            <div className="mt-8 pl-4 border-l border-white/20 pt-4">
                                <h3 className="text-3xl font-bold mb-2">{item.title}</h3>
                                <p className="text-white/60 text-lg leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};