// Injected at build time by vite.config.js (GIT_SHA env var, falling back to `git rev-parse`).
const sha = import.meta.env.VITE_GIT_SHA || "";
const builtAt = import.meta.env.VITE_BUILD_DATE || "";

export const buildInfo = {
  sha,
  shortSha: sha.slice(0, 7),
  commitUrl: sha ? `https://github.com/pthormodsen/portfolio/commit/${sha}` : "",
  date: builtAt.slice(0, 10),
  isDev: import.meta.env.DEV,
};
