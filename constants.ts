import type {
  Project,
  SkillCategory,
  EducationInfo,
  Certificate,
} from "./src/types";

export const PERSONAL_INFO = {
  name: "Gourav Singh",
  title: "Full-Stack Software Engineer",
  bio: "I build elegant and efficient full-stack solutions with a focus on user experience and scalable architecture. Passionate about leveraging modern technologies to solve real-world problems.",
  email: "itsgourav19@gmail.com",
  github: "https://github.com/gouravgodla",
  linkedin: "https://linkedin.com/in/gouravgodla",
};

export const PROJECTS: Project[] = [
  {
    title: "Evently — Full-Stack Event Management",
    description:
      "A comprehensive event management platform enabling users to discover, create, and manage events seamlessly. Features secure payments and modern user authentication.",
    githubUrl: "https://github.com/gouravgodla/evently-project",
    liveUrl: "https://evently-project-eo9p.vercel.app/",
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Stripe",
      "Clerk",
      "Uploadthing",
      "MongoDB",
      "Tailwind CSS",
    ],
    imageUrl: "/assets/home_page_evently.png",
  },
  {
    title: "StackJournal — Responsive Blog Application",
    description:
      "A full-featured blog platform with complete CRUD operations for content. Implemented with a mobile-first design and server-side rendering for performance.",
    githubUrl: "https://github.com/gouravgodla/blog-application-nodejs",
    liveUrl: "https://stackjournal.example.com",
    stack: [
      "React",
      "Node.js",
      "Express.js",
      "EJS",
      "MongoDB",
      "REST APIs",
      "CSS3",
    ],
    imageUrl: "assets/home_stackJournal.png",
  },
  {
    title: "CryptoPlace — Blockchain Analytics Platform",
    description:
      "A real-time crypto analytics dashboard providing live insights into cryptocurrency trends using dynamic, interactive data visualizations.",
    githubUrl: "https://github.com/gouravgodla/cryptoplace",
    liveUrl: "https://cryptoplace-black-seven.vercel.app/",
    stack: [
      "React",
      "Vite",
      "JavaScript",
      "CoinGecko API",
      "React Google Charts",
      "React Router",
    ],
    imageUrl: "/assets/home_cryptomarketplace.png",
  },
 {
  title: "TalkSphere — Real-time Language Exchange & Communication Platform",
  description:
    "TalkSphere is a feature-rich platform designed to facilitate real-time messaging, video calls, and language exchange in a secure and customizable environment.",
  githubUrl: "https://github.com/gouravgodla/TalkSphere-video-call-chat.git",
  liveUrl: "https://talksphere-video-call-chat.onrender.com",
  stack: [
    "React",
    "Express.js",
    "MongoDB",
    "Tailwind CSS",
    "Zustand",
    "TanStack Query",
    "JWT",
    "Stream",
    "Node.js",
  ],
  imageUrl: "/assets/home_page_talksphere.png",
},
];

export const SKILLS: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "SQL", "C++"],
  },
  {
    title: "Frontend",
    skills: [
      "HTML5",
      "CSS3",
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", "GraphQL"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MongoDB"],
  },
  {
    title: "Developer Tools",
    skills: ["Git", "GitHub", "Notion", "Postman"],
  },
];

export const EDUCATION: EducationInfo = {
  university: "Punjab Technical University",
  location: "Punjab",
  degree: "Bachelor of Technology",
  major: "Computer Science Engineering",
  dates: "2022 – 2026",
  coursework: [
    "Computer Networks",
    "DBMS",
    "Operating System",
    "OOPs",
    "Data Structures and Algorithm",
    "AI/ML",
  ],
};

export const CERTIFICATES: Certificate[] = [
  {
    name: "Full-Stack Web Development",
    organization: "Udemy",
    date: "Issued Aug 2025",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-31eb11c5-0147-4cfe-9a3e-cbd2a939d9b9/",
    imageUrl: "/assets/certif/Complete_Full_Stack.jpg",
  },
  {
    name: "AWS Cloud Technical Essentials",
    organization: "Coursera",
    date: "Issued January 2025",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/92VM5UIHEPGR",
    imageUrl: "/assets/certif/aws.png",
  },
  {
    name: "Introduction to Front-End Development",
    organization: "Coursera",
    date: "Issued October  2023",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/6792AULAGTED",
    imageUrl: "/assets/certif/Front_End_Development.png",
  },
  {
    name: "HTML and CSS in depth",
    organization: "Coursera",
    date: "Issued December 2023",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/JGERN9S2PVZF",
    imageUrl: "/assets/certif/htmlcss.png",
  },
  {
    name: "Get Started with Figma",
    organization: "Coursera",
    date: "Issued January 2024",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/certificate/LLCB55492LLE",
    imageUrl: "/assets/certif/figma.png",
  },
  {
    name: "Master Effective Time Management for Personal Productivity",
    organization: "Udemy",
    date: "Issued July 2023",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-7ecb9428-7bc5-48f2-bdb9-ee28c10e27d2/",
    imageUrl: "/assets/certif/time_management.png",
  },
  {
    name: "Learn Content Writing using AI & Make Money Online",
    organization: "Udemy",
    date: "Issued July 2023",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-05cddd47-14b7-441a-b53c-be0b55dd4a52/",
    imageUrl: "/assets/certif/content_writing.png",
  },
];
