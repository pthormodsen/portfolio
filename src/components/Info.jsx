const notes = [
  {
    title: "Education",
    text: "Computer Engineering at Western Norway University of Applied Sciences (HVL). Graduating in 2027.",
  },
  {
    title: "Interests",
    text: "Software development, backend systems, databases, self-hosting, and gaming.",
  },
  {
    title: "Currently",
    text: "Building personal projects, running services at home, and finishing my degree.",
  },
];

export default function Info() {
  return (
    <section id="about" className="bg-gray-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="mb-2 font-mono text-sm text-emerald-400">
            ~/portfolio/about
          </p>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            About me
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <p className="text-lg leading-8 text-gray-400">
            I am currently studying computer engineering and use this website
            to showcase some of the projects I have built. I enjoy programming
            and spend a lot of my free time working on personal projects and
            trying out new technologies.
          </p>

          <p className="text-lg leading-8 text-gray-400">
            I mostly work with Java and Spring Boot, but I also enjoy building
            full-stack applications and learning how the different parts fit
            together. I prefer learning by actually building things and getting
            them running for real.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
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
          I also have a few things I want to explore next, including building
          a small server cluster and experimenting more with ESP32 boards.
        </p>
      </div>
    </section>
  );
}