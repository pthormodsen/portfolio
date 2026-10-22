import { buildInfo } from "../data/buildInfo";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800/70 bg-gray-950 px-4 py-6 font-mono text-xs text-gray-600 sm:text-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 sm:flex-row sm:justify-between">
        <p className="m-0">
          <span className="text-emerald-400">➜</span> build{" "}
          {buildInfo.commitUrl ? (
            <a
              href={buildInfo.commitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded text-gray-400 transition hover:text-emerald-400 focus-visible:outline-2 focus-visible:outline-emerald-400"
              title="View this commit on GitHub"
            >
              {buildInfo.shortSha}
            </a>
          ) : (
            <span className="text-gray-400">local</span>
          )}
          {buildInfo.isDev ? (
            <> · dev server</>
          ) : (
            buildInfo.date && (
              <>
                {" "}· built <time dateTime={buildInfo.date}>{buildInfo.date}</time>
              </>
            )
          )}
        </p>

        <p className="m-0">© {new Date().getFullYear()} Patrik Thormodsen</p>
      </div>
    </footer>
  );
}
