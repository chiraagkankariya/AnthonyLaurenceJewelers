'use client'

import { useEffect } from 'react'

interface CalendlyEmbedProps {
  mode?: 'inline' | 'button'
  buttonText?: string
  buttonClassName?: string
}

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || ''

export default function CalendlyEmbed({
  mode = 'inline',
  buttonText = 'Book a Consultation',
  buttonClassName = '',
}: CalendlyEmbedProps) {
  useEffect(() => {
    if (mode !== 'inline') return
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [mode])

  if (mode === 'button') {
    return (
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClassName}
      >
        {buttonText}
      </a>
    )
  }

  return (
    <div
      className="calendly-inline-widget w-full"
      data-url={CALENDLY_URL}
      style={{ minWidth: '320px', height: '700px' }}
    />
  )
}
