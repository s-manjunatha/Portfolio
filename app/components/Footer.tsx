"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-border bg-background py-10 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Col: Copyright */}
        <div className="text-center md:text-left space-y-1">
          <p className="text-sm font-semibold text-foreground">
            © {new Date().getFullYear()} S Manjunatha. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Information Science and Engineering Student at REVA University.
          </p>
        </div>

        {/* Right Col: Back to top and tech stack details */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
            Built with Next.js 15 • React 19 • Tailwind CSS
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="rounded-full bg-secondary/35 border-border/80 text-foreground hover:bg-secondary active:scale-90"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
