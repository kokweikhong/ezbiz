import { ImageLoaderProps } from "next/image";

export function isWithImageExtension(filename: string): boolean {
  const imageExtensions = [".png", ".jpg", ".jpeg", ".gif", ".webp"];
  return imageExtensions.some((extension) => filename.endsWith(extension));
}

export function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  return `${src}?w=${width}&q=${quality || 75}`;
}
