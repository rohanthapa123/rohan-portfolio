"use client";
import React, { useState } from "react";
import { MaxWidthWrapper } from "../common/MaxWidthWrapper";
import { WavyText } from "../common/WavyText";
import Link from "next/link";

export const Footer = () => {
  const rows = 28;
  const cols = 58;
  const total = rows * cols;
  const [highlighted, setHighlighted] = useState<Set<number>>(new Set());
  const triangles = Array.from({ length: total });

  const getNearbyRandom = (idx: number) => {
    const nearby: number[] = [];
    const row = Math.floor(idx / cols);
    const col = idx % cols;
    const radius = 2;

    for (let r = Math.max(0, row - radius); r <= Math.min(rows - 1, row + radius); r++) {
      for (let c = Math.max(0, col - radius); c <= Math.min(cols - 1, col + radius); c++) {
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

  // ✅ Arrays for footer sections
  const navLinks = [
    { label: "Back to Top", href: "#top" },
    { label: "Home", href: "/" },
    { label: "About Me", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Connect", href: "/contact" },
  ];

  const socialLinks = [
    { label: "LinkedIn", href: "https://linkedin.com/in/rohanthapa" },
    { label: "Facebook", href: "https://facebook.com/rohanthapa69" },
    { label: "Instagram", href: "https://instagram.com/rohanthapa.2" },
    { label: "Tiktok", href: "#" },
  ];

  const email = "hello@rohanthapa.com.np";

  return (
    <div className="relative w-full h-[50vh] bg-black overflow-clip">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid grid-cols-58 gap-0 z-50">
        {triangles.map((_, idx) => {
          const isHighlighted = highlighted.has(idx);
          return (
            <div
              key={idx}
              onMouseEnter={() => setHighlighted(getNearbyRandom(idx))}
              onMouseLeave={() => setHighlighted(new Set())}
              className="w-[1.6025rem] h-[1.5625rem] border"
              style={{
                borderColor: isHighlighted ? "#3b82f6" : "rgba(100,100,100,0.12)",
                transition: isHighlighted
                  ? "transform 0.1s ease-out, border-color 0.1s ease-out"
                  : "transform 2s ease, border-color 2s ease",
              }}
            />
          );
        })}
      </div>

      {/* Footer content */}
      <MaxWidthWrapper>
        <div className="text-white ">
          <div className="pt-6 pb-[5rem] flex items-start justify-between ">
            {/* Left navigation column */}
            <div className="flex flex-col gap-1 w-fit relative z-50">
              {navLinks.map((link) => (
                <div key={link.label} className="w-fit ">
                  <Link href={link.href}>
                    <WavyText text={link.label} />
                  </Link>
                </div>
              ))}
            </div>

            {/* Right column */}
            <div className="flex items-start gap-5 w-fit">
              {/* Social + email */}
              <div className="flex flex-col gap-1 w-fit relative z-50">
                {socialLinks.map((social) => (
                  <div key={social.label} className="w-fit">
                    <Link href={social.href} target="_blank">
                      <WavyText text={social.label} />
                    </Link>
                  </div>
                ))}
                <div className="pt-10">
                  <Link href={`mailto:${email}`}>
                    <WavyText text={email} />
                  </Link>
                </div>
              </div>

              {/* Message block */}
              <div className="flex flex-col gap-1 relative z-50">
                <div className="w-fit h-fit text-xl font-medium">
                  <WavyText text="Let’s grab some coffee" />
                </div>
                <div className="w-[13.5rem]">
                  <p> and create something amazing together.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom footer bar */}
          <div className="flex items-center justify-between pointer-events-none">
            <p className="w-fit">LOGO HERE</p>
            <p className="flex items-center w-fit pointer-events-auto relative z-50">
              <WavyText text="Rohan Thapa" />
              &nbsp;&copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};
