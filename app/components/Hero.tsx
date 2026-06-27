"use client";

import React, { useState, useEffect } from "react";
import { ArrowDown, Mail, Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";

export default function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [profileExists, setProfileExists] = useState(false);
  const [resumeExists, setResumeExists] = useState(false);

  useEffect(() => {
    // Check if profile.jpg exists
    fetch("/profile.jpg", { method: "HEAD" })
      .then((res) => {
        if (res.ok) setProfileExists(true);
      })
      .catch(() => {});

    // Check if resume.pdf exists
    fetch("/resume.pdf", { method: "HEAD" })
      .then((res) => {
        if (res.ok) setResumeExists(true);
      })
      .catch(() => {});
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Maximum tilt angle of 8 degrees
    const tiltX = (y / (rect.height / 2)) * -8;
    const tiltY = (x / (rect.width / 2)) * 8;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-background"
    >
      {/* Premium Background Gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-zinc-100/60 dark:bg-zinc-900/20 blur-[100px] opacity-70" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-zinc-200/40 dark:bg-zinc-800/10 blur-[80px] opacity-50" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        {/* Intro Text */}
        <div className="md:col-span-7 flex flex-col space-y-6 text-center md:text-left">
          {/* Animated Badges */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold px-3.5 py-1 rounded-full bg-secondary/80 border border-border/80 text-foreground/80 shadow-sm"
            >
              2nd Semester @ REVA University
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs font-semibold px-3.5 py-1 rounded-full bg-secondary/80 border border-border/80 text-foreground/80 shadow-sm"
            >
              CGPA: 9.3
            </motion.span>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-foreground"
            >
              S Manjunatha
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl font-medium text-muted-foreground"
            >
              Aspiring Software Developer
            </motion.h2>
          </div>

          {/* Bio Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base md:text-lg text-muted-foreground/90 max-w-xl leading-relaxed"
          >
            I am a B.Tech Information Science and Engineering student focused on building clean, high-performance web experiences and solidifying my fundamentals in Data Structures &amp; Algorithms.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 pt-2"
          >
            <Button
              variant="premium"
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="w-full sm:w-auto font-semibold flex items-center justify-center gap-2 group"
            >
              <Mail className="h-4 w-4 transition-transform group-hover:scale-110" />
              Contact Me
            </Button>
            {resumeExists ? (
              <a
                href="/resume.pdf"
                download="S_Manjunatha_Resume.pdf"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto font-semibold flex items-center justify-center gap-2 group hover:bg-secondary"
                >
                  <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                  Download Resume
                </Button>
              </a>
            ) : (
              <Button
                variant="outline"
                size="lg"
                disabled
                className="w-full sm:w-auto font-semibold flex items-center justify-center gap-2 cursor-not-allowed opacity-50"
                title="Resume file not uploaded yet"
              >
                <Download className="h-4 w-4" />
                Resume Pending
              </Button>
            )}
          </motion.div>
        </div>

        {/* Profile Card with Tilt effect */}
        <div className="md:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: "transform 0.1s ease-out",
            }}
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl cursor-pointer group shadow-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-border"
          >
            {profileExists ? (
              <Image
                src="/profile.jpg"
                alt="S Manjunatha Profile"
                fill
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              /* Fallback Initials / Design UI inside card */
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none z-10 bg-background/30 dark:bg-background/20 backdrop-blur-[1px]">
                <div className="h-16 w-16 rounded-full bg-secondary border border-border flex items-center justify-center text-xl font-bold mb-4 shadow-sm group-hover:scale-105 transition-transform">
                  SM
                </div>
                <h3 className="font-bold text-lg text-foreground">S Manjunatha</h3>
                <p className="text-xs text-muted-foreground mt-1">Information Science Student</p>
                
                <div className="absolute bottom-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary text-primary-foreground">Java</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary text-primary-foreground">Python</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary text-primary-foreground">Git</span>
                </div>
              </div>
            )}

            {/* Standard overlay gradient to blend content */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
            
            {/* Background elements */}
            <div className="absolute -inset-1 border border-dashed border-border/80 rounded-2xl pointer-events-none scale-[0.98] group-hover:scale-100 transition-transform duration-300" />
          </motion.div>
        </div>
      </div>

      {/* Down Arrow Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => scrollToSection("objective")}>
        <span className="text-[10px] uppercase tracking-wider font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </div>
    </section>
  );
}
