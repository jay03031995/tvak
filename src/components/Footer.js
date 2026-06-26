import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#1A2744', color: '#FAF7F2', fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 20px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: 'linear-gradient(135deg,#FAF7F2 50%,#C4847E)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontWeight: 700, fontSize: 18, color: '#1A2744', letterSpacing: '-0.04em' }}>A</span>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', color: '#FAF7F2' }}>TVAK & ASTHI</div>
              <div style={{ fontSize: 8, fontWeight: 400, letterSpacing: '0.22em', color: '#B8916A' }}>BY ARTHAM</div>
            </div>
          </div>
          <p style={{ fontSize: 13, fontWeight: 300, color: '#A0B4C8', lineHeight: 1.7, marginBottom: 20 }}>
            Noida's MD-led aesthetic clinic. Evidence-based care for skin, hair and ageing concerns.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            {['Instagram', 'Facebook', 'YouTube', 'WhatsApp'].map(s => (
              <a key={s} href="#" target="_blank" rel="noopener" style={{ color: '#7A9AB8', display: 'flex', transition: 'color .15s' }}
                aria-label={s}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {s === 'Instagram' && <><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></>}
                  {s === 'Facebook' && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>}
                  {s === 'YouTube' && <><rect x="2" y="5" width="20" height="14" rx="4"/><polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none"/></>}
                  {s === 'WhatsApp' && <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.2-5.3A8.5 8.5 0 1 1 21 11.5Z"/>}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Treatments */}
        <div>
          <h4 style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#B8916A', marginBottom: 16 }}>Treatments</h4>
          {['HydraFacial MD', 'Carbon Laser Facial', 'Acne Clearance Program', 'PRP Hair Restoration', 'Anti-Wrinkle Botox', 'Laser Hair Reduction'].map(t => (
            <Link key={t} href="/treatments" style={{ display: 'block', fontSize: 13, fontWeight: 300, color: '#A0B4C8', marginBottom: 9, transition: 'color .15s' }}>{t}</Link>
          ))}
        </div>

        {/* Concerns */}
        <div>
          <h4 style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#B8916A', marginBottom: 16 }}>Concerns</h4>
          {['Acne & Breakouts', 'Pigmentation & Melasma', 'Hair Fall & Thinning', 'Wrinkles & Fine Lines', 'Dark Circles', 'Acne Scars'].map(c => (
            <Link key={c} href="/concerns" style={{ display: 'block', fontSize: 13, fontWeight: 300, color: '#A0B4C8', marginBottom: 9, transition: 'color .15s' }}>{c}</Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#B8916A', marginBottom: 16 }}>Clinic</h4>
          <div style={{ fontSize: 13, fontWeight: 300, color: '#A0B4C8', lineHeight: 1.75 }}>
            <p>Lotus Plaza, near Mithaas Sweets</p>
            <p>Hazipur, Sector 104</p>
            <p>Noida, UP 201304</p>
            <p style={{ marginTop: 12 }}>
              <a href="tel:09811997993" style={{ color: '#C4847E', fontWeight: 400 }}>098119 97993</a>
            </p>
          </div>
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href="tel:09811997993"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#C4847E', color: '#fff', fontSize: 12.5, fontWeight: 400, padding: '10px 20px', borderRadius: 999, textDecoration: 'none' }}>
              Call Clinic
            </a>
            <a href="https://wa.me/919811997993" target="_blank" rel="noopener"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.08)', color: '#FAF7F2', fontSize: 12.5, fontWeight: 400, padding: '10px 20px', borderRadius: 999, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)' }}>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 20px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <p style={{ fontSize: 12, fontWeight: 300, color: '#5A7A9A', margin: 0 }}>
          © 2024 Tvak & Asthi by Artham. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy Policy', 'Terms of Use'].map(l => (
            <Link key={l} href="#" style={{ fontSize: 12, fontWeight: 300, color: '#5A7A9A' }}>{l}</Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
