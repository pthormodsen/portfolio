const experience = [
  {
    period: "Dec 2025 — Present",
    title: "Technical Exam Support",
    company: "Western Norway University of Applied Sciences (HVL)",
    description:
      "Provided technical support during digital exams, helping resolve technical issues for students and staff.",
  },

  {
    period: "Jan 2026 — Present",
    title: "Student Assistant",
    company: "Western Norway University of Applied Sciences (HVL)",
    description:
      "Helped students with exercises and problem solving in DAT107 (Databases), FOR033 (Preparatory Mathematics), and MAT210 (Discrete Mathematics), as well as grading assignments.",
  },

  {
    period: "Jun 2022 — Present",
    title: "Logistics & Distribution Worker",
    company: "TINE",
    description:
      "Worked in logistics and distribution before and alongside my studies, including order picking and forklift operations. As a summer worker in Sola, I also worked as a substitute for the Lervig distribution operation.",
  },

  {
    period: "Apr 2023 — Apr 2024",
    title: "Terminal Soldier",
    company: "Norwegian Armed Forces",
    description:
      "Completed military service working with loading and unloading of passenger and military aircraft, terminal operations, logistics, and safety.",
  },

  {
    period: "Jun 2020 — Jul 2022",
    title: "Part-Time Employee",
    company: "McDonald's & REMA 1000",
    description:
      "Worked part-time alongside school with customer service, food production, and retail operations.",
  },
];

const education = [
  {
    period: "2024 — 2027",
    title: "Bachelor in Computer Engineering",
    company: "Western Norway University of Applied Sciences (HVL)",
    description:
      "Specializing in software development and architecture, with coursework in programming, databases, distributed systems, machine learning, and software engineering.",
  },
];

const technologies = {
  languages: [
    "Java",
    "Python",
    "JavaScript",
    "TypeScript",
    "SQL",
    "Haskell",
  ],

  frameworks: [
    "Spring Boot",
    "React",
    "JPA / Hibernate",
  ],

  tools: [
    "Docker",
    "Git",
    "Maven",
    "Linux",
    "Proxmox",
    "PostgreSQL",
    "Cloudflare",
  ],
};

function TimelineItem({ period, title, company, description }) {
  return (
    <div className="relative border-l border-gray-800 pl-6">
      <span className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-emerald-400" />

      <p className="mb-1 font-mono text-sm text-emerald-400">
        {period}
      </p>

      <h3 className="text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {company}
      </p>

      <p className="mt-3 max-w-2xl leading-7 text-gray-400">
        {description}
      </p>
    </div>
  );
}

export default function Cv() {
  return (
    <section className="min-h-screen bg-gray-950 px-6 pb-24 pt-16 text-left text-white sm:pt-20">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 font-mono text-sm text-emerald-400">
            ~/portfolio/experience
          </p>

          <h1 className="m-0 text-4xl font-bold tracking-tight md:text-6xl">
            Experience
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400 mx-auto">
            A timeline of what I have worked on, studied, and learned along
            the way.
          </p>
        </div>

        {/* Education */}
        <div className="mb-30 text-left">
          <p className="mb-2 font-mono text-sm text-emerald-400">
            ./education
          </p>

          <h2 className="mb-10 text-3xl font-bold">
            Education
          </h2>

          <div className="space-y-10">
            {education.map((item) => (
              <TimelineItem
                key={item.title}
                {...item}
              />
            ))}
          </div>
        </div>

        {/* Work */}
        <div className="mb-30">
          <p className="mb-2 font-mono text-sm text-emerald-400">
            ./work
          </p>

          <h2 className="mb-10 text-3xl font-bold">
            Experience
          </h2>

          <div className="space-y-10">
            {experience.map((item) => (
              <TimelineItem
                key={`${item.title}-${item.company}`}
                {...item}
              />
            ))}
          </div>
        </div>

        {/* Stack */}
       <div className="text-center">
            <p className="mb-2 font-mono text-sm text-emerald-400">
                ./stack
            </p>

            <h2 className="mb-10 text-3xl font-bold">
                Technologies
            </h2>

            <div className="space-y-8">
                {Object.entries(technologies).map(([category, items]) => (
                <div key={category}>
                    <h3 className="mb-3 font-mono text-sm capitalize text-gray-500">
                    {category}
                    </h3>

                    <div className="flex flex-wrap justify-center gap-3">
                    {items.map((tech) => (
                        <span
                        key={tech}
                        className="rounded border border-gray-800 bg-gray-900 px-4 py-2 font-mono text-sm text-gray-300 transition hover:border-emerald-400 hover:text-emerald-400"
                        >
                        {tech}
                        </span>
                    ))}
                    </div>
                </div>
                ))}
            </div>
            </div>
                    

      </div>
    </section>
  );
}
