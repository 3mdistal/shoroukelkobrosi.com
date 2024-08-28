import type { Media } from '@/payload-types'

export function createImageUrl(image: Media | number | string | null | undefined): string {
  if (typeof image === 'object' && image !== null && 'url' in image) {
    return image.url ?? ''
  }
  if (typeof image === 'string') {
    return image
  }
  return ''
}

export function getImageDimensions(image: Media | number | string | null | undefined): {
  width: number
  height: number
} {
  if (typeof image === 'object' && image !== null && 'width' in image && 'height' in image) {
    return {
      width: image.width ?? 300,
      height: image.height ?? 200,
    }
  }
  return { width: 300, height: 200 }
}
