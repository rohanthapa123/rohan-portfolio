"use client";

import { ProjectData } from "@/types/api";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MaxWidthWrapper } from "../common/MaxWidthWrapper";
import { WavyText } from "../common/WavyText";

gsap.registerPlugin(ScrollTrigger);

// -------------------------------
// 🔹 Project Data (Fallback)
// -------------------------------
export type Project = {
  id: string | number;
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
  }
];

// -------------------------------
// 🔹 Projects Component
// -------------------------------
type ProjectsProps = {
  limit?: number;
  showViewAll?: boolean;
  projects?: ProjectData[];
};

export const Projects = ({ limit, showViewAll = false, projects: serverProjects }: ProjectsProps) => {
  const [hovered, setHovered] = useState<string | number | null>(null);

  // Use server-provided data if available, otherwise fallback to static data
  const allProjects = serverProjects && serverProjects.length > 0 ? serverProjects : projectsData;

  const previewRef = useRef<HTMLDivElement | null>(null);


  // Smooth mouse-follow setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 15, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 60, damping: 15, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!previewRef.current) return;

      const w = previewRef.current.clientWidth;
      const h = previewRef.current.clientHeight;

      const mouseX = e.pageX;
      const mouseY = e.pageY;
      const scrollY = window.locoScrollY || 0;



      x.set(mouseX - (w / 2) - 40);
      y.set(mouseY - h + scrollY);

    };



    if (hovered) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hovered]);

  const svgContainerRef = useRef<HTMLDivElement | null>(null);
  const svgPathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return; // ❌ Skip for mobile
    if (!showViewAll) return; // ❌ Skip if not on home page

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
          // markers: true,
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
  }, [showViewAll]);


  const displayedProjects = limit ? allProjects.slice(0, limit) : allProjects;

  const hoveredProject = displayedProjects.find(
    (p) => String(p.id) === String(hovered)
  );


  return (
    <section className="relative text-white pt-48 pb-16 " data-scroll-section>
      <MaxWidthWrapper>

        <div className="relative">
          {showViewAll && (
            <div ref={svgContainerRef} className="svg-container absolute top-[550px] -left-20" >
              <svg width="1955" height="312" viewBox="0 0 1955 312" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path ref={svgPathRef} d="M4.1853 9.62683C4.1853 9.62683 305.966 140.963 511.185 179.627C737.364 222.24 870.545 184.701 1100.19 200.127C1358.73 217.494 1504.52 226.411 1760.19 268.627C1830.09 280.17 1867.84 300.097 1938.69 301.127C1944.93 301.218 1954.69 301.127 1954.69 301.127" stroke="#DA70E8" strokeWidth="21" strokeDashoffset={"0"} strokeDasharray={"0"} />
              </svg>


            </div>
          )}
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
          <div className="pointer-events-none absolute top-0 left-0 z-50 hidden md:block" data-scroll>
            <motion.div
              className="w-[28rem] h-[18rem] rounded-2xl overflow-hidden shadow-2xl"
              style={{
                x: springX,
                y: springY,
              }}
              ref={previewRef}
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.2 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-full h-full z-[999]">
                <AnimatePresence initial={false} mode="sync">
                  {hoveredProject && (
                    <motion.div
                      key={hoveredProject.id}
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
                        src={hoveredProject?.image || ""}
                        alt={hoveredProject.title}
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
