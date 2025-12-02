"use client";

import { ArrowRight } from "lucide-react";
import { MaxWidthWrapper } from "../common/MaxWidthWrapper";
import { WavyText } from "../common/WavyText";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";

// -------------------------------
// 🔹 Project Data
// -------------------------------
export type Project = {
  id: number;
  title: string;
  role: string;
  link: string;
  image: string;
};

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Edtraa",
    role: "Full Stack Development",
    link: "https://www.edtraa.com",
    image: "/works/edtraa.png",
  },
  {
    id: 2,
    title: "Quasar Energy Consultant",
    role: "Full Stack Development",
    link: "https://quasar.rohanthapa.com.np",
    image: "/works/quasar.png",
  },
  {
    id: 3,
    title: "Klixsoft",
    role: "Frontend Development",
    link: "https://klixsoft.com",
    image: "/works/klixsoft.png",
  },
  {
    id: 4,
    title: "Altripmart",
    role: "Frontend Development",
    link: "https://altripmart.com",
    image: "/works/altripmart.png",
  },
  {
    id: 5,
    title: "Portfolio Website",
    role: "Frontend & Motion Design",
    link: "#",
    image: "/works/portfolio.png",
  },
  {
    id: 6,
    title: "Trexmin Advertisement",
    role: "Frontend & Motion Design",
    link: "https://trexmin.rohanthapa.com.np",
    image: "/works/trexmin.png",
  },
  {
    id: 7,
    title: "Flex Fitness",
    role: "Frontend Development",
    link: "https://flex-fitness.rohanthapa.com.np",
    image: "/works/flex-fitness.png",
  },
];

