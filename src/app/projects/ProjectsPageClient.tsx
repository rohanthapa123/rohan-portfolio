"use client";
import { Projects } from '@/components/Home/Projects';
import React from 'react';
import { motion } from 'framer-motion';
import { ProjectData } from '@/types/api';

interface ProjectsPageClientProps {
    projects: ProjectData[];
}

export function ProjectsPageClient({ projects }: ProjectsPageClientProps) {
    return (
        <motion.div
            className='bg-black '
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
            <Projects projects={projects} />
        </motion.div>
    );
}
