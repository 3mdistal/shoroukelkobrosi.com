'use client'

import { useEffect } from 'react'

export default function ClientLogger({ message }: { message: string }): null {
  useEffect(() => {
    console.warn(message)
  }, [message])

  return null
}
