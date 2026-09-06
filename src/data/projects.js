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

const wpmImages = import.meta.glob(
  "../assets/projects/wpm/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const todoPictures = Object.values(todoImages);
const chessPictures = Object.values(chessImages);
const wpmPictures = Object.values(wpmImages);

{/* 
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
*/}

export const projects = [
  {
    slug: "todo-list",
    title: "TODO List",
    description: "A Spring Boot task manager with user authentication, task CRUD, validation, PostgreSQL persistence, local H2 support, email reminders, and Docker deployment.",
    tech: ["Java", "Spring Boot", "Spring Security", "PostgreSQL", "H2", "Docker"],
    liveLink: "https://todo.patreek.no",
    github: "https://github.com/pthormodsen/TODOListSpringBoot",
    images: todoPictures
  },
  {
    slug: "chess",
    title: "Chess",
    description: "A chess application with a Java rules engine, React web frontend, legal move validation, game review features, WebSocket engine integration, and Stockfish analysis.",
    tech: ["Java", "Spring Boot", "React", "Vite", "WebSocket", "Stockfish"],
    liveLink: "https://chess.patreek.no",
    github: "https://github.com/pthormodsen/Chess",
    images: chessPictures
  },

  {
    slug: "wpm",
    title: "WPM Typing Test",
    description: "A typing speed test application built with React and TypeScript, featuring a timer, word count, and accuracy tracking.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    liveLink: "https://wpm.patreek.no",
    github: "https://github.com/pthormodsen/wpm-typing-app",
    images: wpmPictures
  },

  {
    slug: "project-manager",
    title: "Project Manager",
    description: "A full-stack project management system with a React/TypeScript Kanban board and a Spring Boot REST API for users, projects, and tasks.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Spring Boot", "Spring Data JPA", "H2"],
    liveLink: "https://projectmanager.patreek.no",
    githubLinks: [
      { label: "Frontend", url: "https://github.com/pthormodsen/projectmanager-frontend" },
      { label: "Backend", url: "https://github.com/pthormodsen/Projectmanager-backend" }
    ]
  },
  
  {
    slug: "quiz-app",
    title: "Quiz App",
    description: "A full-stack quiz application with a React/TypeScript frontend and Spring Boot REST API for creating quizzes, adding questions, and storing quiz data in H2.",
    tech: ["React", "TypeScript", "Spring Boot", "Spring Data JPA", "H2"],
    liveLink: "",
    github: "https://github.com/pthormodsen/QuizApp"
  }
];
