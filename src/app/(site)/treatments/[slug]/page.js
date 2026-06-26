import Link from 'next/link'
import { fetchTreatment, fetchTreatments } from '@/sanity/client'

export const revalidate = 60

export async function generateStaticParams() {
  const treatments = await fetchTreatments().catch(() => [])
  return treatments.map(t => ({ slug: t.slug?.current }))
}

export async function generateMetadata({ params }) {
  const t = await fetchTreatment(params.slug).catch(() => null)
  return { title: t ? `${t.name} — Tvak & Asthi` : 'Treatment — Tvak & Asthi' }
}

export default async function TreatmentPage({ params }) {
  const treatment = await fetchTreatment(params.slug).catch(() => null)
  const t = treatment || { name: 'Treatment', category: 'Skin & Glow', description: '', meta: {}, howItWorks: [], faqs: [] }

  return (
    <div style={{ background: 'var(--cream)' }}>
      <section style={{ padding: '44px 20px 36px', background: 'linear-gradient(180deg,#F5EDE4,#FAF7F2)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ fontSize: 12.5, color: '#9A8A7A', fontWeight: 300, marginBottom: 20, display: 'flex', gap: 6 }}>
            <Link href="/" style={{ color: '#9A8A7A' }}>Home</Link><span>/</span>
            <Link href="/treatments" style={{ color: '#9A8A7A' }}>Treatments</Link><span>/</span>
            <span style={{ color: 'var(--text)', fontWeight: 400 }}>{t.name}</span>
          </div>
          <span className="eyebrow">{t.category}</span>
          <h1 style={{ fontWeight: 500, marginBottom: 14 }}>{t.name}</h1>
          <p style={{ fontSize: 14.5, fontWeight: 300, color: '#4A3728', maxWidth: 600, lineHeight: 1.8 }}>{t.description || t.tagline}</p>
          {t.meta && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
              {Object.entries(t.meta).filter(([,v]) => v).map(([k, v]) => (
                <div key={k} style={{ background: '#fff', borderRadius: 10, padding: '10px 16px', border: '1.5px solid rgba(26,17,9,0.09)' }}>
                  <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B8916A' }}>{k}</div>
                  <div style={{ fontSize: 13.5, fontWeight: 400, color: 'var(--text)', marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {t.howItWorks?.length > 0 && (
        <section style={{ padding: '60px 20px', background: '#1A2744' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <span className="eyebrow" style={{ color: '#B8916A' }}>Process</span>
            <h2 style={{ fontWeight: 500, color: '#FAF7F2', marginBottom: 32 }}>How it works</h2>
            <div style={{ display: 'grid', gap: 14 }}>
              {t.howItWorks.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '20px', background: 'rgba(255,255,255,0.06)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ width: 32, height: 32, borderRadius: '50%', background: '#B8916A', color: '#fff', fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{step.step || i + 1}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#FAF7F2', marginBottom: 5 }}>{step.title}</div>
                    <div style={{ fontSize: 13, fontWeight: 300, color: '#C4A998', lineHeight: 1.65 }}>{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {t.faqs?.length > 0 && (
        <section style={{ padding: '64px 20px' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <h2 style={{ fontWeight: 500, marginBottom: 32 }}>Frequently asked questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {t.faqs.map((f, i) => (
                <details key={i} style={{ background: '#fff', borderRadius: 12, border: '1.5px solid rgba(26,17,9,0.09)', overflow: 'hidden' }}>
                  <summary style={{ padding: '18px 22px', fontSize: 14, fontWeight: 400, cursor: 'pointer', listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {f.question}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B8916A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </summary>
                  <p style={{ margin: 0, padding: '4px 22px 20px', fontSize: 13.5, fontWeight: 300, color: '#4A3728', lineHeight: 1.75 }}>{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ padding: '56px 20px', background: '#3B2210' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 500, color: '#FAF7F2', marginBottom: 10 }}>Book your {t.name} session</h2>
          <p style={{ fontSize: 13.5, fontWeight: 300, color: '#C4A998', marginBottom: 28 }}>Speak with Dr. Omaima to understand if this treatment is right for your skin.</p>
          <Link href="/contact" style={{ background: '#C4847E', color: '#fff', fontSize: 13, fontWeight: 400, padding: '13px 32px', borderRadius: 999, textDecoration: 'none' }}>
            Book Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
