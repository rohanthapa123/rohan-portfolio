"use client";
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MaxWidthWrapper } from '../common/MaxWidthWrapper'
import { Typography } from '../common/Typography'
import { Button } from '../ui/button'
import { ArrowRight, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { WavyText } from '../common/WavyText'
import { div } from 'framer-motion/client';

const items = [
  {
    text: "ABOUT ME",
    href: '/about'
  },
  {
    text: "PROJECTS",
    href: '/projects'
  },
  {
    text: "CONNECT",
    href: '/connect'
  }
]

export const Navbar = () => {

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // change state when scrolled a bit
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [menuOpen]);




  return (
    <div>
      <div data-scroll-prevent className={`fixed top-0 w-full h-[12vh] z-[990] transition-all duration-500
        ${scrolled && !menuOpen ? "backdrop-blur-lg bg-black/40 shadow-md" : "bg-transparent"}
      `}>
        <div className=" h-full flex items-center">
          <MaxWidthWrapper>
            <div className="flex items-center h-full justify-between text-white relative">

              <Link href={'/'} className="relative z-[1000]">
                <Typography variant='p' styleName='b1-large' className='!text-[1.75rem] !leading-7 mix-blend-difference'>ROHAN</Typography>
                <Typography variant='p' styleName='b1-large' className='!text-[1.75rem] !leading-7 mix-blend-difference'>THAPA</Typography>
              </Link>

              <div className=' absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 hidden md:flex items-center gap-20'>
                {
                  items.map((item, idx) => {
                    return <Link key={idx} href={item.href} className='text-[1.05rem] relative group leading-5'>
                      <WavyText text={item.text} />
                      <div className='w-0 group-hover:w-full h-[.0625rem] bg-[#c4bebe] transition-all duration-500 group-hover:bg-[#4499e9]' />
                    </Link>
                  })
                }
              </div>

              <div className="relative hidden md:inline-flex rounded-full p-[.125rem] cursor-pointer group overflow-clip">
                {/* Rotating gradient border */}
                <div className="absolute inset-0 h-[200%] rounded-full bg-[conic-gradient(at_top_left,_#3b82f6,_#9333ea,_#f43f5e,_#3b82f6)] animate-spin-slow group-hover:hidden blur-[1.5rem]"></div>

                {/* Inner button with SVG-like shine effect */}
                <div className="relative rounded-full bg-black px-6 py-2 flex items-center gap-2 text-white overflow-hidden">
                  <span className="relative z-10">CONTACT ME</span>
                  <ArrowRight className="size-6 -rotate-45 group-hover:rotate-0 transition-all duration-500 relative z-10" strokeWidth=".0875rem" />

                  {/* Shine gradient rising from below */}
                  <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out bg-[linear-gradient(to_top,_rgba(59,130,246,0.4),rgba(147,51,234,0.4),rgba(244,63,94,0.4))]" />
                </div>
              </div>

              {/* Mobile Menu Toggle */}
              <div className="md:hidden relative z-[998]">
                <div
                  className="rounded-full bg-white w-12 h-12 flex items-center justify-center cursor-pointer"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <div className='space-y-1.5 relative'>
                    <motion.div
                      animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                      className={`h-0.5 bg-black w-6 origin-center transition-transform`}
                    />
                    <motion.div
                      animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                      className={`w-6 h-0.5 bg-black transition-opacity`}
                    />
                    <motion.div
                      animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                      className={`h-0.5 bg-black w-6 origin-center transition-transform`}
                    />
                  </div>
                </div>
              </div>


            </div>
          </MaxWidthWrapper>
        </div>
      </div>
      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 3rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-white/70 backdrop-blur-md z-[995] flex flex-col justify-center items-center"
          >
            <div className="flex flex-col gap-8 items-center">
              {items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 + idx * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    className="text-4xl font-light text-black font-medium hover:text-blue-500 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.text}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-8"
              >
                <Link href="/connect" onClick={() => setMenuOpen(false)}>
                  <div className="relative inline-flex rounded-full p-[.125rem] cursor-pointer group overflow-clip">
                    {/* Rotating gradient border */}
                    <div className="absolute inset-0 h-[200%] rounded-full bg-[conic-gradient(at_top_left,_#3b82f6,_#9333ea,_#f43f5e,_#3b82f6)] animate-spin-slow group-hover:hidden blur-[1.5rem]"></div>

                    {/* Inner button with SVG-like shine effect */}
                    <div className="relative rounded-full bg-black px-6 py-2 flex items-center gap-2 text-white overflow-hidden">
                      <span className="relative z-10 text-2xl">CONTACT ME</span>
                      <ArrowRight className="size-6 -rotate-45 group-hover:rotate-0 transition-all duration-500 relative z-10" strokeWidth=".0875rem" />

                      {/* Shine gradient rising from below */}
                      <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out bg-[linear-gradient(to_top,_rgba(59,130,246,0.4),rgba(147,51,234,0.4),rgba(244,63,94,0.4))]" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
