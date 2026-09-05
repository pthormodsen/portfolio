import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { projects } from "../data/projects";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Project not found</h1>
          <Link to="/" className="text-emerald-400 hover:underline">Back to homepage</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-20">
        <Link to="/" className="text-emerald-400 hover:underline">&larr; Back to projects</Link>
        <article className="mt-8 bg-gray-800 p-8 rounded-xl border border-gray-700">
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-gray-300 text-lg mb-8">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-8 justify-center pt-5">
            {project.tech.map((tech) => (
              <span key={tech} className="bg-gray-700 text-emerald-400 px-3 py-1 text-sm rounded-full">
                {tech}
              </span>
            ))}
          </div>
          {project.images?.length > 0 && (
            <div className="mb-8 space-y-4">
                {project.images.map((image) => (
                <img
                    key={image}
                    src={image}
                    alt={`${project.title} screenshot`}
                    className="w-full rounded-lg border border-gray-700"
                />
                ))}
            </div>
            )}
          <div className="flex gap-4 justify-center">
            {project.liveLink && <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">Live Demo</a>}
            {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white">GitHub</a>}
          </div>
        </article>
      </main>
    </div>
  );
}