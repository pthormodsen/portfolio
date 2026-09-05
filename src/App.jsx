import React from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="font-sans antialiased bg-gray-950 selection:bg-emerald-500 selection:text-gray-900">
      {/* You can also place a Navbar here */}
      <main>
        <Hero />
        <Projects />
        <Contact />
        {/* Add your Contact form or About sections next */}
      </main>
    </div>
  );
}
