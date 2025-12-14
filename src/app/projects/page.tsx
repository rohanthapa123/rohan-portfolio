import { Projects } from '@/components/Home/Projects';
import React from 'react';
import { getProjectsData } from '@/lib/api-server';
import { ProjectsPageClient } from './ProjectsPageClient';

export const runtime = 'edge'
export const revalidate = 60;

export default async function ProjectsPage() {
  // Fetch data server-side for SEO
  const projectsData = await getProjectsData();

  return <ProjectsPageClient projects={projectsData} />;
}