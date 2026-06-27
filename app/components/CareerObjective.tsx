"use client";

import React from "react";
import { Compass, Target, Code, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";

export default function CareerObjective() {
  return (
    <section id="objective" className="py-20 bg-background relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-zinc-100/50 dark:bg-zinc-900/15 blur-[90px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-12 space-y-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
            Professional Vision
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Career Objective
          </h2>
          <div className="h-1 w-12 bg-foreground rounded" />
        </div>

        {/* Objective Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="border border-border bg-background/60 shadow-premium hover:shadow-premium-dark/5 transition-all duration-300">
            <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8">
              
              {/* Objective Icon */}
              <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center text-foreground shrink-0 border border-border/80">
                <Target className="h-7 w-7" />
              </div>

              {/* Objective Text */}
              <div className="space-y-6 text-center md:text-left">
                <blockquote className="text-lg md:text-xl font-medium text-foreground/90 leading-relaxed italic">
                  &quot;Seeking to leverage my academic foundations in Information Science &amp; Engineering at REVA University, along with my emerging skills in Java, Python, and web development, to secure a challenging role where I can contribute my technical expertise, learn from experienced professionals, and grow as a developer while delivering impactful solutions.&quot;
                </blockquote>

                {/* Sub-Focus Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/50">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-secondary text-foreground mt-0.5 border border-border/60">
                      <Code className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Clean Implementation</h4>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-normal">
                        Committed to writing simple, legible, and production-ready code blocks.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-secondary text-foreground mt-0.5 border border-border/60">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Continuous Learning</h4>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-normal">
                        Eager to adopt new frameworks, architectures, and design principles.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