// -------------------------------
// 🔹 Projects Component
// -------------------------------
type ProjectsProps = {
  limit?: number;
  showViewAll?: boolean;
};

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Projects = ({ limit, showViewAll = false }: ProjectsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  // Smooth mouse-follow setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 15, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 60, damping: 15, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const imageHeight = 18 * 16; // 288px
      const offset = 20;

      let targetY = e.clientY - imageHeight / 2;

      // If hovering an element, make image stay above it
      const hoveredEl = document.querySelector(`[data-hovered-id="${hovered}"]`) as HTMLElement | null;
      if (hoveredEl) {
        const rect = hoveredEl.getBoundingClientRect();
        // Use the **cursor offset inside the element**
        const cursorOffset = e.clientY - rect.top;
        targetY = rect.top + cursorOffset - imageHeight / 2;
      }

      // Clamp to viewport
      if (targetY < offset) targetY = offset;
      else if (targetY + imageHeight > height - offset)
        targetY = height - imageHeight - offset;

      // Horizontal position
      if (e.clientX > width / 2) x.set(width / 2 + 50);
      else x.set(e.clientX + 60);

      y.set(targetY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hovered, x, y]);


  const svgContainerRef = useRef<HTMLDivElement | null>(null);
  const svgPathRef = useRef<SVGPathElement | null>(null);


  useEffect(() => {
    if (window.innerWidth < 768) return; // ❌ Skip for mobile

    const initAnimation = () => {
      if (!svgPathRef.current || !svgContainerRef.current) return;

      const path = svgPathRef.current;
      const container = svgContainerRef.current;
      const pathLength = path.getTotalLength();

      // Set initial stroke state
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // Create the timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1, // Add a little smoothing
        },
      });

      // Animate the line drawing
      tl.to(path, {
        strokeDashoffset: 0,
        ease: "none",
      });

      return tl;
    };

    let tl: gsap.core.Timeline | undefined;

    // Wait for Locomotive Scroll to be ready
    const checkInterval = setInterval(() => {
      if (window.locoScroll) {
        clearInterval(checkInterval);
        // Small delay to ensure ScrollTrigger defaults from provider are applied
        setTimeout(() => {
          tl = initAnimation();
        }, 100);
      }
    }, 100);

    return () => {
      clearInterval(checkInterval);
      if (tl) tl.kill();
    };
  }, []);


  const displayedProjects = limit ? projectsData.slice(0, limit) : projectsData;

  return (
    <section className="relative text-white pt-48 pb-16 overflow-hidden" data-scroll-section>
      <MaxWidthWrapper>

        <div className="relative">
          <div ref={svgContainerRef} className="svg-container absolute -top-12 -left-12" >
            <svg width="1141" height="993" viewBox="0 0 1141 993" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path ref={svgPathRef} d="M405.455 115.367C405.455 115.367 310.876 70.5456 245.955 56.867C187.88 44.6309 155.955 30.3671 94.455 44.867C32.9551 59.3669 30.4199 76.8669 35.955 101.867C41.49 126.867 85.4551 138.741 103.955 142.367C122.455 145.993 166.242 163.654 194.455 142.367C217.419 125.04 225.311 103.603 223.955 74.867C221.393 20.5754 157.512 -4.89651 103.955 4.367C33.3192 16.5846 38.9551 80.8669 35.955 174.867C32.9548 268.867 35.4951 274.518 35.955 338.367C36.9817 480.943 -45.2671 592.556 44.455 703.367C93.2201 763.594 93.9551 766.367 213.455 807.367C332.955 848.367 442.466 848.367 545.955 848.367C649.444 848.367 772.955 839.867 810.955 848.367C848.955 856.867 1055.93 920.886 1112.45 816.867C1131.27 782.235 1143.8 756.658 1134.45 718.367C1114.37 636.031 991.385 661.05 917.955 703.367C881.703 724.259 864.817 744.39 843.455 780.367C818.57 822.275 836.165 859.154 810.955 900.867C783.62 946.096 709.455 990.367 709.455 990.367" stroke="white" strokeWidth="8" strokeDasharray="1000"   // temporary, will be overwritten by GSAP
                strokeDashoffset="1000" />
            </svg>

          </div>
          <p className="text-white text-3xl md:text-lg mb-6">My Works</p>

          {/* 🔸 Project List */}
          <div className="tracking-tighter relative z-10">
            {displayedProjects.map((project, index) => (
              <Link href={project.link}
                target="_blank"
                key={project.id}
                data-hovered-id={project.id}
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
                className={`w-full py-8 px-5 md:px-8 flex flex-col md:flex-row md:items-center justify-between border-t border-white/20 
                  ${index === displayedProjects.length - 1 ? "border-b" : ""
                  } transition-all duration-300 hover:bg-white/5 cursor-pointer `}
              >
                <p className="text-2xl text-left md:text-5xl">{project.title}</p>
                <div className="flex items-center justify-between gap-8 text-md md:text-2xl">
                  <WavyText text={project.role} />
                  <>
                    <ArrowRight className="size-8 -rotate-45 cursor-pointer hover:translate-x-1 hover:-translate-y-1 transition-transform duration-200" />
                  </>
                </div>
              </Link>
            ))}
          </div>

          {/* 🔸 View All Button */}
          {showViewAll && (
            <div className="flex justify-center mt-12 ps-30 relative z-20">
              <Link href="/projects" className="group relative inline-flex items-end gap-2 px-2 py-2 overflow-hidden transition-all border-b border-b-white">
                <WavyText text="View All" />
                <ArrowRight className="relative z-10 size-5 transition-all -rotate-45 duration-300 group-hover:rotate-0" />
              </Link>
            </div>
          )}

          {/* 🔸 Floating Preview Image */}
          <div className="pointer-events-none fixed top-0 left-0 z-50 hidden md:block">
            <motion.div
              className="w-[28rem] h-[18rem] rounded-2xl overflow-hidden shadow-2xl"
              style={{
                x: springX,
                y: springY,
              }}
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.2 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-full h-full">
                <AnimatePresence initial={false} mode="sync">
                  {hovered && (
                    <motion.div
                      key={hovered}
                      className="absolute inset-0 bg-white/60"
                      initial={{ y: 200, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -200, opacity: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Image
                        src={
                          projectsData.find((p) => p.id === hovered)?.image || ""
                        }
                        alt="Project Preview"
                        fill
                        className="object-contain rounded-2xl"
                        priority
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};
