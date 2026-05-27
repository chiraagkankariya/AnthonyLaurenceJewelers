'use client'

import { useState } from 'react'

export default function CustomInquiryForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    description: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
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
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="font-serif text-xs tracking-widest uppercase text-gray-500">Full Name *</label>
        <input id="name" type="text" placeholder="Jane Smith" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} required className={field} />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-serif text-xs tracking-widest uppercase text-gray-500">Email Address *</label>
        <input id="email" type="email" placeholder="jane@email.com" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} required className={field} />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="font-serif text-xs tracking-widest uppercase text-gray-500">Phone Number</label>
        <input id="phone" type="tel" placeholder="(555) 000-0000" value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })} className={field} />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="category" className="font-serif text-xs tracking-widest uppercase text-gray-500">Jewelry Type</label>
        <select id="category" value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })} className={field}>
          <option value="">Select a type</option>
          <option value="Engagement Ring">Engagement Ring</option>
          <option value="Wedding Band">Wedding Band</option>
          <option value="Necklace">Necklace</option>
          <option value="Earrings">Earrings</option>
          <option value="Bracelet">Bracelet</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="font-serif text-xs tracking-widest uppercase text-gray-500">Your Vision *</label>
        <textarea id="description" placeholder="Describe your vision — metal, stone, style, budget, occasion..."
          value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
          required rows={6} className={field} />
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
