import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Navbar from "../components/Navbar";
import Wpm from "../components/Wpm";

export default function Home() {
  return (
    <div className="font-sans antialiased bg-gray-950 selection:bg-emerald-500 selection:text-gray-900">
      <Navbar />

      <main>
        <Hero />
        <Projects />
        <Wpm />
        <Contact />
      </main>
    </div>
  );
}