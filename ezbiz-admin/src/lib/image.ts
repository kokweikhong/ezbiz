import { ImageLoaderProps } from "next/image";

export function isWithImageExtension(filename: string): boolean {
  const imageExtensions = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"];
  return imageExtensions.some((extension) => filename.endsWith(extension));
}

export function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  return `${process.env.NEXT_PUBLIC_EZBIZ_BACKEND_API_URL}/${src}?w=${width}&q=${quality || 75}`;
}
