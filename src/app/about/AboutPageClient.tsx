"use client";
import { About } from '@/components/Home/About';
import React from 'react';
import { motion } from 'framer-motion';
import { AboutData } from '@/types/api';
import SnowfallWrapper from '@/components/ui/SnowfallWrapper';

interface AboutPageClientProps {
    data: AboutData;
}

export function AboutPageClient({ data }: AboutPageClientProps) {
    return (
        <motion.div
            className='bg-black'
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
            <SnowfallWrapper color="#64748b" snowflakeCount={50} />
            <About pt="178px" data={data} />
        </motion.div>
    );
}
