import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Wpm from "../components/Wpm";
import FeaturedProjects from "../components/FeaturedProjects";

export default function Home() {
  return (
    <main>
      <title>Patrik Thormodsen – Software Developer</title>
      <Hero />
      <FeaturedProjects />
      <Projects />
      <Wpm />
      <Contact />
    </main>
  );
}
