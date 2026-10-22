import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import Reveal from "./Reveal";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

export default function LatestPost() {
  const [post] = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

  if (!post) return null;

  return (
    <section className="bg-gray-950 px-4 pt-20 text-white">
      <Reveal className="mx-auto max-w-5xl">
        <p className="mb-3 text-left font-mono text-sm text-emerald-400">
          ~/portfolio $ tail -n 1 ./blog
        </p>

        <article className="rounded-lg border border-gray-800 bg-gray-900/60 text-left transition hover:border-emerald-400/60 hover:bg-gray-900">
          <Link
            to={`/blog/${post.id}`}
            className="block rounded-lg p-6 focus-visible:outline-2 focus-visible:outline-emerald-400"
          >
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-gray-500">
                Latest post
              </span>
              <span className="h-1 w-1 rounded-full bg-gray-600" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>

            <h3 className="mt-3 text-xl font-semibold text-emerald-400 sm:text-2xl">
              {post.title}
            </h3>

            <p className="mt-2 text-gray-400">{post.excerpt}</p>

            <span className="mt-4 block text-sm text-emerald-400">Read post &rarr;</span>
          </Link>
        </article>

        <div className="mt-3 text-right">
          <Link
            to="/blog"
            className="rounded font-mono text-sm text-gray-500 transition hover:text-white focus-visible:outline-2 focus-visible:outline-emerald-400"
          >
            ./blog --all
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
