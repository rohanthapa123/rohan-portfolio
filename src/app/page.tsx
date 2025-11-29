import { About } from "@/components/Home/About";
import { Hero } from "@/components/Home/Hero";
import { Journey } from "@/components/Home/Journey";
import { Projects } from "@/components/Home/Projects";

export default function Home() {
  return (
    <div className="w-full ">

      <Hero />
      <About />
      <Projects />
      <Journey />
    </div>
  );
}
