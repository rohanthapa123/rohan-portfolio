"use client";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type LoaderProps = { progress: string };

const containerVariants: Variants = {
  hidden: { opacity: 1 }, // parent visible, children start below
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      ease: [0.17, 0.55, 0.55, 1], // easeOut cubic-bezier
    },
  },
};

const letterVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0, 0.55, 0.45, 1], // circOut cubic-bezier
    },
  },
};

export const Loader = ({ progress }: LoaderProps) => {
  const prevDigitsRef = useRef(progress.split(""));
  const digits = progress.split("");
  const text = "LOADING".split("");

  const containerStyle = {
    width: "7rem",
    height: "12.5rem",
    overflow: "hidden",
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-[#292626]">
      <div className="w-[100vw] h-[100vh] ">
        <Image width={1000} height={1000} className="w-full h-full object-cover" src={'/textures/bedge-grunge.png'} alt="" />
      </div>
      {/* Progress digits */}
      <div className="flex max-md:w-35 h-[7rem] md:h-[12.5rem] pe-0 md:pe-5 absolute bottom-20 md:bottom-10 right-4 md:right-20">
        {digits.map((digit, idx) => {
          const prevDigit = prevDigitsRef.current[idx];
          prevDigitsRef.current[idx] = digit;

          return (
            <div
              key={idx}
              style={containerStyle}
              className="relative flex items-center justify-center w-[0.5rem] md:w-[7rem]"
            >
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={digit} // important: triggers animation
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.5, ease: [0.85, 0, 0.15, 1] }} // circInOut
                  className="text-black text-[6rem] md:text-[12.5rem] font-extrabold  tracking-tighter md:tracking-tight absolute"
                >
                  {digit}
                </motion.span>
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* LOADING text */}
      <motion.div
        className="absolute bottom-10 left-4 md:left-10 flex space-x-[.125rem]"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {text.map((char, idx) => (
          <motion.span
            key={idx}
            variants={letterVariants}
            className="text-black text-[2rem] md:text-[3.25rem] font-medium tracking-tighter"
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};
