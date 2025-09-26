import React from "react";
import { PERSONAL_INFO } from "../../constants";
import { GithubIcon, LinkedinIcon, MailIcon } from "./Icons";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900/50 border-t border-slate-800">
      <div className="container mx-auto px-6 md:px-12 py-8 text-center text-slate-400">
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            aria-label="Email"
            className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
          >
            <MailIcon className="w-6 h-6" />
          </a>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
          >
            <GithubIcon className="w-6 h-6" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
          >
            <LinkedinIcon className="w-6 h-6" />
          </a>
        </div>
        <p>
          &copy; {currentYear} {PERSONAL_INFO.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
