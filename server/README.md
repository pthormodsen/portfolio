# Typing leaderboard

The React component calls a small Node server. No extra packages or database setup are needed.

## Run locally

Run `npm run server` in one terminal and `npm run dev` in another. Vite forwards `/api/wpm` to the server on port 3001.

## Run on your server

Use `docker compose up -d --build` as usual. Nginx forwards leaderboard requests to the new `leaderboard` container. Scores live in the `leaderboard-data` Docker volume and survive rebuilds and restarts. Do not delete that volume unless you want to reset the leaderboard.

## Change things

- `server/index.mjs`: passage, test duration, scoring, and top-10 limit.
- `src/components/Wpm.jsx`: layout, labels, and styling. Update the introduction if you change the duration.
- Local scores: `server/data/scores.json`. `SCORES_FILE` can override this path.

The server stores the top 10 runs, including repeat names, and breaks WPM ties by accuracy. WPM counts correct characters divided by five, over the full test duration. Accuracy measures the final text, after corrections.

Attempts expire after ten minutes and cannot be submitted twice. Restarting the backend cancels unfinished attempts but preserves scores. This is a casual leaderboard: the server calculates scores and rejects early submissions, but automated clients can still fake typed text. Names are not verified accounts.

Run one backend instance with this file storage. Nginx limits request frequency; behind a reverse proxy the limit may apply to the proxy IP unless real client IP forwarding is configured.
