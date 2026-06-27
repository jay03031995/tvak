import Link from 'next/link'
import { fetchConcern, fetchConcerns } from '@/sanity/client'

export const revalidate = 60

export async function generateStaticParams() {
  const base = [
    'acne','acne-scars','pigmentation','dull-skin','pores',
    'hair-fall','dandruff','hair-regrowth','unwanted-hair',
    'wrinkles','sagging','volume-loss','dark-circles',
  ].map(slug => ({ slug }))
  try {
    const concerns = await fetchConcerns()
    const extra = concerns
      .map(c => c.slug?.current)
      .filter(s => s && !base.some(b => b.slug === s))
      .map(slug => ({ slug }))
    return [...base, ...extra]
  } catch {
    return base
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const c = await fetchConcern(slug).catch(() => null)
  return { title: c ? `${c.name} — Tvak & Asthi` : 'Concern — Tvak & Asthi' }
}

const FALLBACK_CONCERNS = {
  'acne': {
    name: 'Acne & Breakouts', category: 'Skin & Face',
    description: 'Acne is a chronic skin condition caused by excess sebum, clogged pores, and bacterial overgrowth. It affects over 85% of people at some point in their lives and can leave lasting scars and emotional impact if not treated early. At Tvak & Asthi, Dr. Omaima addresses acne with a root-cause approach — not just surface-level treatments.',
    tags: ['Active breakouts', 'Whiteheads', 'Blackheads', 'Cystic acne', 'Hormonal acne', 'Back acne'],
    approach: [
      { step: 1, title: 'Diagnosis & Grading', description: 'Dr. Omaima assesses your acne type (comedonal, inflammatory, cystic), grade, and triggers including hormonal, dietary, and lifestyle factors.' },
      { step: 2, title: 'Medical Treatment Plan', description: 'A personalised combination of in-clinic procedures and prescription topicals is designed. Oral medications are prescribed where needed.' },
      { step: 3, title: 'In-Clinic Procedures', description: 'Chemical peels, blue light therapy, and comedone extraction are used to clear active breakouts and reduce sebum production.' },
      { step: 4, title: 'Long-Term Control', description: 'A maintenance protocol prevents relapse. Trigger identification ensures acne stays controlled even after the treatment course.' },
    ],
    treatments: [
      { name: 'Acne Clearance Program', slug: { current: 'acne-clearance' }, rating: 4.9, reviewCount: 930 },
      { name: 'Carbon Laser Facial', slug: { current: 'carbon-laser-facial' }, rating: 4.8, reviewCount: 320 },
      { name: 'HydraFacial MD', slug: { current: 'hydrafacial-md' }, rating: 4.9, reviewCount: 410 },
    ],
  },
  'acne-scars': {
    name: 'Acne Scars', category: 'Skin & Face',
    description: 'Acne scars form when inflamed acne lesions damage the dermis, causing either depressed (atrophic) or raised (hypertrophic) scars. Atrophic scars — including ice-pick, boxcar, and rolling types — are the most common in Indian skin and require specialised collagen-stimulating treatments to correct.',
    tags: ['Ice-pick scars', 'Boxcar scars', 'Rolling scars', 'Pitted skin', 'Post-acne marks', 'Uneven texture'],
    approach: [
      { step: 1, title: 'Scar Type Assessment', description: 'Dr. Omaima classifies your scar types and depth using the ECCA grading scale to design the most effective treatment combination.' },
      { step: 2, title: 'Collagen Remodelling', description: 'MNRF (Microneedling Radiofrequency) is used to deliver precise RF energy deep into the dermis, stimulating collagen production without surface damage.' },
      { step: 3, title: 'Surface Resurfacing', description: 'Fractional laser or chemical peels address superficial texture irregularities and post-inflammatory pigmentation.' },
      { step: 4, title: 'Combination Protocol', description: 'Depending on scar depth and type, a combination of MNRF, subcision, and TCA cross is used for comprehensive correction.' },
    ],
    treatments: [
      { name: 'Acne Scar Revision — MNRF', slug: { current: 'acne-scar-mnrf' }, rating: 4.8, reviewCount: 540 },
      { name: 'Carbon Laser Facial', slug: { current: 'carbon-laser-facial' }, rating: 4.8, reviewCount: 320 },
      { name: 'HydraFacial MD', slug: { current: 'hydrafacial-md' }, rating: 4.9, reviewCount: 410 },
    ],
  },
  'pigmentation': {
    name: 'Pigmentation & Melasma', category: 'Skin & Face',
    description: 'Pigmentation disorders including melasma, post-inflammatory hyperpigmentation (PIH), and sunspots affect a majority of Indian women and men. These conditions worsen with unprotected sun exposure and require a multi-modal approach combining laser treatments, peels, and strict photoprotection.',
    tags: ['Melasma', 'Dark patches', 'Sunspots', 'Post-acne marks', 'Uneven skin tone', 'Hyperpigmentation'],
    approach: [
      { step: 1, title: 'Pigmentation Mapping', description: 'A Wood\'s lamp examination and clinical assessment determines whether pigmentation is epidermal, dermal, or mixed — each requiring different treatment approaches.' },
      { step: 2, title: 'Laser Toning', description: 'Low-fluence Q-switched Nd:YAG laser breaks up melanin deposits without creating heat damage to surrounding skin — critical for darker Indian skin tones.' },
      { step: 3, title: 'Chemical Peels', description: 'Kojic acid, modified Jessner, or glycolic acid peels are used to accelerate cell turnover and fade pigmentation between laser sessions.' },
      { step: 4, title: 'Prescription Home Care', description: 'Prescription-strength depigmenting agents (hydroquinone-free where preferred) and broad-spectrum SPF 50 form the essential maintenance routine.' },
    ],
    treatments: [
      { name: 'Melasma Treatment', slug: { current: 'melasma' }, rating: 4.8, reviewCount: 290 },
      { name: 'Carbon Laser Facial', slug: { current: 'carbon-laser-facial' }, rating: 4.8, reviewCount: 320 },
      { name: 'HydraFacial MD', slug: { current: 'hydrafacial-md' }, rating: 4.9, reviewCount: 410 },
    ],
  },
  'dull-skin': {
    name: 'Dull & Dry Skin', category: 'Skin & Face',
    description: 'Dull skin lacks the luminosity and radiance of healthy skin due to dead cell buildup, dehydration, poor circulation, and environmental stressors. With the right combination of exfoliation, hydration, and antioxidant infusion, skin can regain its natural glow rapidly.',
    tags: ['Lack of glow', 'Rough texture', 'Dehydration', 'Uneven radiance', 'Tired-looking skin'],
    approach: [
      { step: 1, title: 'Skin Barrier Assessment', description: 'Dr. Omaima evaluates skin hydration levels, barrier integrity, and identifies dehydration vs. dryness (different conditions requiring different approaches).' },
      { step: 2, title: 'Deep Exfoliation', description: 'Dead cell buildup is cleared using enzymatic or chemical exfoliation to immediately reveal brighter skin beneath.' },
      { step: 3, title: 'Hydration Infusion', description: 'Hyaluronic acid and growth factor serums are infused into the skin to restore deep hydration and plumpness.' },
      { step: 4, title: 'Antioxidant Treatment', description: 'Vitamin C and antioxidant infusions brighten the complexion and protect against further environmental damage.' },
    ],
    treatments: [
      { name: 'HydraFacial MD', slug: { current: 'hydrafacial-md' }, rating: 4.9, reviewCount: 410 },
      { name: 'Carbon Laser Facial', slug: { current: 'carbon-laser-facial' }, rating: 4.8, reviewCount: 320 },
    ],
  },
  'pores': {
    name: 'Pores & Texture', category: 'Skin & Face',
    description: 'Enlarged pores and rough skin texture are common concerns in oily and combination skin types. They are caused by excess sebum, reduced collagen, and sun damage stretching pore walls. Targeted treatments can significantly tighten pores and smooth skin texture.',
    tags: ['Large pores', 'Rough texture', 'Oily skin', 'Orange-peel skin', 'Blackheads'],
    approach: [
      { step: 1, title: 'Pore Analysis', description: 'The cause of enlarged pores (sebum overproduction vs. collagen loss vs. sun damage) is identified to select the most effective treatment.' },
      { step: 2, title: 'Oil Regulation', description: 'Carbon laser and salicylic acid peels reduce sebum production and physically clear pore blockages.' },
      { step: 3, title: 'Collagen Stimulation', description: 'MNRF tightens pore walls by stimulating new collagen in the dermis surrounding each follicle.' },
      { step: 4, title: 'Maintenance', description: 'A retinoid-based home care routine maintains results and prevents sebum buildup between sessions.' },
    ],
    treatments: [
      { name: 'Carbon Laser Facial', slug: { current: 'carbon-laser-facial' }, rating: 4.8, reviewCount: 320 },
      { name: 'HydraFacial MD', slug: { current: 'hydrafacial-md' }, rating: 4.9, reviewCount: 410 },
      { name: 'Acne Scar Revision — MNRF', slug: { current: 'acne-scar-mnrf' }, rating: 4.8, reviewCount: 540 },
    ],
  },
  'hair-fall': {
    name: 'Hair Fall & Thinning', category: 'Hair & Scalp',
    description: 'Hair fall affecting more than 100 strands per day, or visible thinning of the hairline and crown, signals a medical condition that needs assessment. Androgenetic alopecia, stress-induced telogen effluvium, and nutritional deficiencies are the most common causes — each treatable with the right approach.',
    tags: ['Excessive hair fall', 'Thinning crown', 'Receding hairline', 'Postpartum hair loss', 'Diffuse thinning'],
    approach: [
      { step: 1, title: 'Trichoscopy & Blood Work', description: 'Dr. Omaima performs trichoscopy (scalp magnification) and orders relevant blood tests to identify the root cause of hair loss.' },
      { step: 2, title: 'Medical Management', description: 'Oral and topical medications (minoxidil, nutritional supplements) are prescribed to stabilise hair loss and support regrowth.' },
      { step: 3, title: 'Growth Factor Therapy', description: 'PRP or GFC injections into the scalp deliver concentrated growth factors directly to dormant follicles to stimulate reactivation.' },
      { step: 4, title: 'Scalp Health', description: 'Scalp treatments address dandruff, seborrhoea, or inflammation that may be contributing to hair loss.' },
    ],
    treatments: [
      { name: 'GFC Hair Therapy', slug: { current: 'gfc-hair' }, rating: 4.9, reviewCount: 180 },
      { name: 'PRP Hair Restoration', slug: { current: 'prp-hair' }, rating: 4.8, reviewCount: 460 },
    ],
  },
  'dandruff': {
    name: 'Dandruff & Scalp Issues', category: 'Hair & Scalp',
    description: 'Dandruff, seborrhoeic dermatitis, and scalp psoriasis cause flaking, itching, and inflammation that can accelerate hair loss if untreated. Medical-grade scalp treatments target the fungal and inflammatory triggers to restore a healthy scalp environment.',
    tags: ['Dandruff', 'Scalp itch', 'Flaking', 'Seborrhoeic dermatitis', 'Scalp inflammation'],
    approach: [
      { step: 1, title: 'Scalp Examination', description: 'Trichoscopy identifies whether the condition is dandruff, seborrhoeic dermatitis, or psoriasis — each requiring different treatment.' },
      { step: 2, title: 'Medical Scalp Treatment', description: 'Prescription-grade anti-fungal and anti-inflammatory scalp treatments are applied in-clinic for immediate relief.' },
      { step: 3, title: 'Home Regime', description: 'A medicated shampoo and scalp serum regime is prescribed to maintain results and prevent recurrence.' },
      { step: 4, title: 'Dietary Guidance', description: 'Dietary triggers including sugar, dairy, and processed foods are identified and managed to reduce seborrhoeic flare-ups.' },
    ],
    treatments: [
      { name: 'PRP Hair Restoration', slug: { current: 'prp-hair' }, rating: 4.8, reviewCount: 460 },
      { name: 'GFC Hair Therapy', slug: { current: 'gfc-hair' }, rating: 4.9, reviewCount: 180 },
    ],
  },
  'hair-regrowth': {
    name: 'Hair Regrowth', category: 'Hair & Scalp',
    description: 'For patients who have experienced hair loss and want to regrow hair in thinning areas, growth factor therapies combined with medical management offer the most effective results. Early intervention gives the best outcomes as follicles become permanently dormant over time.',
    tags: ['Regrow thinning areas', 'Crown density', 'Hairline restoration', 'Post-treatment regrowth'],
    approach: [
      { step: 1, title: 'Follicle Viability Assessment', description: 'Trichoscopy determines whether follicles in thinning areas are still active (miniaturised) or permanently dormant, setting realistic expectations.' },
      { step: 2, title: 'GFC / PRP Therapy', description: 'Growth factor therapies stimulate miniaturised follicles to produce thicker, longer hair through repeated treatment cycles.' },
      { step: 3, title: 'Oral Minoxidil Protocol', description: 'Low-dose oral minoxidil (prescribed by Dr. Omaima) significantly enhances regrowth results when combined with in-clinic treatment.' },
      { step: 4, title: 'Progress Monitoring', description: 'Standardised photographs and trichoscopy at each session track improvement objectively.' },
    ],
    treatments: [
      { name: 'GFC Hair Therapy', slug: { current: 'gfc-hair' }, rating: 4.9, reviewCount: 180 },
      { name: 'PRP Hair Restoration', slug: { current: 'prp-hair' }, rating: 4.8, reviewCount: 460 },
    ],
  },
  'unwanted-hair': {
    name: 'Unwanted Body Hair', category: 'Hair & Scalp',
    description: 'Unwanted hair on the face, underarms, legs, bikini area, or back can be permanently reduced with diode laser technology. Our laser is calibrated for Indian skin tones, making it safe and effective for Fitzpatrick III–V skin types.',
    tags: ['Facial hair', 'Underarms', 'Legs', 'Bikini area', 'Back and chest', 'Ingrown hairs'],
    approach: [
      { step: 1, title: 'Consultation & Skin Assessment', description: 'Dr. Omaima assesses your skin type, hair colour, and density to calibrate the laser parameters for safe and effective treatment.' },
      { step: 2, title: 'Patch Test', description: 'A patch test is performed 24–48 hours before the first full session to confirm skin tolerance.' },
      { step: 3, title: 'Laser Sessions', description: 'The treatment area is shaved and the diode laser is applied in a grid pattern. A built-in cooling system protects the skin throughout.' },
      { step: 4, title: 'Course Completion', description: '6–8 sessions spaced 4–6 weeks apart are required to catch hair in all growth phases for maximum permanent reduction.' },
    ],
    treatments: [
      { name: 'Laser Hair Reduction', slug: { current: 'laser-hair' }, rating: 4.8, reviewCount: 640 },
    ],
  },
  'wrinkles': {
    name: 'Wrinkles & Fine Lines', category: 'Anti-Ageing',
    description: 'Wrinkles and fine lines develop from repeated facial muscle movements, loss of collagen, and reduced skin elasticity. Dynamic wrinkles (expression lines) respond to Botox, while static wrinkles and skin laxity are best addressed with skin boosters and collagen-stimulating treatments.',
    tags: ['Forehead lines', 'Frown lines (11s)', 'Crow\'s feet', 'Smile lines', 'Lip lines', 'Neck lines'],
    approach: [
      { step: 1, title: 'Wrinkle Classification', description: 'Dr. Omaima distinguishes between dynamic wrinkles (caused by muscle movement) and static wrinkles (present at rest) as each requires a different treatment approach.' },
      { step: 2, title: 'Botulinum Toxin', description: 'Anti-wrinkle injections relax the muscles causing dynamic expression lines, smoothing the overlying skin without affecting natural expressions.' },
      { step: 3, title: 'Skin Boosters', description: 'Hyaluronic acid skin boosters are injected into the dermis to deeply hydrate and plump the skin, reducing the appearance of fine lines.' },
      { step: 4, title: 'Maintenance', description: 'Botox treatments are maintained every 4–6 months. A prescription retinoid routine slows new wrinkle formation.' },
    ],
    treatments: [
      { name: 'Anti-Wrinkle Botox', slug: { current: 'botox' }, rating: 4.9, reviewCount: 380 },
      { name: 'Dermal Fillers', slug: { current: 'fillers' }, rating: 4.8, reviewCount: 210 },
    ],
  },
  'sagging': {
    name: 'Sagging & Laxity', category: 'Anti-Ageing',
    description: 'Skin laxity and sagging result from collagen breakdown, loss of facial fat, and gravitational changes over time. Non-surgical skin tightening treatments can lift and firm the skin, delaying the need for surgical intervention.',
    tags: ['Jowls', 'Loose neck skin', 'Sagging cheeks', 'Nasolabial folds', 'Drooping brows'],
    approach: [
      { step: 1, title: 'Laxity Assessment', description: 'Dr. Omaima assesses the degree of laxity, facial fat compartment changes, and bone structure to design the most effective non-surgical lifting plan.' },
      { step: 2, title: 'Volume Restoration', description: 'Strategic filler placement in the cheeks, temples, and jawline restores facial scaffolding, providing a natural lifting effect.' },
      { step: 3, title: 'Skin Tightening', description: 'MNRF or radiofrequency microneedling tightens loose skin by stimulating new collagen and elastin in the deeper dermal layers.' },
      { step: 4, title: 'Maintenance', description: 'Annual filler touch-ups and 6-monthly RF treatments maintain the lifting result over time.' },
    ],
    treatments: [
      { name: 'Dermal Fillers', slug: { current: 'fillers' }, rating: 4.8, reviewCount: 210 },
      { name: 'Acne Scar Revision — MNRF', slug: { current: 'acne-scar-mnrf' }, rating: 4.8, reviewCount: 540 },
    ],
  },
  'volume-loss': {
    name: 'Volume Loss', category: 'Anti-Ageing',
    description: 'Facial volume loss creates a gaunt, tired, or aged appearance — affecting the cheeks, temples, under-eyes, and lips. Hyaluronic acid fillers, when placed correctly, restore youthful facial contours without an overdone appearance.',
    tags: ['Hollow cheeks', 'Sunken temples', 'Under-eye hollows', 'Thin lips', 'Lost facial structure'],
    approach: [
      { step: 1, title: 'Facial Analysis', description: 'Dr. Omaima uses a facial thirds and proportions analysis to identify exactly where volume loss is creating an aged appearance.' },
      { step: 2, title: 'Treatment Planning', description: 'A bespoke treatment plan is designed — usually starting with the cheeks (mid-face) as restoring this structure lifts the lower face naturally.' },
      { step: 3, title: 'Filler Placement', description: 'Premium FDA-approved hyaluronic acid fillers are placed at the correct anatomical planes using advanced injection techniques.' },
      { step: 4, title: 'Review & Refinement', description: 'A 4-week review ensures symmetry and natural result. Refinements are made as needed at no extra cost.' },
    ],
    treatments: [
      { name: 'Dermal Fillers', slug: { current: 'fillers' }, rating: 4.8, reviewCount: 210 },
      { name: 'Anti-Wrinkle Botox', slug: { current: 'botox' }, rating: 4.9, reviewCount: 380 },
    ],
  },
  'dark-circles': {
    name: 'Dark Circles & Eye Area', category: 'Anti-Ageing',
    description: 'Dark circles under the eyes can be caused by volume loss creating hollows (tear trough deformity), pigmentation, thin skin showing underlying vasculature, or a combination of all three. Treatment must address the correct underlying cause to be effective.',
    tags: ['Dark circles', 'Hollow under-eyes', 'Eye bags', 'Tired appearance', 'Tear trough hollows'],
    approach: [
      { step: 1, title: 'Cause Identification', description: 'Dr. Omaima identifies whether dark circles are due to hollow tear troughs, pigmentation, or visible blood vessels — each requiring a different approach.' },
      { step: 2, title: 'Tear Trough Fillers', description: 'For hollow under-eyes, a small amount of soft hyaluronic acid filler is placed in the tear trough using a cannula for safety and precision.' },
      { step: 3, title: 'Pigmentation Treatment', description: 'For pigment-based dark circles, Q-switched laser and skin-lightening prescriptions are used.' },
      { step: 4, title: 'Skincare Support', description: 'Topical vitamin C, retinol, and peptide eye creams are prescribed to support and maintain results.' },
    ],
    treatments: [
      { name: 'Dermal Fillers', slug: { current: 'fillers' }, rating: 4.8, reviewCount: 210 },
      { name: 'Melasma Treatment', slug: { current: 'melasma' }, rating: 4.8, reviewCount: 290 },
    ],
  },
}

export default async function ConcernPage({ params }) {
  const { slug } = await params
  const concern = await fetchConcern(slug).catch(() => null)
  const c = concern || FALLBACK_CONCERNS[slug] || {
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, ch => ch.toUpperCase()),
    category: 'Skin & Face', description: 'Our doctor-led approach addresses this concern with a personalised treatment plan.',
    tags: [], approach: [], treatments: [],
  }

  return (
    <div style={{ background: 'var(--cream)' }}>
      {/* HERO */}
      <section style={{ padding: '44px 20px 36px', background: 'linear-gradient(180deg,#F5EDE4,#FAF7F2)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ fontSize: 12.5, color: '#9A8A7A', fontWeight: 300, marginBottom: 20, display: 'flex', gap: 6 }}>
            <Link href="/" style={{ color: '#9A8A7A' }}>Home</Link><span>/</span>
            <Link href="/concerns" style={{ color: '#9A8A7A' }}>Concerns</Link><span>/</span>
            <span style={{ color: 'var(--text)', fontWeight: 400 }}>{c.name}</span>
          </div>
          <span className="eyebrow">{c.category}</span>
          <h1 style={{ fontWeight: 500, marginBottom: 14 }}>{c.name}</h1>
          <p style={{ fontSize: 14.5, fontWeight: 300, color: '#4A3728', maxWidth: 640, lineHeight: 1.85 }}>{c.description}</p>
          {c.tags?.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 22 }}>
              {c.tags.map((tag, i) => (
                <span key={i} style={{ fontSize: 12.5, fontWeight: 400, color: '#4A3728', background: '#fff', padding: '5px 13px', borderRadius: 999, border: '1px solid rgba(26,17,9,0.12)' }}>{tag}</span>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ background: '#1A2744', color: '#fff', fontSize: 13, fontWeight: 400, padding: '12px 26px', borderRadius: 999, textDecoration: 'none' }}>Book Consultation</Link>
            <a href="tel:09811997993" style={{ background: 'transparent', color: '#1A2744', fontSize: 13, fontWeight: 400, padding: '12px 26px', borderRadius: 999, border: '1.5px solid rgba(26,39,68,0.2)', textDecoration: 'none' }}>Call 098119 97993</a>
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      {c.approach?.length > 0 && (
        <section style={{ padding: '64px 20px', background: '#1A2744' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <span className="eyebrow" style={{ color: '#B8916A' }}>How We Treat It</span>
            <h2 style={{ fontWeight: 500, color: '#FAF7F2', marginBottom: 36 }}>Our approach</h2>
            <div style={{ display: 'grid', gap: 14 }}>
              {c.approach.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '22px', background: 'rgba(255,255,255,0.06)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ width: 34, height: 34, borderRadius: '50%', background: '#B8916A', color: '#fff', fontSize: 13.5, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{step.step || i + 1}</span>
                  <div>
                    <div style={{ fontSize: 14.5, fontWeight: 500, color: '#FAF7F2', marginBottom: 6 }}>{step.title}</div>
                    <div style={{ fontSize: 13.5, fontWeight: 300, color: '#C4A998', lineHeight: 1.7 }}>{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RECOMMENDED TREATMENTS */}
      {c.treatments?.length > 0 && (
        <section style={{ padding: '64px 20px' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            <span className="eyebrow">Treatments</span>
            <h2 style={{ fontWeight: 500, marginBottom: 32 }}>Recommended treatments</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
              {c.treatments.map((t, i) => (
                <Link key={i} href={`/treatments/${t.slug?.current || '#'}`} className="card-hover" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1.5px solid rgba(26,17,9,0.09)' }}>
                  <div style={{ height: 160, background: '#F0E8DF', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(184,145,106,0.5)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  </div>
                  <div style={{ padding: '18px 20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontWeight: 500, fontSize: 15, color: 'var(--text)', marginBottom: 10 }}>{t.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, paddingTop: 12, borderTop: '1px solid rgba(26,17,9,0.07)', marginTop: 'auto' }}>
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
      )}

      {/* CTA */}
      <section style={{ padding: '56px 20px', background: '#3B2210' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 500, color: '#FAF7F2', marginBottom: 10 }}>Concerned about {c.name}?</h2>
          <p style={{ fontSize: 13.5, fontWeight: 300, color: '#C4A998', marginBottom: 28 }}>Book a consultation with Dr. Omaima for a personalised treatment plan.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ background: '#C4847E', color: '#fff', fontSize: 13, fontWeight: 400, padding: '13px 32px', borderRadius: 999, textDecoration: 'none' }}>Book Consultation</Link>
            <a href="https://wa.me/919811997993" target="_blank" rel="noopener" style={{ background: 'rgba(255,255,255,0.1)', color: '#FAF7F2', fontSize: 13, fontWeight: 400, padding: '13px 32px', borderRadius: 999, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>WhatsApp Us</a>
          </div>
        </div>
      </section>
    </div>
  )
}
