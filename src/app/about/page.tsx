import { About } from '@/components/Home/About'
import React from 'react'
import { getAboutData } from '@/lib/api-server';
import { AboutPageClient } from './AboutPageClient';

export const runtime = 'edge'
export const revalidate = 60;


export default async function AboutPage() {
  // Fetch data server-side for SEO
  const aboutData = await getAboutData();

  return <AboutPageClient data={aboutData} />;
}