import { ImageLoaderProps } from "next/image";

export function isWithImageExtension(url: string) {
  return /\.(jpeg|jpg|gif|png|svg)$/i.test(url);
}

export function imageLoader({ src, width, quality }: ImageLoaderProps) {
  return `${process.env.NEXT_PUBLIC_IMAGE_API_URL}/${src}?w=${width}&q=${
    quality || 75
  }`;
}
