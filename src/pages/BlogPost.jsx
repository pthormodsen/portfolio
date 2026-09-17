import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { blogPosts } from "../data/blogPosts";
import proxmoxHomeLab from "./blogposts/ProxmoxHomeLab";
import fedoraDualBoot from "./blogposts/FedoraDualBoot";
import "./blogposts/blogposts.css";

// Match each component to its id in data/blogPosts.js.
const pages = {
  "building-my-first-proxmox-homelab": proxmoxHomeLab,
  "fedora-ethernet-driver-fix" : fedoraDualBoot
};

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.id === slug);
  const Content = post ? pages[post.id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-emerald-500 selection:text-gray-900">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-16 text-left">
        <Link to="/blog" className="text-sm text-emerald-400 hover:underline focus-visible:outline-2 focus-visible:outline-emerald-400">
          &larr; Back to blog
        </Link>

        {Content ? <article className="mt-8">
          <header className="mb-10 flex flex-col gap-4 border-b border-gray-800 pb-8">
            <div className="flex flex-wrap gap-3 text-sm text-gray-400">
              <time dateTime={post.date}>{new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(post.date))}</time>
              <span className="text-emerald-400">{post.status}</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
            <p className="text-lg leading-8 text-gray-300">{post.excerpt}</p>
            <div className="flex flex-wrap gap-3 font-mono text-xs text-gray-400">
              {post.tags.map((tag) => <span key={tag}>#{tag}</span>)}
            </div>
            {post.status !== "Published" && <p className="text-sm text-gray-500">Draft scaffold — example text and writing prompts to replace before publishing.</p>}
          </header>
          <div className="blog-post-content"><Content /></div>
        </article> : <div className="py-12">
          <h1 className="text-3xl font-bold">Post not found</h1>
          <p className="text-gray-400">This post does not exist yet. Head back to the blog to read another one.</p>
        </div>}
      </main>
    </div>
  );
}
