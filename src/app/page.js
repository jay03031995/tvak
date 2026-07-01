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
     <section
  style={{
    padding: '32px 20px',
    minHeight: 'calc(100vh - 80px)',
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(160deg, #FAF7F2 55%, #F5EDE4)',
  }}
>
  <div style={{ maxWidth: 1180, margin: '0 auto' }} className="grid-hero">

    {/* Left Content */}
    <div className="au">

      <span className="eyebrow">
        Dermatology · Aesthetics · Trichology
      </span>

      <h1
        style={{
          fontWeight: 500,
          fontSize: 'clamp(30px,4vw,44px)',
          lineHeight: 1.08,
          letterSpacing: '-0.03em',
          marginBottom: 16,
          color: 'var(--text)',
        }}
      >
        {hero.headingLine1 || 'The difference between'}{' '}
        <em
          style={{
            fontStyle: 'italic',
            fontWeight: 400,
            color: '#4A6741',
          }}
        >
          {hero.headingItalic || 'covering concerns'}
        </em>{' '}
        {hero.headingLine2 || 'and'}{' '}
        <em
          style={{
            fontStyle: 'italic',
            fontWeight: 400,
            color: '#4A6741',
          }}
        >
          {hero.headingItalic2 || 'correcting them.'}
        </em>
      </h1>

      <p
        style={{
          fontSize: 14,
          fontWeight: 300,
          lineHeight: 1.75,
          color: '#4A3728',
          maxWidth: 430,
          marginBottom: 22,
        }}
      >
        {hero.subtext ||
          "Noida's MD-led aesthetic clinic. Evidence-based care for skin, hair and ageing concerns — always under Dr. Omaima's expert eye."}
      </p>

      <div
        style={{
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          marginBottom: 28,
        }}
      >
        <Link
          href="/contact"
          style={{
            background: '#1A1109',
            color: '#FAF7F2',
            fontSize: 13,
            fontWeight: 400,
            padding: '13px 28px',
            borderRadius: 999,
            textDecoration: 'none',
            transition: 'background .18s',
          }}
        >
          {hero.ctaPrimary || 'Book Consultation'}
        </Link>

        <Link
          href="/treatments"
          style={{
            background: 'transparent',
            color: '#1A1109',
            fontSize: 13,
            fontWeight: 400,
            padding: '13px 28px',
            borderRadius: 999,
            border: '1.5px solid rgba(26,17,9,0.2)',
            textDecoration: 'none',
          }}
        >
          {hero.ctaSecondary || 'Explore Treatments'}
        </Link>
      </div>

      <AnimatedStats stats={heroStats} />

    </div>

    {/* Right Images */}
    <div
      className="hero-imgs"
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10,
      }}
    >
      {[
        { img: page?.heroImage1, ratio: '4/5', cls: 'hi-1' },
        { img: page?.heroImage2, ratio: '1/1', cls: 'hi-2' },
        { img: page?.heroImage3, ratio: '1/1', cls: 'hi-3' },
        { img: page?.heroImage4, ratio: '4/5', cls: 'hi-4' },
      ].map(({ img, ratio, cls }, i) => (
        <div
          key={i}
          className={cls}
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            background: '#E8DED4',
            aspectRatio: ratio,
            position: 'relative',
          }}
        >
          {img && (
            <Image
              src={urlFor(img).width(400).fit('crop').url()}
              alt=""
              fill
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
      ))}

      <div
        className="hb-1"
        style={{
          position: 'absolute',
          bottom: 10,
          left: -10,
          background: '#fff',
          borderRadius: 999,
          padding: '9px 16px',
          boxShadow: '0 4px 20px rgba(26,17,9,0.10)',
          fontSize: 12,
          fontWeight: 400,
        }}
      >
        Doctor-led every session
      </div>

      <div
        className="hb-2"
        style={{
          position: 'absolute',
          top: 10,
          right: -10,
          background: '#fff',
          borderRadius: 999,
          padding: '9px 16px',
          boxShadow: '0 4px 20px rgba(26,17,9,0.10)',
          fontSize: 12,
          fontWeight: 400,
        }}
      >
        US-FDA cleared devices
      </div>
    </div>

  </div>
