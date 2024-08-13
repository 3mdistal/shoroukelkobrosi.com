import type { Media } from "@/payload-types";

export function createImageUrl(
  image: Media | number | null | undefined,
): string {
  if (typeof image === "object" && image !== null && "url" in image) {
    return image.url ?? "";
  }
  return "";
}

export function getImageDimensions(image: Media | number | null | undefined): {
  width: number;
  height: number;
} {
  if (typeof image === "object" && image !== null) {
    return {
      width: image.width ?? 300,
      height: image.height ?? 200,
    };
  }
  return { width: 300, height: 200 };
}
