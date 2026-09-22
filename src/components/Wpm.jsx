import { useEffect, useRef, useState } from "react";

const LOCAL_DEMO_SCORES = [
  { id: "demo-1", name: "Patrik", wpm: 120, accuracy: 99 },
  { id: "demo-2", name: "Patrik", wpm: 111, accuracy: 100 },
  { id: "demo-3", name: "Simon", wpm: 110, accuracy: 95 },
  { id: "demo-4", name: "Patrik", wpm: 109, accuracy: 99 },
  { id: "demo-5", name: "Trym", wpm: 104, accuracy: 100 },
  { id: "demo-6", name: "nheek", wpm: 103, accuracy: 100 },
  { id: "demo-7", name: "Stian", wpm: 101, accuracy: 97 },
  { id: "demo-8", name: "Patrik phone", wpm: 78, accuracy: 97 },
  { id: "demo-9", name: "Simon", wpm: 57, accuracy: 100 },
  { id: "demo-10", name: "William with a long name", wpm: 49, accuracy: 95 },
  { id: "demo-11", name: "Nora", wpm: 46, accuracy: 92 },
  { id: "demo-12", name: "Andreas", wpm: 44, accuracy: 90 },
  { id: "demo-13", name: "Local test user", wpm: 41, accuracy: 88 },
  { id: "demo-14", name: "Keyboard enjoyer", wpm: 38, accuracy: 86 },
  { id: "demo-15", name: "Debug runner", wpm: 35, accuracy: 84 },
];

const isLocalPreview = () =>
  typeof window !== "undefined" &&
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

