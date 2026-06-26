import Link from 'next/link'
import { fetchTreatments } from '@/sanity/client'

export const revalidate = 60
export const metadata = { title: 'Treatments — Tvak & Asthi by Artham' }

const CATEGORIES = ['All', 'Skin & Glow', 'Acne & Scars', 'Pigmentation', 'Anti-Ageing', 'Hair Restoration', 'Laser & Devices']

const FALLBACK = [
  { name: 'HydraFacial MD', slug: { current: 'hydrafacial-md' }, category: 'Skin & Glow', tagline: 'Deep cleanse, instant glow', rating: 4.9, reviewCount: 410 },
  { name: 'Carbon Laser Facial', slug: { current: 'carbon-laser-facial' }, category: 'Skin & Glow', tagline: 'Pore tightening & oil control', rating: 4.8, reviewCount: 320 },
  { name: 'Acne Clearance Program', slug: { current: 'acne-clearance' }, category: 'Acne & Scars', tagline: 'Root-cause acne treatment', rating: 4.9, reviewCount: 930 },
  { name: 'Acne Scar Revision MNRF', slug: { current: 'acne-scar-mnrf' }, category: 'Acne & Scars', tagline: 'Pitted & rolling scar correction', rating: 4.8, reviewCount: 540 },
  { name: 'Melasma Treatment', slug: { current: 'melasma' }, category: 'Pigmentation', tagline: 'Pigmentation & dark patch removal', rating: 4.8, reviewCount: 290 },
  { name: 'Anti-Wrinkle Botox', slug: { current: 'botox' }, category: 'Anti-Ageing', tagline: 'Expression line softening', rating: 4.9, reviewCount: 380 },
  { name: 'Dermal Fillers', slug: { current: 'fillers' }, category: 'Anti-Ageing', tagline: 'Volume restoration & contouring', rating: 4.8, reviewCount: 210 },
  { name: 'PRP Hair Restoration', slug: { current: 'prp-hair' }, category: 'Hair Restoration', tagline: 'Stimulate natural hair regrowth', rating: 4.8, reviewCount: 460 },
  { name: 'GFC Hair Therapy', slug: { current: 'gfc-hair' }, category: 'Hair Restoration', tagline: 'Next-gen growth factor therapy', rating: 4.9, reviewCount: 180 },
  { name: 'Laser Hair Reduction', slug: { current: 'laser-hair' }, category: 'Laser & Devices', tagline: 'Permanent hair reduction', rating: 4.8, reviewCount: 640 },
]

export default async function TreatmentsPage() {
  const treatments = await fetchTreatments().catch(() => FALLBACK)
  const list = treatments?.length ? treatments : FALLBACK

  return (
    <div style={{ background: 'var(--cream)' }}>
      <section style={{ padding: '52px 20px 44px', background: 'linear-gradient(180deg,#F5EDE4,#FAF7F2)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <span className="eyebrow">All Services</span>
          <h1 style={{ fontWeight: 500, marginBottom: 12 }}>Treatments</h1>
          <p style={{ fontSize: 14, fontWeight: 300, color: '#7A6A5A', maxWidth: 520 }}>Every procedure performed by Dr. Omaima. US-FDA cleared devices. Personalised to your skin.</p>
        </div>
      </section>

      <section style={{ padding: '36px 20px 72px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 36, flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <span key={cat} style={{ fontSize: 12.5, fontWeight: 400, padding: '7px 16px', borderRadius: 999, background: cat === 'All' ? '#1A2744' : '#fff', color: cat === 'All' ? '#fff' : '#4A3728', border: '1.5px solid rgba(26,17,9,0.1)', cursor: 'pointer' }}>
                {cat}
              </span>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {list.map((t, i) => (
              <Link key={i} href={`/treatments/${t.slug?.current || '#'}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1.5px solid rgba(26,17,9,0.09)', transition: 'transform .22s, box-shadow .22s' }}>
                <div style={{ height: 170, background: '#F0E8DF', flexShrink: 0 }} />
                <div style={{ padding: '18px 20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: 10.5, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B8916A', marginBottom: 6 }}>{t.category}</div>
                  <h3 style={{ fontWeight: 500, fontSize: 15, color: 'var(--text)', marginBottom: 7 }}>{t.name}</h3>
                  <p style={{ fontSize: 13, fontWeight: 300, color: '#7A6A5A', lineHeight: 1.65, flex: 1 }}>{t.tagline}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, paddingTop: 12, borderTop: '1px solid rgba(26,17,9,0.07)', marginTop: 14 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FBBC04"><path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7Z"/></svg>
                    <span style={{ fontSize: 12.5, fontWeight: 400, color: '#4A3728' }}>{t.rating}</span>
                    <span style={{ fontSize: 12.5, fontWeight: 300, color: '#9A8A7A' }}>· {t.reviewCount} reviews</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
