import React from "react";
import type { Achievement } from "../types";
import { CodeIcon, UsersIcon, TrophyIcon, BriefcaseIcon } from "./Icons";

const achievementsData: Achievement[] = [
  {
    icon: <BriefcaseIcon className="w-8 h-8 text-cyan-400" />,
    title: "10+ Full-Stack Projects",
    description:
      "Built and deployed multiple full-stack web projects demonstrating expertise in React, Node.js, and MongoDB.",
  },
  {
    icon: <CodeIcon className="w-8 h-8 text-cyan-400" />,
    title: "400+ LeetCode Problems",
    description:
      "Showcased strong data structures and algorithms proficiency by solving a wide range of coding challenges.",
  },
  {
    icon: <TrophyIcon className="w-8 h-8 text-cyan-400" />,
    title: "LeetCode Contest Rating 1400+",
    description:
      "Ranked among the top percentile of competitive programmers, reflecting strong problem-solving skills under pressure.",
  },
  {
    icon: <UsersIcon className="w-8 h-8 text-cyan-400" />,
    title: "Project Leadership",
    description:
      "Led 3+ collaborative group projects, ensuring effective coordination, timely delivery, and successful outcomes.",
  },
];

const AchievementCard: React.FC<{ achievement: Achievement }> = ({
  achievement,
}) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-lg flex items-start space-x-4 shadow-none">
      <div className="flex-shrink-0">{achievement.icon}</div>
      <div>
        <h3 className="font-bold text-lg text-slate-100">
          {achievement.title}
        </h3>
        <p className="text-slate-400">{achievement.description}</p>
      </div>
    </div>
  );
};

const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-20">
      <h2 className="text-3xl font-bold text-center text-white mb-12">
        Achievements
      </h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {achievementsData.map((ach) => (
          <AchievementCard key={ach.title} achievement={ach} />
        ))}
      </div>
    </section>
  );
};

export default Achievements;
