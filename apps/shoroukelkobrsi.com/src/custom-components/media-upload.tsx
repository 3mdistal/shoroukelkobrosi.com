'use client'

import React, { useState, useRef } from 'react'
import { useAuth } from '@payloadcms/ui'
import { getURL } from '@/utilities/get-url'
import { optimizeImage } from '@/utilities/optimize-image'

const MediaUpload: React.FC = () => {
  const [result, setResult] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { user } = useAuth()

  async function createMedia(file: File) {
    try {
      const formData = new FormData()

      if (file.type.startsWith('image/')) {
        // Optimize image before uploading
        const optimizedBlob = await optimizeImage(file)
        const optimizedFile = new File([optimizedBlob], file.name, { type: 'image/webp' })
        formData.append('file', optimizedFile)
      } else {
        // For non-image files (e.g., videos), upload without optimization
        formData.append('file', file)
      }

      const mediaReq = await fetch(`${getURL()}/api/media`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })
      const mediaData = await mediaReq.json()
      console.log('Media creation response:', mediaData)
      return mediaData
    } catch (err: unknown) {
      console.error('Media creation error:', err)
      setResult('Media creation error: ' + (err instanceof Error ? err.message : String(err)))
    }
  }

  async function handleUpload() {
    setResult('Processing...')
    if (!user) {
      setResult('You must be logged in to upload media.')
      return
    }

    if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0]) {
      const selectedFile = fileInputRef.current.files[0]
      const mediaResult = await createMedia(selectedFile)
      setResult('Upload completed. Check console for details.')
    } else {
      setResult('Please select an image or video file.')
    }
  }

  return (
    <div>
      <h2>Custom Media Upload</h2>
      <input type="file" accept="image/*,video/*" ref={fileInputRef} />
      <button onClick={handleUpload}>Upload Media</button>
      {result && <p>{result}</p>}
    </div>
  )
}

export default MediaUpload
