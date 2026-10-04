export const projectDetails = {
  chess: {
    overview: [
      "Chess started as a Java desktop application and was rebuilt as a web app: a Spring Boot backend with a React frontend, plus Stockfish for engine play and analysis.",
      "The backend owns the rules and game state, while the frontend handles board interaction and presentation without duplicating the chess logic.",
    ],
    highlights: [
      "Full legal move validation, including castling, en passant, promotion, check, checkmate, and game clocks.",
      "Stockfish integration for playing against the engine, best-move suggestions, move classification, and accuracy in game review.",
      "PGN import, with the imported game replayed move by move through the same rules engine.",
      "Deployed with Docker and served through Cloudflare Tunnel.",
    ],
    technical: [
      "Stockfish runs as a separate process. The backend talks to it over the UCI protocol, and engine requests from the browser go over a WebSocket.",
      "React and Vite render the board, legal-move hints, timers, captured pieces, analysis arrows, and review controls.",
      "JUnit tests cover the rule cases that are easy to get wrong: castling rights, en passant, king safety, insufficient material, and clock behaviour.",
    ],
    challenges: [
      "Moving from a desktop app to a client-server web app forced a clean split between chess rules, game state, and UI. In the desktop version these were tangled together. In the web version the frontend must never become a second chess engine.",
      "Stockfish also needed care. Managing an external process, parsing UCI output, and making the Stockfish binary work across macOS development and the Linux production container were all their own problems.",
    ],
    learned: [],
    nextSteps: [
      "Saved games.",
      "An evaluation graph in game review.",
    ],
  },

  wpm: {
    overview: [
      "The WPM project exists in two versions.",
      "The original, the linked repository, is a standalone React app that runs entirely in the browser and stores results in localStorage.",
      "The second version is built into this portfolio's home page and adds a shared leaderboard, which meant moving the scoring off the client.",
    ],
    highlights: [
      "The standalone version supports sentence mode or random words across easy, medium, and hard difficulty levels, with tests from 15 to 120 seconds.",
      "It tracks live WPM and accuracy, then stores a personal best and the last 50 results locally.",
      "The portfolio version simplifies the test to 15 seconds and adds a shared top-10 leaderboard.",
    ],
    technical: [
      "The standalone app is a static Vite build served by nginx in Docker.",
      "In the portfolio version, a small Node server owns the passage, the duration, and the scoring. The browser starts an attempt and receives a single-use token. When the test ends, it sends only the typed text.",
      "The server rejects submissions that arrive before the time is up, reuse a token, or contain more text than the passage. It then calculates WPM and accuracy itself.",
      "The client timer counts down against a fixed deadline instead of counting ticks, so it stays accurate in a background tab.",
    ],
    challenges: [
      "A leaderboard where the browser reports its own score is trivial to fake from the developer console. Making the server the source of truth for timing and scoring was the main design change between the two versions.",
    ],
    learned: [],
    nextSteps: [],
  },

  "todo-list": {
    overview: [
      "A task manager with user accounts, per-user tasks with due dates, and email reminders. It was one of my first full Spring Boot applications with authentication, and took me beyond local development into production deployment on my own infrastructure.",
    ],
    highlights: [
      "Registration and form login with Spring Security and BCrypt-hashed passwords. Tasks belong to a user, and users only see their own.",
      "A scheduled job runs every day at 12:00 and emails users about tasks due the next day.",
      "A no-login demo at /demo, seeded with example tasks in sessionStorage, so visitors can try the app without an account.",
    ],
    technical: [
      "Spring profiles separate the environments. Locally the app starts with in-memory H2 and a dummy mail server, with no setup needed. In production it uses PostgreSQL and Gmail SMTP, configured through environment variables.",
      "Spring MVC and Spring Data JPA, with Task and User entities in a many-to-one relationship. The frontend is plain HTML, CSS, and JavaScript served by the same application.",
      "It runs in Docker Compose alongside PostgreSQL. A GitHub Actions workflow deploys to my home server over Tailscale and SSH.",
    ],
    challenges: [
      "The task features came quickly. Most of the work went into everything around them: authentication, keeping credentials out of the repository, production configuration, sending real email, containerising, and automating deployment.",
    ],
    learned: [],
    nextSteps: [
      "Integration tests for the task API and the reminder job.",
      "Let users choose when, or whether, they get reminder emails.",
    ],
  },

  "project-manager": {
    overview: [
      "A self-hosted project management tool with a Kanban board. The backend is a Spring Boot REST API and the frontend is React with TypeScript. Users register, create projects, and move tasks between To Do, In Progress, and Done.",
    ],
    highlights: [
      "Ownership is enforced across every task route, with integration tests verifying that one user cannot read or modify another user's data.",
      "Flyway migrations manage the PostgreSQL schema in production, while local development runs on in-memory H2.",
      "A React and TypeScript frontend with Tailwind CSS, plus a no-login demo at /demo backed by example data in the browser.",
    ],
    technical: [
      "The backend uses Spring Security with HTTP Basic authentication. Registration is the only public endpoint.",
      "Request and response DTOs with Bean Validation keep JPA entities out of the API.",
      "A typed API client in the frontend either calls the backend or, in demo mode, reads and writes local demo data, so the components don't need to know which one they're talking to.",
      "Separate Docker images for the backend and the frontend. In production, nginx serves the frontend and proxies /api to the backend.",
    ],
    challenges: [
      "Tasks can be reached through /api/tasks, /api/users/{id}/tasks, and /api/projects/{id}/tasks. Each path needs the same ownership check, and missing it on one route is enough to leak data.",
      "The security tests cover each route separately, which made later API changes much safer.",
    ],
    learned: [
      "Versioned migrations made schema changes explicit and reviewable, instead of letting Hibernate change the production schema on its own.",
    ],
    nextSteps: [
      "Replace stored Basic credentials with token- or session-based authentication.",
      "Drag-and-drop between Kanban columns.",
    ],
  },

  "quiz-app": {
    overview: [
      "A study app for building quizzes and term-based study sets, then practising them as flashcards, multiple choice, or written answers.",
      "The backend is a Spring Boot API with JWT authentication and PostgreSQL. The frontend is React with TypeScript.",
    ],
    highlights: [
      "Stateless JWT authentication. Every quiz, question, and study set is scoped to its owner.",
      "A readiness check reports what's missing, such as a question with no correct answer, before a quiz can be played.",
      "Consistent JSON error responses for validation errors, duplicate emails, bad credentials, and constraint violations.",
      "A no-login demo at /demo running on example data in the browser. Docker images are built and published to GHCR by GitHub Actions.",
    ],
    technical: [
      "Backend integration tests run against H2. They cover validation, ownership isolation, answer correctness, readiness, and reordering.",
      "Frontend tests with Vitest and Testing Library cover the quiz player, the forms, the study modes, and the demo-mode API client.",
    ],
    challenges: [
      "The CRUD was the easy part. Keeping the data consistent as features grew took more care. Marking an answer as correct must clear the previously correct one. A reorder request must be rejected if its IDs don't exactly match the quiz's questions. Another user's quiz must not be accessible at all, rather than merely preventing edits.",
      "Each of these rules has a test, which is what made it possible to keep adding features without breaking the earlier ones.",
    ],
    learned: [],
    nextSteps: [
      "Share quizzes and study sets between users.",
    ],
  },

  trafficESP: {
    overview: [
      "Live traffic incidents near Bergen, shown on a 16x2 LCD driven by an ESP32-S3.",
      "The data flows DATEX II feed → FastAPI service → compact JSON → ESP32 → display.",
    ],
    highlights: [
      "The ESP32 never touches the DATEX XML. The FastAPI service downloads the full situation feed from the Norwegian Public Roads Administration (Statens vegvesen), parses it, and serves a small JSON payload designed for a 16-character display.",
      "Incidents are filtered to a 20 km radius around Bergen, classified as road works, accidents, and other event types, sorted by distance, shortened to fit, and cached.",
      "The firmware connects to Wi-Fi, syncs the clock over NTP, polls the API every minute, and pages through incidents on the LCD.",
      "Custom LCD characters for Æ, Ø, and Å, so Norwegian road names display correctly.",
    ],
    technical: [
      "The Python service uses FastAPI with async httpx and authenticated requests to the DATEX feed. It calculates distances with the haversine formula. If the feed can't be fetched or parsed, it returns a 502 and logs the error.",
      "The firmware is C++ built with PlatformIO on the Arduino framework, using ArduinoJson and LiquidCrystal_I2C. The hardware is simulated in Wokwi with an ESP32-S3 and an I2C LCD.",
      "The API runs in Docker, with its image built by GitHub Actions.",
    ],
    challenges: [
      "DATEX II is large, deeply nested XML. Finding coordinates, road names, and readable descriptions reliably across different incident types, then reducing them to one useful line, was most of the work.",
    ],
    learned: [
      "Putting the heavy parsing on the server kept the firmware small. The ESP32 only handles a few hundred bytes of JSON.",
      "Display width, character sets, memory, and unreliable Wi-Fi forced me to design around constraints that don't exist in a normal web application.",
    ],
    nextSteps: [
      "Run it on physical hardware with a larger display.",
      "Make the location and radius configurable instead of fixed to Bergen.",
    ],
  },

  SeatSense: {
    overview: [
      "A system for showing real-time seat availability in university study spaces. Radar sensors detect whether individual seats are occupied, while a web application lets students explore buildings, floors, rooms, and available seats.",
      "The project combines embedded hardware with a React frontend and a backend API, with MazeMap used for navigating the campus and selecting rooms.",
    ],
    highlights: [
      "Interactive campus and floor navigation using MazeMap, with rooms selectable directly from the map.",
      "Room views show individual seats and their current state: available, occupied, unknown, or offline.",
      "HLK-LD2410C mmWave radar sensors detect presence without requiring cameras or identifying individual students.",
      "The system is designed so one ESP32 can collect data from multiple seat sensors and report their state to the backend.",
    ],
    technical: [
      "The frontend is built with React, TypeScript, Vite, and Tailwind CSS. MazeMap handles campus navigation, while SeatSense provides its own room layouts and seat-level information.",
      "MazeMap room features are mapped to SeatSense room data so clicking a room on the campus map opens the corresponding room and its seats.",
      "Each room has a configurable layout containing boundaries, desks, doors, whiteboards, and seat positions, rendered as an interactive room map.",
      "The hardware prototype uses an ESP32-S3 with HLK-LD2410C mmWave presence sensors. Sensor communication and behaviour can be tested in Wokwi before deploying to physical hardware.",
    ],
    challenges: [
      "MazeMap and SeatSense represent rooms differently, so a reliable mapping layer was needed between MazeMap's floor and room identifiers and the application's own room data.",
      "Presence detection is more complicated than simply detecting movement. The radar sensor must distinguish between an occupied seat, movement elsewhere in the room, and an empty seat without producing constant false positives.",
      "The system also needs to scale beyond a prototype. Instead of treating each sensor as an isolated device, the hardware and backend are being designed around multiple sensors per ESP32 and many sensor nodes across a building.",
    ],
    learned: [
      "Combining physical sensors with a web application introduced problems that don't appear in purely software projects, such as sensor placement, noisy measurements, hardware communication, and device failures.",
      "Keeping MazeMap responsible for campus navigation and SeatSense responsible for seat-level data created a cleaner separation than trying to reproduce the entire building map ourselves.",
    ],
    nextSteps: [
      "Connect the frontend to live sensor data instead of example room data.",
      "Build and test the multi-sensor ESP32 prototype on physical hardware.",
      "Add historical occupancy data so students can see when rooms are usually busy.",
      "Add tools for reporting faulty or offline sensors.",
    ],
  },
};