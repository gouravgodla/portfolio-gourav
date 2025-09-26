import React from "react";
import { SKILLS } from "../../constants";
import {
  CodeIcon,
  ComputerDesktopIcon,
  ServerStackIcon,
  CircleStackIcon,
  WrenchIcon,
} from "./Icons";

const categoryIcons: { [key: string]: React.ReactNode } = {
  Languages: <CodeIcon className="w-6 h-6 text-cyan-400" />,
  Frontend: <ComputerDesktopIcon className="w-6 h-6 text-cyan-400" />,
  Backend: <ServerStackIcon className="w-6 h-6 text-cyan-400" />,
  Databases: <CircleStackIcon className="w-6 h-6 text-cyan-400" />,
  "Developer Tools": <WrenchIcon className="w-6 h-6 text-cyan-400" />,
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20">
      <h2 className="text-3xl font-bold text-center text-white mb-12">
        Technologies & Skills
      </h2>
      <div className="max-w-4xl mx-auto">
        {SKILLS.map((category) => (
          <div key={category.title} className="mb-8">
            <div className="flex items-center mb-4">
              {categoryIcons[category.title]}
              <h3 className="text-xl font-semibold text-cyan-400 ml-3">
                {category.title}
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill) => (
                <div
                  key={skill}
                  className="bg-slate-700 text-slate-200 font-medium px-4 py-2 rounded-md shadow-sm transition-transform duration-200 hover:scale-105"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
