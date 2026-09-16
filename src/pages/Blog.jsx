import Navbar from "../components/Navbar";
import { blogPosts } from "../data/blogPosts";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

export default function Blog() {
  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-emerald-500 selection:text-gray-900">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <section className="mx-auto max-w-3xl text-center">
          <p className="mb-3 font-mono text-sm uppercase tracking-[0.22em] text-emerald-400">
            ./blog
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Notes from what I am building
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            A simple place for experiments, lessons learned, build logs, and
            small things I want to remember while working on projects.
          </p>
        </section>

        <section className="mt-16 border-t border-gray-800">
          <div className="flex items-center justify-between gap-4 py-6">
            <h2 className="text-2xl font-semibold text-white">Latest posts</h2>
            <span className="font-mono text-sm text-gray-500">
              {blogPosts.length} drafts
            </span>
          </div>

          <div className="grid gap-5">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="rounded-lg border border-gray-800 bg-gray-900/60 p-6 text-left transition hover:border-emerald-400/60 hover:bg-gray-900"
              >
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="h-1 w-1 rounded-full bg-gray-600" />
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-mono text-xs text-emerald-300">
                    {post.status}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-semibold text-emerald-400">
                  {post.title}
                </h3>
                <p className="mt-3 max-w-3xl text-gray-300">{post.excerpt}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-gray-800 px-2.5 py-1 font-mono text-xs text-gray-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
