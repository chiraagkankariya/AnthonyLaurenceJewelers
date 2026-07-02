'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

const shopLinks = [
  { label: 'All Jewelry', href: '/shop' },
  { label: 'Rings', href: '/shop/rings' },
  { label: 'Necklaces & Pendants', href: '/shop/necklaces' },
  { label: 'Chains', href: '/shop/chains' },
  { label: 'Earrings', href: '/shop/earrings' },
  { label: 'Bracelets', href: '/shop/bracelets' },
]

const navLinks = [
  { label: 'Custom Jewelry', href: '/custom' },
  { label: 'Appraisals', href: '/appraisals' },
  { label: 'Repairs', href: '/repairs' },
  { label: 'About Us', href: '/about' },
]

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || '#'

export default function Navbar() {
  const { itemCount, openCart } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 bg-[#F0E8D8] transition-shadow duration-200 ${
          scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        {/* Holiday closure announcement bar */}
        <div className="bg-brand-red text-white text-center px-4 py-2">
          <p className="font-serif text-[11px] sm:text-xs tracking-wider leading-snug">
            <span className="uppercase tracking-widest font-semibold">Holiday Notice:</span>{' '}
            Store closed July 4 – July 13. Orders placed after July 1 will begin processing July 13.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/alj-logo-final1.png"
                alt="Anthony Laurence Jewelers"
                width={1080}
                height={429}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Nav — center */}
            <nav className="hidden lg:flex items-center gap-8">
              {/* Shop dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <button className="flex items-center gap-1 font-serif text-sm tracking-widest uppercase text-brand-charcoal hover:text-brand-red transition-colors">
                  Shop
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${shopOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 w-52 bg-white border border-gray-100 shadow-lg transition-all duration-200 ${
                    shopOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'
                  }`}
                >
                  {shopLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-5 py-3 font-serif text-sm text-brand-charcoal hover:text-brand-red hover:bg-brand-gray transition-colors border-b border-gray-50 last:border-0"
                      onClick={() => setShopOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-serif text-sm tracking-widest uppercase text-brand-charcoal hover:text-brand-red transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Right */}
            <div className="hidden lg:flex items-center gap-5">
              {/* Search */}
              <Link href="/shop" aria-label="Search" className="text-brand-charcoal hover:text-brand-red transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>

              {/* Cart */}
              <button
                onClick={openCart}
                aria-label={`Cart, ${itemCount} items`}
                className="relative text-brand-charcoal hover:text-brand-red transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-red text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-sans">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Book Consultation */}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-xs tracking-widest uppercase bg-brand-red text-white px-5 py-2.5 hover:bg-[#6B0000] transition-colors"
              >
                Book a Consultation
              </a>
            </div>

            {/* Mobile Right */}
            <div className="flex lg:hidden items-center gap-4">
              <button
                onClick={openCart}
                aria-label={`Cart, ${itemCount} items`}
                className="relative text-brand-charcoal hover:text-brand-red transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-red text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-sans">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="text-brand-charcoal hover:text-brand-red transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-white flex flex-col transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Mobile menu header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <Image
              src="/alj-logo-final1.png"
              alt="Anthony Laurence Jewelers"
              width={1080}
              height={429}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="text-brand-charcoal hover:text-brand-red transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile menu links */}
        <nav className="flex-1 overflow-y-auto px-6 py-8 space-y-1">
          <p className="font-serif text-xs tracking-widest uppercase text-gray-400 mb-4">Shop</p>
          {shopLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 font-serif text-2xl font-light text-brand-charcoal hover:text-brand-red transition-colors border-b border-gray-50"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 font-serif text-2xl font-light text-brand-charcoal hover:text-brand-red transition-colors border-b border-gray-50"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile Book Consultation */}
        <div className="px-6 py-8 border-t border-gray-100">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center font-serif text-sm tracking-widest uppercase bg-brand-red text-white py-4 hover:bg-[#6B0000] transition-colors"
          >
            Book a Consultation
          </a>
        </div>
      </div>
    </>
  )
}
