import { About } from "@/components/Home/About";
import { Hero } from "@/components/Home/Hero";
import { Journey } from "@/components/Home/Journey";
import { Projects } from "@/components/Home/Projects";
import { getAboutData, getProjectsData, getResumeData } from "@/lib/api-server";


export const runtime = 'edge'
export const revalidate = 60;


export default async function Home() {
  // Fetch data server-side for SEO
  const [aboutData, projectsData, resumeData] = await Promise.all([
    getAboutData(),
    getProjectsData(),
    getResumeData(),
  ]);

  return (
    <div className="w-full relative ">
      <Hero resumeData={resumeData} />
      <About pt="124px" data={aboutData} />
      <Projects limit={4} showViewAll={true} projects={projectsData} />
      <Journey />
    </div>
  );
}
