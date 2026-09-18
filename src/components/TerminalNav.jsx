import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const COMMAND_ALIASES = {
  ".": "home",
  "..": "home",
  "/": "home",
  "~": "home",
  home: "home",
  index: "home",
  start: "home",

  about: "about",
  me: "about",
  info: "about",

  experience: "experience",
  cv: "experience",
  resume: "experience",
  workhistory: "experience",

  blog: "blog",
  posts: "blog",
  writing: "blog",

  projects: "projects",
  project: "projects",
  work: "projects",
  portfolio: "projects",

  contact: "contact",
  email: "contact",
  mail: "contact",
  socials: "contact",
  social: "contact",
};

const DESTINATIONS = {
  home: { path: "/", sectionId: null },
  about: { path: "/about", sectionId: null },
  experience: { path: "/experience", sectionId: null },
  blog: { path: "/blog", sectionId: null },
  projects: { path: "/", sectionId: "projects" },
  contact: { path: "/", sectionId: "contact" },
};

const HELP_TEXT = "try: ls, cd projects, /about, resume, contact";

const HELP_SECTIONS = [
  {
    title: "Navigate",
    items: [
      {
        command: "about, /about, cd about",
        description: "Open the about page",
      },
      {
        command: "projects, work",
        description: "Jump to featured work",
      },
      {
        command: "blog, posts",
        description: "Open blog posts",
      },
      {
        command: "resume, cv",
        description: "Open experience",
      },
      {
        command: "contact, email",
        description: "Jump to contact links",
      },
      {
        command: "cd ..",
        description: "Return home",
      },
    ],
  },
  {
    title: "Terminal",
    items: [
      {
        command: "ls",
        description: "List available destinations",
      },
      {
        command: "pwd",
        description: "Show current location",
      },
      {
        command: "whoami",
        description: "Show current user",
      },
      {
        command: "clear",
        description: "Hide terminal output",
      },
      {
        command: "esc, ctrl+c",
        description: "Close help or the command line",
      },
    ],
  },
];

const LOCATION_ITEMS = [
  { name: "~/home", commands: "home, /, ~, cd ~" },
  { name: "./about", commands: "about, /about, me" },
  { name: "./experience", commands: "experience, resume, cv" },
  { name: "./blog", commands: "blog, posts, writing" },
  { name: "#projects", commands: "projects, project, work" },
  { name: "#contact", commands: "contact, email, socials" },
];

