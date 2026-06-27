import { type ClassValue, clsx } from "clsx";
import { pureMerge } from "clsx"; // not using this, tailwind-merge is standard
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple Tailwind CSS classes dynamically while resolving conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
