import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync, renameSync } from "node:fs";
import { dirname } from "node:path";

// Change the test here. Clear the scores file if you change the rules.
const DURATION = 15;
const PASSAGE = "The sun was setting behind the hills as we walked home. A small cat sat by the door and watched the world go by. There was still time to make some tea and read a few pages before the night began. Tomorrow we would take the long road down to the river and find a quiet place to sit. For now it was enough to rest and listen to the rain on the window.";
const FILE = process.env.SCORES_FILE || "server/data/scores.json";
const sessions = new Map();
let scores = [];
mkdirSync(dirname(FILE), { recursive: true });
try {
  scores = JSON.parse(readFileSync(FILE, "utf8"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

// Expire unused attempts after ten minutes. Each token can save only once.
setInterval(() => {
  for (const [token, session] of sessions) {
    if (Date.now() - session.started > 600_000) sessions.delete(token);
  }
}, 60_000).unref();

async function readBody(request) {
  let body = "";
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 4096) throw new Error("Request too large.");
  }
  return JSON.parse(body);
}

createServer(async (request, response) => {
  function send(status, data) {
    response.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store" });
    response.end(JSON.stringify(data));
  }

  try {
    if (request.method === "GET" && request.url === "/api/wpm/config") return send(200, { duration: DURATION, passage: PASSAGE });
    if (request.method === "GET" && request.url === "/api/wpm/scores") return send(200, scores);
    if (request.method === "POST" && request.url === "/api/wpm/start") {
      if (sessions.size >= 5000) return send(429, { error: "Too many attempts. Try again later." });
      const token = randomUUID();
      sessions.set(token, { started: Date.now() });
      return send(200, { token, duration: DURATION, passage: PASSAGE });
    }
    if (request.method !== "POST" || request.url !== "/api/wpm/scores") return send(404, { error: "Not found." });

    const { token, name, text } = await readBody(request);
    const session = sessions.get(token);
    if (!session || Date.now() - session.started > 600_000) return send(400, { error: "Attempt expired. Start a new test." });
    if (Date.now() - session.started < DURATION * 1000) return send(400, { error: "The test is not finished yet." });
    if (typeof name !== "string" || !name.trim() || name.trim().length > 24 ||
        typeof text !== "string" || !text.length || text.length > PASSAGE.length) {
      return send(400, { error: "Enter a name (1–24 characters) and complete the test." });
    }

    const correct = [...text].filter((letter, i) => letter === PASSAGE[i]).length;
    const result = {
      id: token, name: name.trim(),
      wpm: Math.round(correct / 5 * 60 / DURATION),
      accuracy: Math.round(correct / text.length * 100),
    };
    if (!result.wpm) return send(400, { error: "Type some correct characters before saving." });
    const next = [...scores, result].sort((a, b) => b.wpm - a.wpm || b.accuracy - a.accuracy).slice(0, 10);
    // Synchronous, atomic writes keep this small single-process server simple.
    try {
      writeFileSync(`${FILE}.tmp`, JSON.stringify(next, null, 2));
      renameSync(`${FILE}.tmp`, FILE);
    } catch (error) {
      console.error(error);
      return send(500, { error: "Could not save the score. Please try again." });
    }
    scores = next;
    sessions.delete(token);
    send(200, { result, scores });
  } catch {
    send(400, { error: "Invalid request." });
  }
}).listen(Number(process.env.PORT || 3001), "0.0.0.0", () => {
  console.log("Typing leaderboard running");
});
