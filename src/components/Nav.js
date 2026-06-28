'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// ── CONDITIONS DATA ──────────────────────────────────────────────
const CONDITIONS = [
  {
    heading: 'SKIN',
    items: [
      { name: 'Acne', href: '/concerns/acne' },
      { name: 'Acne Scar', href: '/concerns/acne-scars' },
      { name: 'Melasma', href: '/concerns/pigmentation' },
      { name: 'Freckles', href: '/concerns/pigmentation' },
      { name: 'Moles', href: '/concerns/moles' },
      { name: 'Rosacea', href: '/concerns/rosacea' },
      { name: 'Open Pores', href: '/concerns/pores' },
      { name: 'Sensitive Skin', href: '/concerns/sensitive-skin' },
      { name: 'Dark Circles', href: '/concerns/dark-circles' },
      { name: 'Dull Complexion / Uneven Skintone', href: '/concerns/dull-skin' },
      { name: 'Fungal Infections', href: '/concerns/fungal-infections' },
      { name: 'Skin Allergies', href: '/concerns/skin-allergies' },
      { name: 'Vitiligo / Leucoderma', href: '/concerns/vitiligo' },
      { name: 'Excess Body & Facial Hair', href: '/concerns/unwanted-hair' },
    ],
  },
  {
    heading: 'HAIR',
    items: [
      { name: 'Hair Loss In Men', href: '/concerns/hair-fall' },
      { name: 'Hair Loss In Women', href: '/concerns/hair-fall' },
      { name: 'Alopecia Areata', href: '/concerns/hair-fall' },
      { name: 'Scarring Alopecia', href: '/concerns/hair-fall' },
      { name: 'Baldness', href: '/concerns/hair-fall' },
      { name: 'Dandruff', href: '/concerns/dandruff' },
      { name: 'Premature Greying', href: '/concerns/hair-regrowth' },
    ],
  },
  {
    heading: 'ANTI AGEING',
    items: [
      { name: 'Wrinkled Skin', href: '/concerns/wrinkles' },
      { name: 'Sagging Skin', href: '/concerns/sagging' },
      { name: 'Deep Folds', href: '/concerns/volume-loss' },
      { name: 'Dehydrated Skin', href: '/concerns/dull-skin' },
    ],
  },
  {
    heading: 'BODY CONTOURING',
    items: [
      { name: 'Unwanted Fat', href: '/concerns/body-contouring' },
      { name: 'Skin Laxity', href: '/concerns/sagging' },
    ],
  },
]

