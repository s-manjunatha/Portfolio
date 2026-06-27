"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";

// SVGs for currently learning technologies
export const HTMLIcon = () => (
  <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 2L5.8 20L12 21.7L18.2 20L20 2H4Z" fill="#E34F26" />
    <path d="M12 3.7V19.9L16.8 18.6L18.2 4.9H12Z" fill="#F06529" />
    <path d="M12 8.7H8.9L9.1 10.8H12V8.7ZM12 12.9H8.5L8.9 17L12 17.9V15.1L10.1 14.5L10.3 12.9H12V12.9Z" fill="#EBEBEB" />
    <path d="M12 8.7V10.8H14.9L14.7 12.9H12V15.1L13.9 14.5L14.1 12.9H15.1L15.3 10.8L15.6 8.7H12ZM12 17.9L15.1 17L15.4 13.8H12V17.9Z" fill="white" />
  </svg>
);

export const CSSIcon = () => (
  <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 2L5.8 20L12 21.7L18.2 20L20 2H4Z" fill="#1572B6" />
    <path d="M12 3.7V19.9L16.8 18.6L18.2 4.9H12Z" fill="#33A9DC" />
    <path d="M12 8.7H8.9L9.1 10.8H12V8.7ZM12 12.9H8.5L8.9 17L12 17.9V15.1L10.1 14.5L10.3 12.9H12V12.9Z" fill="#EBEBEB" />
    <path d="M12 8.7V10.8H14.9L14.7 12.9H12V15.1L13.9 14.5L14.1 12.9H15.1L15.3 10.8L15.6 8.7H12ZM12 17.9L15.1 17L15.4 13.8H12V17.9Z" fill="white" />
  </svg>
);

export const JSIcon = () => (
  <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="3" fill="#F7DF1E" />
    <path d="M18.7 18.5C18.1 19.3 17.2 19.8 16.1 19.8C14.7 19.8 13.9 19 13.9 17.2V17.1H15.6V17.2C15.6 18.1 16 18.5 16.7 18.5C17.4 18.5 17.8 18.1 17.8 17.5V13.8H19.5V17.5C19.5 17.9 19.2 18.2 18.7 18.5ZM10.5 19.8C9 19.8 8.1 19 8.1 17.4L9.7 17.3C9.7 18.2 10.1 18.6 10.9 18.6C11.5 18.6 11.9 18.3 11.9 17.8C11.9 17.3 11.6 17 10.7 16.6L10.1 16.4C8.9 15.9 8.3 15.1 8.3 13.9C8.3 12.5 9.4 11.6 10.8 11.6C12.2 11.6 13.1 12.4 13.1 13.9L11.5 14C11.5 13.2 11.1 12.8 10.5 12.8C9.9 12.8 9.6 13.1 9.6 13.6C9.6 14.1 9.9 14.3 10.7 14.6L11.3 14.8C12.5 15.3 13.2 16.1 13.2 17.3C13.2 18.8 12.1 19.8 10.5 19.8Z" fill="#323330" />
  </svg>
);

export const DSAIcon = () => (
  <svg viewBox="0 0 24 24" className="w-12 h-12 stroke-foreground" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5">
    <circle cx="12" cy="5" r="3" />
    <circle cx="6" cy="15" r="3" />
    <circle cx="18" cy="15" r="3" />
    <path d="M10 7.5L8 12.5" />
    <path d="M14 7.5L16 12.5" />
    <path d="M9 15H15" strokeDasharray="3 3" />
  </svg>
);

export const WebDevIcon = () => (
  <svg viewBox="0 0 24 24" className="w-12 h-12 stroke-foreground" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5">
    <rect x="2" y="4" width="20" height="12" rx="2" />
    <path d="M6 20H18" />
    <path d="M12 16V20" />
    <circle cx="5" cy="7" r="0.5" fill="currentColor" />
    <circle cx="7" cy="7" r="0.5" fill="currentColor" />
    <circle cx="9" cy="7" r="0.5" fill="currentColor" />
  </svg>
);

const LEARNING_ITEMS = [
  {
    name: "DSA in Java",
    description: "Strengthening logic using core data structures (arrays, strings, recursion, sorting) and optimization principles.",
    icon: <DSAIcon />,
  },
  {
    name: "JavaScript",
    description: "Understanding core scripting rules, object scoping, arrays, and event handlers for interactive interfaces.",
    icon: <JSIcon />,
  },
  {
    name: "HTML5",
    description: "Designing standard webpage structural models and writing clean semantic layouts.",
    icon: <HTMLIcon />,
  },
  {
    name: "CSS3",
    description: "Styling pages using grids, flexbox layouts, media queries, and responsive structures.",
    icon: <CSSIcon />,
  },
  {
    name: "Web Development",
    description: "Combining front-end technologies to build full single-page web structures and client interfaces.",
    icon: <WebDevIcon />,
  },
];

export default function CurrentlyLearning() {
  return (
    <section id="learning" className="py-20 bg-background relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
            Ongoing Studies & Growth
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Currently Learning
          </h2>
          <div className="h-1 w-12 bg-foreground rounded" />
        </div>

        {/* Learning Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEARNING_ITEMS.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group"
            >
              <Card className="h-full border border-border/80 bg-background/50 hover:border-foreground/20 dark:hover:border-foreground/30 transition-all duration-300 transform group-hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col space-y-4">
                  {/* Icon */}
                  <div className="p-2.5 rounded-lg bg-secondary/35 dark:bg-secondary/15 border border-border/40 w-fit group-hover:scale-105 transition-transform duration-300">
                    {item.icon}
                  </div>
                  {/* Text details */}
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
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
