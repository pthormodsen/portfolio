# Blog posts

Each post is a normal React component in this folder. `BlogPost.jsx` provides the title, date, tags, navigation, and shared reading layout.

To add a post:

1. Copy `PostTemplate.jsx` and give the file and component a new name.
2. Add the title, date, status, tags, and excerpt to `src/data/blogPosts.js`. Use a unique URL-friendly `id`, such as `my-first-server`.
3. Import your component in `src/pages/BlogPost.jsx` and add it to the `pages` object under that same id.
4. Open `/blog/my-first-server` or click its card on `/blog`.

Write the article with normal JSX headings, paragraphs, lists, images, and code blocks. Shared formatting lives in `blogposts.css`.

The three example pages contain draft text and writing prompts. Replace these before setting the status to `Published`. Drafts are visible to visitors; status is only a label, not access control.
