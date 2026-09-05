const notes = [
  {
    title: "Education",
    text: "Computer Engineering at Western Norway University of Applied Sciences (HVL). Graduating with bachelor in 2027.",
  },
  {
    title: "Interests",
    text: "Software development, backend systems, databases, self-hosting, and gaming.",
  },
  {
    title: "Currently",
    text: "Building personal projects, running services on my home server, and finishing my degree.",
  },
];

export default function Info() {
  return (
    <section id="about" className="bg-gray-950 px-6 py-15 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="text-left">
          <h3 className="mb-3 text-2xl font-semibold uppercase tracking-[0.18em] text-emerald-400">
            About me
          </h3>

          <p className="text-lg leading-8 text-gray-400">
            I am currently studying computer engineering and use this website to showcase some of the projects I have built.
            I enjoy programming and spend a lot of my free time working on personal projects and trying out new technologies.
            I mostly work with Java and Spring Boot, but I also like building full-stack applications and learning more about how everything fits together.
          </p>
        </div>

        <div className="text-left mt-10">
          <p className="text-lg leading-8 text-gray-400">
            I like learning by actually building things. Whether it is a web application,
            a small tool, or something running on my home server, I enjoy figuring out
            how the different parts work together and getting it running for real.
            I also have several projects I want to explore next, including building a
            small server cluster and experimenting with ESP32 boards.
          </p>

          <div className="grid gap-4 sm:grid-cols-3 mt-10">
            {notes.map((note) => (
              <article key={note.title} className="border-l border-gray-700 pl-4">
                <h3 className="mb-2 font-semibold text-white">{note.title}</h3>
                <p className="text-sm leading-6 text-gray-400">{note.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
