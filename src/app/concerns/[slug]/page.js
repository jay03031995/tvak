import Link from 'next/link'
import { fetchConcern } from '@/sanity/client'

export const revalidate = 60

export default async function ConcernPage({ params }) {
  const concern = await fetchConcern(params.slug).catch(() => null)
  const c = concern || { name: 'Concern', category: 'Skin & Face', description: '', tags: [], treatments: [], approach: [] }

  return (
    <div style={{ background: 'var(--cream)' }}>
      <section style={{ padding: '44px 20px 36px', background: 'linear-gradient(180deg,#F5EDE4,#FAF7F2)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ fontSize: 12.5, color: '#9A8A7A', fontWeight: 300, marginBottom: 20, display: 'flex', gap: 6 }}>
            <Link href="/" style={{ color: '#9A8A7A' }}>Home</Link><span>/</span>
            <Link href="/concerns" style={{ color: '#9A8A7A' }}>Concerns</Link><span>/</span>
            <span style={{ color: 'var(--text)', fontWeight: 400 }}>{c.name}</span>
          </div>
          <span className="eyebrow">{c.category}</span>
          <h1 style={{ fontWeight: 500, marginBottom: 14 }}>{c.name}</h1>
          <p style={{ fontSize: 14.5, fontWeight: 300, color: '#4A3728', maxWidth: 600, lineHeight: 1.8 }}>{c.description}</p>
          {c.tags?.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
              {c.tags.map((tag, i) => (
                <span key={i} style={{ fontSize: 12, fontWeight: 400, color: '#4A3728', background: '#fff', padding: '5px 12px', borderRadius: 999, border: '1px solid rgba(26,17,9,0.12)' }}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      {c.treatments?.length > 0 && (
        <section style={{ padding: '56px 20px 64px' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            <h2 style={{ fontWeight: 500, marginBottom: 24 }}>Recommended treatments</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 18 }}>
              {c.treatments.map((t, i) => (
                <Link key={i} href={`/treatments/${t.slug?.current || '#'}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1.5px solid rgba(26,17,9,0.09)' }}>
                  <div style={{ height: 160, background: '#F0E8DF', flexShrink: 0 }} />
                  <div style={{ padding: '16px 18px 20px' }}>
                    <h3 style={{ fontWeight: 500, fontSize: 14.5, marginBottom: 6 }}>{t.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="#FBBC04"><path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7Z"/></svg>
                      <span style={{ fontSize: 12, fontWeight: 400 }}>{t.rating}</span>
                      <span style={{ fontSize: 12, fontWeight: 300, color: '#9A8A7A' }}>· {t.reviewCount} reviews</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {c.approach?.length > 0 && (
        <section style={{ padding: '56px 20px', background: '#1A2744' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontWeight: 500, color: '#FAF7F2', marginBottom: 28 }}>Our approach</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {c.approach.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, padding: '18px 20px', background: 'rgba(255,255,255,0.06)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ width: 30, height: 30, borderRadius: '50%', background: '#B8916A', color: '#fff', fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{step.step || i + 1}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#FAF7F2', marginBottom: 4 }}>{step.title}</div>
                    <div style={{ fontSize: 13, fontWeight: 300, color: '#C4A998', lineHeight: 1.65 }}>{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
