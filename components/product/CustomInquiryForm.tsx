'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'

export default function CustomInquiryForm({ productName }: { productName?: string }) {
  const initialDescription = productName
    ? `I'm interested in customizing the ${productName}. Here's what I'd like to change: `
    : ''

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    pieceType: '',
    description: initialDescription,
    budgetRange: '',
    referenceWebsiteUrl: '',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

  const handleFile = (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [])

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const onDragLeave = () => setIsDragging(false)

  const removeImage = () => {
    setImageFile(null)
    if (imagePreview) URL.revokeObjectURL(imagePreview)
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const data = new FormData()
      Object.entries(form).forEach(([k, v]) => data.append(k, v))
      if (imageFile) data.append('referenceImage', imageFile)

      const res = await fetch('/api/contact', { method: 'POST', body: data })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const field =
    'font-serif text-sm border border-gray-300 px-4 py-3 w-full text-brand-charcoal placeholder:text-gray-400 focus:outline-none focus:border-brand-charcoal bg-white'

  if (status === 'sent') {
    return (
      <div className="border border-gray-200 p-8 text-center">
        <p className="font-serif text-brand-charcoal text-lg mb-2">Thank You</p>
        <p className="font-serif text-sm text-gray-500">
          We&apos;ve received your inquiry and will be in touch within 1–2 business days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Name */}
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="font-serif text-xs tracking-widest uppercase text-gray-500">Full Name *</label>
        <input id="name" type="text" placeholder="Jane Smith" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} required className={field} />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-serif text-xs tracking-widest uppercase text-gray-500">Email Address *</label>
        <input id="email" type="email" placeholder="jane@email.com" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} required className={field} />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="font-serif text-xs tracking-widest uppercase text-gray-500">Phone Number</label>
        <input id="phone" type="tel" placeholder="(555) 000-0000" value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })} className={field} />
      </div>

      {/* Piece type */}
      <div className="flex flex-col gap-1">
        <label htmlFor="pieceType" className="font-serif text-xs tracking-widest uppercase text-gray-500">Jewelry Type</label>
        <select id="pieceType" value={form.pieceType}
          onChange={(e) => setForm({ ...form, pieceType: e.target.value })} className={field}>
          <option value="">Select a type</option>
          <option value="Engagement Ring">Engagement Ring</option>
          <option value="Wedding Band">Wedding Band</option>
          <option value="Necklace">Necklace</option>
          <option value="Earrings">Earrings</option>
          <option value="Bracelet">Bracelet</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Budget range */}
      <div className="flex flex-col gap-1">
        <label htmlFor="budgetRange" className="font-serif text-xs tracking-widest uppercase text-gray-500">Budget Range</label>
        <select id="budgetRange" value={form.budgetRange}
          onChange={(e) => setForm({ ...form, budgetRange: e.target.value })} className={field}>
          <option value="">Select a budget</option>
          <option value="Under $1,000">Under $1,000</option>
          <option value="$1,000–$2,500">$1,000–$2,500</option>
          <option value="$2,500–$5,000">$2,500–$5,000</option>
          <option value="$5,000–$10,000">$5,000–$10,000</option>
          <option value="$10,000+">$10,000+</option>
        </select>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="font-serif text-xs tracking-widest uppercase text-gray-500">Your Vision *</label>
        <textarea id="description" placeholder="Describe your vision — metal, stone, style, occasion..."
          value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
          required rows={6} className={field} />
      </div>

      {/* Reference website URL */}
      <div className="flex flex-col gap-1">
        <label htmlFor="referenceWebsiteUrl" className="font-serif text-xs tracking-widest uppercase text-gray-500">Reference Website URL</label>
        <input id="referenceWebsiteUrl" type="url" placeholder="https://example.com/ring-i-love"
          value={form.referenceWebsiteUrl}
          onChange={(e) => setForm({ ...form, referenceWebsiteUrl: e.target.value })}
          className={field} />
      </div>

      {/* Image upload */}
      <div className="flex flex-col gap-1">
        <label className="font-serif text-xs tracking-widest uppercase text-gray-500">Reference Image <span className="normal-case">(optional)</span></label>

        {imagePreview ? (
          <div className="relative w-full border border-gray-200 p-3 flex items-center gap-4">
            <div className="relative w-20 h-20 flex-shrink-0">
              <Image src={imagePreview} alt="Reference preview" fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-serif text-xs text-brand-charcoal truncate">{imageFile?.name}</p>
              <p className="font-serif text-xs text-gray-400 mt-0.5">
                {imageFile ? (imageFile.size / 1024 / 1024).toFixed(1) + ' MB' : ''}
              </p>
            </div>
            <button
              type="button"
              onClick={removeImage}
              className="flex-shrink-0 font-serif text-xs tracking-widest uppercase text-gray-400 hover:text-brand-red transition-colors"
            >
              Remove
            </button>
          </div>
        ) : (
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed px-6 py-8 text-center cursor-pointer transition-colors ${
              isDragging ? 'border-brand-charcoal bg-gray-50' : 'border-gray-200 hover:border-gray-400'
            }`}
          >
            <p className="font-serif text-sm text-gray-400">
              Drop an image here, or <span className="underline text-brand-charcoal">browse</span>
            </p>
            <p className="font-serif text-xs text-gray-400 mt-1">JPG, PNG, or WebP</p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
          }}
        />
      </div>

      {status === 'error' && (
        <p className="font-serif text-xs text-brand-red">
          Something went wrong. Please try again or call us at (973) 379-3344.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="font-serif text-sm tracking-widest uppercase bg-brand-charcoal text-white px-8 py-4 hover:bg-brand-red transition-colors disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending…' : 'Submit Inquiry'}
      </button>

      <p className="font-serif text-xs text-gray-400">
        All custom pieces are final sale — no returns or exchanges.
      </p>
    </form>
  )
}