const normalizeCommand = (value) => {
  let normalized = value.trim().toLowerCase().replace(/\s+/g, " ");

  if (normalized.startsWith("cd ")) {
    normalized = normalized.slice(3).trim();
  }

  return normalized
    .replace(/^~\//, "")
    .replace(/^\.\//, "")
    .replace(/^\//, "")
    .replace(/\/$/, "");
};

const getTerminalPath = (pathname) => {
  switch (pathname) {
    case "/about":
      return "~/portfolio/about";

    case "/experience":
      return "~/portfolio/experience";

    case "/blog":
      return "~/portfolio/blog";

    default:
      return "~/portfolio";
  }
};

export default function TerminalNav() {
  const [active, setActive] = useState(
    () => sessionStorage.getItem("terminal-nav-active") === "true"
  );

  const [command, setCommand] = useState("");
  const [message, setMessage] = useState("");

  const inputRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!active || sessionStorage.getItem("terminal-nav-active") !== "true") {
      return;
    }

    sessionStorage.removeItem("terminal-nav-active");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, [active]);

  const focusInput = () => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const openTerminal = () => {
    setActive(true);
    focusInput();
  };

  const closeTerminal = () => {
    setActive(false);
    setCommand("");
    setMessage("");
  };

  const keepTerminalOpen = () => {
    setActive(true);
    setCommand("");
    focusInput();
  };

  const closeOutput = () => {
    setMessage("");
    keepTerminalOpen();
  };

  const scrollToSection = (sectionId) => {
    if (!sectionId) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const runCommand = (e) => {
    if (e.key !== "Enter") return;

    const cmd = command.trim().toLowerCase().replace(/\s+/g, " ");

    if (!cmd) return;

    if (cmd === "help" || cmd === "?") {
      setMessage("help");
      keepTerminalOpen();
      return;
    }

    if (cmd === "ls") {
      setMessage("ls");
      keepTerminalOpen();
      return;
    }

    if (cmd === "pwd") {
      setMessage(getTerminalPath(location.pathname));
      keepTerminalOpen();
      return;
    }

    if (cmd === "whoami") {
      setMessage("patrik");
      keepTerminalOpen();
      return;
    }

    if (cmd === "clear") {
      setMessage("");
      keepTerminalOpen();
      return;
    }

    const normalizedCommand = normalizeCommand(cmd);
    const destinationKey = COMMAND_ALIASES[normalizedCommand];
    const destination = DESTINATIONS[destinationKey];

    if (!destination) {
      setMessage(`command not found: ${cmd}`);
      keepTerminalOpen();
      return;
    }

    const changingRoute = location.pathname !== destination.path;

    if (changingRoute) {
      sessionStorage.setItem("terminal-nav-active", "true");
    }

    navigate(destination.path);
    keepTerminalOpen();

    setTimeout(() => {
      scrollToSection(destination.sectionId);
    }, 80);
  };

  const isPanelOpen = message === "help" || message === "ls";
  const hasInlineOutput = message && !isPanelOpen;

  return (
    <div
      className="relative hidden min-h-11 shrink-0 items-center gap-2 font-mono text-sm sm:flex"
      onClick={() => {
        if (!active) {
          openTerminal();
        }
      }}
      onKeyDown={(e) => {
        if (!active && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          openTerminal();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Open command line navigation"
    >
      <span className="text-gray-500 transition-colors hover:text-gray-300">
        patrik@portfolio:
      </span>

      <span className="text-green-400">~$</span>

      {active ? (
        <input
          ref={inputRef}
          value={command}
          onChange={(e) => {
            setCommand(e.target.value);

            if (message && !isPanelOpen) {
              setMessage("");
            }
          }}
          onKeyDown={(e) => {
            e.stopPropagation();

            if (e.key === "Escape") {
              if (isPanelOpen) {
                closeOutput();
              } else {
                closeTerminal();
              }

              return;
            }

            if (
              e.key.toLowerCase() === "c" &&
              e.ctrlKey &&
              !e.metaKey &&
              !e.altKey
            ) {
              e.preventDefault();

              if (isPanelOpen) {
                closeOutput();
              } else {
                closeTerminal();
              }

              return;
            }

            runCommand(e);
          }}
          className="w-40 border-none bg-transparent text-green-400 outline-none caret-green-400 placeholder:text-gray-600"
          placeholder="help"
          aria-label="Navigation command"
        />
      ) : (
        <>
          <span className="h-5 w-2 animate-pulse bg-green-400" />

          {!message && (
            <span className="text-xs text-gray-600">type help</span>
          )}
        </>
      )}

      {hasInlineOutput && (
        <div className="absolute left-0 top-full mt-2 rounded border border-gray-800 bg-gray-950 px-3 py-2 text-xs shadow-xl shadow-black/30">
          {message.startsWith("command not found:") ? (
            <span className="text-red-400">{message}</span>
          ) : (
            <span className="text-emerald-400">{message}</span>
          )}
        </div>
      )}

      {message === "help" && (
        <div className="absolute left-0 top-full mt-2 max-h-[calc(100vh-5rem)] w-96 overflow-y-auto rounded border border-gray-800 bg-gray-950 p-4 text-left shadow-xl shadow-black/30">
          <div className="mb-4 flex items-start justify-between gap-4 border-b border-gray-800 pb-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                Command help
              </p>

              <p className="mt-1 text-sm text-emerald-400">
                {HELP_TEXT}
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                closeOutput();
              }}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-gray-800 text-gray-500 transition hover:border-gray-700 hover:text-white focus-visible:outline-2 focus-visible:outline-emerald-400"
              aria-label="Close command help"
            >
              x
            </button>
          </div>

          <div className="space-y-4">
            {HELP_SECTIONS.map((section) => (
              <div key={section.title}>
                <p className="mb-2 text-xs uppercase tracking-[0.16em] text-gray-600">
                  {section.title}
                </p>

                <div className="space-y-2">
                  {section.items.map((item) => (
                    <div
                      key={item.command}
                      className="rounded border border-gray-800 bg-gray-900/50 p-2.5"
                    >
                      <span className="font-mono text-xs text-gray-200">
                        {item.command}
                      </span>

                      <p className="mt-1 text-xs leading-relaxed text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {message === "ls" && (
        <div className="absolute left-0 top-full mt-2 w-96 rounded border border-gray-800 bg-gray-950 p-4 text-left shadow-xl shadow-black/30">
          <div className="mb-4 flex items-start justify-between gap-4 border-b border-gray-800 pb-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                Available locations
              </p>

              <p className="mt-1 text-sm text-emerald-400">
                run any command below to navigate
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                closeOutput();
              }}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-gray-800 text-gray-500 transition hover:border-gray-700 hover:text-white focus-visible:outline-2 focus-visible:outline-emerald-400"
              aria-label="Close location list"
            >
              x
            </button>
          </div>

          <div className="grid gap-2">
            {LOCATION_ITEMS.map((item) => (
              <div
                key={item.name}
                className="grid grid-cols-[7rem_1fr] gap-3 rounded border border-gray-800 bg-gray-900/50 p-2.5"
              >
                <span className="font-mono text-xs text-emerald-400">
                  {item.name}
                </span>

                <span className="font-mono text-xs leading-relaxed text-gray-400">
                  {item.commands}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}