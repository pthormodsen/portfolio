export default function Contact() {
  return (
    <section id="contact" className="bg-gray-950 text-white px-6 py-24">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">
          Contact
        </h2>

        <p className="text-gray-400 text-lg mb-8">
          Feel free to reach out if you have any questions or just want to
          get in touch.
        </p>

        <div className="flex justify-center gap-6 pt-3">
          <a
            href="mailto:patrik.thormodsen@gmail.com"
            className="text-gray-300 hover:text-emerald-400 transition"
          >
            Email
          </a>

          <a
            href="https://github.com/pthormodsen"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-emerald-400 transition"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/patrik-thormodsen-41537a364/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-emerald-400 transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
