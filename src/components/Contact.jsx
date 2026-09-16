import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="bg-gray-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-2 font-mono text-sm text-emerald-400">
          ~/portfolio/contact
        </p>

        <h2 className="text-3xl font-bold md:text-4xl">
          Get in touch
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-gray-400">
          Want to talk about a project, an opportunity, or just something tech related?
        </p>

        <div className="mt-8 flex justify-center gap-8">
          <a
            href="tel:+4790471841"
            className="flex items-center gap-2 text-gray-300 transition hover:text-emerald-400"
          >
            <FaPhone />
            Phone
          </a>

          <a
            href="mailto:patrik.thormodsen@gmail.com"
            className="flex items-center gap-2 text-gray-300 transition hover:text-emerald-400"
          >
            <FaEnvelope />
            Email
          </a>

          <a
            href="https://github.com/pthormodsen"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 transition hover:text-emerald-400"
          >
            <FaGithub />
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/patrik-thormodsen-41537a364/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 transition hover:text-emerald-400"
          >
            <FaLinkedin />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}