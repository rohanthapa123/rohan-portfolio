import { Projects } from '@/components/Home/Projects';
import React from 'react';
import { getProjectsData } from '@/lib/api-server';
import { ProjectsPageClient } from './ProjectsPageClient';

export default async function ProjectsPage() {
  // Fetch data server-side for SEO
  const projectsData = await getProjectsData();

  return <ProjectsPageClient projects={projectsData} />;
}