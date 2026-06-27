import Link from 'next/link'

export const metadata = { title: 'Before & After Results — Tvak & Asthi by Artham' }

const CASES = [
  {
    treatment: 'Acne Clearance Program', slug: 'acne-clearance', concern: 'Acne & Breakouts',
    result: 'Active acne cleared across forehead and cheeks', weeks: '8 weeks', sessions: '6 sessions',
    cat: 'Acne & Scars', accent: '#FFF0EE', dot: '#C4847E',
  },
  {
    treatment: 'Acne Scar Revision — MNRF', slug: 'acne-scar-mnrf', concern: 'Acne Scars',
    result: 'Pitted boxcar & rolling scars visibly reduced', weeks: '12 weeks', sessions: '4 sessions',
    cat: 'Acne & Scars', accent: '#F5EDE4', dot: '#B8916A',
  },
  {
    treatment: 'Melasma Treatment', slug: 'melasma', concern: 'Pigmentation & Melasma',
    result: 'Dark patches on cheeks significantly faded', weeks: '10 weeks', sessions: '6 sessions',
    cat: 'Pigmentation', accent: '#EEF6FF', dot: '#6B9EC7',
  },
  {
    treatment: 'PRP Hair Restoration', slug: 'prp-hair', concern: 'Hair Fall & Thinning',
    result: 'Visible density improvement and reduced fall', weeks: '16 weeks', sessions: '4 sessions',
    cat: 'Hair Restoration', accent: '#EEFAF2', dot: '#2E7D52',
  },
  {
    treatment: 'Carbon Laser Facial', slug: 'carbon-laser-facial', concern: 'Pores & Texture',
    result: 'Pores minimised, oil control improved', weeks: '6 weeks', sessions: '4 sessions',
    cat: 'Skin & Glow', accent: '#FFF0EE', dot: '#C4847E',
  },
  {
    treatment: 'HydraFacial MD', slug: 'hydrafacial-md', concern: 'Dull & Dry Skin',
    result: 'Instant glow, deeply hydrated and plump skin', weeks: '1 session', sessions: '1 session',
    cat: 'Skin & Glow', accent: '#F5EDE4', dot: '#B8916A',
  },
  {
    treatment: 'Anti-Wrinkle Botox', slug: 'botox', concern: 'Wrinkles & Fine Lines',
    result: 'Forehead lines and crow\'s feet softened naturally', weeks: '2 weeks', sessions: '1 session',
    cat: 'Anti-Ageing', accent: '#EEF1F8', dot: '#1A2744',
  },
  {
    treatment: 'Dermal Fillers', slug: 'fillers', concern: 'Volume Loss',
    result: 'Cheek volume restored, jawline defined', weeks: '2 weeks', sessions: '1 session',
    cat: 'Anti-Ageing', accent: '#EEF6FF', dot: '#6B9EC7',
  },
  {
    treatment: 'GFC Hair Therapy', slug: 'gfc-hair', concern: 'Hair Regrowth',
    result: 'New hair growth visible in thinning crown', weeks: '12 weeks', sessions: '3 sessions',
    cat: 'Hair Restoration', accent: '#EEFAF2', dot: '#2E7D52',
  },
  {
    treatment: 'Laser Hair Reduction', slug: 'laser-hair', concern: 'Unwanted Body Hair',
    result: '80% permanent reduction after full course', weeks: '20 weeks', sessions: '6 sessions',
    cat: 'Laser & Devices', accent: '#FFF0EE', dot: '#C4847E',
  },
]

const CATS = ['All', 'Acne & Scars', 'Pigmentation', 'Skin & Glow', 'Hair Restoration', 'Anti-Ageing', 'Laser & Devices']

function BeforeAfterCard({ item }) {
  return (
    <div style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', border: '1.5px solid rgba(26,17,9,0.08)' }}>
      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', height: 220 }}>
        <div style={{ background: '#E2D8CE', display: 'flex', alignItems: 'flex-end', padding: 12 }}>
          <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(255,255,255,0.9)', color: '#4A3728', padding: '4px 10px', borderRadius: 5 }}>Before</span>
        </div>
        <div style={{ background: '#C8BDB4', display: 'flex', alignItems: 'flex-end', padding: 12, justifyContent: 'flex-end' }}>
          <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(26,39,68,0.85)', color: '#FAF7F2', padding: '4px 10px', borderRadius: 5 }}>After</span>
        </div>
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: '#fff', transform: 'translateX(-50%)' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 30, height: 30, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4A3728" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l-6-6 6-6M15 6l6 6-6 6"/></svg>
          </div>
        </div>
        <div style={{ position: 'absolute', top: 12, left: 12, background: item.accent, borderRadius: 6, padding: '3px 10px' }}>
          <span style={{ fontSize: 10, fontWeight: 500, color: item.dot, letterSpacing: '0.06em' }}>{item.cat}</span>
        </div>
      </div>
      <div style={{ padding: '18px 20px 22px' }}>
        <Link href={`/treatments/${item.slug}`} style={{ textDecoration: 'none' }}>
          <h3 style={{ fontWeight: 500, fontSize: 14.5, color: 'var(--text)', marginBottom: 6, lineHeight: 1.3 }}>{item.treatment}</h3>
        </Link>
        <p style={{ fontSize: 13, fontWeight: 300, color: '#7A6A5A', marginBottom: 14, lineHeight: 1.6 }}>{item.result}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ fontSize: 11.5, fontWeight: 400, color: '#9A8A7A', background: '#F5EDE4', padding: '4px 10px', borderRadius: 999 }}>{item.weeks}</span>
            <span style={{ fontSize: 11.5, fontWeight: 400, color: '#9A8A7A', background: '#F5EDE4', padding: '4px 10px', borderRadius: 999 }}>{item.sessions}</span>
          </div>
          <Link href={`/treatments/${item.slug}`} style={{ fontSize: 12, fontWeight: 400, color: '#1A2744', textDecoration: 'none' }}>View treatment →</Link>
        </div>
      </div>
    </div>
  )
}

