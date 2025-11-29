"use client";
import { Projects } from '@/components/Home/Projects';
import React from 'react';
import { motion } from 'framer-motion';

const page = () => {
  return (
    <motion.div
      className='bg-black pt-16'
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
    >
      <Projects />
    </motion.div>
  );
};

export default page;