// ── TREATMENTS DATA ──────────────────────────────────────────────
const TREATMENTS_MENU = [
  {
    heading: 'SKIN',
    items: [
      { name: 'Blemish Removal / Complexion Enhancement / Freckles', href: '/treatments/carbon-laser-facial' },
      { name: 'Acne / Acne Scars / Oily Skin & Open Pores', href: '/treatments/acne-clearance' },
      { name: 'Skin Glow & Maintenance Therapies', href: '/treatments/hydrafacial-md' },
      { name: 'Skin Toning, Lifting & Contouring', href: '/treatments/carbon-laser-facial' },
      { name: 'Under Eye Dark Circles Treatment', href: '/treatments/fillers' },
      { name: 'Laser Tattoo Removal', href: '/treatments/laser-tattoo-removal' },
    ],
  },
  {
    heading: 'HAIR & SCALP TREATMENTS',
    items: [
      { name: 'PRP Therapy', href: '/treatments/prp-hair' },
      { name: 'Exosomes (Face)', href: '/treatments/exosomes-face' },
      { name: 'Micro-Mesotherapy', href: '/treatments/micro-mesotherapy' },
      { name: 'Cold Laser Therapy', href: '/treatments/cold-laser-therapy' },
      { name: 'Scalp Micro Pigmentation (SMP)', href: '/treatments/scalp-micro-pigmentation' },
      { name: 'GFC / Regenera Scalp Therapy', href: '/treatments/gfc-hair' },
    ],
  },
  {
    heading: 'NON SURGICAL FACIAL ENHANCEMENTS',
    items: [
      { name: 'Lip Enhancement', href: '/treatments/lip-enhancement' },
      { name: 'Cheek Enhancement', href: '/treatments/cheek-enhancement' },
      { name: 'Chin Enhancement', href: '/treatments/chin-enhancement' },
      { name: 'Nose Enhancement', href: '/treatments/nose-enhancement' },
    ],
  },
  {
    heading: 'HAIR REMOVAL SERVICES',
    items: [
      { name: 'Diode Laser LightSheer Duet', href: '/treatments/laser-hair' },
      { name: 'Diode Laser Alma Soprano', href: '/treatments/laser-hair' },
      { name: 'eLight Hair Removal', href: '/treatments/laser-hair' },
    ],
  },
  {
    heading: 'BODY TREATMENTS',
    items: [
      { name: 'Cool Shape Cryolipolysis', href: '/treatments/cryolipolysis' },
      { name: 'Ultralift — HIFU', href: '/treatments/hifu' },
      { name: 'Intragen', href: '/treatments/intragen' },
      { name: 'VANQUISH', href: '/treatments/vanquish' },
      { name: 'Bio Re Peel', href: '/treatments/bio-re-peel' },
    ],
  },
  {
    heading: 'COSMETIC SURGERIES',
    items: [
      { name: 'Liposuction', href: '/treatments' },
      { name: 'Tummy Tuck', href: '/treatments' },
      { name: 'Blepharoplasty', href: '/treatments' },
      { name: 'Rhinoplasty', href: '/treatments' },
      { name: 'Dimple Creation', href: '/treatments' },
    ],
  },
  {
    heading: 'LEUCODERMA',
    items: [
      { name: 'Suction Blister Grafting', href: '/treatments' },
      { name: 'Split Thickness Skin Grafting', href: '/treatments' },
      { name: 'Melanocyte Transfer', href: '/treatments' },
    ],
  },
]

// ── SPECIALIZED CLINICS DATA ─────────────────────────────────────
const CLINICS = [
  { name: 'Laser Hair Removal', href: '/treatments/laser-hair' },
  { name: 'Acne & Pigmentation', href: '/concerns/acne' },
  { name: 'Anti Ageing', href: '/concerns/wrinkles' },
  { name: 'Body Contouring', href: '/concerns' },
  { name: 'Hair Loss Treatment', href: '/concerns/hair-fall' },
  { name: 'Anti Wrinkle Injection & Filler', href: '/treatments/botox' },
  { name: 'Skin Whitening', href: '/concerns/pigmentation' },
  { name: 'Signature Treatments', href: '/treatments' },
]

