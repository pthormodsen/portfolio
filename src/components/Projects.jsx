import React from 'react';
const projects = [
  {
    title: "TODO List",
    description: "A full-stack task management application with user authentication, task management, and persistent storage.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
    liveLink: "https://todo.patreek.no",
    github: "https://github.com/pthormodsen/TODOListSpringBoot"
  },
  {
    title: "Chess",
    description: "A chess application featuring legal move validation, drag-and-drop gameplay, game analysis, and Stockfish integration.",
    tech: ["Java", "Swing", "Stockfish"],
    liveLink: "https://chess.patreek.no",
    github: "https://github.com/pthormodsen/Chess"
  },
  {
    title: "Project Manager",
    description: "A full-stack project management application with a Kanban-style interface for organizing projects and tasks.",
    tech: ["React", "TypeScript", "Spring Boot", "PostgreSQL"],
    liveLink: "https://wpm.patreek.no",
    github: ""
  },
  {
    title: "Registration System",
    description: "A web application for registering participants and managing participant lists with server-side validation.",
    tech: ["Java", "Spring Boot", "JSP", "PostgreSQL"],
    liveLink: "https://paamelding.patreek.no",
    github: ""
  },
  {
    title: "Quiz App",
    description: "A full-stack quiz application for creating quizzes and answering questions through a React frontend and REST API.",
    tech: ["React", "TypeScript", "Spring Boot", "H2"],
    liveLink: "",
    github: ""
  },
  {
    title: "Python Chess Engine",
    description: "A chess game built from scratch in Python, with move generation and a foundation for implementing a chess AI.",
    tech: ["Python", "Pygame"],
    liveLink: "",
    github: ""
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-40xl font-bold">
            <span className="">My Projects</span>
          </h2>

        <div className="w-12 h-1 bg-emerald-400 mx-auto mt-3 rounded-full"></div>
      </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-emerald-500 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap justify-center gap-2 mb-6 pt-5">
                {project.tech.map((tech, i) => (
                  <span key={i} className="bg-gray-700 text-emerald-400 px-3 py-1 text-sm rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 justify-center">
                <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">Live Demo</a>
                <a href={project.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition">GitHub</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}