"use client";
import { gsap } from "gsap";
import { useRef, useEffect } from "react";

export const WavyText = ({ text }: { text: string }) => {
  const btnRef = useRef<HTMLDivElement>(null);
  const tl = useRef<GSAPTimeline | null>(null);

  useEffect(() => {
    const chars = btnRef.current?.querySelectorAll(".char");
    const secchars = btnRef.current?.querySelectorAll(".secchar");

    if (chars && secchars) {
      tl.current = gsap.timeline({ paused: true })
        .to(chars, {
          y: "-100%", // fully slide up
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.inOut",
        }, 0)
        .to(secchars, {
          y: "0%", // comes in from below
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.inOut",
        }, 0);
    }
  }, []);

  const handleMouseEnter = () => {
    tl.current?.play();
  };

  const handleMouseLeave = () => {
    tl.current?.reverse();
  };

  return (
    <div
      ref={btnRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block overflow-hidden cursor-pointer"
    >
      {/* First text */}
      <div className="relative">
        {text.split("").map((char, i) => (
          <span key={i} className="char inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      {/* Second text (starts off-screen below) */}
      <div className="absolute left-0 top-0">
        {text.split("").map((char, i) => (
          <span
            key={i}
            className="secchar inline-block translate-y-full text-[#4499e9]"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  );
};
