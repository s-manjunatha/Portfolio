"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  sectionName?: string;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`ErrorBoundary caught an error in section "${this.props.sectionName || "Unknown"}":`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="py-12 px-4 text-center border border-dashed border-red-500/20 rounded-xl bg-red-500/5 my-4 max-w-4xl mx-auto">
            <h3 className="text-sm font-bold text-red-500">
              Something went wrong in the {this.props.sectionName || "section"}.
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Please try refreshing the page or check the developer console.
            </p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