// ── NAV COMPONENT ────────────────────────────────────────────────
export default function Nav({ onBook }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQ, setSearchQ] = useState('')
  const [hoverMenu, setHoverMenu] = useState('')
  const closeTimer = useRef(null)
  const [mobileExpanded, setMobileExpanded] = useState('')

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

  const navLinkStyle = (active) => ({
    display: 'inline-flex', alignItems: 'center', gap: 3, padding: '8px 12px', borderRadius: 8,
    fontSize: 13, fontWeight: 400, textDecoration: 'none', transition: 'all .15s', cursor: 'pointer', border: 'none', background: 'none',
    color: active ? '#1A2744' : '#5A4A3A',
    backgroundColor: active ? '#F0E8DF' : 'transparent',
  })

  const chevron = (open) => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s', flexShrink: 0 }}>
      <path d="m6 9 6 6 6-6"/>
    </svg>
  )

  const megaHeading = { fontSize: 10.5, fontWeight: 600, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#B8916A', marginBottom: 10, display: 'block' }
  const megaLink = { display: 'block', padding: '4px 0', fontSize: 13, fontWeight: 300, color: '#1A1109', textDecoration: 'none', lineHeight: 1.6, transition: 'color .15s' }

  return (
    <>
      {/* ── STICKY NAV ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 200, background: 'rgba(250,247,242,0.97)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(26,17,9,0.08)', fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', gap: 4 }}>

          {/* Logo */}
          <Link href="/" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: 'linear-gradient(135deg,#1A2744 50%,#C4847E)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontWeight: 700, fontSize: 18, color: '#fff', letterSpacing: '-0.04em' }}>A</span>
            </div>
            <div style={{ lineHeight: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#1A2744', letterSpacing: '0.07em' }}>TVAK</span>
                <span style={{ fontSize: 11, fontWeight: 300, color: '#B8916A', margin: '0 2px' }}>&amp;</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#C4847E', letterSpacing: '0.07em' }}>ASTHI</span>
              </div>
              <div style={{ fontSize: 7.5, fontWeight: 500, letterSpacing: '0.25em', color: '#B8916A', marginTop: 2 }}>BY ARTHAM</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', marginLeft: 20, gap: 2 }} onMouseLeave={closeMegaSoon}>
            {/* Conditions */}
            <button style={navLinkStyle(isOn('/concerns'))} onMouseEnter={() => openMega('conditions')} onClick={() => openMega(hoverMenu === 'conditions' ? '' : 'conditions')}>
              Conditions {chevron(hoverMenu === 'conditions')}
            </button>
            {/* Treatments */}
            <button style={navLinkStyle(isOn('/treatments'))} onMouseEnter={() => openMega('treatments')} onClick={() => openMega(hoverMenu === 'treatments' ? '' : 'treatments')}>
              Treatments {chevron(hoverMenu === 'treatments')}
            </button>
            {/* Specialized Clinics */}
            <button style={navLinkStyle(false)} onMouseEnter={() => openMega('clinics')} onClick={() => openMega(hoverMenu === 'clinics' ? '' : 'clinics')}>
              Specialized Clinics {chevron(hoverMenu === 'clinics')}
            </button>
            <Link href="/doctor" style={navLinkStyle(isOn('/doctor'))} onMouseEnter={closeMega}>Our Doctor</Link>
            <Link href="/about" style={navLinkStyle(isOn('/about'))} onMouseEnter={closeMega}>About</Link>
            <Link href="/contact" style={navLinkStyle(isOn('/contact'))} onMouseEnter={closeMega}>Contact</Link>
          </nav>

          {/* Desktop right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
            {[
              { href: 'https://instagram.com', label: 'Instagram', d: <><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></> },
              { href: 'https://wa.me/919811997993', label: 'WhatsApp', d: <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.2-5.3A8.5 8.5 0 1 1 21 11.5Z"/> },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label}
                style={{ color: '#7A6A5A', display: 'flex', transition: 'color .15s' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{s.d}</svg>
              </a>
            ))}
            <div style={{ width: 1, height: 20, background: 'rgba(26,17,9,0.12)' }} />
            <button onClick={() => { setSearchOpen(o => !o); setHoverMenu('') }}
              style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7A6A5A' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
            <button onClick={onBook}
              style={{ background: '#1A2744', color: '#fff', fontSize: 12.5, fontWeight: 500, padding: '8px 20px', borderRadius: 999, border: 'none', cursor: 'pointer', flexShrink: 0, transition: 'background .18s' }}>
              Book Now
            </button>
          </div>

          {/* Mobile toggle */}
          <div style={{ display: 'none', alignItems: 'center', gap: 8, marginLeft: 'auto' }} className="mobile-nav-toggle">
            <button onClick={() => { setSearchOpen(o => !o); setMenuOpen(false) }}
              style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid rgba(26,17,9,0.13)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7A6A5A' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
            <button onClick={() => { setMenuOpen(o => !o); setSearchOpen(false) }}
              style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid rgba(26,17,9,0.13)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1A2744" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div style={{ borderTop: '1px solid rgba(26,17,9,0.08)', background: '#fff', boxShadow: '0 4px 20px rgba(26,17,9,0.06)' }}>
            <div style={{ maxWidth: 640, margin: '0 auto', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10, background: '#F5EDE4', borderRadius: 12, margin: '8px 20px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9A8A7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
              <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search treatments, concerns…"
                style={{ flex: 1, background: 'none', border: 'none', outline: 'none', padding: '8px 0', fontSize: 14, color: '#1A1109', fontWeight: 300 }} autoFocus />
              <button onClick={() => { setSearchOpen(false); setSearchQ('') }} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9A8A7A', display: 'flex', padding: 4 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ── CONDITIONS MEGA ── */}
      <div style={{ position: 'fixed', left: 0, right: 0, zIndex: 190, top: 64, opacity: hoverMenu === 'conditions' ? 1 : 0, pointerEvents: hoverMenu === 'conditions' ? 'auto' : 'none', transform: hoverMenu === 'conditions' ? 'translateY(0)' : 'translateY(-8px)', transition: 'opacity .2s, transform .22s' }}
        onMouseEnter={keepMega} onMouseLeave={closeMegaSoon}>
        <div style={{ background: '#fff', borderBottom: '1px solid rgba(26,17,9,0.08)', boxShadow: '0 16px 48px rgba(26,17,9,0.1)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 20px 32px', display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr 0.8fr', gap: 40 }}>
            {CONDITIONS.map(col => (
              <div key={col.heading}>
                <span style={megaHeading}>{col.heading}</span>
                {col.items.map(item => (
                  <Link key={item.name} href={item.href} onClick={closeMega}
                    style={megaLink}
                    onMouseEnter={e => e.currentTarget.style.color = '#B8916A'}
                    onMouseLeave={e => e.currentTarget.style.color = '#1A1109'}>
                    {item.name}
                  </Link>
                ))}
              </div>
            ))}
            <div style={{ gridColumn: '1 / -1', borderTop: '1px solid rgba(26,17,9,0.07)', marginTop: 4, paddingTop: 14, display: 'flex', justifyContent: 'flex-end' }}>
              <Link href="/concerns" onClick={closeMega} style={{ fontSize: 12.5, fontWeight: 400, color: '#1A2744', textDecoration: 'none' }}>
                View all concerns →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── TREATMENTS MEGA ── */}
      <div style={{ position: 'fixed', left: 0, right: 0, zIndex: 190, top: 64, opacity: hoverMenu === 'treatments' ? 1 : 0, pointerEvents: hoverMenu === 'treatments' ? 'auto' : 'none', transform: hoverMenu === 'treatments' ? 'translateY(0)' : 'translateY(-8px)', transition: 'opacity .2s, transform .22s' }}
        onMouseEnter={keepMega} onMouseLeave={closeMegaSoon}>
        <div style={{ background: '#fff', borderBottom: '1px solid rgba(26,17,9,0.08)', boxShadow: '0 16px 48px rgba(26,17,9,0.1)', maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 20px 32px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
            {TREATMENTS_MENU.map(col => (
              <div key={col.heading}>
                <span style={megaHeading}>{col.heading}</span>
                {col.items.map(item => (
                  <Link key={item.name} href={item.href} onClick={closeMega}
                    style={megaLink}
                    onMouseEnter={e => e.currentTarget.style.color = '#B8916A'}
                    onMouseLeave={e => e.currentTarget.style.color = '#1A1109'}>
                    {item.name}
                  </Link>
                ))}
              </div>
            ))}
            <div style={{ gridColumn: '1 / -1', borderTop: '1px solid rgba(26,17,9,0.07)', marginTop: 4, paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href="/treatments" onClick={closeMega} style={{ fontSize: 12.5, fontWeight: 400, color: '#1A2744', textDecoration: 'none' }}>
                View all treatments →
              </Link>
              <button onClick={() => { closeMega(); onBook() }} style={{ fontSize: 12.5, fontWeight: 500, padding: '8px 18px', borderRadius: 999, background: '#1A2744', color: '#fff', border: 'none', cursor: 'pointer' }}>
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── SPECIALIZED CLINICS DROPDOWN ── */}
      <div style={{ position: 'fixed', left: 0, right: 0, zIndex: 190, top: 64, opacity: hoverMenu === 'clinics' ? 1 : 0, pointerEvents: hoverMenu === 'clinics' ? 'auto' : 'none', transform: hoverMenu === 'clinics' ? 'translateY(0)' : 'translateY(-8px)', transition: 'opacity .2s, transform .22s' }}
        onMouseEnter={keepMega} onMouseLeave={closeMegaSoon}>
        <div style={{ background: '#fff', borderBottom: '1px solid rgba(26,17,9,0.08)', boxShadow: '0 16px 48px rgba(26,17,9,0.1)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 20px 28px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {CLINICS.map(item => (
              <Link key={item.name} href={item.href} onClick={closeMega}
                style={{ ...megaLink, padding: '8px 12px', borderRadius: 8, background: '#FAF7F2', border: '1px solid rgba(26,17,9,0.07)', fontWeight: 400, fontSize: 13.5 }}
                onMouseEnter={e => { e.currentTarget.style.background = '#F0E8DF'; e.currentTarget.style.color = '#1A2744' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#FAF7F2'; e.currentTarget.style.color = '#1A1109' }}>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {hoverMenu && <div style={{ position: 'fixed', inset: 0, zIndex: 189 }} onClick={closeMega} />}

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div style={{ position: 'fixed', top: 64, left: 0, right: 0, bottom: 0, zIndex: 300, background: '#fff', overflowY: 'auto' }}>
          <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Conditions */}
            {[
              { key: 'conditions', label: 'Conditions', sub: 'Browse by skin concern', data: CONDITIONS },
              { key: 'treatments', label: 'Treatments', sub: 'All procedures & services', data: TREATMENTS_MENU },
              { key: 'clinics', label: 'Specialized Clinics', sub: 'Expert clinic services', data: null, items: CLINICS },
            ].map(section => (
              <div key={section.key} style={{ borderBottom: '1px solid rgba(26,17,9,0.06)' }}>
                <button onClick={() => setMobileExpanded(mobileExpanded === section.key ? '' : section.key)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 12px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 400, color: '#1A1109' }}>{section.label}</div>
                    <div style={{ fontSize: 12, fontWeight: 300, color: '#9A8A7A', marginTop: 2 }}>{section.sub}</div>
                  </div>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#B8916A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transform: mobileExpanded === section.key ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                {mobileExpanded === section.key && (
                  <div style={{ paddingBottom: 12, paddingLeft: 12 }}>
                    {section.data ? section.data.map(col => (
                      <div key={col.heading} style={{ marginBottom: 14 }}>
                        <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B8916A', display: 'block', marginBottom: 6, paddingLeft: 4 }}>{col.heading}</span>
                        {col.items.map(item => (
                          <Link key={item.name} href={item.href} onClick={() => setMenuOpen(false)}
                            style={{ display: 'block', padding: '6px', fontSize: 13.5, fontWeight: 300, color: '#4A3728', textDecoration: 'none' }}>
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )) : section.items?.map(item => (
                      <Link key={item.name} href={item.href} onClick={() => setMenuOpen(false)}
                        style={{ display: 'block', padding: '6px', fontSize: 13.5, fontWeight: 300, color: '#4A3728', textDecoration: 'none' }}>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {[
              { href: '/doctor', label: 'Our Doctor', sub: 'Dr. Omaima Jawed' },
              { href: '/about', label: 'About', sub: 'Our clinic & philosophy' },
              { href: '/contact', label: 'Contact', sub: 'Book a consultation' },
            ].map(item => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 12px', textDecoration: 'none', borderBottom: '1px solid rgba(26,17,9,0.06)' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 400, color: '#1A1109' }}>{item.label}</div>
                  <div style={{ fontSize: 12, fontWeight: 300, color: '#9A8A7A', marginTop: 2 }}>{item.sub}</div>
                </div>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#B8916A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            ))}
            <button onClick={() => { setMenuOpen(false); onBook() }}
              style={{ marginTop: 12, width: '100%', padding: '14px', borderRadius: 999, background: '#1A2744', color: '#fff', fontSize: 13, fontWeight: 500, border: 'none', cursor: 'pointer' }}>
              Book Appointment
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          nav { display: none !important; }
          .mobile-nav-toggle { display: flex !important; }
        }
      `}</style>
    </>
  )
}
