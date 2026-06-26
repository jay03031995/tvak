import Link from 'next/link'
import { fetchHomePage, fetchSiteSettings } from '@/sanity/client'

export const revalidate = 60

export default async function HomePage() {
  const [page, settings] = await Promise.all([fetchHomePage(), fetchSiteSettings()]).catch(() => [null, null])

  // Fallback data
  const hero = page?.hero || {}
  const trustBar = page?.trustBar || [
    { text: 'US-FDA Cleared Devices' }, { text: 'MBBS Aesthetic Physician' },
    { text: '500+ Happy Patients' }, { text: 'Doctor-Led Every Session' }, { text: '4.9 Google Rating' }
  ]
  const testimonials = page?.testimonials?.items || [
    { name: 'Priya S.', initials: 'PS', rating: 5, text: 'My skin has never looked this clear. The treatment plan was personalised and the results were visible after just 2 sessions.', treatment: 'Acne Clearance', date: '2 weeks ago' },
    { name: 'Rohan M.', initials: 'RM', rating: 5, text: 'Dr. Omaima is extremely thorough. She explained every step and the HydraFacial results were immediate.', treatment: 'HydraFacial MD', date: '1 month ago' },
    { name: 'Anjali K.', initials: 'AK', rating: 5, text: 'I had been struggling with melasma for years. After 4 sessions, there is a visible 60% improvement.', treatment: 'Melasma Treatment', date: '3 weeks ago' },
  ]
  const faqs = page?.faqs?.items || [
    { question: 'Are all treatments performed by a doctor?', answer: 'Yes. Every session at Tvak & Asthi is led by Dr. Omaima Jawed, MBBS. We do not delegate clinical procedures to non-medical staff.' },
    { question: 'How many sessions will I need?', answer: 'This varies by treatment and concern. Most treatments show results in 1–4 sessions. Dr. Omaima will outline a personalised plan during your first consultation.' },
    { question: 'Are the devices safe for Indian skin tones?', answer: 'All our devices are US-FDA cleared and selected specifically for darker Fitzpatrick skin types (III–V), which are common in India.' },
    { question: 'Do I need to take time off after a session?', answer: 'Most treatments have zero downtime. Procedures like peels or MNRF may have 2–3 days of mild redness, which we will discuss before booking.' },
    { question: 'How do I book a consultation?', answer: 'Call or WhatsApp 09811997993, or use the Book Now button. First consultations take 20–30 minutes and include a skin assessment.' },
  ]

  return (
    <div style={{ background: 'var(--cream)', overflowX: 'hidden' }}>

      {/* PROMO BANNER */}
      {settings?.promoBanner?.enabled && (
        <div style={{ background: '#1A2744', padding: '10px 20px', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 300, color: '#FAF7F2' }}>
            <strong style={{ fontWeight: 500 }}>{settings.promoBanner.label}</strong>{' '}
            {settings.promoBanner.text}
            {settings.promoBanner.linkText && (
              <Link href={settings.promoBanner.linkUrl || '/contact'}
                style={{ color: '#B8916A', fontWeight: 400, marginLeft: 8 }}>
                {settings.promoBanner.linkText} →
              </Link>
            )}
          </p>
        </div>
      )}

      {/* HERO */}
      <section style={{ padding: '72px 20px 64px', background: 'linear-gradient(160deg, #FAF7F2 55%, #F5EDE4)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div className="au">
            <span className="eyebrow">Dermatology · Aesthetics · Trichology</span>
            <h1 style={{ fontWeight: 500, fontSize: 'clamp(28px,4.5vw,50px)', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20, color: 'var(--text)' }}>
              {hero.headingLine1 || 'The difference between'}{' '}
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#4A6741' }}>
                {hero.headingItalic || 'covering concerns'}
              </em>{' '}
              {hero.headingLine2 || 'and'}{' '}
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#4A6741' }}>
                {hero.headingItalic2 || 'correcting them.'}
              </em>
            </h1>
            <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.8, color: '#4A3728', maxWidth: 440, marginBottom: 32 }}>
              {hero.subtext || "Noida's MD-led aesthetic clinic. Evidence-based care for skin, hair and ageing concerns — always under Dr. Omaima's expert eye."}
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 44 }}>
              <Link href="/contact" style={{ background: '#1A1109', color: '#FAF7F2', fontSize: 13, fontWeight: 400, padding: '13px 28px', borderRadius: 999, textDecoration: 'none', transition: 'background .18s' }}>
                {hero.ctaPrimary || 'Book Consultation'}
              </Link>
              <Link href="/treatments" style={{ background: 'transparent', color: '#1A1109', fontSize: 13, fontWeight: 400, padding: '13px 28px', borderRadius: 999, border: '1.5px solid rgba(26,17,9,0.2)', textDecoration: 'none' }}>
                {hero.ctaSecondary || 'Explore Treatments'}
              </Link>
            </div>
            <div style={{ display: 'flex', gap: 28, paddingTop: 20, borderTop: '1px solid rgba(26,17,9,0.1)', flexWrap: 'wrap' }}>
              {(hero.stats || [
                { value: '5+', label: 'Years Experience' },
                { value: '500+', label: 'Patients Treated' },
                { value: '15+', label: 'Treatments Offered' },
                { value: '4.9', label: 'Google Rating' },
              ]).map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'clamp(18px,2.5vw,26px)', fontWeight: 500, color: '#1A2744', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 11, fontWeight: 300, color: '#9A8A7A', marginTop: 4, letterSpacing: '0.02em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ borderRadius: 16, overflow: 'hidden', background: '#E8DED4', aspectRatio: i === 1 || i === 4 ? '3/4' : '1/1' }} />
            ))}
            <div style={{ position: 'absolute', bottom: 16, left: -16, background: '#fff', borderRadius: 999, padding: '10px 18px', boxShadow: '0 4px 24px rgba(26,17,9,0.12)', fontSize: 12, fontWeight: 400 }}>
              Doctor-led every session
            </div>
            <div style={{ position: 'absolute', top: 16, right: -16, background: '#fff', borderRadius: 999, padding: '10px 18px', boxShadow: '0 4px 24px rgba(26,17,9,0.12)', fontSize: 12, fontWeight: 400 }}>
              US-FDA cleared devices
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{ background: '#fff', borderTop: '1px solid rgba(26,17,9,0.07)', borderBottom: '1px solid rgba(26,17,9,0.07)', padding: '16px 20px', overflowX: 'auto' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'nowrap', justifyContent: 'center' }}>
          {trustBar.map((t, i) => (
            <span key={i} style={{ background: '#FAF7F2', border: '1px solid rgba(26,17,9,0.1)', borderRadius: 999, padding: '6px 14px', fontSize: 12, fontWeight: 400, color: '#4A3728', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {t.text}
            </span>
          ))}
        </div>
      </section>

      {/* TREATMENTS */}
      <section style={{ padding: '72px 20px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="eyebrow">{page?.treatmentsSection?.eyebrow || 'Our Services'}</span>
            <h2 style={{ fontWeight: 500, color: 'var(--text)' }}>{page?.treatmentsSection?.heading || 'Treatments we offer'}</h2>
            <p style={{ fontSize: 14, fontWeight: 300, color: '#7A6A5A', marginTop: 10, maxWidth: 480, marginInline: 'auto' }}>
              {page?.treatmentsSection?.subtext || 'Each treatment is customised to your skin type and concern.'}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {['HydraFacial MD', 'Carbon Laser Facial', 'Acne Clearance Program', 'PRP Hair Restoration', 'Anti-Wrinkle Botox', 'Laser Hair Reduction'].map((name, i) => (
              <Link key={i} href="/treatments" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1.5px solid rgba(26,17,9,0.09)', transition: 'transform .22s, box-shadow .22s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(26,17,9,0.10)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}>
                <div style={{ height: 160, background: '#F0E8DF', flexShrink: 0 }} />
                <div style={{ padding: '18px 20px 20px' }}>
                  <div style={{ fontSize: 10.5, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B8916A', marginBottom: 6 }}>Skin & Glow</div>
                  <h3 style={{ fontWeight: 500, fontSize: 15, color: 'var(--text)', marginBottom: 8 }}>{name}</h3>
                  <p style={{ fontSize: 13, fontWeight: 300, color: '#7A6A5A', lineHeight: 1.65 }}>Doctor-led treatment tailored to your skin needs.</p>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link href="/treatments" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 400, color: '#1A2744', border: '1.5px solid rgba(26,39,68,0.2)', padding: '12px 28px', borderRadius: 999, textDecoration: 'none' }}>
              View all treatments →
            </Link>
          </div>
        </div>
      </section>

      {/* CONCERNS */}
      <section style={{ padding: '72px 20px', background: '#F5EDE4' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="eyebrow">{page?.concernsSection?.eyebrow || 'Find Your Concern'}</span>
            <h2 style={{ fontWeight: 500, color: 'var(--text)' }}>{page?.concernsSection?.heading || 'What are you dealing with?'}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 14 }}>
            {[
              { name: 'Acne & Breakouts', bg: '#FFF0EE', color: '#C4847E' },
              { name: 'Pigmentation', bg: '#F5EDE4', color: '#B8916A' },
              { name: 'Hair Fall', bg: '#EEFAF2', color: '#2E7D52' },
              { name: 'Acne Scars', bg: '#FFF0EE', color: '#C4847E' },
              { name: 'Wrinkles', bg: '#F5EDE4', color: '#B8916A' },
              { name: 'Dull Skin', bg: '#EEF6FF', color: '#6B9EC7' },
              { name: 'Dark Circles', bg: '#EEF1F8', color: '#1A2744' },
              { name: 'Pores & Texture', bg: '#EEFAF2', color: '#2E7D52' },
            ].map((c, i) => (
              <Link key={i} href="/concerns" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', background: '#fff', borderRadius: 12, border: '1.5px solid rgba(26,17,9,0.09)', transition: 'transform .2s, box-shadow .2s' }}>
                <span style={{ width: 32, height: 32, borderRadius: 8, background: c.bg, flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text)' }}>{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DOCTOR */}
      <section style={{ padding: '72px 20px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div style={{ borderRadius: 20, overflow: 'hidden', background: '#E8DED4', aspectRatio: '4/5' }} />
          <div>
            <span className="eyebrow">Your Doctor</span>
            <h2 style={{ fontWeight: 500, color: 'var(--text)', marginBottom: 16 }}>Dr. Omaima Jawed</h2>
            <p style={{ fontSize: 13, fontWeight: 300, color: '#B8916A', marginBottom: 16, letterSpacing: '0.04em' }}>MBBS · Aesthetic Physician · 5 Years Experience</p>
            <p style={{ fontSize: 14, fontWeight: 300, color: '#4A3728', lineHeight: 1.8, marginBottom: 24 }}>
              Dr. Omaima completed her MBBS and trained in aesthetic dermatology at leading institutes. She personally leads every procedure — from your first consultation to each follow-up session.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
              {['Acne & Scar Treatment', 'Laser Procedures', 'Hair Restoration', 'Anti-Ageing', 'Chemical Peels'].map(s => (
                <span key={s} style={{ fontSize: 12, fontWeight: 400, color: '#4A3728', background: '#F5EDE4', padding: '5px 12px', borderRadius: 999, border: '1px solid rgba(26,17,9,0.1)' }}>{s}</span>
              ))}
            </div>
            <Link href="/doctor" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 400, color: '#fff', background: '#1A2744', padding: '12px 26px', borderRadius: 999, textDecoration: 'none' }}>
              Full Profile →
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '72px 20px', background: '#FAF7F2' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="eyebrow">{page?.testimonials?.eyebrow || 'Patient Stories'}</span>
            <h2 style={{ fontWeight: 500, color: 'var(--text)' }}>{page?.testimonials?.heading || 'Real results, real people'}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, padding: '24px 22px', border: '1.5px solid rgba(26,17,9,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1A2744', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#FAF7F2' }}>{t.initials}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text)' }}>{t.name}</div>
                    <div style={{ fontSize: 11.5, fontWeight: 300, color: '#9A8A7A' }}>{t.treatment} · {t.date}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: 1 }}>
                    {[...Array(t.rating || 5)].map((_, si) => (
                      <svg key={si} width="12" height="12" viewBox="0 0 24 24" fill="#FBBC04"><path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7Z"/></svg>
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: 13.5, fontWeight: 300, lineHeight: 1.75, color: '#4A3728', margin: 0 }}>{t.text}</p>
                <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  <span style={{ fontSize: 11, fontWeight: 300, color: '#9A8A7A' }}>Google Review</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '72px 20px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="eyebrow">{page?.faqs?.eyebrow || 'FAQ'}</span>
            <h2 style={{ fontWeight: 500, color: 'var(--text)' }}>{page?.faqs?.heading || 'Common questions'}</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {faqs.map((f, i) => (
              <details key={i} style={{ background: '#fff', borderRadius: 12, border: '1.5px solid rgba(26,17,9,0.09)', overflow: 'hidden' }}>
                <summary style={{ padding: '18px 22px', fontSize: 14, fontWeight: 400, color: 'var(--text)', cursor: 'pointer', listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  {f.question}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B8916A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="m6 9 6 6 6-6"/></svg>
                </summary>
                <p style={{ margin: 0, padding: '4px 22px 20px', fontSize: 13.5, fontWeight: 300, color: '#4A3728', lineHeight: 1.75 }}>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: '64px 20px', background: '#3B2210' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 500, color: '#FAF7F2', marginBottom: 12 }}>
            {page?.ctaBanner?.heading || 'Ready to correct, not just cover?'}
          </h2>
          <p style={{ fontSize: 14, fontWeight: 300, color: '#C4A998', marginBottom: 32 }}>
            {page?.ctaBanner?.subtext || 'Book a consultation with Dr. Omaima and get a personalised treatment plan.'}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ background: '#C4847E', color: '#fff', fontSize: 13, fontWeight: 400, padding: '13px 32px', borderRadius: 999, textDecoration: 'none' }}>
              {page?.ctaBanner?.primaryCta || 'Book Appointment'}
            </Link>
            <a href="tel:09811997993" style={{ background: 'rgba(255,255,255,0.08)', color: '#FAF7F2', fontSize: 13, fontWeight: 400, padding: '13px 32px', borderRadius: 999, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
              {page?.ctaBanner?.secondaryCta || 'Call 09811997993'}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
