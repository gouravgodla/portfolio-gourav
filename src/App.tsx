import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Achievements from "./components/Achievements";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Particles from "./components/Particles";
import Certificates from "./components/Certificates";

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans leading-relaxed">
      <Particles />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900/20 z-0 opacity-60"></div>
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 md:px-12 py-12">
          <Hero />
          <Projects />
          <Skills />
          <Achievements />
          <Education />
          <Certificates />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
