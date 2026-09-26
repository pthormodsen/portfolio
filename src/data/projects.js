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

const esp32Images = import.meta.glob(
  "../assets/projects/esp32/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const todoPictures = Object.values(todoImages);
const chessPictures = Object.values(chessImages);
const wpmPictures = Object.values(wpmImages);
const esp32Pictures = Object.values(esp32Images);


export const projects = [
  {
    slug: "chess",
    title: "Chess",
    description: "A chess application with a Java rules engine, React web frontend, legal move validation, game review features, WebSocket engine integration, and Stockfish analysis.",
    tech: ["Java", "Spring Boot", "React", "Vite", "WebSocket", "Stockfish"],
    liveLink: "https://chess.patreek.no",
    demoLink: "https://chess.patreek.no",
    github: "https://github.com/pthormodsen/Chess",
    images: chessPictures
  },
  {
    slug: "wpm",
    title: "WPM Typing Test",
    description: "A typing speed test application built with React and TypeScript, featuring a timer, word count, and accuracy tracking.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    liveLink: "https://wpm.patreek.no",
    demoLink: "https://wpm.patreek.no",
    github: "https://github.com/pthormodsen/wpm-typing-app",
    images: wpmPictures
  },
  {
    slug: "todo-list",
    title: "TODO List",
    description: "A Spring Boot task manager with user authentication, task CRUD, validation, PostgreSQL persistence, local H2 support, email reminders, and Docker deployment.",
    tech: ["Java", "Spring Boot", "Spring Security", "PostgreSQL", "H2", "Docker"],
    liveLink: "https://todo.patreek.no",
    demoLink: "https://todo.patreek.no/demo",
    github: "https://github.com/pthormodsen/TODOListSpringBoot",
    images: todoPictures
  },
  {
    slug: "project-manager",
    title: "Project Manager",
    description: "A full-stack project management system with a React/TypeScript Kanban board and a Spring Boot REST API for users, projects, and tasks.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Spring Boot", "Spring Data JPA", "H2"],
    liveLink: "https://projectmanager.patreek.no",
    demoLink: "https://projectmanager.patreek.no/demo",
    github: "https://github.com/pthormodsen/Projectmanager",
  },

  {
    slug: "quiz-app",
    title: "Quiz App",
    description: "A full-stack quiz application with a React/TypeScript frontend and Spring Boot REST API for creating quizzes, adding questions, and storing quiz data in H2.",
    tech: ["React", "TypeScript", "Spring Boot", "Spring Data JPA", "H2"],
    liveLink: "https://quiz.patreek.no/login",
    demoLink: "https://quiz.patreek.no/demo",
    github: "https://github.com/pthormodsen/QuizApp"
  },

  {
  slug: "trafficESP",
  title: "ESP32 Traffic Display",
  description: "Real time nearby traffic incidents displayed on an ESP32 using Norwegian DATEX traffic data.",
  tech: ["ESP32", "C++", "FastAPI", "Python", "DATEX II", "Docker", "Wokwi"],
  liveLink: "",
  demoLink: "",
  github: "https://github.com/pthormodsen/TrafficESP32",
  images: esp32Pictures,
  }
];
