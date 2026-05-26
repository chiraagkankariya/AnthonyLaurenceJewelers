'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SORT_OPTIONS } from '@/lib/constants'

export default function SortDropdown() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const current = searchParams.get('sort') ?? 'newest'

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString())
    if (e.target.value === 'newest') {
      params.delete('sort')
    } else {
      params.set('sort', e.target.value)
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex items-center gap-2">
      <span className="font-serif text-xs tracking-widest uppercase text-gray-400 whitespace-nowrap">
        Sort by
      </span>
      <select
        value={current}
        onChange={handleChange}
        className="font-serif text-sm text-brand-charcoal border border-gray-200 px-3 py-2.5 focus:outline-none focus:border-brand-red transition-colors bg-white cursor-pointer"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
