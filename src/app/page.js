import Image from 'next/image'
import Link from 'next/link'
import { fetchHomePage, fetchSiteSettings, fetchDoctor, fetchTreatments, fetchConcerns, urlFor } from '@/sanity/client'
import AnimatedStats from '@/components/AnimatedStats'
import MarqueeTrustBar from '@/components/MarqueeTrustBar'
import AnimatedFAQ from '@/components/AnimatedFAQ'
import AnimatedTestimonials from '@/components/AnimatedTestimonials'

export const revalidate = 10

export default async function HomePage() {
  const [[page, settings], doctor, sanityTreatments, sanityConcerns] = await Promise.all([
    Promise.all([fetchHomePage(), fetchSiteSettings()]).catch(() => [null, null]),
    fetchDoctor().catch(() => null),
    fetchTreatments().catch(() => []),
    fetchConcerns().catch(() => []),
  ])

  const treatmentImageMap = new Map(
    (sanityTreatments || []).filter(t => t.slug?.current && t.image).map(t => [t.slug.current, t.image])
  )
  const concernMap = new Map(
    (sanityConcerns || []).filter(c => c.slug?.current).map(c => [c.slug.current, c])
  )
  const concernCard = (fallback) => {
    const cms = concernMap.get(fallback.slug)
    return {
      ...fallback,
      name: cms?.name || fallback.name,
      image: cms?.image || cms?.heroImage,
      iconBg: cms?.iconBg,
    }
  }

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

  const heroStats = hero.stats || [
    { value: '5+', label: 'Years Experience' },
    { value: '500+', label: 'Patients Treated' },
    { value: '15+', label: 'Treatments Offered' },
    { value: '4.9★', label: 'Google Rating' },
  ]

  return (
    <div style={{ background: 'var(--cream)', overflowX: 'hidden' }}>

      {/* PROMO BANNER */}
      {settings?.promoBanner?.enabled && (
        <div style={{ background: '#543213', padding: '10px 20px', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 300, color: '#efdfc8' }}>
            <strong style={{ fontWeight: 500 }}>{settings.promoBanner.label}</strong>{' '}
            {settings.promoBanner.text}
            {settings.promoBanner.linkText && (
              <Link href={settings.promoBanner.linkUrl || '/contact'}
                style={{ color: '#feb847', fontWeight: 500, marginLeft: 8 }}>
                {settings.promoBanner.linkText} →
              </Link>
            )}
          </p>
        </div>
      )}

      {/* HERO — 3-panel Artham banner */}
      {(() => {
        const videoSrc = page?.heroVideoUrl || page?.heroVideoFile?.asset?.url
        const centerImg = page?.heroImage2 || page?.heroFallbackImage
        return (
          <section className="hero-3panel">

            {/* ── PANEL 1 — Dark brand anchor with circular logo ── */}
            <div className="hero-panel-side" style={{ background: '#1a0c04', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '52px 36px 48px', overflow: 'hidden' }}>
              {/* Faint clinic photo behind */}
              {page?.heroImage1 && (
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                  <Image src={urlFor(page.heroImage1).width(600).height(1000).fit('crop').url()} alt="" fill style={{ objectFit: 'cover', opacity: 0.22 }} />
                </div>
              )}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,12,4,0.75) 0%, rgba(26,12,4,0.92) 100%)', zIndex: 1 }} />

              {/* Eyebrow */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.22em', color: '#feb847' }}>DERMATOLOGY · AESTHETICS · TRICHOLOGY</span>
              </div>

              {/* Circular logo medallion */}
              <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '32px 0' }}>
                <div style={{ width: 200, height: 200, borderRadius: '50%', border: '1.5px solid rgba(254,184,71,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 8, borderRadius: '50%', border: '1px solid rgba(254,184,71,0.18)' }} />
                  <Image src="/artham-logo.png" alt="Artham Aesthetique" width={150} height={150} style={{ objectFit: 'contain', opacity: 0.88 }} />
                </div>
              </div>

              {/* Bottom tagline */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h2 style={{ fontSize: 'clamp(18px,1.8vw,26px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, letterSpacing: '0.04em', textTransform: 'uppercase', margin: 0 }}>
                  WHERE SCIENCE<br />
                  <span style={{ color: '#feb847' }}>MEETS</span><br />
                  SOULFUL CARE
                </h2>
              </div>
            </div>

            {/* ── PANEL 2 — Center: video or image + hero quote ── */}
            <div className="hero-panel-center" style={{ position: 'relative', overflow: 'hidden' }}>
              {/* Video background */}
              {videoSrc ? (
                <video autoPlay muted loop playsInline
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
                  poster={centerImg ? urlFor(centerImg).width(900).url() : undefined}>
                  <source src={videoSrc} type="video/mp4" />
                </video>
              ) : centerImg ? (
                <Image src={urlFor(centerImg).width(900).height(1100).fit('crop').url()} alt="" fill priority style={{ objectFit: 'cover', zIndex: 0 }} />
              ) : (
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #844d28 0%, #543213 100%)', zIndex: 0 }} />
              )}
              {/* Gradient overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,10,4,0.15) 0%, rgba(20,10,4,0.55) 55%, rgba(20,10,4,0.88) 100%)', zIndex: 1 }} />

              {/* Vertical social links */}
              <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', zIndex: 3, display: 'flex', flexDirection: 'column', gap: 18 }}>
                {['INSTAGRAM', 'TWITTER', 'FACEBOOK'].map(s => (
                  <a key={s} href="#" aria-label={s}
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: 9, fontWeight: 500, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>
                    {s}
                  </a>
                ))}
              </div>

              {/* Hero quote text — bottom */}
              <div className="au" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 44px 52px', zIndex: 2 }}>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', color: '#feb847', marginBottom: 16, textTransform: 'uppercase' }}>
                  {hero.eyebrow || 'WHAT IF...'}
                </p>
                <h1 style={{ fontWeight: 600, fontSize: 'clamp(22px,2.8vw,42px)', color: '#fff', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: 16 }}>
                  {hero.headingLine1 || 'The difference between'}{' '}
                  <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#feb847' }}>
                    {hero.headingItalic || 'covering concerns'}
                  </em>{' '}
                  {hero.headingLine2 || 'and'}{' '}
                  <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#feb847' }}>
                    {hero.headingItalic2 || 'correcting them.'}
                  </em>
                </h1>
                <p style={{ fontSize: 13.5, fontWeight: 300, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, maxWidth: 400 }}>
                  {hero.subtext || "Noida's MD-led aesthetic clinic. Evidence-based care for skin, hair and ageing."}
                </p>
              </div>
            </div>

            {/* ── PANEL 3 — Dark CTA with gold logo ── */}
            <div className="hero-panel-side" style={{ background: '#0d0704', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '52px 36px 48px', position: 'relative', overflow: 'hidden' }}>
              {/* Subtle radial gold glow */}
              <div style={{ position: 'absolute', bottom: -60, left: '50%', transform: 'translateX(-50%)', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(254,184,71,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

              {/* Top label */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{ flex: 1, height: 1, background: 'rgba(254,184,71,0.35)' }} />
                  <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.2em', color: 'rgba(254,184,71,0.7)', whiteSpace: 'nowrap' }}>SOMETHING IS ABOUT TO ALIGN</span>
                  <div style={{ flex: 1, height: 1, background: 'rgba(254,184,71,0.35)' }} />
                </div>
              </div>

              {/* Gold tinted logo */}
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '24px 0' }}>
                <Image src="/artham-logo.png" alt="" width={190} height={190}
                  style={{ objectFit: 'contain', filter: 'sepia(1) saturate(4) brightness(0.85) hue-rotate(5deg)', opacity: 0.75 }} />
              </div>

              {/* Bottom CTA */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ fontSize: 13, fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.6)', marginBottom: 28, lineHeight: 1.65 }}>
                  Aligning Science. Enhancing Confidence.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <Link href="/contact"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#feb847', color: '#543213', fontSize: 13, fontWeight: 600, padding: '14px 28px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.03em' }}>
                    {hero.ctaPrimary || 'Book Consultation'}
                  </Link>
                  <Link href="/treatments"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: 'rgba(255,255,255,0.65)', fontSize: 13, fontWeight: 300, padding: '13px 28px', borderRadius: 999, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>
                    {hero.ctaSecondary || 'Explore Treatments'}
                  </Link>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 24 }}>
                  {(hero.stats || heroStats).slice(0, 2).map((s, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 20, fontWeight: 700, color: '#feb847', lineHeight: 1 }}>{s.value}</div>
                      <div style={{ fontSize: 10, fontWeight: 400, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', marginTop: 4 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </section>
        )
      })()}

      {/* TRUST BAR — infinite marquee */}
      <MarqueeTrustBar items={trustBar} />

      {/* TREATMENTS */}
      <section style={{ padding: '72px 20px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <span className="eyebrow">{page?.treatmentsSection?.eyebrow || 'Our Services'}</span>
              <h2 style={{ fontWeight: 500, color: 'var(--text)', margin: 0 }}>{page?.treatmentsSection?.heading || 'Treatments we offer'}</h2>
            </div>
            <Link href="/treatments" style={{ fontSize: 13, fontWeight: 400, color: '#543213', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>View all treatments →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 18 }}>
            {[
              { name: 'Hydrafacial', slug: 'hydrafacial', badge: 'SKIN', desc: 'Deep-cleanse, exfoliate and hydrate in one session. Instant glow, zero downtime.', duration: '45 min' },
              { name: 'Carbon Laser Facial', slug: 'carbon-laser-facial', badge: 'LASERS', desc: 'Tightens pores, controls oil and brightens dull skin — the Hollywood peel.', duration: '30 min' },
              { name: 'Acne Clearance Program', slug: 'acne-clearance', badge: 'SIGNATURE', desc: 'A complete medical plan combining therapy, peels and devices to clear active acne.', duration: '60 min' },
              { name: 'Acne Scar Revision (MNRF)', slug: 'acne-scar-mnrf', badge: 'ACNE SCARS', desc: 'Microneedling RF to rebuild collagen and smooth pitted scars.', duration: '60 min' },
              { name: 'Melasma Treatment', slug: 'melasma', badge: 'PIGMENTATION', desc: 'Combination laser toning, peels and topicals for stubborn melasma.', duration: '45 min' },
              { name: 'Anti-Wrinkle (Botox)', slug: 'botox', badge: 'POPULAR', desc: 'Soften frown lines, crow\'s feet and forehead lines with precise, natural-looking results.', duration: '20 min' },
              { name: 'Dermal Fillers', slug: 'fillers', badge: 'INJECTABLES', desc: 'Restore volume, define cheeks and lips with hyaluronic acid fillers.', duration: '30 min' },
              { name: 'Laser Hair Reduction', slug: 'laser-hair', badge: 'POPULAR', desc: 'Diode laser tuned for Indian skin — near-painless, long-lasting hair reduction.', duration: '30–60 min' },
              { name: 'PRP Hair Restoration', slug: 'prp-hair', badge: 'HAIR', desc: 'Platelet-rich plasma to reduce hair fall, nourish follicles and boost density.', duration: '45 min' },
              { name: 'GFC Hair Therapy', slug: 'gfc-hair', badge: 'HAIR', desc: 'Growth-factor concentrate therapy for thinning hair, clinically proven regrowth.', duration: '45 min' },
            ].map((t, i) => (
              <Link
                key={i}
                href={`/treatments/${t.slug}`}
                className="card-hover reveal"
                style={{ '--d': `${i * 50}ms`, textDecoration: 'none', display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 20, overflow: 'hidden', border: '1.5px solid rgba(84,50,19,0.1)', boxShadow: '0 2px 12px rgba(84,50,19,0.06)' }}
              >
                <div style={{ height: 252, background: '#e8d4be', flexShrink: 0, position: 'relative' }}>
                  {treatmentImageMap.get(t.slug) ? (
                    <Image
                      src={urlFor(treatmentImageMap.get(t.slug)).width(363).height(252).fit('crop').url()}
                      alt={t.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 600px) 100vw, 363px"
                    />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(132,77,40,0.3)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    </div>
                  )}
                  {/* White pill badge */}
                  <div style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)', color: '#543213', fontSize: 9.5, fontWeight: 600, letterSpacing: '0.12em', padding: '4px 10px', borderRadius: 999 }}>{t.badge}</div>
                </div>

                {/* Body */}
                <div style={{ padding: '18px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontWeight: 600, fontSize: 15, color: 'var(--brown)', marginBottom: 8, lineHeight: 1.25 }}>{t.name}</h3>
                  <p style={{ fontSize: 12.5, fontWeight: 300, color: '#7a6858', lineHeight: 1.65, flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{t.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(84,50,19,0.08)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 300, color: '#7a6858' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7a6858" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      {t.duration}
                    </div>
                    {/* Pill button */}
                    <span style={{ fontSize: 12.5, fontWeight: 500, color: '#543213', background: '#f1d0b4', padding: '7px 16px', borderRadius: 999 }}>Explore →</span>
                  </div>
                </div>
              </Link>
            ))}
            <Link href="/treatments" className="card-hover reveal" style={{ '--d': '500ms', textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: '#543213', borderRadius: 20, overflow: 'hidden', minHeight: 280, padding: '28px 24px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 20, left: 20, fontSize: 10.5, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#feb847' }}>15 TREATMENTS</div>
              <h3 style={{ fontWeight: 400, fontSize: 22, color: '#efdfc8', fontStyle: 'italic', lineHeight: 1.2, marginBottom: 20 }}>Explore the full menu</h3>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#efdfc8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* BROWSE BY CONCERN */}
      <section style={{ padding: '72px 20px', background: '#efdfc8' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <span className="eyebrow">{page?.concernsSection?.eyebrow || 'Browse by Concern'}</span>
              <h2 style={{ fontWeight: 500, color: 'var(--text)', margin: 0 }}>{page?.concernsSection?.heading || 'New & popular concerns'}</h2>
            </div>
            <Link href="/concerns" style={{ fontSize: 13, fontWeight: 400, color: '#543213', textDecoration: 'none' }}>See all concerns →</Link>
          </div>
          <div className="grid-3">
            {[
              { cat: 'Skin & Face', slug: '/concerns', items: [
                { name: 'Acne & Breakouts', count: 5, slug: 'acne' },
                { name: 'Acne Scars', count: 4, slug: 'acne-scars' },
                { name: 'Pigmentation', count: 4, slug: 'pigmentation' },
              ]},
              { cat: 'Hair & Scalp', slug: '/concerns', items: [
                { name: 'Hair Fall & Thinning', count: 4, slug: 'hair-fall' },
                { name: 'Hair Regrowth', count: 3, slug: 'hair-regrowth' },
                { name: 'Unwanted Body Hair', count: 2, slug: 'unwanted-hair' },
              ]},
              { cat: 'Anti-Ageing', slug: '/concerns', items: [
                { name: 'Wrinkles & Fine Lines', count: 3, slug: 'wrinkles' },
                { name: 'Volume Loss', count: 2, slug: 'volume-loss' },
                { name: 'Sagging & Laxity', count: 3, slug: 'sagging' },
              ]},
            ].map((col, ci) => ({ ...col, items: col.items.map(concernCard) })).map((col, ci) => (
              <div key={ci} className="reveal" style={{ '--d': `${ci * 100}ms` }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, paddingBottom: 12, borderBottom: '1.5px solid rgba(26,17,9,0.1)' }}>
                  <h3 style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)', margin: 0 }}>{col.cat}</h3>
                  <Link href="/concerns" style={{ fontSize: 12, color: '#7a6858', textDecoration: 'none' }}>→</Link>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {col.items.map((item, ii) => (
                    <Link key={ii} href={`/concerns/${item.slug}`} className="card-hover" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#fff', borderRadius: 12, border: '1.5px solid rgba(84,50,19,0.08)', minHeight: 68 }}>
                      <div style={{ width: 42, height: 42, borderRadius: 10, background: item.iconBg || '#f1d0b4', flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
                        {item.image ? (
                          <Image
                            src={urlFor(item.image).width(120).height(120).fit('crop').url()}
                            alt=""
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="42px"
                          />
                        ) : (
                          <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(132,77,40,0.16))' }} />
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 400, color: 'var(--text)' }}>{item.name}</div>
                        <div style={{ fontSize: 11.5, fontWeight: 300, color: '#7a6858', marginTop: 2 }}>{item.count} treatments</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRENT OFFERS */}
      <section style={{ padding: '72px 20px', background: '#f1d0b4' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="eyebrow">Offers & Promotions</span>
            <h2 style={{ fontWeight: 500, color: 'var(--text)', margin: 0 }}>Current offers</h2>
          </div>
          <div className="grid-2">
            {[
              { bg: '#543213', eyebrow: 'Monsoon Special', heading: '20% off Acne & Scar treatments', sub: 'Valid through July 2026. Book now to lock in the offer.', btnBg: '#feb847', btn: 'Claim offer →', delay: '0ms', subColor: '#c8b09a' },
              { bg: '#844d28', eyebrow: 'New Patient Offer', heading: 'Free consultation for first-timers', sub: 'New to Tvak? Your first dermatologist consultation is on us.', btnBg: '#feb847', btn: 'Book free consult →', delay: '100ms', subColor: '#e8d0b4' },
            ].map((o, i) => (
              <div key={i} className="reveal" style={{ '--d': o.delay, background: o.bg, borderRadius: 20, padding: '36px 32px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#feb847', marginBottom: 16 }}>{o.eyebrow}</div>
                <h3 style={{ fontWeight: 600, fontSize: 22, color: '#efdfc8', marginBottom: 10, lineHeight: 1.2 }}>{o.heading}</h3>
                <p style={{ fontSize: 13.5, fontWeight: 300, color: o.subColor, marginBottom: 28, lineHeight: 1.7 }}>{o.sub}</p>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: o.btnBg, color: '#543213', fontSize: 13, fontWeight: 500, padding: '11px 22px', borderRadius: 999, textDecoration: 'none' }}>{o.btn}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCTOR */}
      <section style={{ padding: '56px 20px' }}>
        <div className="reveal doctor-card-home" style={{ maxWidth: 980, margin: '0 auto', display: 'grid', gridTemplateColumns: '240px 1fr', gap: 28, alignItems: 'center', background: '#fff', borderRadius: 18, border: '1.5px solid rgba(84,50,19,0.08)', padding: 18, boxShadow: '0 14px 42px rgba(84,50,19,0.06)' }}>
          <div style={{ borderRadius: 14, overflow: 'hidden', background: '#e8d4be', aspectRatio: '4/5', position: 'relative' }}>
            {doctor?.photo && (
              <Image
                src={urlFor(doctor.photo).width(420).height(525).fit('crop').url()}
                alt={doctor.name || 'Dr. Omaima Jawed'}
                fill
                style={{ objectFit: 'cover', objectPosition: 'top center' }}
                sizes="(max-width: 768px) 100vw, 240px"
              />
            )}
          </div>
          <div style={{ padding: '8px 10px 8px 0' }}>
            <span className="eyebrow">Your Doctor</span>
            <h2 style={{ fontWeight: 500, color: 'var(--text)', marginBottom: 10, fontSize: 'clamp(22px,3vw,30px)' }}>{doctor?.name || 'Dr. Omaima Jawed'}</h2>
            <p style={{ fontSize: 12.5, fontWeight: 400, color: '#844d28', marginBottom: 12, letterSpacing: '0.04em' }}>
              {doctor?.credentials || 'MBBS'} · {doctor?.title || 'Aesthetic Physician'} · {doctor?.experience || 5} Years Experience
            </p>
            <p style={{ fontSize: 13.5, fontWeight: 300, color: '#7a6858', lineHeight: 1.7, marginBottom: 18, maxWidth: 560 }}>
              {doctor?.shortBio || 'Dr. Omaima completed her MBBS and trained in aesthetic dermatology at leading institutes. She personally leads every procedure — from your first consultation to each follow-up session.'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 20 }}>
              {['Acne & Scar Treatment', 'Laser Procedures', 'Hair Restoration', 'Anti-Ageing', 'Chemical Peels'].map((s, si) => (
                <span key={s} style={{ fontSize: 12, fontWeight: 400, color: '#543213', background: '#f1d0b4', padding: '5px 12px', borderRadius: 999, border: '1px solid rgba(84,50,19,0.15)', animation: `fadeUp 0.4s cubic-bezier(.22,.68,0,.99) ${si * 60 + 200}ms both` }}>{s}</span>
              ))}
            </div>
            <Link href="/doctor" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: '#efdfc8', background: '#543213', padding: '12px 26px', borderRadius: 999, textDecoration: 'none' }}>
              Full Profile →
            </Link>
          </div>
        </div>
      </section>

      {/* BEFORE & AFTER */}
      <section style={{ padding: '72px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 44, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <span className="eyebrow">Real Results</span>
              <h2 style={{ fontWeight: 500, color: 'var(--text)', margin: 0 }}>Before & After</h2>
            </div>
            <Link href="/before-after" style={{ fontSize: 13, fontWeight: 400, color: '#543213', textDecoration: 'none' }}>View all results →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {[
              { treatment: 'Acne Clearance Program', result: 'Active acne cleared in 6 sessions', weeks: '8 weeks', cat: 'Acne & Scars', slug: 'acne-clearance', accent: '#FFF0EE', dot: '#844d28' },
              { treatment: 'Acne Scar Revision MNRF', result: 'Pitted scars visibly reduced', weeks: '12 weeks', cat: 'Acne & Scars', slug: 'acne-scar-mnrf', accent: '#f1d0b4', dot: '#844d28' },
              { treatment: 'Melasma Treatment', result: 'Dark patches significantly faded', weeks: '10 weeks', cat: 'Pigmentation', slug: 'melasma', accent: '#EEF6FF', dot: '#6B9EC7' },
              { treatment: 'PRP Hair Restoration', result: 'Visible density improvement', weeks: '16 weeks', cat: 'Hair Restoration', slug: 'prp-hair', accent: '#EEFAF2', dot: '#2E7D52' },
            ].map((item, i) => (
              <Link key={i} href={`/treatments/${item.slug}`} className="card-hover reveal" style={{ '--d': `${i * 80}ms`, textDecoration: 'none', background: '#fff', borderRadius: 18, overflow: 'hidden', border: '1.5px solid rgba(26,17,9,0.08)' }}>
                <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', height: 200, background: '#f1d0b4' }}>
                  <div style={{ background: '#E2D8CE', display: 'flex', alignItems: 'flex-end', padding: '10px', justifyContent: 'flex-start' }}>
                    <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(255,255,255,0.85)', color: '#543213', padding: '4px 8px', borderRadius: 4 }}>Before</span>
                  </div>
                  <div style={{ background: '#D4C9BC', display: 'flex', alignItems: 'flex-end', padding: '10px', justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(84,50,19,0.85)', color: '#efdfc8', padding: '4px 8px', borderRadius: 4 }}>After</span>
                  </div>
                  <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: '#fff', transform: 'translateX(-50%)' }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 28, height: 28, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#543213" strokeWidth="2.5"><path d="M9 18l-6-6 6-6M15 6l6 6-6 6"/></svg>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', top: 12, left: 12, background: item.accent, borderRadius: 6, padding: '3px 9px' }}>
                    <span style={{ fontSize: 10, fontWeight: 500, color: item.dot, letterSpacing: '0.06em' }}>{item.cat}</span>
                  </div>
                </div>
                <div style={{ padding: '16px 18px 20px' }}>
                  <h3 style={{ fontWeight: 500, fontSize: 14, color: 'var(--text)', marginBottom: 6, lineHeight: 1.3 }}>{item.treatment}</h3>
                  <p style={{ fontSize: 13, fontWeight: 300, color: '#7a6858', marginBottom: 12, lineHeight: 1.55 }}>{item.result}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 11.5, fontWeight: 400, color: '#543213', background: '#f1d0b4', padding: '4px 10px', borderRadius: 999 }}>Results in {item.weeks}</span>
                    <span style={{ fontSize: 12, fontWeight: 500, color: '#844d28' }}>View →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: 12, fontWeight: 300, color: '#7a6858', marginTop: 28 }}>
            Individual results may vary. All procedures performed by Dr. Omaima Jawed, MBBS.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS — auto-scrolling carousel */}
      <section style={{ padding: '72px 20px', background: '#efdfc8' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="eyebrow">{page?.testimonials?.eyebrow || 'Patient Stories'}</span>
            <h2 style={{ fontWeight: 500, color: 'var(--text)' }}>{page?.testimonials?.heading || 'Real results, real people'}</h2>
          </div>
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </section>

      {/* FAQ — smooth animated accordion */}
      <section style={{ padding: '72px 20px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="eyebrow">{page?.faqs?.eyebrow || 'FAQ'}</span>
            <h2 style={{ fontWeight: 500, color: 'var(--text)' }}>{page?.faqs?.heading || 'Common questions'}</h2>
          </div>
          <AnimatedFAQ faqs={faqs} />
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: '64px 20px', background: '#543213' }}>
        <div className="reveal" style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 500, color: '#efdfc8', marginBottom: 12 }}>
            {page?.ctaBanner?.heading || 'Ready to correct, not just cover?'}
          </h2>
          <p style={{ fontSize: 14, fontWeight: 300, color: '#e8d0b4', marginBottom: 32 }}>
            {page?.ctaBanner?.subtext || 'Book a consultation with Dr. Omaima and get a personalised treatment plan.'}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ background: '#feb847', color: '#543213', fontSize: 13, fontWeight: 500, padding: '13px 32px', borderRadius: 999, textDecoration: 'none' }}>
              {page?.ctaBanner?.primaryCta || 'Book Appointment'}
            </Link>
            <a href="tel:09811997993" style={{ background: 'rgba(255,255,255,0.08)', color: '#efdfc8', fontSize: 13, fontWeight: 400, padding: '13px 32px', borderRadius: 999, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
              {page?.ctaBanner?.secondaryCta || 'Call 09811997993'}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
