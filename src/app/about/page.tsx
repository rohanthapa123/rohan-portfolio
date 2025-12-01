"use client";
import { About } from '@/components/Home/About'
import React from 'react'
import { motion } from 'framer-motion';

const page = () => {
  return (
    <motion.div
      className='bg-black'
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
    >
      <About pt="178px" />
    </motion.div>
  )
}

export default page