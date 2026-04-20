import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BASE_PATH = process.env.NODE_ENV === 'production' ? '/ARLO-Ai' : '';

export function getAssetPath(path: string) {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (process.env.NODE_ENV === 'development') return cleanPath;
  return `${BASE_PATH}${cleanPath}`;
}
