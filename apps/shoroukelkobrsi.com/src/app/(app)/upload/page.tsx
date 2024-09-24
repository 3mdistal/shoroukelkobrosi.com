'use client'

import { useState, useRef } from 'react'
import { getURL } from '@/utilities/get-url'
import { optimizeImage } from '@/utilities/optimize-image'
import styles from './upload.module.css'

export default function UploadPage() {
  const [result, setResult] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function login() {
    try {
      const loginReq = await fetch(`${getURL()}/api/users/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      const loginData = await loginReq.json()
      console.log('Login response:', loginData)
      return loginData
    } catch (err: unknown) {
      console.error('Login error:', err)
      setResult('Login error: ' + (err instanceof Error ? err.message : String(err)))
    }
  }

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

  async function loginAndCreateMedia() {
    setResult('Processing...')
    if (!email || !password) {
      setResult('Please enter both email and password.')
      return
    }
    await login()

    if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0]) {
      const selectedFile = fileInputRef.current.files[0]
      const mediaResult = await createMedia(selectedFile)
      setResult('Operation completed. Check console for details.')
    } else {
      setResult('Please select an image or video file.')
    }
  }

  return (
    <div className={styles.uploadContainer}>
      <h1>Upload</h1>
      <form className={styles.uploadForm} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="file">Select File</label>
          <input id="file" type="file" accept="image/*,video/*" ref={fileInputRef} />
        </div>
        <button className={styles.uploadButton} onClick={loginAndCreateMedia}>
          Login and Upload Media
        </button>
      </form>
      {result && <p className={styles.resultMessage}>{result}</p>}
    </div>
  )
}
