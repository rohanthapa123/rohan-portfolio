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
import { useState, useEffect } from "react";

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
    image: "/works/edtraa.png",
  },
];

// -------------------------------
// 🔹 Projects Component
// -------------------------------
export const Projects = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  // Smooth mouse-follow setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 15, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 60, damping: 15, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const width = window.innerWidth;
      if (e.clientX > width / 2) {
        x.set(width / 2 + 50);
      } else {
        x.set(e.clientX + 60);
      }
      y.set(e.clientY - 80);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <section className="relative text-white pt-48 pb-16 overflow-hidden" data-scroll-section>
      <MaxWidthWrapper>
        <div className="relative">
          <p className="text-white text-3xl md:text-lg mb-6">My Works</p>

          {/* 🔸 Project List */}
          <div className="tracking-tighter relative z-10">
            {projectsData.map((project, index) => (
              <Link href={project.link} target="_blank"
                key={project.id}
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
                className={`w-full py-8 px-5 md:px-8 flex flex-col md:flex-row md:items-center justify-between border-t border-white/20 
                  ${index === projectsData.length - 1 ? "border-b" : ""
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

          {/* 🔸 Floating Preview Image */}
          <div className="pointer-events-none fixed top-0 left-0 z-50">
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
                      className="absolute inset-0"
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
                        className="object-cover rounded-2xl"
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
