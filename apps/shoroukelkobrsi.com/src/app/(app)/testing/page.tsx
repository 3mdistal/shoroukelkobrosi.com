'use client'

import { useState, useRef } from 'react'
import { getURL } from '@/utilities/get-url'

export default function ApiTest() {
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
      formData.append('file', file)

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
    <div>
      <h1>API Test</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="file" accept="image/*,video/*" ref={fileInputRef} />
      <button onClick={loginAndCreateMedia}>Login and Create Media</button>
      <p>{result}</p>
    </div>
  )
}
