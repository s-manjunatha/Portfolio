"use client";

import React from "react";
import { GraduationCap, Award, Calendar, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";

export default function About() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section id="about" className="py-20 bg-background relative overflow-hidden">
      {/* Background element */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-zinc-100/40 dark:bg-zinc-900/10 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
            Academic Background
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            About Me
          </h2>
          <div className="h-1 w-12 bg-foreground rounded" />
        </div>

        {/* Info Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch"
        >
          {/* Text Description */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-foreground">
              Pursuing Information Science & Engineering
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              I am an undergraduate student in my second semester at **REVA University**.
              My academic program focuses on Information Science and Engineering, which equips me with concepts of data manipulation, software engineering design, and algorithmic problem-solving.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Currently, I am building foundational skills in computer science. I dedicate my time to learning **Data Structures and Algorithms** in Java, practicing programming syntax in Python, and experimenting with core web development protocols (HTML, CSS, and JavaScript).
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="border border-border/60 bg-secondary/20 rounded-lg p-4">
                <span className="block text-2xl font-bold text-foreground">1st Yr</span>
                <span className="text-xs text-muted-foreground">Undergrad Level</span>
              </div>
              <div className="border border-border/60 bg-secondary/20 rounded-lg p-4">
                <span className="block text-2xl font-bold text-foreground">9.3</span>
                <span className="text-xs text-muted-foreground">Cumulative GPA</span>
              </div>
            </div>
          </div>

          {/* Education Details Cards */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-6">
            <motion.div variants={cardVariants} className="h-full">
              <Card className="h-full border border-border bg-background shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col justify-between h-full space-y-6">
                  {/* Institution Details */}
                  <div className="space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center text-foreground">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground">REVA University</h4>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Bachelor of Technology (B.Tech)
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Information Science & Engineering
                      </p>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="border-t border-border/60 pt-4 space-y-3">
                    <div className="flex items-center text-xs text-muted-foreground gap-2">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>2025 - Present (Currently in 2nd Semester)</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground gap-2">
                      <Award className="h-3.5 w-3.5" />
                      <span>CGPA: 9.3 (First Semester distinction)</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground gap-2">
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Focused on Java, Python, and Web Basics</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
