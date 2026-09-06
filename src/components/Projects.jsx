import { Link } from "react-router-dom";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            <span className="">My Projects</span>
          </h2>

        <div className="w-12 h-1 bg-emerald-400 mx-auto mt-3 rounded-full"></div>
      </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.slug} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-emerald-500 transition-all duration-300">
              <Link to={`/projects/${project.slug}`} className="block">
                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap justify-center gap-2 mb-6 pt-5">
                  {project.tech.map((tech) => (
                    <span key={tech} className="bg-gray-700 text-emerald-400 px-3 py-1 text-sm rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>
              {(project.liveLink || project.github || project.githubLinks?.length > 0) && (
                <div className="flex gap-4 justify-center">
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">Live Demo</a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition">GitHub</a>
                  )}
                  {project.githubLinks?.map((link) => (
                    <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition">
                      GitHub ({link.label})
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
