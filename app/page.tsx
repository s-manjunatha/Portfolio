"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import CareerObjective from "./components/CareerObjective";
import Skills from "./components/Skills";
import CurrentlyLearning from "./components/CurrentlyLearning";
import Projects from "./components/Projects";
import GitHubSection from "./components/GitHubSection";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { ErrorBoundary } from "./components/ErrorBoundary";

// Scroll Progress Bar component
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setProgress((window.scrollY / scrollHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[3px] bg-foreground dark:bg-white z-50 transition-all duration-100 ease-out"
      style={{ width: `${progress}%` }}
    />
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-foreground selection:text-background dark:selection:bg-white dark:selection:text-black">
      {/* Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Floating Navigation Header */}
      <Navbar />

      {/* Main Single Page Sections */}
      <main>
        <ErrorBoundary sectionName="Hero">
          <Hero />
        </ErrorBoundary>
        <ErrorBoundary sectionName="About">
          <About />
        </ErrorBoundary>
        <ErrorBoundary sectionName="Career Objective">
          <CareerObjective />
        </ErrorBoundary>
        <ErrorBoundary sectionName="Skills">
          <Skills />
        </ErrorBoundary>
        <ErrorBoundary sectionName="Currently Learning">
          <CurrentlyLearning />
        </ErrorBoundary>
        <ErrorBoundary sectionName="Projects">
          <Projects />
        </ErrorBoundary>
        <ErrorBoundary sectionName="GitHub Section">
          <GitHubSection />
        </ErrorBoundary>
        <ErrorBoundary sectionName="Certifications">
          <Certifications />
        </ErrorBoundary>
        <ErrorBoundary sectionName="Contact">
          <Contact />
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <ErrorBoundary sectionName="Footer">
        <Footer />
      </ErrorBoundary>
    </div>
  );
}
