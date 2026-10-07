import react from '@vitejs/plugin-react'
import process from 'node:process'
import { defineConfig } from 'vite'
import { blogPosts } from './src/data/blogPosts.js'

const apiProxyTarget = process.env.VITE_API_PROXY_TARGET || 'http://localhost:3001'
const SITE_URL = 'https://portfolio.patreek.no'

const escapeXml = (s) =>
  s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c])

function buildRss() {
  const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date))
  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.id}`
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${post.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
${post.tags.map((t) => `      <category>${escapeXml(t)}</category>`).join('\n')}
    </item>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Patrik Thormodsen - Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Notes on homelab, Linux, and software development.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`
}

// Generates /rss.xml from src/data/blogPosts.js (emitted into dist/ on build, served by middleware in dev)
function rssPlugin() {
  return {
    name: 'rss-feed',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'rss.xml', source: buildRss() })
    },
    configureServer(server) {
      server.middlewares.use('/rss.xml', (_req, res) => {
        res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
        res.end(buildRss())
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), rssPlugin()],
  server: {
    proxy: { '/api/wpm': apiProxyTarget },
  },
})
