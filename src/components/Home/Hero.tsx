"use client"
import { useState } from 'react';
import { MaxWidthWrapper } from '../common/MaxWidthWrapper';
import { PixelatedFace } from '../common/PixelatedImage';
import { motion, Variants } from "framer-motion";
import Image from 'next/image';
import { ArrowDownToLine, Facebook, Github, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { ResumeData } from '@/types/api';

export const Hero = ({ resumeData }: { resumeData: ResumeData | undefined }) => {
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

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.4, // delay between each child
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.5 } },
  };

  return (
    <div className="relative w-full h-[100vh] bg-black overflow-clip" data-scroll-section>

      {/* <div className='w-[40.5rem] h-[40.5rem] absolute  top-1/2 left-1/2 transform -translate-1/2 '>
        <Image src={"/main.png"} width={500} height={500} alt='rohan thapa' className='w-full h-full object-contain brightness-50' />
      </div> */}
      {/* Triangle Grid */}
      <div className="absolute inset-0 hidden md:grid grid-cols-58 gap-0 z-0">
        {triangles.map((_, idx) => {
          const isHighlighted = highlighted.has(idx);
          return (
            <div
              key={idx}
              onMouseEnter={() => setHighlighted(getNearbyRandom(idx))}
              onMouseLeave={() => setHighlighted(new Set())}
              className="w-[1.6025rem] h-[1.5625rem] border"
              style={{
                borderColor: isHighlighted ? '#3b82f6' : 'rgba(100,100,100,0.12)',
                transition: isHighlighted
                  ? 'transform 0.1s ease-out, border-color 0.1s ease-out'
                  : 'transform 2s ease, border-color 2s ease',
              }}
            />
          );
        })}
      </div>

      <div className="absolute inset-0 h-full w-full grid grid-cols-16 gap-0  md:hidden">
        {Array.from({ length: 550 }).map((_, idx) => (
          <div key={idx} className="w-[1.6025rem] h-[1.5625rem] border border-[rgba(100,100,100,0.12)]" />
        ))}
      </div>

      {/* Foreground Content */}
      <MaxWidthWrapper>
        <motion.div
          className="absolute top-20 md:top-[8.5rem] left-5 md:left-20 right-0 z-20 h-full pointer-events-none"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="absolute w-[17rem] md:w-[20.5rem] h-[22rem] md:h-[27.5rem] top-[35%] md:top-[20%] right-[55%] md:right-[48%] transform translate-x-1/2 bg-slate-800 pointer-events-none -z-10"
            variants={item}
          >
            <Image src={"https://cdn.rohanthapa.com.np/portfolio-og.jpg"} width={500} height={500} alt='Rohan Thapa, software engineer based in Kathmandu, Nepal.' className='w-full h-full object-cover brightness-80' priority />
          </motion.div>

          <motion.p
            className="text-white text-lg tracking-tighter font-normal whitespace-nowrap relative -bottom-12  md:-right-[.875rem]"
            variants={item}
          >
            KATHMANDU, NEPAL
          </motion.p>

          <motion.p
            className="text-white relative top-12 md:top-0 max-md:text-7xl md:text-[8.6rem] tracking-tighter font-semibold uppercase whitespace-nowrap"
            variants={item}
          >
            FullStack <br className='md:hidden' />Engineer
          </motion.p>

          <motion.p
            className="text-white text-lg md:text-[2rem] tracking-wide font-normal whitespace-nowrap absolute right-5 md:right-20 top-[13.5rem] md:top-[12.325rem]"
            variants={item}
          >
            BUILDING BEAUTY WITH CODE
          </motion.p>

          <motion.div variants={item} className='absolute top-[16rem] right-20 flex items-center gap-2 border-b border-b-white max-md:hidden pointer-events-auto cursor-pointer' onClick={() => window.open(resumeData?.pdfFile, '_blank')} >
            <ArrowDownToLine color='white' className='size-4 md:size-5' strokeWidth={"1.4px"} />
            <span className="text-white text-lg tracking-wide font-normal whitespace-nowrap">Download Resume</span>
          </motion.div>

          <motion.div className='text-white absolute max-md:right-6 md:left-4 top-[680px] md:top-[500px] z-80 pointer-events-auto md:space-y-4 max-md:flex items-center gap-3 max-md:hidden' variants={item}>
            <Link target='_blank' href={"https://linkedin.com/in/rohanthapa"} className='border border-white p-2 rounded-full cursor-pointer block'>
              <Linkedin color='white' className='size-4 md:size-5' strokeWidth={"1.4px"} />
            </Link>
            <Link target='_blank' href={"https://github.com/rohanthapa123"} className='border border-white p-2 rounded-full cursor-pointer block'>
              <Github color='white' className='size-4 md:size-5' strokeWidth={"1.4px"} />
            </Link>
            <Link target='_blank' href={"https://instagram.com/rohanthapa.2"} className='border border-white p-2 rounded-full cursor-pointer block'>
              <Instagram color='white' className='size-4 md:size-5' strokeWidth={"1.4px"} />
            </Link>
            <Link target='_blank' href={"https://facebook.com/rohanthapa69"} className='border border-white p-2 rounded-full cursor-pointer block'>
              <Facebook color='white' className='size-4 md:size-5' strokeWidth={"1.4px"} />
            </Link>
          </motion.div>


        </motion.div>



        {/* <PixelatedFace/> */}
      </MaxWidthWrapper>
    </div >
  );
};
