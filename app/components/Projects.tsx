"use client";

import React, { useState, useEffect } from "react";
import { Github, ExternalLink, TrendingUp, Cpu, BarChart2, Folder, Star, GitFork } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

export default function Projects() {
  const [hovered, setHovered] = useState(false);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/github");
        if (res.ok) {
          const json = await res.json();
          // Filter out user's profile README repo
          const filtered = (json.repos || []).filter(
            (r: GitHubRepo) => r.name.toLowerCase() !== (json.profile?.login || "").toLowerCase()
          );
          setRepos(filtered);
        }
      } catch (err) {
        console.warn("Failed to fetch projects from GitHub API:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 bg-muted/30 dark:bg-muted/10 border-y border-border/50 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full bg-zinc-200/50 dark:bg-zinc-800/10 blur-[80px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
            Featured Development Project
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Projects
          </h2>
          <div className="h-1 w-12 bg-foreground rounded" />
        </div>

        {loading ? (
          /* Loading Skeletons */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto animate-pulse">
            <div className="h-48 bg-secondary/40 rounded-xl border border-border" />
            <div className="h-48 bg-secondary/40 rounded-xl border border-border" />
          </div>
        ) : repos.length > 0 ? (
          /* GitHub Projects Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {repos.slice(0, 4).map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="h-full border border-border bg-background shadow-premium hover:shadow-premium-dark/5 transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 flex flex-col justify-between h-full space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        <Folder className="h-4 w-4" />
                        <span>{repo.language || "Project"}</span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground tracking-tight line-clamp-1">
                        {repo.name.replace(/[-_]/g, " ")}
                      </h3>
                      <p className="text-muted-foreground text-xs md:text-sm line-clamp-2 leading-relaxed">
                        {repo.description || "No description provided."}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border/50 text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-3.5 w-3.5" />
                          {repo.stargazers_count}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <GitFork className="h-3.5 w-3.5" />
                          {repo.forks_count}
                        </span>
                      </div>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-foreground hover:text-muted-foreground transition-colors"
                      >
                        Code <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Manual Stock Market Prediction Fallback */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative max-w-4xl mx-auto"
          >
            <Card className="overflow-hidden border border-border bg-background shadow-premium hover:shadow-premium-dark/10 transition-all duration-500">
              <CardContent className="p-0 grid grid-cols-1 md:grid-cols-12 items-stretch">
                
                {/* Info Details (Left Column) */}
                <div className="p-8 md:p-10 md:col-span-7 flex flex-col justify-between space-y-8">
                  <div className="space-y-4">
                    {/* Category and Icons */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <TrendingUp className="h-4 w-4" />
                      <span>Predictive Analytics</span>
                    </div>

                    {/* Project Name */}
                    <h3 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                      Stock Market Price Prediction
                    </h3>

                    {/* Project Description */}
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      Designed and built a Python-based predictive analytics tool that models historical stock price variations. Uses advanced preprocessing libraries to cleanse data models and execute numerical forecasts.
                    </p>

                    {/* Highlights Bullet List */}
                    <ul className="space-y-2.5 pt-2">
                      <li className="flex items-center text-xs md:text-sm text-muted-foreground/90 gap-2.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-foreground" />
                        <span>Used **NumPy** for matrix manipulations and vector calculations.</span>
                      </li>
                      <li className="flex items-center text-xs md:text-sm text-muted-foreground/90 gap-2.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-foreground" />
                        <span>Leveraged **Pandas** for DataFrame parsing, cleanups, and queries.</span>
                      </li>
                      <li className="flex items-center text-xs md:text-sm text-muted-foreground/90 gap-2.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-foreground" />
                        <span>Plotted graphical historical curves using data visualization frameworks.</span>
                      </li>
                    </ul>

                    {/* Technology Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-3">
                      <span className="text-[10px] font-bold uppercase px-3 py-1 rounded-full bg-secondary border border-border text-foreground/80">Python</span>
                      <span className="text-[10px] font-bold uppercase px-3 py-1 rounded-full bg-secondary border border-border text-foreground/80">NumPy</span>
                      <span className="text-[10px] font-bold uppercase px-3 py-1 rounded-full bg-secondary border border-border text-foreground/80">Pandas</span>
                      <span className="text-[10px] font-bold uppercase px-3 py-1 rounded-full bg-secondary border border-border text-foreground/80">Data Preprocessing</span>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-border/50">
                    <a
                      href="https://github.com/s-manjunatha/stock-market-prediction"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto"
                    >
                      <Button variant="premium" className="w-full sm:w-auto flex items-center justify-center gap-2 group">
                        <Github className="h-4 w-4" />
                        GitHub Repo
                      </Button>
                    </a>
                    <a
                      href="https://github.com/s-manjunatha/stock-market-prediction"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto"
                    >
                      <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center gap-2 group hover:bg-secondary">
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Graphic Chart representation (Right Column) */}
                <div className="bg-secondary/40 dark:bg-secondary/15 md:col-span-5 flex items-center justify-center p-6 border-t md:border-t-0 md:border-l border-border relative overflow-hidden min-h-[250px] md:min-h-0">
                  {/* Simulated Grid lines */}
                  <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div key={i} className="border-[0.5px] border-foreground" />
                    ))}
                  </div>

                  {/* Mock Chart Design Container */}
                  <div className="w-full max-w-[280px] bg-background border border-border/80 rounded-xl p-4 shadow-lg relative z-10 transition-all duration-500 transform group-hover:scale-[1.02]">
                    <div className="flex items-center justify-between mb-4 border-b border-border/40 pb-2">
                      <div className="flex items-center gap-1.5">
                        <BarChart2 className="h-4 w-4 text-emerald-500" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Predictive Curve</span>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">+14.2%</span>
                    </div>

                    {/* SVG Chart Plot */}
                    <div className="relative h-24 w-full">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
                        {/* Grid Lines */}
                        <line x1="0" y1="10" x2="100" y2="10" stroke="var(--border)" strokeWidth="0.25" strokeDasharray="1 1" />
                        <line x1="0" y1="20" x2="100" y2="20" stroke="var(--border)" strokeWidth="0.25" strokeDasharray="1 1" />
                        <line x1="0" y1="30" x2="100" y2="30" stroke="var(--border)" strokeWidth="0.25" strokeDasharray="1 1" />
                        
                        {/* Historical Stock Price Line */}
                        <path
                          d="M 0 35 Q 15 32 30 25 T 60 22 T 80 14"
                          fill="none"
                          className="stroke-foreground"
                          strokeWidth="1.5"
                        />
                        
                        {/* Predictive Forecast dotted path */}
                        <path
                          d="M 80 14 Q 90 9 100 6"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="1.5"
                          strokeDasharray="2 1.5"
                        />

                        {/* Accent Points */}
                        <circle cx="80" cy="14" r="1.5" fill="currentColor" />
                        <circle cx="100" cy="6" r="1.5" fill="#10b981" />
                        
                        {/* Prediction label */}
                        <text x="76" y="22" className="text-[4px] font-bold fill-muted-foreground">Forecast</text>
                      </svg>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3 text-[9px] text-muted-foreground border-t border-border/40 pt-2 font-medium">
                      <span>Q3 2025</span>
                      <span>Q4 2025</span>
                      <span>Q1 2026 (Pred)</span>
                    </div>
                  </div>

                  {/* Floating Tech Badges */}
                  <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-background border border-border flex items-center justify-center shadow-md animate-bounce duration-1000">
                    <Cpu className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
}
