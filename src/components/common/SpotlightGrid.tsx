"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export const SpotlightGrid = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rows = 58;
    const cols = 58;
    const total = rows * cols;

    const [highlighted, setHighlighted] = useState<Set<number>>(new Set());

    const triangles = Array.from({ length: total });

    const getNearbyRandom = (idx: number) => {
        const nearby: number[] = [];
        const row = Math.floor(idx / cols);
        const col = idx % cols;
        const radius = 2;

        for (
            let r = Math.max(0, row - radius);
            r <= Math.min(rows - 1, row + radius);
            r++
        ) {
            for (
                let c = Math.max(0, col - radius);
                c <= Math.min(cols - 1, col + radius);
                c++
            ) {
                const neighborIdx = r * cols + c;
                nearby.push(neighborIdx);
            }
        }

        for (let i = nearby.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [nearby[i], nearby[j]] = [nearby[j], nearby[i]];
        }

        return new Set(nearby.slice(0, 6));
    };

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const { left, top, width, height } = containerRef.current.getBoundingClientRect();

            const x = e.clientX - left;
            const y = e.clientY - top;

            // Update motion values
            mouseX.set(x);
            mouseY.set(y);

            // Only calculate highlights if mouse is inside the container
            if (x >= 0 && x <= width && y >= 0 && y <= height) {
                // Cell dimensions: w-[1.6025rem] -> ~25.64px, h-[1.5625rem] -> ~25px
                // We can approximate or try to be precise.
                // Better: calculate based on container width / cols if it's responsive?
                // The CSS uses fixed rem units, so we should use fixed pixels.
                // 1rem = 16px usually.
                const cellWidth = 1.6025 * 16;
                const cellHeight = 1.5625 * 16;

                const col = Math.floor(x / cellWidth);
                const row = Math.floor(y / cellHeight);

                const idx = row * cols + col;

                if (idx >= 0 && idx < total) {
                    setHighlighted(getNearbyRandom(idx));
                }
            } else {
                setHighlighted(new Set());
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY, cols, total]);


    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-50 pointer-events-none overflow-hidden"
        >
            <motion.div
                className="absolute inset-0 grid grid-cols-58 gap-0"
                style={{
                    maskImage: useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`,
                    WebkitMaskImage: useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`,
                }}
            >
                {triangles.map((_, idx) => {
                    const isHighlighted = highlighted.has(idx);
                    return (
                        <div
                            key={idx}
                            className="w-[1.6025rem] h-[1.5625rem] border border-white/10"
                            style={{
                                borderColor: isHighlighted
                                    ? "#3b82f6"
                                    : "rgba(100,100,100,0.12)",
                                transition: isHighlighted
                                    ? "transform 0.1s ease-out, border-color 0.1s ease-out"
                                    : "transform 2s ease, border-color 2s ease",
                            }}
                        />
                    );
                })}
            </motion.div>
        </div>
    );
};
