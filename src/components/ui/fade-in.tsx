'use client'

import React, { useState, useEffect, useRef } from 'react'

type IntersectionMargin = 'default' | 'early' | 'very_early' | 'late' | 'very_late'

interface FadeInProps {
  children: React.ReactNode
  duration?: number
  delay?: number
  useIntersectionObserver?: boolean
  intersectionMargin?: IntersectionMargin
  triggerOnce?: boolean
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  duration = 500,
  delay = 0,
  useIntersectionObserver = false,
  intersectionMargin = 'default',
  triggerOnce = true,
}) => {
  const [opacity, setOpacity] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const calculateMargin = (margin: IntersectionMargin): string => {
    switch (margin) {
      case 'default':
        return '0px'
      case 'early':
        return '200px'
      case 'very_early':
        return '400px'
      case 'late':
        return '-100px'
      case 'very_late':
        return '-200px'
      default:
        return '0px'
    }
  }

  useEffect(() => {
    if (!useIntersectionObserver) {
      setOpacity(1)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOpacity(1)
          if (triggerOnce) {
            observer.unobserve(entry.target)
          }
        } else if (!triggerOnce) {
          setOpacity(0)
        }
      },
      {
        root: null,
        rootMargin: calculateMargin(intersectionMargin),
        threshold: 0.1,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [useIntersectionObserver, intersectionMargin, triggerOnce])

  return (
    <div
      ref={ref}
      style={{
        opacity,
        transition: `opacity ${duration}ms ease-in-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export default FadeIn
