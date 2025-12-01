"use client";

import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type LocomotiveScrollV4 = LocomotiveScroll & {
    scroll: {
        instance: {
            scroll: {
                x: number;
                y: number;
            };
        };
    };
};

export const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const locomotiveScrollRef = useRef<LocomotiveScroll | null>(null);

    useEffect(() => {
        if (!scrollRef.current) return;

        gsap.registerPlugin(ScrollTrigger);

        // ✅ Initialize Locomotive Scroll v4 (correct API)
        const locomotiveScroll = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: true,
            multiplier: 0.6,
            lerp: 0.05,
            getDirection: true,
            getSpeed: true,
            class: "is-reveal",
            smartphone: { smooth: false },
            tablet: { smooth: true, breakpoint: 1024 },
        });

        locomotiveScrollRef.current = locomotiveScroll;

        // Expose to window for other components (like Navbar)
        window.locoScroll = locomotiveScroll;

        // ✅ Sync ScrollTrigger with Locomotive Scroll v4
        locomotiveScroll.on("scroll", () => {
            ScrollTrigger.update();
        });

        ScrollTrigger.scrollerProxy(scrollRef.current, {
            scrollTop(value?: number) {
                if (value !== undefined) {
                    // setter: scroll to value, no return
                    locomotiveScroll.scrollTo(value, { duration: 0, disableLerp: true });
                } else {
                    // getter: return current scroll position
                    return (locomotiveScroll as LocomotiveScrollV4).scroll.instance.scroll.y;
                }
            },

            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },

            // v4 always uses transform as pinType
            pinType: scrollRef.current.style.transform ? "transform" : "fixed",
        });

        // ✅ Set default scroller for ALL ScrollTriggers
        ScrollTrigger.defaults({
            scroller: scrollRef.current,
        });

        // Resize handler
        const handleResize = () => {
            locomotiveScroll.update();
            ScrollTrigger.refresh();
        };

        window.addEventListener("resize", handleResize);

        // Refresh both when ready
        setTimeout(() => {
            ScrollTrigger.refresh();
            locomotiveScroll.update();
        }, 50);

        return () => {
            window.removeEventListener("resize", handleResize);

            ScrollTrigger.getAll().forEach((t) => t.kill());

            try {
                locomotiveScroll.destroy();
            } catch (_) { }

            // Clean up window reference
            delete window.locoScroll;
        };
    }, []);

    return (
        <div ref={scrollRef} data-scroll-container className="relative">
            {children}
        </div>
    );
};
