import Contact from "../components/Contact";
import Navbar from "../components/Navbar";
import Cv from "../components/Cv";

export default function Experience() {
  return (
    <div className="bg-gray-950 selection:bg-emerald-500 selection:text-gray-900">
      <Navbar />

      <main>
        <Cv />
        <Contact />
      </main>
    </div>
  );
}
