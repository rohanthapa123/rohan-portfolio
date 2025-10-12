"use client";
import React, { useEffect, useState } from 'react'
import { MaxWidthWrapper } from '../common/MaxWidthWrapper'
import { Typography } from '../common/Typography'
import { Button } from '../ui/button'
import { ArrowRight, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { WavyText } from '../common/WavyText'

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

  return (
    <div className={`fixed top-0 w-full h-[12vh] z-[999] transition-all duration-500
        ${scrolled ? "backdrop-blur-lg bg-black/40 shadow-md" : "bg-transparent"}
      `}>
      <div className=" h-full flex items-center">
        <MaxWidthWrapper>
          <div className="flex items-center h-full justify-between text-white relative">

            <Link href={'/'}  >
              <Typography variant='p' styleName='b1-large' className='!text-[1.75rem] !leading-7'>ROHAN</Typography>
              <Typography variant='p' styleName='b1-large' className='!text-[1.75rem] !leading-7'>THAPA</Typography>
            </Link>

            <div className=' absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 flex items-center gap-20'>
              {
                items.map((item, idx) => {
                  return <Link key={idx} href={item.href} className='text-[1.05rem] relative group leading-5'>
                    <WavyText text={item.text} />
                    <div className='w-0 group-hover:w-full h-[.0625rem] bg-[#c4bebe] transition-all duration-500 group-hover:bg-[#4499e9]' />
                  </Link>
                })
              }
            </div>



            <div className="relative inline-flex rounded-full p-[.125rem] cursor-pointer group overflow-clip">
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





          </div>

        </MaxWidthWrapper>
      </div>

    </div>
  )
}
