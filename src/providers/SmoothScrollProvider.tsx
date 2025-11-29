"use client";

import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

export const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const locomotiveScrollRef = useRef<LocomotiveScroll | null>(null);

    useEffect(() => {
        if (!scrollRef.current) return;

        locomotiveScrollRef.current = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: true,
            multiplier: 0.6,     // Speed of scroll (0.6 is smooth & snappy)
            lerp: 0.05,          // Smoother easing
            smartphone: { smooth: true },
            tablet: { smooth: true, breakpoint: 1024 },
        });

        // Update on resize (critical)
        const handleResize = () => {
            locomotiveScrollRef.current?.update();
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            locomotiveScrollRef.current?.destroy();
        };
    }, []);

    return (
        <div ref={scrollRef} data-scroll-container className="relative">
            {children}
        </div>
    );
};
