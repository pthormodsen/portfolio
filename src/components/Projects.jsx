import { Link } from "react-router-dom";
import { featuredSlugs, projects } from "../data/projects";
import Reveal from "./Reveal";

// Featured projects already have their own section above.
const otherProjects = projects.filter(
  (project) => !featuredSlugs.includes(project.slug)
);

export default function Projects() {
  return (
    <section id="projects" className="bg-gray-900 px-4 py-20 text-white">
      <div className="mx-auto max-w-6xl">

        {/* Section heading */}
        <Reveal className="mb-10 flex flex-col items-center gap-3 text-center">
          <p className="font-mono text-sm text-emerald-400">
            ~/portfolio/projects
          </p>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            More things I've built
          </h2>

          <p className="max-w-2xl text-gray-400">
            Other projects I've worked on while learning,
            experimenting, and building things I enjoy.
          </p>
        </Reveal>

        {/* Projects */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 3) * 80}>
              <article
                className="group flex h-full flex-col justify-between overflow-hidden rounded-xl border border-gray-800 bg-gray-950/50 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/50"
              >
                <Link
                  to={`/projects/${project.slug}`}
                  className="block"
                >
                  {project.images?.[0] ? (
                    <div className="aspect-[16/9] overflow-hidden border-b border-gray-800 bg-gray-950">
                      <img
                        src={project.images[0]}
                        alt={`${project.title} screenshot`}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div
                      aria-hidden="true"
                      className="flex aspect-[16/9] items-center justify-center border-b border-gray-800 bg-gray-950 font-mono text-sm text-gray-600"
                    >
                      <span>
                        <span className="text-emerald-400">$</span> ./{project.slug}
                        <span className="ml-1 inline-block h-4 w-2 bg-gray-700 align-middle" />
                      </span>
                    </div>
                  )}

                  <div className="p-6">
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
                  </div>
                </Link>

                {/* Links */}
                {(project.demoLink ||
                  project.liveLink ||
                  project.github ||
                  project.githubLinks?.length > 0) && (
                  <div className="mx-6 flex flex-wrap gap-5 border-t border-gray-800 py-4 text-sm justify-center">
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

                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-emerald-400 transition hover:text-emerald-300"
                      >
                        demo
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
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
