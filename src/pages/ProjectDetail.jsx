import { Link, useParams } from "react-router-dom";
import ProjectGallery from "../components/ProjectGallery";
import { projects } from "../data/projects";
import { projectDetails } from "../data/projectDetails";

function ProjectSection({ title, children }) {
  return (
    <section className="space-y-4 text-left">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}

function ParagraphList({ items }) {
  return (
    <div className="space-y-4 leading-relaxed text-gray-300">
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-3 leading-relaxed text-gray-300">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  const details = project ? projectDetails[project.slug] : null;
  const projectLinks = [
    project?.demoLink && {
      href: project.demoLink,
      label: "Demo",
      variant: "primary",
    },
    project?.liveLink && {
      href: project.liveLink,
      label: "Live Site",
      variant: "primary",
    },
    project?.github && {
      href: project.github,
      label: "GitHub",
    },
    ...(project?.githubLinks?.map((link) => ({
      href: link.url,
      label: `GitHub (${link.label})`,
    })) ?? []),
  ].filter(Boolean);

  if (!project) {
    return (
      <main className="mx-auto max-w-4xl px-4 pb-20 pt-16 text-center sm:pb-24 sm:pt-20">
        <title>Project Not Found – Patrik Thormodsen</title>
        <h1 className="text-4xl font-bold mb-4">Project not found</h1>
        <Link to="/" className="text-emerald-400 hover:underline">Back to homepage</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20">
      <title>{`${project.title} – Patrik Thormodsen`}</title>
      <Link
        to="/#projects"
        className="font-mono text-sm text-emerald-400 transition hover:text-emerald-300"
      >
        &larr; Back to projects
      </Link>

      <article className="mt-10 space-y-14">
        <header className="space-y-8 border-b border-gray-800 pb-10 text-left">
          <div className="space-y-5">
            <p className="font-mono text-sm text-emerald-400">
              ~/portfolio/projects/{project.slug}
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {project.title}
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-gray-300">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-gray-800 bg-gray-900 px-3 py-1 font-mono text-sm text-emerald-400"
              >
                {tech}
              </span>
            ))}
          </div>

          {projectLinks.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {projectLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={
                    link.variant === "primary"
                      ? "rounded-md border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 font-mono text-sm text-emerald-300 transition hover:border-emerald-300 hover:text-emerald-200"
                      : "rounded-md border border-gray-800 px-4 py-2 font-mono text-sm text-gray-300 transition hover:border-gray-600 hover:text-white"
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </header>

        {project.demoDescription && (
          <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-4 py-3 text-left">
            <p className="font-mono text-sm text-emerald-300">
              Recruiter-friendly demo
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-300">
              {project.demoDescription}
            </p>
          </div>
        )}

        <ProjectGallery images={project.images} title={project.title} />

        {details && (
          <div className="space-y-12">
            {details.overview?.length > 0 && (
              <ProjectSection title="Overview">
                <ParagraphList items={details.overview} />
              </ProjectSection>
            )}

            {details.highlights?.length > 0 && (
              <ProjectSection title="What I Built">
                <BulletList items={details.highlights} />
              </ProjectSection>
            )}

            {details.technical?.length > 0 && (
              <ProjectSection title="How It Works">
                <BulletList items={details.technical} />
              </ProjectSection>
            )}

            {details.challenges?.length > 0 && (
              <ProjectSection title="Challenges">
                <ParagraphList items={details.challenges} />
              </ProjectSection>
            )}

            {details.learned?.length > 0 && (
              <ProjectSection title="What I Learned">
                <ParagraphList items={details.learned} />
              </ProjectSection>
            )}

            {details.nextSteps?.length > 0 && (
              <ProjectSection title="Next Steps">
                <BulletList items={details.nextSteps} />
              </ProjectSection>
            )}
          </div>
        )}
        <Link
        to="/#projects"
        className="mt-2 font-mono text-sm text-emerald-400 transition hover:text-emerald-300"
      >
        &larr; Back to projects
      </Link>
      </article>
    
    </main>
  );
}
