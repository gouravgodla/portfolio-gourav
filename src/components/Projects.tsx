import React, { useState, useMemo } from "react";
import { PROJECTS } from "../../constants";
import type { Project } from "../types";
import { GithubIcon, ExternalLinkIcon } from "./Icons";

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-slate-800/50 rounded-lg shadow-none overflow-hidden transition-all duration-300 hover:shadow-cyan-500/20 hover:scale-[1.02] group flex flex-col">
      {project.imageUrl && (
        <div className="h-48 overflow-hidden">
          <img
            src={project.imageUrl}
            alt={`Screenshot of ${project.title}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      )}
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">
            {project.title}
          </h3>
          <div className="flex items-center space-x-4 text-slate-400">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="hover:text-cyan-400 transition-colors duration-300"
            >
              <GithubIcon className="w-6 h-6" />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live Demo"
              className="hover:text-cyan-400 transition-colors duration-300"
            >
              <ExternalLinkIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
        <p className="text-slate-400 mb-4">{project.description}</p>
      </div>
      <div className="p-6 pt-0">
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="bg-cyan-900/50 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const FILTERS = ["All", "React", "Node.js", "Next.js", "Full-Stack"];

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return PROJECTS;
    }
    if (activeFilter === "Full-Stack") {
      return PROJECTS.filter(
        (p) =>
          (p.stack.includes("React") || p.stack.includes("Next.js")) &&
          p.stack.includes("Node.js")
      );
    }
    return PROJECTS.filter((project) => project.stack.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="projects" className="py-20">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        Featured Projects
      </h2>

      <div className="flex justify-center flex-wrap gap-x-2 gap-y-3 mb-12">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-300 ${
              activeFilter === filter
                ? "bg-cyan-500 text-white shadow-md"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
