'use client'

import { useEffect, useRef, useState } from 'react'

interface FadeInSectionProps {
  children: React.ReactNode
  className?: string
  delay?: 'none' | 'short' | 'medium' | 'long'
}

const delays = {
  none: '',
  short: 'delay-100',
  medium: 'delay-200',
  long: 'delay-300',
}

export default function FadeInSection({
  children,
  className = '',
  delay = 'none',
}: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${delays[delay]} ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      } ${className}`}
    >
      {children}
    </div>
  )
}
