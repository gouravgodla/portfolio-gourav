import React from "react";
import { PERSONAL_INFO } from "../../constants";
import { GithubIcon, LinkedinIcon, MailIcon } from "./Icons";
import { profileImageUrl } from "./ProfileImage";

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center -mt-20"
    >
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-24">
        {/* Text Content */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-2">
            {PERSONAL_INFO.name}
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-cyan-400 mb-6">
            {PERSONAL_INFO.title}
          </h2>
          <p className="text-lg text-slate-400 mb-8">{PERSONAL_INFO.bio}</p>
          <div className="flex items-center justify-center md:justify-start space-x-5">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              aria-label="Email"
              className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <MailIcon className="w-8 h-8" />
            </a>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <GithubIcon className="w-8 h-8" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <LinkedinIcon className="w-8 h-8" />
            </a>
          </div>
        </div>

        {/* Image Content */}
        <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 flex-shrink-0 group">
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 opacity-75 blur-lg animate-slow-spin group-hover:opacity-100 group-hover:blur-xl transition duration-500"></div>
          <img
            src={profileImageUrl}
            alt={PERSONAL_INFO.name}
            className="relative w-full h-full object-cover rounded-full shadow-2xl transition duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
