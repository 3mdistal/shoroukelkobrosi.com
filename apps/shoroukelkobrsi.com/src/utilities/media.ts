import type { Media } from '@/payload-types'
import { getURL } from '@/utilities/get-url'

export async function createImageUrl(
  image: Media | number | string | null | undefined,
): Promise<string> {
  try {
    let url = ''
    if (typeof image === 'object' && image !== null && 'url' in image) {
      url = image.url ?? ''
    } else if (typeof image === 'string') {
      url = image
    }

    if (url) {
      const response = await fetch(url, { method: 'HEAD' })
      if (response.ok) {
        return url
      }
    }

    return `${getURL()}/media/4-3-1.jpg`
  } catch (error) {
    console.error('Error creating or verifying image URL:', error)
    return `${getURL()}/media/4-3-1.jpg`
  }
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