</section>

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
            <Link href="/treatments" style={{ fontSize: 13, fontWeight: 400, color: '#1A2744', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>View all treatments →</Link>
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
                style={{ '--d': `${i * 50}ms`, textDecoration: 'none', display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1.5px solid rgba(26,17,9,0.08)' }}
              >
                <div style={{ height: 252, background: '#F0E8DF', flexShrink: 0, position: 'relative' }}>
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
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(184,145,106,0.4)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    </div>
                  )}
                  <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(26,17,9,0.78)', color: '#FAF7F2', fontSize: 9.5, fontWeight: 500, letterSpacing: '0.1em', padding: '3px 8px', borderRadius: 999 }}>{t.badge}</div>
                </div>
                <div style={{ padding: '16px 18px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontWeight: 500, fontSize: 14.5, color: 'var(--text)', marginBottom: 7, lineHeight: 1.3 }}>{t.name}</h3>
                  <p style={{ fontSize: 12.5, fontWeight: 300, color: '#7A6A5A', lineHeight: 1.65, flex: 1 }}>{t.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(26,17,9,0.07)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 300, color: '#9A8A7A' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9A8A7A" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      {t.duration}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 400, color: '#1A2744', display: 'flex', alignItems: 'center', gap: 3 }}>Explore →</span>
                  </div>
                </div>
              </Link>
            ))}
            <Link href="/treatments" className="card-hover reveal" style={{ '--d': '500ms', textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: '#3B2210', borderRadius: 16, overflow: 'hidden', minHeight: 280, padding: '28px 24px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 20, left: 20, fontSize: 10.5, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#B8916A' }}>15 TREATMENTS</div>
              <h3 style={{ fontWeight: 400, fontSize: 22, color: '#FAF7F2', fontStyle: 'italic', lineHeight: 1.2, marginBottom: 20 }}>Explore the full menu</h3>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* BROWSE BY CONCERN */}
      <section style={{ padding: '72px 20px', background: '#FAF7F2' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <span className="eyebrow">{page?.concernsSection?.eyebrow || 'Browse by Concern'}</span>
              <h2 style={{ fontWeight: 500, color: 'var(--text)', margin: 0 }}>{page?.concernsSection?.heading || 'New & popular concerns'}</h2>
            </div>
            <Link href="/concerns" style={{ fontSize: 13, fontWeight: 400, color: '#1A2744', textDecoration: 'none' }}>See all concerns →</Link>
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
                  <Link href="/concerns" style={{ fontSize: 12, color: '#9A8A7A', textDecoration: 'none' }}>→</Link>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {col.items.map((item, ii) => (
                    <Link key={ii} href={`/concerns/${item.slug}`} className="card-hover" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#fff', borderRadius: 12, border: '1.5px solid rgba(26,17,9,0.08)', minHeight: 68 }}>
                      <div style={{ width: 42, height: 42, borderRadius: 10, background: item.iconBg || '#F5EDE4', flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
                        {item.image ? (
                          <Image
                            src={urlFor(item.image).width(120).height(120).fit('crop').url()}
                            alt=""
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="42px"
                          />
                        ) : (
                          <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(184,145,106,0.16))' }} />
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 400, color: 'var(--text)' }}>{item.name}</div>
                        <div style={{ fontSize: 11.5, fontWeight: 300, color: '#9A8A7A', marginTop: 2 }}>{item.count} treatments</div>
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
      <section style={{ padding: '72px 20px', background: '#F5EDE4' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="eyebrow">Offers & Promotions</span>
            <h2 style={{ fontWeight: 500, color: 'var(--text)', margin: 0 }}>Current offers</h2>
          </div>
          <div className="grid-2">
            {[
              { bg: '#1A2744', eyebrow: 'Monsoon Special', heading: '20% off Acne & Scar treatments', sub: 'Valid through July 2026. Book now to lock in the offer.', btnBg: '#B8916A', btn: 'Claim offer →', delay: '0ms', subColor: '#A0B4C8' },
              { bg: '#3B2210', eyebrow: 'New Patient Offer', heading: 'Free consultation for first-timers', sub: 'New to Tvak? Your first dermatologist consultation is on us.', btnBg: '#C4847E', btn: 'Book free consult →', delay: '100ms', subColor: '#C4A998' },
            ].map((o, i) => (
              <div key={i} className="reveal" style={{ '--d': o.delay, background: o.bg, borderRadius: 20, padding: '36px 32px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                <div style={{ fontSize: 10.5, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#B8916A', marginBottom: 16 }}>{o.eyebrow}</div>
                <h3 style={{ fontWeight: 500, fontSize: 22, color: '#FAF7F2', marginBottom: 10, lineHeight: 1.2 }}>{o.heading}</h3>
                <p style={{ fontSize: 13.5, fontWeight: 300, color: o.subColor, marginBottom: 28, lineHeight: 1.7 }}>{o.sub}</p>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: o.btnBg, color: '#fff', fontSize: 13, fontWeight: 400, padding: '11px 22px', borderRadius: 999, textDecoration: 'none' }}>{o.btn}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCTOR */}
      <section style={{ padding: '56px 20px' }}>
        <div className="reveal doctor-card-home" style={{ maxWidth: 980, margin: '0 auto', display: 'grid', gridTemplateColumns: '240px 1fr', gap: 28, alignItems: 'center', background: '#fff', borderRadius: 18, border: '1.5px solid rgba(26,17,9,0.08)', padding: 18, boxShadow: '0 14px 42px rgba(26,17,9,0.06)' }}>
          <div style={{ borderRadius: 14, overflow: 'hidden', background: '#E8DED4', aspectRatio: '4/5', position: 'relative' }}>
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
            <p style={{ fontSize: 12.5, fontWeight: 400, color: '#B8916A', marginBottom: 12, letterSpacing: '0.04em' }}>
              {doctor?.credentials || 'MBBS'} · {doctor?.title || 'Aesthetic Physician'} · {doctor?.experience || 5} Years Experience
            </p>
            <p style={{ fontSize: 13.5, fontWeight: 300, color: '#4A3728', lineHeight: 1.7, marginBottom: 18, maxWidth: 560 }}>
              {doctor?.shortBio || 'Dr. Omaima completed her MBBS and trained in aesthetic dermatology at leading institutes. She personally leads every procedure — from your first consultation to each follow-up session.'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 20 }}>
              {['Acne & Scar Treatment', 'Laser Procedures', 'Hair Restoration', 'Anti-Ageing', 'Chemical Peels'].map((s, si) => (
                <span key={s} style={{ fontSize: 11.5, fontWeight: 400, color: '#4A3728', background: '#F5EDE4', padding: '5px 11px', borderRadius: 999, border: '1px solid rgba(26,17,9,0.1)', animation: `fadeUp 0.4s cubic-bezier(.22,.68,0,.99) ${si * 60 + 200}ms both` }}>{s}</span>
              ))}
            </div>
            <Link href="/doctor" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 400, color: '#fff', background: '#1A2744', padding: '11px 24px', borderRadius: 999, textDecoration: 'none' }}>
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
            <Link href="/before-after" style={{ fontSize: 13, fontWeight: 400, color: '#1A2744', textDecoration: 'none' }}>View all results →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {[
              { treatment: 'Acne Clearance Program', result: 'Active acne cleared in 6 sessions', weeks: '8 weeks', cat: 'Acne & Scars', slug: 'acne-clearance', accent: '#FFF0EE', dot: '#C4847E' },
              { treatment: 'Acne Scar Revision MNRF', result: 'Pitted scars visibly reduced', weeks: '12 weeks', cat: 'Acne & Scars', slug: 'acne-scar-mnrf', accent: '#F5EDE4', dot: '#B8916A' },
              { treatment: 'Melasma Treatment', result: 'Dark patches significantly faded', weeks: '10 weeks', cat: 'Pigmentation', slug: 'melasma', accent: '#EEF6FF', dot: '#6B9EC7' },
              { treatment: 'PRP Hair Restoration', result: 'Visible density improvement', weeks: '16 weeks', cat: 'Hair Restoration', slug: 'prp-hair', accent: '#EEFAF2', dot: '#2E7D52' },
            ].map((item, i) => (
              <Link key={i} href={`/treatments/${item.slug}`} className="card-hover reveal" style={{ '--d': `${i * 80}ms`, textDecoration: 'none', background: '#fff', borderRadius: 18, overflow: 'hidden', border: '1.5px solid rgba(26,17,9,0.08)' }}>
                <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', height: 200, background: '#F0E8DF' }}>
                  <div style={{ background: '#E2D8CE', display: 'flex', alignItems: 'flex-end', padding: '10px', justifyContent: 'flex-start' }}>
                    <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(255,255,255,0.85)', color: '#4A3728', padding: '4px 8px', borderRadius: 4 }}>Before</span>
                  </div>
                  <div style={{ background: '#D4C9BC', display: 'flex', alignItems: 'flex-end', padding: '10px', justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(26,39,68,0.8)', color: '#FAF7F2', padding: '4px 8px', borderRadius: 4 }}>After</span>
                  </div>
                  <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: '#fff', transform: 'translateX(-50%)' }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 28, height: 28, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4A3728" strokeWidth="2.5"><path d="M9 18l-6-6 6-6M15 6l6 6-6 6"/></svg>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', top: 12, left: 12, background: item.accent, borderRadius: 6, padding: '3px 9px' }}>
                    <span style={{ fontSize: 10, fontWeight: 500, color: item.dot, letterSpacing: '0.06em' }}>{item.cat}</span>
                  </div>
                </div>
                <div style={{ padding: '16px 18px 20px' }}>
                  <h3 style={{ fontWeight: 500, fontSize: 14, color: 'var(--text)', marginBottom: 6, lineHeight: 1.3 }}>{item.treatment}</h3>
                  <p style={{ fontSize: 13, fontWeight: 300, color: '#7A6A5A', marginBottom: 12, lineHeight: 1.55 }}>{item.result}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 11.5, fontWeight: 400, color: '#9A8A7A', background: '#F5EDE4', padding: '4px 10px', borderRadius: 999 }}>Results in {item.weeks}</span>
                    <span style={{ fontSize: 12, fontWeight: 400, color: '#1A2744' }}>View treatment →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: 12, fontWeight: 300, color: '#9A8A7A', marginTop: 28 }}>
            Individual results may vary. All procedures performed by Dr. Omaima Jawed, MBBS.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS — auto-scrolling carousel */}
      <section style={{ padding: '72px 20px', background: '#FAF7F2' }}>
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
      <section style={{ padding: '64px 20px', background: '#3B2210' }}>
        <div className="reveal" style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
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