async function api(path, body) {
  const response = await fetch(`/api/wpm/${path}`, body
    ? {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    : undefined
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong.");
  }

  return data;
}

export default function Wpm() {
  const [scores, setScores] = useState(() =>
    isLocalPreview() ? LOCAL_DEMO_SCORES : []
  );
  const [game, setGame] = useState(null);
  const [text, setText] = useState("");
  const [seconds, setSeconds] = useState(15);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const input = useRef(null);
  const deadline = useRef(0);
  const attempt = useRef(null);
  const passage = useRef(null);
  const caret = useRef(null);

  useEffect(() => {
    const showDemoScores = isLocalPreview();

    api("scores")
      .then((serverScores) => {
        setScores(
          showDemoScores && serverScores.length === 0
            ? LOCAL_DEMO_SCORES
            : serverScores
        );
      })
      .catch(() => {
        if (!showDemoScores) {
          setError("Leaderboard unavailable.");
        }
      });

    api("config")
      .then((config) => {
        setGame(config);
        setSeconds(config.duration);
      })
      .catch(() =>
        setError("Could not load the typing test. Refresh to try again.")
      );
  }, []);

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      const left = Math.max(
        0,
        Math.ceil((deadline.current - performance.now()) / 1000)
      );

      setSeconds(left);

      if (left === 0) {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (caret.current && passage.current) {
      passage.current.scrollTop = Math.max(
        0,
        caret.current.offsetTop - 40
      );
    }
  }, [text]);

  function type(event) {
    if (deadline.current && performance.now() >= deadline.current) {
      return;
    }

    const value = event.target.value;

    if (!deadline.current && value.length) {
      deadline.current =
        performance.now() + game.duration * 1000;

      setRunning(true);

      attempt.current = api("start", {}).catch(() => {
        setError(
          "Could not connect. Try again to submit a score."
        );

        return null;
      });
    }

    setText(value);
  }

  function reset() {
    deadline.current = 0;
    attempt.current = null;

    setRunning(false);
    setSeconds(game.duration);
    setText("");
    setResult(null);
    setSaved(false);
    setError("");

    input.current?.focus();
  }

  async function save(event) {
    event.preventDefault();

    setBusy(true);
    setError("");

    try {
      const session = await attempt.current;

      if (!session) {
        throw new Error(
          "Please try the test again to save a score."
        );
      }

      const data = await api("scores", {
        token: session.token,
        name,
        text,
      });

      setScores(data.scores);
      setResult(data.result);
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const correct = game
    ? [...text].filter(
        (letter, index) =>
          letter === game.passage[index]
      ).length
    : 0;

  const wpm = game
    ? Math.round(
        (correct / 5) *
          (60 / game.duration)
      )
    : 0;

  const accuracy = text.length
    ? Math.round((correct / text.length) * 100)
    : 0;

  const finished = running && seconds === 0;

  return (
    <section className="bg-gray-950 px-4 py-20 text-white">
      <div className="mx-auto max-w-5xl">

        <div className="mb-10 text-left">
          <p className="mb-2 font-mono text-sm text-emerald-400">
            ~/portfolio/typing-test
          </p>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Time for a little competition?
          </h2>

          <p className="mt-3 max-w-2xl text-gray-400">
            Give the typing test a try and see where you end up on the leaderboard.
            The wpm test is a short {game?.duration ?? 15} seconds typing challenge that measures your typing speed and accuracy.
            <br/><br/>(The text is fixed so that it is fair for all players participating)
          </p>
        </div>

        <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_18rem] lg:grid-cols-[minmax(0,1fr)_20rem]">

          {/* Typing area */}
          <div className="min-w-0">

            <div className="mb-3 flex items-center justify-between text-sm text-gray-400">
              <span>
                {finished
                  ? "Time is up"
                  : running
                    ? "Keep typing..."
                    : "Click the text and start typing"}
              </span>

              <span className="font-mono text-lg text-emerald-400">
                {seconds}s
              </span>
            </div>

            {game ? (
              <div className="relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/70 shadow-2xl shadow-black/20 transition-colors focus-within:border-emerald-400/70">

                {/* Terminal window header */}
                <div className="flex items-center gap-2 border-b border-gray-800 bg-gray-950/60 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

                  <span className="ml-2 font-mono text-xs text-gray-500">
                    wpm-test
                  </span>
                </div>

                {/* Passage */}
                <div
                  ref={passage}
                  aria-hidden="true"
                  className="relative m-6 h-40 overflow-hidden whitespace-pre-wrap break-words font-mono text-xl leading-8"
                >
                  {[...game.passage].map(
                    (letter, index) => (
                      <span
                        key={index}
                        ref={
                          index === text.length
                            ? caret
                            : null
                        }
                        className={
                          index < text.length
                            ? text[index] === letter
                              ? "text-emerald-400"
                              : "bg-red-400/15 text-red-400 underline decoration-red-400/50"
                            : "text-gray-500"
                        }
                        style={
                          index === text.length &&
                          !finished
                            ? {
                                borderLeft:
                                  "2px solid #34d399",
                                marginLeft: "-2px",
                              }
                            : undefined
                        }
                      >
                        {letter}
                      </span>
                    )
                  )}
                </div>

                <label
                  htmlFor="typing-input"
                  className="sr-only"
                >
                  Type this passage: {game.passage}
                </label>

                <textarea
                  id="typing-input"
                  ref={input}
                  value={text}
                  readOnly={finished}
                  onChange={type}
                  onSelect={(event) => {
                    const field = event.currentTarget;

                    field.setSelectionRange(
                      field.value.length,
                      field.value.length
                    );
                  }}
                  onPaste={(event) =>
                    event.preventDefault()
                  }
                  onDrop={(event) =>
                    event.preventDefault()
                  }
                  maxLength={game.passage.length}
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  className="absolute inset-0 h-full w-full resize-none cursor-text opacity-0"
                />
              </div>
            ) : (
              <p className="text-gray-400">
                Loading test…
              </p>
            )}

            {/* Results */}
            {finished && (
              <div className="mt-5">
                <div
                  role="status"
                  className="flex flex-wrap gap-8 rounded-xl border border-gray-800 bg-gray-900/50 px-5 py-4"
                >
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      WPM
                    </p>

                    <p className="font-mono text-3xl font-bold text-emerald-400">
                      {result?.wpm ?? wpm}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Accuracy
                    </p>

                    <p className="font-mono text-3xl font-bold">
                      {result?.accuracy ?? accuracy}%
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Correct
                    </p>

                    <p className="font-mono text-3xl font-bold">
                      {correct}
                    </p>
                  </div>
                </div>

                {!saved && (
                  <form
                    onSubmit={save}
                    className="mt-4 flex flex-wrap gap-3"
                  >
                    <label
                      htmlFor="typing-name"
                      className="sr-only"
                    >
                      Leaderboard name
                    </label>

                    <input
                      id="typing-name"
                      placeholder="Your name"
                      value={name}
                      onChange={(event) =>
                        setName(event.target.value)
                      }
                      required
                      maxLength={24}
                      className="min-w-0 flex-1 rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 outline-none placeholder:text-gray-600 focus:border-emerald-400"
                    />

                    <button
                      disabled={
                        busy ||
                        !name.trim() ||
                        wpm === 0
                      }
                      className="rounded-lg bg-emerald-400 px-5 py-2.5 font-semibold text-gray-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {busy
                        ? "Saving…"
                        : "Save score"}
                    </button>
                  </form>
                )}

                {saved && (
                  <p className="mt-3 font-mono text-sm text-emerald-400">
                    ✓ Score saved to leaderboard
                  </p>
                )}
              </div>
            )}

            {error && (
              <p
                role="alert"
                className="mt-3 text-sm text-red-300"
              >
                {error}
              </p>
            )}

            {game && (
              <button
                type="button"
                onClick={reset}
                disabled={busy}
                className="mt-5 font-mono text-sm text-gray-500 transition hover:text-emerald-400 disabled:opacity-50"
              >
                ↻ try_again()
              </button>
            )}
          </div>

          {/* Leaderboard */}
          <aside className="min-w-0 w-full self-start rounded-xl border border-gray-800 bg-gray-900/40 p-4 lg:-mt-8 lg:p-5">

            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Leaderboard
              </h3>

              <span className="font-mono text-xs text-gray-500">
                {scores.length} scores
              </span>
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)_3.5rem_3rem] gap-2 border-b border-gray-700 px-2 pb-2 text-xs font-medium text-gray-500">
              <span>Name</span>
              <span className="text-right">WPM</span>
              <span className="text-right">Acc.</span>
            </div>

            {scores.length > 0 ? (
              <div className="max-h-80 overflow-y-auto pr-1">
                {scores.map((score, index) => (
                  <div
                    key={score.id}
                    className="grid grid-cols-[minmax(0,1fr)_3.5rem_3rem] gap-2 border-b border-gray-800 px-2 py-2.5 text-sm last:border-0"
                  >
                    <div className="flex min-w-0 items-center">
                      <span className="mr-2 w-6 shrink-0 text-right font-mono text-gray-600">
                        {index + 1}.
                      </span>

                      <span className="truncate">
                        {score.name}
                      </span>
                    </div>

                    <span className="text-right font-mono tabular-nums text-emerald-400">
                      {score.wpm}
                    </span>

                    <span className="text-right font-mono tabular-nums text-gray-400">
                      {score.accuracy}%
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="font-mono text-sm text-gray-500">
                  No scores yet.
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Be the first one.
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
