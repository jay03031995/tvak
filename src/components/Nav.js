'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const treatmentCategories = [
  { label: 'Skin & Glow', sub: 'HydraFacial, peels, brightening' },
  { label: 'Acne & Scars', sub: 'MNRF, clearance program' },
  { label: 'Pigmentation', sub: 'Laser toning, melasma' },
  { label: 'Anti-Ageing', sub: 'Botox, fillers, skin boosters' },
  { label: 'Hair Restoration', sub: 'PRP, GFC therapy' },
  { label: 'Laser & Devices', sub: 'Carbon laser, hair reduction' },
]

const popularTreatments = [
  { name: 'HydraFacial MD', meta: 'Deep cleanse · 45 min' },
  { name: 'Carbon Laser Facial', meta: 'Pores · oil control · 30 min' },
  { name: 'PRP Hair Restoration', meta: 'Hair fall · regrowth · 45 min' },
]

const concernCategories = {
  'Skin & Face': ['Acne & Breakouts', 'Acne Scars', 'Pigmentation & Melasma', 'Dull & Dry Skin', 'Pores & Texture'],
  'Hair & Scalp': ['Hair Fall & Thinning', 'Dandruff & Scalp Issues', 'Hair Regrowth', 'Unwanted Body Hair'],
  'Anti-Ageing': ['Wrinkles & Fine Lines', 'Sagging & Laxity', 'Volume Loss', 'Dark Circles & Eye Area'],
}