export default function BeforeAfterPage() {
  return (
    <div style={{ background: 'var(--cream)' }}>
      {/* HERO */}
      <section style={{ padding: '52px 20px 44px', background: 'linear-gradient(180deg,#F5EDE4,#FAF7F2)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ fontSize: 12.5, color: '#9A8A7A', fontWeight: 300, marginBottom: 20, display: 'flex', gap: 6 }}>
            <Link href="/" style={{ color: '#9A8A7A', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--text)' }}>Before & After</span>
          </div>
          <span className="eyebrow">Real Results</span>
          <h1 style={{ fontWeight: 500, marginBottom: 14 }}>Before & After</h1>
          <p style={{ fontSize: 14.5, fontWeight: 300, color: '#4A3728', maxWidth: 560, lineHeight: 1.85, marginBottom: 28 }}>
            Real patient results from treatments performed by Dr. Omaima Jawed. Every procedure is doctor-led — never delegated.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ background: '#1A2744', color: '#fff', fontSize: 13, fontWeight: 400, padding: '12px 26px', borderRadius: 999, textDecoration: 'none' }}>
              Book Consultation
            </Link>
            <Link href="/treatments" style={{ background: 'transparent', color: '#1A2744', fontSize: 13, fontWeight: 400, padding: '12px 26px', borderRadius: 999, border: '1.5px solid rgba(26,39,68,0.2)', textDecoration: 'none' }}>
              View Treatments
            </Link>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ background: '#1A2744', padding: '20px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
          {[
            { value: '500+', label: 'Patients Treated' },
            { value: '4.9★', label: 'Google Rating' },
            { value: '100%', label: 'Doctor-Led Sessions' },
            { value: '15+', label: 'Treatments Available' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 500, color: '#FAF7F2' }}>{s.value}</div>
              <div style={{ fontSize: 11.5, fontWeight: 300, color: '#A0B4C8', marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ALL CASES — grouped by category */}
      {['Acne & Scars', 'Skin & Glow', 'Pigmentation', 'Hair Restoration', 'Anti-Ageing', 'Laser & Devices'].map(cat => {
        const items = CASES.filter(c => c.cat === cat)
        if (!items.length) return null
        return (
          <section key={cat} style={{ padding: '56px 20px', borderBottom: '1px solid rgba(26,17,9,0.07)' }}>
            <div style={{ maxWidth: 1180, margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
                <h2 style={{ fontWeight: 500, fontSize: 20, color: 'var(--text)', margin: 0 }}>{cat}</h2>
                <Link href="/concerns" style={{ fontSize: 13, fontWeight: 400, color: '#1A2744', textDecoration: 'none' }}>Browse concerns →</Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
                {items.map((item, i) => <BeforeAfterCard key={i} item={item} />)}
              </div>
            </div>
          </section>
        )
      })}

      {/* DISCLAIMER */}
      <section style={{ padding: '28px 20px', background: '#FAF7F2' }}>
        <p style={{ textAlign: 'center', fontSize: 12, fontWeight: 300, color: '#9A8A7A', maxWidth: 640, margin: '0 auto', lineHeight: 1.8 }}>
          Individual results may vary. Results shown are from actual patients treated at Tvak & Asthi. All procedures performed by Dr. Omaima Jawed, MBBS. Number of sessions and timeline will differ per person based on skin type, concern severity, and compliance with home care.
        </p>
      </section>

      {/* CTA */}
      <section style={{ padding: '64px 20px', background: '#3B2210' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 500, color: '#FAF7F2', marginBottom: 10 }}>Ready to see your results?</h2>
          <p style={{ fontSize: 13.5, fontWeight: 300, color: '#C4A998', marginBottom: 28 }}>
            Book a consultation with Dr. Omaima and get a personalised treatment plan with realistic expectations.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ background: '#C4847E', color: '#fff', fontSize: 13, fontWeight: 400, padding: '13px 32px', borderRadius: 999, textDecoration: 'none' }}>
              Book Appointment
            </Link>
            <a href="https://wa.me/919811997993" target="_blank" rel="noopener" style={{ background: 'rgba(255,255,255,0.1)', color: '#FAF7F2', fontSize: 13, fontWeight: 400, padding: '13px 32px', borderRadius: 999, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
