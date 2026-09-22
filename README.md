# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Docker Dev

Run the local development stack with Vite hot reload and the leaderboard API:

```sh
docker compose -f docker-compose.dev.yml up --build
```

Open `http://localhost:5173`.

The dev compose file starts:

- `portfolio-dev`: Vite dev server with source files mounted into the container.
- `leaderboard-dev`: local typing leaderboard API on port `3001`.

Leaderboard scores are stored in the `leaderboard-dev-data` Docker volume. Stop the stack with `Ctrl+C`, or run:

```sh
docker compose -f docker-compose.dev.yml down
```

## Public Demo Links

Project cards can expose a separate `demoLink` in `src/data/projects.js`.
Use this for recruiter-friendly versions that load example data and avoid
forcing visitors to create an account.

For apps that normally require login, the portfolio uses a shared convention:

```txt
https://example.patreek.no?demo=true
```

Each app should detect `demo=true`, seed browser-safe example data, and keep demo
changes isolated from real user accounts. Apps that are already browser-only can
point `demoLink` at the normal live site.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
