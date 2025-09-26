import type { ReactNode } from 'react';

export interface Project {
  title: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  stack: string[];
  imageUrl?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Achievement {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface EducationInfo {
  university: string;
  location: string;
  degree: string;
  major: string;
  dates: string;
  coursework: string[];
}

export interface Certificate {
  name: string;
  organization: string;
  date: string;
  credentialUrl: string;
  imageUrl: string;
}