export default function Nav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQ, setSearchQ] = useState('')
  const [hoverMenu, setHoverMenu] = useState('')
  const closeTimer = useRef(null)

  const openMega = (key) => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null }
    setHoverMenu(key)
  }
  const keepMega = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null }
  }
  const closeMegaSoon = () => {
    closeTimer.current = setTimeout(() => { setHoverMenu(''); closeTimer.current = null }, 180)
  }
  const closeMega = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null }
    setHoverMenu('')
  }

  const isOn = (path) => pathname === path || pathname.startsWith(path + '/') ? 'on' : ''

  const navLinkCls = (path) =>
    `inline-flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-[400] transition-colors duration-150 ${isOn(path) ? 'text-[#1A2744] bg-[#F0E8DF]' : 'text-[#5A4A3A] hover:text-[#1A2744] hover:bg-[#F0E8DF]'}`

  return (
    <>
      {/* ── STICKY NAV ── */}
      <header className="sticky top-0 z-[200] bg-[rgba(250,247,242,0.97)] backdrop-blur-md border-b border-[rgba(26,17,9,0.08)]"
        style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}>
        <div className="max-w-[1280px] mx-auto px-5 h-16 flex items-center gap-2">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2.5 no-underline">
            <div className="w-9 h-9 rounded-[9px] flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#1A2744 50%,#C4847E)' }}>
              <span className="font-bold text-lg text-white" style={{ letterSpacing: '-0.04em' }}>A</span>
            </div>
            <div style={{ lineHeight: 1 }}>
              <div className="flex items-baseline gap-0.5">
                <span className="text-[13px] font-semibold text-[#1A2744] tracking-[0.07em]">TVAK</span>
                <span className="text-[11px] font-light text-[#B8916A] mx-0.5">&amp;</span>
                <span className="text-[13px] font-semibold text-[#C4847E] tracking-[0.07em]">ASTHI</span>
              </div>
              <div className="text-[7.5px] font-medium tracking-[0.25em] text-[#B8916A] mt-0.5">BY ARTHAM</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0 ml-6"
            onMouseLeave={closeMegaSoon}>
            <Link href="/treatments" className={navLinkCls('/treatments')}
              onMouseEnter={() => openMega('treatments')}>
              Treatments
              <svg className={`w-3 h-3 transition-transform duration-200 ${hoverMenu === 'treatments' ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </Link>
            <Link href="/concerns" className={navLinkCls('/concerns')}
              onMouseEnter={() => openMega('concerns')}>
              Concerns
              <svg className={`w-3 h-3 transition-transform duration-200 ${hoverMenu === 'concerns' ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </Link>
            <Link href="/doctor" className={navLinkCls('/doctor')} onMouseEnter={closeMega}>Our Doctor</Link>
            <Link href="/about" className={navLinkCls('/about')} onMouseEnter={closeMega}>About</Link>
            <Link href="/contact" className={navLinkCls('/contact')} onMouseEnter={closeMega}>Contact</Link>
          </nav>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-3 ml-auto">
            {[
              { href: 'https://instagram.com', label: 'Instagram', path: 'M2 2h20v20a5 5 0 0 1 0 0H2zM12 12m-4 0a4 4 0 0 0 8 0 4 4 0 0 0-8 0', d: <><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></> },
              { href: 'https://facebook.com', label: 'Facebook', d: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/> },
              { href: 'https://youtube.com', label: 'YouTube', d: <><rect x="2" y="5" width="20" height="14" rx="4"/><polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none"/></> },
              { href: 'https://wa.me/919811997993', label: 'WhatsApp', d: <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.2-5.3A8.5 8.5 0 1 1 21 11.5Z"/> },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label}
                className="text-[#7A6A5A] hover:text-[#B8916A] flex transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{s.d}</svg>
              </a>
            ))}
            <div className="w-px h-5 bg-[rgba(26,17,9,0.12)] mx-1" />
            <button onClick={() => { setSearchOpen(o => !o); setHoverMenu('') }}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-[#7A6A5A] hover:text-[#1A2744] hover:bg-[#F0E8DF] transition-colors border-none bg-transparent cursor-pointer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
          </div>
          <Link href="/contact"
            className="hidden lg:inline-flex ml-2 items-center bg-[#1A2744] text-white text-[12.5px] font-medium px-5 py-2.5 rounded-full hover:bg-[#243562] transition-colors flex-shrink-0">
            Book Now
          </Link>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-2 ml-auto">
            <button onClick={() => { setSearchOpen(o => !o); setMenuOpen(false) }}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-[rgba(26,17,9,0.13)] bg-white cursor-pointer text-[#7A6A5A]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
            <button onClick={() => { setMenuOpen(o => !o); setSearchOpen(false) }}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-[rgba(26,17,9,0.13)] bg-white cursor-pointer">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1A2744" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
            </button>
          </div>
        </div>

        {/* Search */}
        {searchOpen && (
          <div className="border-t border-[rgba(26,17,9,0.08)] bg-white shadow-lg">
            <div className="max-w-[640px] mx-auto px-5 py-4">
              <div className="flex items-center gap-2.5 bg-[#F5EDE4] rounded-xl px-3.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9A8A7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
                <input value={searchQ} onChange={e => setSearchQ(e.target.value)}
                  placeholder="Search treatments, concerns…"
                  className="flex-1 bg-transparent border-none outline-none py-3.5 text-[14px] text-[#1A1109] font-light placeholder:text-[#9A8A7A]"
                  autoFocus />
                <button onClick={() => { setSearchOpen(false); setSearchQ('') }} className="bg-none border-none cursor-pointer text-[#9A8A7A] flex p-1">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-[rgba(26,17,9,0.07)] bg-white lg:hidden max-h-[calc(100vh-64px)] overflow-y-auto">
            <div className="px-4 py-3 flex flex-col gap-0.5">
              {[
                { href: '/treatments', label: 'Treatments', sub: 'Skin, hair, laser & more' },
                { href: '/concerns', label: 'Concerns', sub: 'Browse by concern' },
                { href: '/doctor', label: 'Our Doctor', sub: 'Dr. Omaima Jawed' },
                { href: '/about', label: 'About', sub: 'Our clinic & philosophy' },
                { href: '/contact', label: 'Contact', sub: 'Book a consultation' },
              ].map(item => (
                <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3.5 rounded-lg hover:bg-[#F5EDE4] transition-colors border-b border-[rgba(26,17,9,0.05)] last:border-0">
                  <div>
                    <div className="text-[14px] font-[400] text-[#1A1109]">{item.label}</div>
                    <div className="text-[12px] font-[300] text-[#9A8A7A] mt-0.5">{item.sub}</div>
                  </div>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#B8916A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              ))}
              <Link href="/contact" onClick={() => setMenuOpen(false)}
                className="mt-3 flex items-center justify-center bg-[#1A2744] text-white text-[13px] font-medium py-3.5 rounded-full">
                Book Appointment
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ── TREATMENTS MEGA ── */}
      <div className="mega-wrap fixed left-0 right-0 z-[190]"
        style={{ top: 64, opacity: hoverMenu === 'treatments' ? 1 : 0, pointerEvents: hoverMenu === 'treatments' ? 'auto' : 'none', transform: hoverMenu === 'treatments' ? 'translateY(0)' : 'translateY(-8px)', transition: 'opacity .2s ease, transform .22s cubic-bezier(.22,.68,0,.99)' }}
        onMouseEnter={keepMega} onMouseLeave={closeMegaSoon}>
        <div className="bg-white border-b border-[rgba(26,17,9,0.08)] shadow-xl">
          <div className="max-w-[1280px] mx-auto px-5 py-7 grid gap-10" style={{ gridTemplateColumns: '1fr 1fr 220px' }}>
            <div>
              <span className="block text-[10.5px] font-[500] tracking-[0.14em] uppercase text-[#B8A898] mb-3">Browse by category</span>
              {treatmentCategories.map(c => (
                <Link key={c.label} href="/treatments"
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-[#F5EDE4] transition-colors">
                  <div>
                    <div className="text-[13px] font-[400] text-[#1A1109]">{c.label}</div>
                    <div className="text-[11.5px] font-[300] text-[#9A8A7A]">{c.sub}</div>
                  </div>
                </Link>
              ))}
            </div>
            <div>
              <span className="block text-[10.5px] font-[500] tracking-[0.14em] uppercase text-[#B8A898] mb-3">Popular this season</span>
              <div className="flex flex-col gap-2.5">
                {popularTreatments.map(t => (
                  <Link key={t.name} href="/treatments"
                    className="flex items-center gap-3 px-3 py-3 bg-[#FAF7F2] rounded-xl border border-[rgba(26,17,9,0.08)] hover:bg-[#F5EDE4] transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[#F0E8DF] flex-shrink-0"/>
                    <div>
                      <div className="text-[13px] font-[400] text-[#1A1109]">{t.name}</div>
                      <div className="text-[11.5px] font-[300] text-[#9A8A7A] mt-0.5">{t.meta}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <Link href="/treatments" className="flex items-center justify-between p-4 bg-[#1A2744] rounded-2xl no-underline">
                <div>
                  <div className="text-[13px] font-[400] text-[#FAF7F2]">All treatments →</div>
                  <div className="text-[11.5px] font-[300] text-[#A0BDD8] mt-0.5">Browse full menu</div>
                </div>
              </Link>
              <Link href="/contact" className="flex items-center justify-between p-4 bg-[#F5EDE4] rounded-2xl border border-[rgba(26,17,9,0.08)] no-underline">
                <div>
                  <div className="text-[13px] font-[400] text-[#1A1109]">Book consultation</div>
                  <div className="text-[11.5px] font-[300] text-[#9A8A7A] mt-0.5">with Dr. Omaima</div>
                </div>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#B8916A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONCERNS MEGA ── */}
      <div className="fixed left-0 right-0 z-[190]"
        style={{ top: 64, opacity: hoverMenu === 'concerns' ? 1 : 0, pointerEvents: hoverMenu === 'concerns' ? 'auto' : 'none', transform: hoverMenu === 'concerns' ? 'translateY(0)' : 'translateY(-8px)', transition: 'opacity .2s ease, transform .22s cubic-bezier(.22,.68,0,.99)' }}
        onMouseEnter={keepMega} onMouseLeave={closeMegaSoon}>
        <div className="bg-white border-b border-[rgba(26,17,9,0.08)] shadow-xl">
          <div className="max-w-[1280px] mx-auto px-5 py-7 grid gap-8" style={{ gridTemplateColumns: '1fr 1fr 1fr 180px' }}>
            {Object.entries(concernCategories).map(([cat, items]) => (
              <div key={cat}>
                <span className="block text-[10.5px] font-[500] tracking-[0.14em] uppercase text-[#B8A898] mb-3">{cat}</span>
                {items.map(item => (
                  <Link key={item} href="/concerns"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-[300] text-[#5A4A3A] hover:bg-[#F5EDE4] hover:text-[#1A1109] transition-colors">
                    {item}
                  </Link>
                ))}
              </div>
            ))}
            <div className="flex flex-col gap-2.5">
              <Link href="/concerns" className="p-4 bg-[#1A2744] rounded-2xl no-underline">
                <div className="text-[13px] font-[400] text-[#FAF7F2]">All concerns →</div>
                <div className="text-[11.5px] font-[300] text-[#A0BDD8] mt-0.5">See full list</div>
              </Link>
              <Link href="/contact" className="flex items-center justify-between p-4 bg-[#F5EDE4] rounded-2xl border border-[rgba(26,17,9,0.08)] no-underline">
                <div>
                  <div className="text-[13px] font-[400] text-[#1A1109]">Not sure?</div>
                  <div className="text-[11.5px] font-[300] text-[#9A8A7A] mt-0.5">Free consult</div>
                </div>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#B8916A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {hoverMenu && <div className="fixed inset-0 z-[189]" onClick={closeMega} />}
    </>
  )
}
