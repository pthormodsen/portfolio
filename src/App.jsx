import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import ProjectDetail from "./pages/ProjectDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
