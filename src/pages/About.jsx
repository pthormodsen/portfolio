import Info from "../components/Info";
import Contact from "../components/Contact";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div className="font-sans antialiased bg-gray-950 selection:bg-emerald-500 selection:text-gray-900">
      <Navbar />

      <main>
        <Info />
        <Contact />
      </main>
    </div>
  );
}