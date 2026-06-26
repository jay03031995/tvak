import Link from 'next/link'
import { fetchDoctor } from '@/sanity/client'

export const revalidate = 60
export const metadata = { title: 'Dr. Omaima Jawed — Tvak & Asthi by Artham' }

export default async function DoctorPage() {
  const doctor = await fetchDoctor().catch(() => null)
  const d = doctor || {}

  return (
    <div style={{ background: 'var(--cream)' }}>
      <section style={{ padding: '60px 20px', background: 'linear-gradient(160deg,#F5EDE4,#FAF7F2)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '380px 1fr', gap: 60, alignItems: 'start' }}>
          <div style={{ borderRadius: 20, overflow: 'hidden', background: '#E8DED4', aspectRatio: '3/4' }} />
          <div>
            <span className="eyebrow">Your Doctor</span>
            <h1 style={{ fontWeight: 500, marginBottom: 8 }}>{d.name || 'Dr. Omaima Jawed'}</h1>
            <p style={{ fontSize: 13.5, fontWeight: 400, color: '#B8916A', marginBottom: 20, letterSpacing: '0.04em' }}>
              {d.credentials || 'MBBS'} · {d.title || 'Aesthetic Physician'} · {d.experience || 5} Years Experience
            </p>
            <p style={{ fontSize: 14, fontWeight: 300, color: '#4A3728', lineHeight: 1.85, marginBottom: 28, maxWidth: 540 }}>
              {d.shortBio || 'Dr. Omaima completed her MBBS and trained in aesthetic dermatology. She personally leads every procedure at Tvak & Asthi — from your first consultation to each follow-up session. Her approach combines clinical precision with a deep understanding of Indian skin types.'}
            </p>

            {(d.specialties || ['Acne & Scar Treatment', 'Laser Procedures', 'Hair Restoration', 'Anti-Ageing', 'Chemical Peels', 'Skin Boosters']).length > 0 && (
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9A8A7A', marginBottom: 12 }}>Specialties</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {(d.specialties || ['Acne & Scar Treatment', 'Laser Procedures', 'Hair Restoration', 'Anti-Ageing', 'Chemical Peels', 'Skin Boosters']).map((s, i) => (
                    <span key={i} style={{ fontSize: 12.5, fontWeight: 400, color: '#1A2744', background: '#EEF1F8', padding: '6px 14px', borderRadius: 999 }}>{s}</span>
                  ))}
                </div>
              </div>
            )}

            {d.education?.length > 0 && (
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9A8A7A', marginBottom: 14 }}>Education & Training</div>
                {d.education.map((e, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#B8916A', marginTop: 7, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 400, color: 'var(--text)' }}>{e.degree}</div>
                      <div style={{ fontSize: 12.5, fontWeight: 300, color: '#9A8A7A' }}>{e.institution}{e.year ? ` · ${e.year}` : ''}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/contact" style={{ background: '#1A2744', color: '#fff', fontSize: 13, fontWeight: 400, padding: '12px 26px', borderRadius: 999, textDecoration: 'none' }}>Book Consultation</Link>
              <a href="tel:09811997993" style={{ background: 'transparent', color: '#1A2744', fontSize: 13, fontWeight: 400, padding: '12px 26px', borderRadius: 999, border: '1.5px solid rgba(26,39,68,0.2)', textDecoration: 'none' }}>Call Clinic</a>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 20px', background: '#FAF7F2' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <span className="eyebrow">Stats</span>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 60, flexWrap: 'wrap', marginTop: 20 }}>
            {(d.stats || [
              { value: '5+', label: 'Years Experience' },
              { value: '500+', label: 'Patients Treated' },
              { value: '15+', label: 'Treatments Offered' },
              { value: '4.9', label: 'Google Rating' },
            ]).map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 500, color: '#1A2744', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12, fontWeight: 300, color: '#9A8A7A', marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
