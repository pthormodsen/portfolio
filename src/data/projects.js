const todoImages = import.meta.glob(
  "../assets/projects/todo/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const chessImages = import.meta.glob(
  "../assets/projects/chess/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const todoPictures = Object.values(todoImages);
const chessPictures = Object.values(chessImages);

export const projects = [
  {
    slug: "todo-list",
    title: "TODO List",
    description: "A full-stack task management application with user authentication, task management, and persistent storage.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
    liveLink: "https://todo.patreek.no",
    github: "https://github.com/pthormodsen/TODOListSpringBoot",
    images: todoPictures
  },
  {
    slug: "chess",
    title: "Chess",
    description: "A chess application featuring legal move validation, drag-and-drop gameplay, game analysis, and Stockfish integration.",
    tech: ["Java", "Swing", "Stockfish"],
    liveLink: "https://chess.patreek.no",
    github: "https://github.com/pthormodsen/Chess",
    images: chessPictures
  },
  {
    slug: "project-manager",
    title: "Project Manager",
    description: "A full-stack project management application with a Kanban-style interface for organizing projects and tasks.",
    tech: ["React", "TypeScript", "Spring Boot", "PostgreSQL"],
    liveLink: "",
    github: ""
  },
  {
    slug: "registration-system",
    title: "Registration System",
    description: "A web application for registering participants and managing participant lists with server-side validation.",
    tech: ["Java", "Spring Boot", "JSP", "PostgreSQL"],
    liveLink: "",
    github: ""
  },
  {
    slug: "quiz-app",
    title: "Quiz App",
    description: "A full-stack quiz application for creating quizzes and answering questions through a React frontend and REST API.",
    tech: ["React", "TypeScript", "Spring Boot", "H2"],
    liveLink: "",
    github: ""
  },
  {
    slug: "python-chess-engine",
    title: "Python Chess Engine",
    description: "A chess game built from scratch in Python, with move generation and a foundation for implementing a chess AI.",
    tech: ["Python", "Pygame"],
    liveLink: "",
    github: ""
  }
];