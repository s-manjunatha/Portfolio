"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";

// Official vector SVGs for Skills
export const JavaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 11 4 10 5.5C9.25 6.62 8 8 8 9.5C8 11.5 9.5 13 11.5 13C13.5 13 14.5 11.5 14.5 9.5C14.5 8 13.75 6.62 13 5.5C12 4 12 2 12 2Z" fill="#F89820" />
    <path d="M12.5 13.5C10 13.5 6 15 6 17.5C6 20 10.5 21 12.5 21C14.5 21 19 20 19 17.5C19 15 15 13.5 12.5 13.5Z" fill="#5382A1" />
    <path d="M12.5 15C11.5 15 9.5 15.5 9.5 16.5C9.5 17.5 12.5 17.5 12.5 17.5C12.5 17.5 15.5 17.5 15.5 16.5C15.5 15.5 13.5 15 12.5 15Z" fill="#F89820" />
  </svg>
);

export const PythonIcon = () => (
  <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.9 2C6.9 2 7 4.2 7 4.2V6.6H12V7.3H5C3.3 7.3 2 8.6 2 10.4V14.6C2 16.2 3.2 17.3 4.8 17.3H6.8V15.6C6.8 13.4 8.6 11.6 10.8 11.6H17.2C18.8 11.6 20.1 10.3 20.1 8.7V4.5C20.1 2.9 18.7 2 17.2 2H11.9ZM9.7 3.5C10.2 3.5 10.7 4 10.7 4.5C10.7 5.1 10.2 5.5 9.7 5.5C9.1 5.5 8.7 5.1 8.7 4.5C8.7 4 9.1 3.5 9.7 3.5Z" fill="#3776AB" />
    <path d="M12.1 22C17.1 22 17 19.8 17 19.8V17.4H12V16.7H19C20.7 16.7 22 15.4 22 13.6V9.4C22 7.8 20.8 6.7 19.2 6.7H17.2V8.4C17.2 10.6 15.4 12.4 13.2 12.4H6.8C5.2 12.4 3.9 13.7 3.9 15.3V19.5C3.9 21.1 5.3 22 6.8 22H12.1ZM14.3 20.5C13.8 20.5 13.3 20 13.3 19.5C13.3 18.9 13.8 18.5 14.3 18.5C14.9 18.5 15.3 18.9 15.3 19.5C15.3 20 14.9 20.5 14.3 20.5Z" fill="#FFE873" />
  </svg>
);

export const GitIcon = () => (
  <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.9 11.1L12.9 2.1C12.5 1.7 11.9 1.7 11.5 2.1L2.1 11.5C1.7 11.9 1.7 12.5 2.1 12.9L11.1 21.9C11.5 22.3 12.1 22.3 12.5 21.9L21.9 12.5C22.3 12.1 22.3 11.5 21.9 11.1ZM13.8 17.7V17.6C13.4 18.1 12.7 18.3 12.1 18C11.6 17.7 11.3 17.1 11.4 16.5C11.4 15.4 11.4 14 11.4 13V10.4C10.7 10.1 10.3 9.4 10.4 8.7C10.4 7.9 11 7.2 11.8 7.2C12.6 7.2 13.2 7.8 13.2 8.6C13.2 9.2 12.9 9.8 12.3 10.1V13.8C13 14 13.5 14.7 13.5 15.5C13.5 16.5 13.8 16.9 13.8 17.7Z" fill="#F05032" />
    <circle cx="12.3" cy="8.6" r="1" fill="#F05032" />
    <circle cx="12.3" cy="15.5" r="1" fill="#F05032" />
  </svg>
);

export const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-12 h-12 fill-foreground" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

export const NumPyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L4 6.5V15.5L12 20L20 15.5V6.5L12 2Z" stroke="#4D77CF" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M12 2V20" stroke="#4D77CF" strokeWidth="1.5" />
    <path d="M4 6.5L20 15.5" stroke="#4D77CF" strokeWidth="1.5" />
    <path d="M4 15.5L20 6.5" stroke="#4D77CF" strokeWidth="1.5" />
    <path d="M12 8L20 12.5" stroke="#F18F01" strokeWidth="1.5" />
    <path d="M12 8L4 12.5" stroke="#F18F01" strokeWidth="1.5" />
    <path d="M12 8V17" stroke="#F18F01" strokeWidth="1.5" />
    <circle cx="12" cy="8" r="1.5" fill="#F18F01" />
  </svg>
);

export const PandasIcon = () => (
  <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="5" height="18" rx="1" fill="#150458" />
    <rect x="9.5" y="7" width="5" height="14" rx="1" fill="#FFCA28" />
    <rect x="16" y="11" width="5" height="10" rx="1" fill="#E70480" />
  </svg>
);

const SKILLS_DATA = [
  {
    name: "Java",
    level: "Beginner–Intermediate",
    description: "Core concepts, Object-Oriented Programming, and library applications.",
    icon: <JavaIcon />,
  },
  {
    name: "Python",
    level: "Beginner–Intermediate",
    description: "Scripting, core structure, OOP, and scientific computing packages.",
    icon: <PythonIcon />,
  },
  {
    name: "NumPy",
    level: "Beginner",
    description: "Multi-dimensional array structures and mathematical matrix utilities.",
    icon: <NumPyIcon />,
  },
  {
    name: "Pandas",
    level: "Beginner",
    description: "Data analysis tools, DataFrame operations, and file manipulation.",
    icon: <PandasIcon />,
  },
  {
    name: "Git",
    level: "Beginner",
    description: "Local version tracking, basic branch manipulation, and merge logic.",
    icon: <GitIcon />,
  },
  {
    name: "GitHub",
    level: "Beginner",
    description: "Remote code hosting, pull request workflows, and repository administration.",
    icon: <GitHubIcon />,
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-muted/30 dark:bg-muted/10 border-y border-border/50 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
            Current Knowledge Stack
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Skills
          </h2>
          <div className="h-1 w-12 bg-foreground rounded" />
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS_DATA.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group"
            >
              <Card className="h-full border border-border/80 bg-background hover:border-foreground/20 dark:hover:border-foreground/30 transition-all duration-300 transform group-hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col space-y-4">
                  {/* Icon and Level Badge */}
                  <div className="flex justify-between items-start">
                    <div className="p-2.5 rounded-lg bg-secondary/50 dark:bg-secondary/20 border border-border/40 group-hover:scale-105 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    <span className="text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-secondary border border-border/80 text-muted-foreground">
                      {skill.level}
                    </span>
                  </div>
                  {/* Text details */}
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
