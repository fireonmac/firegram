import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Style
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/**
 * Async
 */
export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

