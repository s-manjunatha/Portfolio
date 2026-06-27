"use client";

import React, { useState, useEffect } from "react";
import {
  Github,
  Users,
  BookOpen,
  Star,
  GitFork,
  Search,
  Filter,
  ArrowUpDown,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface GitHubProfile {
  name: string;
  login: string;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  bio: string;
  html_url: string;
}

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

interface ContributionDay {
  color: string;
  contributionCount: number;
  date: string;
  weekday: number;
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: {
    contributionDays: ContributionDay[];
  }[];
}

interface GitHubData {
  profile: GitHubProfile;
  repos: GitHubRepo[];
  contributions: ContributionCalendar;
}

export default function GitHubSection() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter and Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [sortBy, setSortBy] = useState<"updated" | "stars" | "forks" | "name">("updated");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch("/api/github");
        if (!res.ok) {
          throw new Error("Failed to retrieve profile data");
        }
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        console.error("GitHub API failed:", err);
        setError("Unable to load GitHub data right now.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <GitHubSkeleton />;
  }

  if (error || !data) {
    return (
      <section id="github" className="py-20 bg-background border-b border-border/50 relative">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {/* Section Heading */}
          <div className="flex flex-col items-center text-center mb-16 space-y-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              GitHub API Integration
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground flex items-center gap-2.5">
              <Github className="h-8 w-8" />
              GitHub Dashboard
            </h2>
            <div className="h-1 w-12 bg-foreground rounded" />
          </div>

          <div className="max-w-md mx-auto text-center py-12 border border-dashed border-border rounded-xl bg-background/50">
            <Github className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-75" />
            <h3 className="text-base font-bold text-foreground">Unable to load GitHub data right now.</h3>
            <p className="text-xs text-muted-foreground mt-2 max-w-xs mx-auto">
              Please make sure GITHUB_TOKEN and GITHUB_USERNAME are correctly set in your environment variables and that your internet connection is active.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const { profile, repos, contributions } = data;

  // Extract unique languages for filtering
  const languages = ["All", ...Array.from(new Set(repos.map((r) => r.language).filter(Boolean))) as string[]];

  // Process filters and sorting
  const filteredRepos = repos
    .filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesLanguage = selectedLanguage === "All" || repo.language === selectedLanguage;
      return matchesSearch && matchesLanguage;
    })
    .sort((a, b) => {
      if (sortBy === "stars") {
        return b.stargazers_count - a.stargazers_count;
      }
      if (sortBy === "forks") {
        return b.forks_count - a.forks_count;
      }
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      // default: updated_at
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

  // Calculate total stars across all repositories
  const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);

  return (
    <section id="github" className="py-20 bg-background border-b border-border/50 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
            GitHub API Integration
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground flex items-center gap-2.5">
            <Github className="h-8 w-8" />
            GitHub Dashboard
          </h2>
          <div className="h-1 w-12 bg-foreground rounded" />
        </div>

        {/* Profile Card Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-stretch">
          {/* Profile Overview Card */}
          <Card className="lg:col-span-4 border border-border bg-background shadow-sm">
            <CardContent className="p-6 flex flex-col justify-between h-full space-y-6">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="h-16 w-16 rounded-full overflow-hidden border border-border bg-secondary/50 relative">
                  <Image
                    src={profile.avatar_url}
                    alt={profile.name}
                    fill
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-foreground leading-tight text-lg">{profile.name}</h3>
                  <a
                    href={profile.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 mt-0.5"
                  >
                    @{profile.login}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {profile.bio}
              </p>

              {/* Stats counts */}
              <div className="grid grid-cols-3 gap-2 border-t border-border/60 pt-4">
                <div className="text-center">
                  <span className="block text-lg font-bold text-foreground">{profile.followers}</span>
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground">Followers</span>
                </div>
                <div className="text-center">
                  <span className="block text-lg font-bold text-foreground">{profile.public_repos}</span>
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground">Repos</span>
                </div>
                <div className="text-center">
                  <span className="block text-lg font-bold text-foreground">{totalStars}</span>
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground">Stars</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contributions Graph Card */}
          <Card className="lg:col-span-8 border border-border bg-background shadow-sm">
            <CardContent className="p-6 flex flex-col justify-between h-full space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-foreground">Contribution Graph</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {contributions.totalContributions} contributions in the last year
                  </p>
                </div>
                <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  Live Sync
                </span>
              </div>

              {/* Grid representation */}
              <div className="w-full overflow-x-auto pb-2 scrollbar-none">
                <div className="flex gap-[3px] min-w-[650px]">
                  {contributions.weeks.map((week, wIndex) => (
                    <div key={wIndex} className="flex flex-col gap-[3px]">
                      {week.contributionDays.map((day, dIndex) => (
                        <div
                          key={dIndex}
                          title={`${day.contributionCount} contributions on ${day.date}`}
                          className={`w-[9px] h-[9px] rounded-[1.5px] transition-colors duration-300 ${
                            day.color === "contrib-empty"
                              ? "bg-zinc-100 dark:bg-zinc-800"
                              : day.color === "contrib-l1"
                              ? "bg-emerald-200 dark:bg-emerald-950"
                              : day.color === "contrib-l2"
                              ? "bg-emerald-300 dark:bg-emerald-800"
                              : day.color === "contrib-l3"
                              ? "bg-emerald-400 dark:bg-emerald-600"
                              : "bg-emerald-500 dark:bg-emerald-400"
                          }`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend row */}
              <div className="flex items-center justify-between text-[10px] text-muted-foreground border-t border-border/60 pt-4">
                <span>Less</span>
                <div className="flex items-center gap-1">
                  <div className="w-[9px] h-[9px] rounded-[1.5px] bg-zinc-100 dark:bg-zinc-800" />
                  <div className="w-[9px] h-[9px] rounded-[1.5px] bg-emerald-200 dark:bg-emerald-950" />
                  <div className="w-[9px] h-[9px] rounded-[1.5px] bg-emerald-300 dark:bg-emerald-800" />
                  <div className="w-[9px] h-[9px] rounded-[1.5px] bg-emerald-400 dark:bg-emerald-600" />
                  <div className="w-[9px] h-[9px] rounded-[1.5px] bg-emerald-500 dark:bg-emerald-400" />
                </div>
                <span>More</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Repositories Search and Controls panel */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50 pb-6">
            <h3 className="text-lg font-bold text-foreground">Repositories ({filteredRepos.length})</h3>
            
            {/* Input Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search input */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search repositories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 pl-9 pr-4 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>

              {/* Language selection dropdown */}
              <div className="relative">
                <select
                  value={selectedLanguage}
                  aria-label="Filter repositories by programming language"
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="h-9 px-3 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none cursor-pointer pr-8 appearance-none"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang === "All" ? "All Languages" : lang}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              </div>

              {/* Sort by selection dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  aria-label="Sort repositories"
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="h-9 px-3 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none cursor-pointer pr-8 appearance-none"
                >
                  <option value="updated">Last Updated</option>
                  <option value="stars">Stars</option>
                  <option value="forks">Forks</option>
                  <option value="name">Name</option>
                </select>
                <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Repos Grid */}
          {filteredRepos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRepos.map((repo) => (
                <motion.div
                  key={repo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full border border-border bg-background/50 hover:border-foreground/20 dark:hover:border-foreground/30 transition-all duration-300">
                    <CardContent className="p-6 flex flex-col justify-between h-full space-y-4">
                      {/* Title & Description */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="font-bold text-foreground hover:text-muted-foreground transition-colors inline-flex items-center gap-1.5 break-all text-sm md:text-base"
                          >
                            {repo.name}
                            <ExternalLink className="h-3 w-3 flex-shrink-0" />
                          </a>
                          <span className="text-[10px] text-muted-foreground border border-border/60 bg-secondary/30 px-2 py-0.5 rounded-full shrink-0">
                            Public
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-muted-foreground/90 line-clamp-2 leading-relaxed">
                          {repo.description || "No description provided."}
                        </p>
                      </div>

                      {/* Info metrics row */}
                      <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs text-muted-foreground">
                        {/* Language marker */}
                        <div className="flex items-center gap-3">
                          {repo.language && (
                            <span className="inline-flex items-center gap-1.5 font-medium text-foreground/80">
                              <span
                                className={`h-2.5 w-2.5 rounded-full ${
                                  repo.language === "Python"
                                    ? "bg-blue-500"
                                    : repo.language === "Java"
                                    ? "bg-red-500"
                                    : repo.language === "JavaScript"
                                    ? "bg-yellow-400"
                                    : repo.language === "HTML"
                                    ? "bg-orange-500"
                                    : repo.language === "CSS"
                                    ? "bg-blue-400"
                                    : "bg-zinc-400"
                                }`}
                              />
                              {repo.language}
                            </span>
                          )}
                          
                          {/* Stars */}
                          <span className="inline-flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-muted-foreground/10" />
                            {repo.stargazers_count}
                          </span>
                          
                          {/* Forks */}
                          <span className="inline-flex items-center gap-1">
                            <GitFork className="h-3.5 w-3.5" />
                            {repo.forks_count}
                          </span>
                        </div>

                        {/* Updated timeline */}
                        <span>
                          Updated {new Date(repo.updated_at).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-border rounded-xl">
              <BookOpen className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <h4 className="text-sm font-bold text-foreground">No Repositories Found</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Try adjusting your search queries or filtering criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Full skeleton loading screen for premium feel
function GitHubSkeleton() {
  return (
    <section id="github" className="py-20 bg-background border-b border-border/50">
      <div className="max-w-6xl mx-auto px-4 md:px-8 animate-pulse">
        <div className="flex flex-col items-center mb-16 space-y-3">
          <div className="h-3 w-32 bg-secondary rounded" />
          <div className="h-8 w-64 bg-secondary rounded" />
          <div className="h-1 w-12 bg-secondary rounded" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-4 h-56 bg-secondary/40 rounded-xl border border-border" />
          <div className="lg:col-span-8 h-56 bg-secondary/40 rounded-xl border border-border" />
        </div>

        <div className="space-y-6">
          <div className="h-10 bg-secondary/40 rounded-lg w-full flex items-center justify-between px-4 border border-border" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-36 bg-secondary/40 rounded-xl border border-border" />
            <div className="h-36 bg-secondary/40 rounded-xl border border-border" />
          </div>
        </div>
      </div>
    </section>
  );
}
