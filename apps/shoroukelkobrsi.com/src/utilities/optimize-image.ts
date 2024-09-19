export function optimizeImage(file: File, maxWidth = 1920, maxHeight = 1920, quality = 1) {
  return new Promise<Blob>((resolve, reject) => {
    const img = new Image()
    img.onload = function () {
      let width = img.width
      let height = img.height

      // Scale down if necessary
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height)
        width *= ratio
        height *= ratio
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error('Canvas to Blob conversion failed'))
            }
          },
          'image/webp',
          quality,
        )
      } else {
        reject(new Error('Failed to get canvas context'))
      }
    }

    img.onerror = function () {
      reject(new Error('Failed to load image'))
    }

    img.src = URL.createObjectURL(file)
  })
}
