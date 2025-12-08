import { About } from "@/components/Home/About";
import { Hero } from "@/components/Home/Hero";
import { Journey } from "@/components/Home/Journey";
import { Projects } from "@/components/Home/Projects";
import { getAboutData, getProjectsData } from "@/lib/api-server";

export default async function Home() {
  // Fetch data server-side for SEO
  const [aboutData, projectsData] = await Promise.all([
    getAboutData(),
    getProjectsData(),
  ]);

  return (
    <div className="w-full relative ">
      <Hero />
      <About pt="124px" data={aboutData} />
      <Projects limit={4} showViewAll={true} projects={projectsData} />
      <Journey />
    </div>
  );
}
