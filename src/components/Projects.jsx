import { Link } from "react-router-dom";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="bg-gray-900 px-4 py-20 text-white">
      <div className="mx-auto max-w-6xl">

        {/* Section heading */}
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <p className="font-mono text-sm text-emerald-400">
            ~/portfolio/projects
          </p>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Things I've built
          </h2>

          <p className="max-w-2xl text-gray-400">
            Some of the projects I've worked on while learning,
            experimenting, and building things i enjoy.
          </p>
        </div>

        {/* Projects */}
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="group flex flex-col justify-between rounded-xl border border-gray-800 bg-gray-950/50 p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/50"
            >
              <Link
                to={`/projects/${project.slug}`}
                className="block"
              >
                {/* Fake terminal path
                <p className="mb-3 font-mono text-xs text-gray-600">
                  ~/projects/{project.slug}
                </p>
                */}
                <h3 className="mb-3 text-2xl font-semibold transition-colors group-hover:text-emerald-400">
                  {project.title}
                </h3>

                <p className="leading-relaxed text-gray-400">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-gray-700 bg-gray-900 px-2.5 py-1 font-mono text-xs text-gray-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>

              {/* Links */}
              {(project.liveLink ||
                project.github ||
                project.githubLinks?.length > 0) && (
                <div className="mt-6 flex flex-wrap gap-5 border-t border-gray-800 pt-4 text-sm justify-center">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-emerald-400 transition hover:text-emerald-300"
                    >
                      ↗ live
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-gray-500 transition hover:text-white"
                    >
                      github
                    </a>
                  )}

                  {project.githubLinks?.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-gray-500 transition hover:text-white"
                    >
                      github/{link.label}
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
