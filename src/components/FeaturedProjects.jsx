import { Link } from "react-router-dom";
import { projects } from "../data/projects";

const featuredSlugs = ["todo-list", "chess", "wpm"];

export default function FeaturedProjects() {
  const featuredProjects = featuredSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter(Boolean);

  return (
    <section className="bg-gray-950 px-4 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <p className="font-mono text-sm text-emerald-400">
            ~/portfolio/featured
          </p>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Featured projects
          </h2>

          <p className="max-w-2xl text-gray-400">
            The projects I would show first: a task manager, a chess app, and a
            typing test focused on speed and accuracy.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <article
              key={project.slug}
              className="group overflow-hidden rounded-lg border border-gray-800 bg-gray-900/60 text-left transition duration-300 hover:-translate-y-1 hover:border-emerald-400/60 hover:bg-gray-900"
            >
              <Link to={`/projects/${project.slug}`} className="block">
                {project.images?.[0] && (
                  <div className="aspect-[16/10] overflow-hidden border-b border-gray-800 bg-gray-950">
                    <img
                      src={project.images[0]}
                      alt={`${project.title} screenshot`}
                      className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="p-5">
                  <p className="mb-2 font-mono text-xs text-gray-500">
                    ~/projects/{project.slug}
                  </p>

                  <h3 className="text-2xl font-semibold text-white transition-colors group-hover:text-emerald-400">
                    {project.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-400">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-gray-700 bg-gray-950 px-2 py-1 font-mono text-xs text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>

              <div className="flex flex-wrap gap-4 border-t border-gray-800 px-5 py-4 text-sm">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-emerald-400 transition hover:text-emerald-300"
                  >
                    live
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
