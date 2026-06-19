'use client'

import { useState } from 'react'
import Image from 'next/image'
import { getImageUrl } from '@/lib/sanity'

interface ImageGalleryProps {
  images: Array<{ asset: { _ref: string; _type: string } }>
  name: string
}

export default function ImageGallery({ images, name }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-[#F0F0F0] flex items-center justify-center">
        <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    )
  }

  const mainUrl = getImageUrl(images[activeIndex], 900, 900)

  const Placeholder = () => (
    <div className="w-full h-full flex items-center justify-center">
      <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  )

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square bg-[#F0F0F0] overflow-hidden">
        {mainUrl ? (
          <Image
            src={mainUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <Placeholder />
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => {
            const thumbUrl = getImageUrl(img, 140, 140)
            return (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`View image ${i + 1}`}
                className={`relative flex-shrink-0 w-[72px] h-[72px] bg-[#F0F0F0] overflow-hidden border-2 transition-colors ${
                  i === activeIndex
                    ? 'border-brand-charcoal'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                {thumbUrl ? (
                  <Image src={thumbUrl} alt="" fill className="object-cover" sizes="72px" />
                ) : (
                  <Placeholder />
                )}
              </button>
            )
          })}
        </div>
      )}

      <p className="font-serif text-xs text-gray-400">
        Photos may be enlarged to showcase detail. Actual size may vary.
      </p>
    </div>
  )
}
