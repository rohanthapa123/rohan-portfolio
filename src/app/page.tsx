import { About } from "@/components/Home/About";
import { Hero } from "@/components/Home/Hero";
import { Journey } from "@/components/Home/Journey";
import { Projects } from "@/components/Home/Projects";

export default function Home() {
  return (
    <div className="w-full relative ">

      <Hero />
      <About pt="124px" />
      <Projects />
      <Journey />
    </div>
  );
}
