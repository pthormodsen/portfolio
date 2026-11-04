
import patrik from "../assets/patrik.webp";

const notes = [
  {
    title: "Education",
    text: "Computer Engineering at HVL, specializing in Software Development and Architecture. Graduating in 2027.",
  },
  {
    title: "Homelab",
    text: "Running a small Proxmox cluster with Docker, Kubernetes (k3s), and various self-hosted services.",
  },
  {
    title: "Outside of coding",
    text: "Gym, padel, gaming, and spending time with friends. Currently building a redstone calculator in Minecraft.",
  },
];

export default function Info() {
  return (
    <section id="about" className="bg-gray-950 px-6 pb-20 pt-16 text-white sm:pb-24 sm:pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-3 font-mono text-sm text-emerald-400">
            ~/portfolio/about
          </p>

          <h1 className="m-0 text-4xl font-bold tracking-tight md:text-6xl">
            About me
          </h1>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:items-start">
          <div className="max-w-3xl space-y-6 text-left">
            <p className="text-lg leading-8 text-gray-400">
              I'm a Computer Engineering student at HVL in Bergen,
              Norway. I spend a lot of my free time programming and
              working on personal projects.
            </p>

            <p className="text-lg leading-8 text-gray-400">
              I mainly work with Java, Spring Boot, React and TypeScript.
              I also enjoy the infrastructure side of things and run
              my own homelab with Proxmox, Docker and Kubernetes (k3s).
              Most of my projects end up running on my own servers.
            </p>
          </div>

          <img
            src={patrik}
            alt="Patrik"
            width={340}
            height={340}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="aspect-square w-full rounded-lg object-cover"
          />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {notes.map((note) => (
            <article
              key={note.title}
              className="border-l border-gray-800 pl-4"
            >
              <h3 className="mb-2 font-semibold text-white">
                {note.title}
              </h3>

              <p className="text-sm leading-6 text-gray-400">
                {note.text}
              </p>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-gray-500">
          I've also been getting into redstone in Minecraft lately,
          trying to build a binary calculator. 
          It's been a fun way to mess around with logic gates outside of actual programming.
        </p>
      </div>
    </section>
  );
}
