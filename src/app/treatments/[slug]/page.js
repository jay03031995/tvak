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

const FALLBACK_TREATMENTS = {
  'hydrafacial-md': {
    name: 'HydraFacial MD', category: 'Skin & Glow', tagline: 'Deep cleanse, instant glow',
    description: 'HydraFacial MD is a patented multi-step treatment that cleanses, exfoliates, extracts impurities, and infuses the skin with potent serums — all in a single session. It is the only treatment that combines these actions without irritation, making it suitable for all skin types including sensitive skin.',
    meta: { Duration: '45–60 min', Sessions: '1 (or monthly)', Recovery: 'None', Results: 'Immediate' },
    howItWorks: [
      { step: 1, title: 'Cleanse & Peel', description: 'A gentle vortex tip removes dead skin and opens pores using a mild glycolic + salicylic acid blend.' },
      { step: 2, title: 'Acid Peel', description: 'Glycolic and salicylic acids loosen deep-seated debris without the irritation of traditional peels.' },
      { step: 3, title: 'Extract & Hydrate', description: 'Automated painless suction extracts clogged pores while delivering hyaluronic acid to plump the skin.' },
      { step: 4, title: 'Fuse & Protect', description: 'Antioxidants, peptides, and hyaluronic acid are infused under light pressure to lock in hydration and protect the skin barrier.' },
    ],
    benefits: ['Instant visible glow', 'Reduced pore size', 'Improved skin texture', 'Deeply hydrated skin', 'Reduced fine lines', 'Even skin tone'],
    faqs: [
      { question: 'Is HydraFacial suitable for sensitive skin?', answer: 'Yes. The serums are clinically formulated and the suction pressure is adjustable. Dr. Omaima customises the protocol for your skin type before each session.' },
      { question: 'How quickly will I see results?', answer: 'Results are visible immediately after the session. Most patients notice brighter, more hydrated skin the same evening.' },
      { question: 'How often should I get HydraFacial?', answer: 'Monthly sessions are recommended for maintenance. If you have a special event, a single session 3–5 days before is ideal.' },
      { question: 'Can I wear makeup after?', answer: 'Yes, but we recommend waiting at least 4–6 hours after the session to allow the serums to fully absorb.' },
    ],
  },
  'carbon-laser-facial': {
    name: 'Carbon Laser Facial', category: 'Skin & Glow', tagline: 'Pore tightening & oil control',
    description: 'The Carbon Laser Facial (also called the "Hollywood Peel") uses a layer of medical-grade activated carbon applied to the skin, then targeted with a Q-switched Nd:YAG laser. The laser vaporises the carbon along with oil, blackheads, and dead skin cells — leaving skin visibly clearer, tighter, and luminous.',
    meta: { Duration: '30–40 min', Sessions: '4–6 sessions', Recovery: 'None', Results: '1–2 weeks' },
    howItWorks: [
      { step: 1, title: 'Carbon Application', description: 'A thin, even layer of medical-grade carbon lotion is applied across the face and left to penetrate the pores for 10 minutes.' },
      { step: 2, title: 'Low-Fluence Laser Pass', description: 'A broad laser pass gently heats the carbon and skin beneath, stimulating collagen and closing large pores.' },
      { step: 3, title: 'High-Fluence Exfoliation', description: 'A second pass at higher intensity vaporises the carbon layer, instantly removing oil, blackheads and surface debris.' },
      { step: 4, title: 'Cooling & Moisturising', description: 'A calming serum and SPF are applied to soothe and protect the freshly treated skin.' },
    ],
    benefits: ['Reduced oiliness', 'Minimised pore appearance', 'Instant skin brightening', 'Reduced blackheads', 'Stimulates collagen', 'No downtime'],
    faqs: [
      { question: 'Does it hurt?', answer: 'Most patients describe it as a warm snapping sensation. The procedure is well-tolerated and no anaesthesia is needed.' },
      { question: 'Is it suitable for oily and acne-prone skin?', answer: 'Yes — it is one of the best treatments for oily skin. It reduces sebum production and clears congested pores over a course of sessions.' },
      { question: 'How many sessions will I need?', answer: 'We recommend 4–6 sessions spaced 2–4 weeks apart for optimal results. Maintenance sessions every 6–8 weeks thereafter.' },
      { question: 'Can darker skin tones get this treatment?', answer: 'Yes. Our Q-switched Nd:YAG laser is specifically calibrated for safer use on Fitzpatrick III–V skin types common in India.' },
    ],
  },
  'acne-clearance': {
    name: 'Acne Clearance Program', category: 'Acne & Scars', tagline: 'Root-cause acne treatment',
    description: 'Our Acne Clearance Program is a structured multi-session protocol that addresses the root causes of acne — excess sebum, bacteria, inflammation, and hormonal triggers. It combines clinical treatments with topical prescription protocols so results last beyond the treatment period.',
    meta: { Duration: '30–45 min / session', Sessions: '4–8 sessions', Recovery: 'Minimal', Results: '4–6 weeks' },
    howItWorks: [
      { step: 1, title: 'Skin Assessment & Diagnosis', description: 'Dr. Omaima examines your acne grade, skin type, and triggers — including hormonal and dietary factors — before designing a personalised plan.' },
      { step: 2, title: 'Chemical Peels', description: 'Salicylic acid or combination peels deeply exfoliate, unclog pores, and reduce active breakouts with each session.' },
      { step: 3, title: 'Blue Light / Laser Therapy', description: 'Anti-bacterial blue light or a low-fluence Nd:YAG laser destroys acne-causing bacteria deep within the follicles.' },
      { step: 4, title: 'Topical & Prescription Support', description: 'A customised home skincare protocol using prescription-strength actives is prescribed alongside the in-clinic treatment.' },
    ],
    benefits: ['Clears active breakouts', 'Prevents new acne', 'Reduces redness and inflammation', 'Addresses root cause', 'Prescription-backed plan', 'Suitable for all acne grades'],
    faqs: [
      { question: 'How long before I see a difference?', answer: 'Most patients see a reduction in active breakouts within 2–3 sessions. Skin clarity continues to improve over 4–6 weeks.' },
      { question: 'Will the acne come back?', answer: 'With our maintenance protocol and home skincare plan, recurrence is significantly reduced. Dr. Omaima will identify your specific triggers to keep acne controlled long-term.' },
      { question: 'Is it safe to do while using oral antibiotics or Accutane?', answer: 'This depends on the medications. Let us know your current medications at the consultation and Dr. Omaima will plan accordingly.' },
      { question: 'Can I wear makeup during the course?', answer: 'We recommend switching to non-comedogenic products during the program. Dr. Omaima will advise which products are safe to continue using.' },
    ],
  },
  'acne-scar-mnrf': {
    name: 'Acne Scar Revision — MNRF', category: 'Acne & Scars', tagline: 'Pitted & rolling scar correction',
    description: 'Microneedling Radiofrequency (MNRF) is the most effective treatment for atrophic acne scars including ice-pick, boxcar, and rolling scars. Insulated gold-plated microneedles deliver fractional RF energy precisely at the dermal layer, triggering intensive collagen remodelling without damaging the skin surface.',
    meta: { Duration: '60–75 min', Sessions: '3–5 sessions', Recovery: '2–3 days redness', Results: '4–6 weeks per session' },
    howItWorks: [
      { step: 1, title: 'Topical Anaesthesia', description: 'A numbing cream is applied 30–45 minutes before the procedure to ensure complete comfort throughout.' },
      { step: 2, title: 'MNRF Treatment Pass', description: 'An insulated microneedling device is passed across scarred areas, delivering radiofrequency energy at precise depths of 1.5–3.5mm.' },
      { step: 3, title: 'Collagen Induction', description: 'The combined mechanical and thermal injury triggers the body\'s wound-healing response — generating new collagen and elastin that fills scar depressions.' },
      { step: 4, title: 'Post-Treatment Care', description: 'A calming serum and strict SPF protocol are applied. Mild redness resolves within 24–72 hours.' },
    ],
    benefits: ['Reduces ice-pick, boxcar and rolling scars', 'Deep collagen remodelling', 'Minimal surface damage', 'Visible improvement from session 1', 'Safe for dark skin tones', 'Simultaneously tightens skin'],
    faqs: [
      { question: 'How many sessions will I need?', answer: 'Most patients require 3–5 sessions spaced 4–6 weeks apart. Deeper scars may need up to 6 sessions. Dr. Omaima will set realistic expectations at your consultation.' },
      { question: 'Is it painful?', answer: 'Topical anaesthetic is applied before the session. During treatment most patients feel slight pressure and warmth. Post-session redness typically resolves in 1–2 days.' },
      { question: 'What is the downtime?', answer: 'Redness and mild swelling resolve within 24–72 hours. You can resume work and daily activities the next day with SPF.' },
      { question: 'What types of scars respond best?', answer: 'Rolling and boxcar scars show the best improvement. Ice-pick scars improve too but may need additional treatments like TCA cross. Dr. Omaima will advise the best combination for your scar type.' },
    ],
  },
  'melasma': {
    name: 'Melasma Treatment', category: 'Pigmentation', tagline: 'Pigmentation & dark patch removal',
    description: 'Melasma causes dark, irregular patches on the face — typically triggered by sun exposure, hormonal changes, and genetics. Our protocol combines laser toning, chemical peels, and a medicated home care plan to fade patches and prevent relapse effectively.',
    meta: { Duration: '30–45 min / session', Sessions: '6–8 sessions', Recovery: 'None', Results: '6–8 weeks' },
    howItWorks: [
      { step: 1, title: 'Root Cause Assessment', description: 'Dr. Omaima evaluates your melasma pattern, depth (epidermal vs mixed), and hormonal history to design the most effective protocol.' },
      { step: 2, title: 'Laser Toning (Q-Switched Nd:YAG)', description: 'Low-fluence Q-switched laser passes break up melanin clusters in the epidermis without creating heat damage to surrounding skin.' },
      { step: 3, title: 'Chemical Peel Layer', description: 'A Kojic acid or modified Jessner peel is applied after the laser to accelerate cell turnover and brighten the skin.' },
      { step: 4, title: 'Prescription Maintenance', description: 'A medicated home regime with prescription-strength depigmenting agents and broad-spectrum SPF 50 is mandatory between sessions to prevent rebound.' },
    ],
    benefits: ['Fades dark patches', 'Prevents rebound pigmentation', 'Safe for Indian skin', 'Combines multiple modalities', 'Hormonal trigger management', 'Long-term maintenance plan'],
    faqs: [
      { question: 'Can melasma be completely cured?', answer: 'Melasma is a chronic condition that can be well-controlled but not permanently cured. With the right protocol and SPF discipline, patches can be almost invisible. Dr. Omaima will explain realistic expectations based on your type.' },
      { question: 'What makes Indian skin harder to treat?', answer: 'Darker skin (Fitzpatrick III–V) has more reactive melanocytes that can overproduce pigment if treatment is too aggressive. Our low-fluence approach avoids post-inflammatory hyperpigmentation.' },
      { question: 'Do I need to stop hormonal contraception?', answer: 'Hormonal contraception can worsen melasma. Dr. Omaima will discuss this during your consultation — sometimes a switch to non-hormonal options significantly helps.' },
      { question: 'How important is sunscreen?', answer: 'SPF is non-negotiable with melasma. Even brief UV exposure can undo weeks of treatment. We recommend SPF 50 every morning, reapplied every 2 hours when outdoors.' },
    ],
  },
  'botox': {
    name: 'Anti-Wrinkle Botox', category: 'Anti-Ageing', tagline: 'Expression line softening',
    description: 'Botulinum toxin (Botox) is the gold standard for softening dynamic wrinkles caused by repeated facial muscle movements — forehead lines, frown lines, and crow\'s feet. When administered by Dr. Omaima, results are natural and refreshed, never frozen.',
    meta: { Duration: '15–20 min', Sessions: '1 (every 4–6 months)', Recovery: 'None', Results: '3–5 days' },
    howItWorks: [
      { step: 1, title: 'Facial Mapping', description: 'Dr. Omaima assesses your facial anatomy, muscle movement patterns, and areas of concern to plan precise injection points.' },
      { step: 2, title: 'Micro-injections', description: 'Tiny amounts of botulinum toxin are injected into targeted muscles using ultra-fine needles. The procedure takes under 20 minutes.' },
      { step: 3, title: 'Muscle Relaxation', description: 'The toxin temporarily blocks the nerve signal to treated muscles, softening the overlying wrinkles without affecting surrounding muscles.' },
      { step: 4, title: 'Results & Review', description: 'Results appear in 3–5 days and peak at 2 weeks. A 2-week review is included to assess and touch up if needed.' },
    ],
    benefits: ['Softens forehead lines', 'Smoothes frown lines (11s)', 'Reduces crow\'s feet', 'Natural, refreshed result', 'No downtime', 'Preventive for younger patients'],
    faqs: [
      { question: 'Will it look natural?', answer: 'Yes — Dr. Omaima\'s technique preserves full natural expression while softening lines. The goal is to look refreshed, not frozen. Conservative dosing is always preferred and can be built up at your 2-week review.' },
      { question: 'Does it hurt?', answer: 'The needles used are ultra-fine and injection sites are small. Most patients describe it as tiny pinpricks. No anaesthetic is needed.' },
      { question: 'How long do results last?', answer: 'Results typically last 4–6 months. With regular treatments, muscles gradually weaken and results can last longer.' },
      { question: 'Who should avoid Botox?', answer: 'Botox is not recommended during pregnancy or breastfeeding, or if you have neuromuscular conditions. A full medical history is taken before any procedure.' },
    ],
  },
  'fillers': {
    name: 'Dermal Fillers', category: 'Anti-Ageing', tagline: 'Volume restoration & contouring',
    description: 'Dermal fillers are hyaluronic acid-based injectable gels that restore lost facial volume, smooth deep folds, and enhance natural contours. Dr. Omaima uses only premium FDA-approved fillers and precise anatomical injection techniques to create subtle, harmonious results.',
    meta: { Duration: '30–45 min', Sessions: '1 (every 9–18 months)', Recovery: '24–48 hrs mild swelling', Results: 'Immediate' },
    howItWorks: [
      { step: 1, title: 'Aesthetic Consultation', description: 'Dr. Omaima discusses your goals, analyses facial proportions, and advises on the most appropriate filler type and placement for a natural result.' },
      { step: 2, title: 'Topical Numbing', description: 'A numbing cream is applied. Most fillers also contain built-in lidocaine for added comfort.' },
      { step: 3, title: 'Precise Injection', description: 'Filler is injected at the correct anatomical plane using a needle or cannula, depending on the treatment area, to ensure safety and precision.' },
      { step: 4, title: 'Moulding & Review', description: 'The filler is gently moulded to ensure symmetry. A follow-up assessment is recommended at 2–4 weeks.' },
    ],
    benefits: ['Restores cheek volume', 'Fills nasolabial folds', 'Enhances lip shape', 'Softens under-eye hollows', 'Sharpens jawline', 'Immediate natural results'],
    faqs: [
      { question: 'Are fillers safe?', answer: 'When administered by a trained medical professional using FDA-approved products, dermal fillers are extremely safe. Dr. Omaima is an MBBS physician trained in facial anatomy and safe injection techniques.' },
      { question: 'How long do fillers last?', answer: 'Depending on the product and treatment area, results last 9–18 months. Cheeks and jawline last longer; lips and tear troughs metabolise faster.' },
      { question: 'Is it reversible?', answer: 'Yes — hyaluronic acid fillers can be dissolved at any time with a hyaluronidase injection if you are unhappy with results.' },
      { question: 'Can fillers be combined with Botox?', answer: 'Yes — combining Botox and fillers in a "liquid facelift" protocol is common and synergistic. Dr. Omaima will advise whether combination treatment makes sense for your goals.' },
    ],
  },
  'prp-hair': {
    name: 'PRP Hair Restoration', category: 'Hair Restoration', tagline: 'Stimulate natural hair regrowth',
    description: 'Platelet-Rich Plasma (PRP) therapy uses your own blood\'s growth factors to stimulate dormant hair follicles, increase hair density, and slow down hair loss. It is a safe, natural, and clinically proven treatment for androgenetic alopecia and diffuse thinning in both men and women.',
    meta: { Duration: '45–60 min / session', Sessions: '3–4 sessions (monthly)', Recovery: 'None', Results: '3–6 months' },
    howItWorks: [
      { step: 1, title: 'Blood Draw', description: 'A small blood sample (15–20 ml) is drawn from your arm — similar to a routine blood test.' },
      { step: 2, title: 'Centrifugation', description: 'The blood is placed in a centrifuge to separate the platelet-rich plasma from other blood components.' },
      { step: 3, title: 'Scalp Preparation', description: 'The scalp is cleaned and topical numbing cream is applied to the treatment areas to ensure comfort.' },
      { step: 4, title: 'PRP Injection', description: 'The concentrated PRP — rich in growth factors — is injected across the thinning areas to activate follicles and promote new hair growth.' },
    ],
    benefits: ['Reduces hair fall within 4–6 weeks', 'Increases hair density', 'Strengthens existing hair', '100% natural (autologous)', 'No downtime', 'Safe for men and women'],
    faqs: [
      { question: 'How soon will I see results?', answer: 'Hair loss reduction is usually noticeable within 4–6 weeks. Visible new hair growth typically appears at 3–4 months. Full results are assessed at 6 months.' },
      { question: 'How many sessions are needed?', answer: 'An initial course of 3–4 monthly sessions is recommended. Maintenance sessions every 4–6 months help sustain results.' },
      { question: 'Is it effective for advanced hair loss?', answer: 'PRP works best for early to moderate androgenetic alopecia. Completely bald areas with no follicular activity will not respond. Dr. Omaima will assess your hair loss grade.' },
      { question: 'Can PRP be combined with other treatments?', answer: 'Yes — PRP combined with GFC therapy gives superior results. It also complements oral minoxidil or finasteride if prescribed.' },
    ],
  },
  'gfc-hair': {
    name: 'GFC Hair Therapy', category: 'Hair Restoration', tagline: 'Next-gen growth factor therapy',
    description: 'Growth Factor Concentrate (GFC) is an advanced evolution of PRP that isolates and concentrates specific growth factors at 5–8x higher concentration. The result is a more potent stimulus for dormant follicles — making it the most effective injectable option for hair loss currently available.',
    meta: { Duration: '60 min / session', Sessions: '3 sessions (monthly)', Recovery: 'None', Results: '2–4 months' },
    howItWorks: [
      { step: 1, title: 'Blood Collection', description: 'Blood is drawn and placed into specialised GFC preparation tubes containing activation agents.' },
      { step: 2, title: 'GFC Preparation', description: 'Tubes are incubated for 30 minutes, allowing platelets to degranulate and release maximum growth factor concentration.' },
      { step: 3, title: 'Centrifugation', description: 'The sample is centrifuged to yield a highly concentrated, pure growth factor solution — 5–8x stronger than standard PRP.' },
      { step: 4, title: 'Scalp Injection', description: 'The GFC is injected across the thinning scalp using a mesotherapy technique for even distribution of growth factors to all affected follicles.' },
    ],
    benefits: ['5–8x stronger than PRP', 'Faster visible results', 'Greater hair density improvement', 'No red blood cells — less inflammation', 'Pure growth factor delivery', 'Fewer sessions needed'],
    faqs: [
      { question: 'How is GFC different from PRP?', answer: 'GFC uses a specialised preparation process that isolates pure growth factors at much higher concentrations. The absence of red blood cells also means less post-injection inflammation and discomfort.' },
      { question: 'Is GFC better than PRP?', answer: 'Clinical studies show GFC produces superior hair density improvement with fewer sessions. For patients who want the best possible outcome, GFC is our first recommendation.' },
      { question: 'How many sessions do I need?', answer: 'Three monthly sessions form the primary course. A maintenance session every 6 months is recommended thereafter.' },
      { question: 'Can GFC be combined with PRP?', answer: 'Some patients alternate between GFC primary sessions and PRP maintenance sessions as a cost-effective strategy. Dr. Omaima will advise based on your response and goals.' },
    ],
  },
  'laser-hair': {
    name: 'Laser Hair Reduction', category: 'Laser & Devices', tagline: 'Permanent hair reduction',
    description: 'Laser hair reduction uses concentrated light energy to target melanin in hair follicles, permanently damaging the follicle\'s ability to regrow hair. Our US-FDA cleared diode laser is calibrated for all skin tones including darker Indian skin types, delivering safe and effective results on the face and body.',
    meta: { Duration: '15–60 min (area-dependent)', Sessions: '6–8 sessions', Recovery: 'None', Results: 'Permanent reduction after full course' },
    howItWorks: [
      { step: 1, title: 'Consultation & Patch Test', description: 'Dr. Omaima assesses your skin type, hair colour, and density. A patch test is conducted 24–48 hours before the first full session.' },
      { step: 2, title: 'Shaving the Area', description: 'The treatment area is shaved before the session so laser energy is focused on the follicle below the skin, not the hair above.' },
      { step: 3, title: 'Laser Treatment', description: 'A diode laser handpiece delivers precisely calibrated pulses across the treatment area. A built-in cooling tip protects the skin surface throughout.' },
      { step: 4, title: 'Post-Treatment Care', description: 'A soothing gel is applied and you are advised to avoid sun exposure and heat for 24–48 hours. Treated hair will shed over 1–2 weeks.' },
    ],
    benefits: ['Up to 90% permanent hair reduction', 'Eliminates ingrown hairs', 'Smoother skin texture', 'Safe for dark skin tones', 'No razor bumps', 'Treats face, body, and bikini area'],
    faqs: [
      { question: 'Is it permanent?', answer: 'Laser hair reduction achieves 70–90% permanent reduction after a full course. Some fine regrowth may occur over years and can be addressed with a top-up session.' },
      { question: 'Does it work on dark Indian skin?', answer: 'Yes — our diode laser uses parameters specifically calibrated for Fitzpatrick III–V skin types. It is safe and effective on darker skin when done correctly.' },
      { question: 'Is it painful?', answer: 'Most patients describe a snapping or rubber-band sensation. The built-in cooling tip significantly reduces discomfort. Sensitive areas like the upper lip may need topical numbing cream.' },
      { question: 'How far apart are sessions?', answer: 'Sessions are spaced 4–6 weeks apart for body areas and 3–4 weeks for the face, aligned with hair growth cycles.' },
    ],
  },
}

export default async function TreatmentPage({ params }) {
  const treatment = await fetchTreatment(params.slug).catch(() => null)
  const t = treatment || FALLBACK_TREATMENTS[params.slug] || {
    name: params.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    category: 'Treatment', tagline: '', description: 'Our doctor-led treatment is customised to your skin type and concern.',
    meta: {}, howItWorks: [], benefits: [], faqs: [],
  }

  return (
    <div style={{ background: 'var(--cream)' }}>
      {/* HERO */}
      <section style={{ padding: '44px 20px 36px', background: 'linear-gradient(180deg,#F5EDE4,#FAF7F2)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ fontSize: 12.5, color: '#9A8A7A', fontWeight: 300, marginBottom: 20, display: 'flex', gap: 6 }}>
            <Link href="/" style={{ color: '#9A8A7A' }}>Home</Link><span>/</span>
            <Link href="/treatments" style={{ color: '#9A8A7A' }}>Treatments</Link><span>/</span>
            <span style={{ color: 'var(--text)', fontWeight: 400 }}>{t.name}</span>
          </div>
          <span className="eyebrow">{t.category}</span>
          <h1 style={{ fontWeight: 500, marginBottom: 14 }}>{t.name}</h1>
          <p style={{ fontSize: 14.5, fontWeight: 300, color: '#4A3728', maxWidth: 640, lineHeight: 1.85 }}>{t.description}</p>
          {t.meta && Object.keys(t.meta).length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 28 }}>
              {Object.entries(t.meta).filter(([, v]) => v).map(([k, v]) => (
                <div key={k} style={{ background: '#fff', borderRadius: 10, padding: '10px 18px', border: '1.5px solid rgba(26,17,9,0.09)' }}>
                  <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#B8916A' }}>{k}</div>
                  <div style={{ fontSize: 13.5, fontWeight: 400, color: 'var(--text)', marginTop: 3 }}>{v}</div>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ background: '#1A2744', color: '#fff', fontSize: 13, fontWeight: 400, padding: '12px 26px', borderRadius: 999, textDecoration: 'none' }}>Book Consultation</Link>
            <a href="tel:09811997993" style={{ background: 'transparent', color: '#1A2744', fontSize: 13, fontWeight: 400, padding: '12px 26px', borderRadius: 999, border: '1.5px solid rgba(26,39,68,0.2)', textDecoration: 'none' }}>Call 098119 97993</a>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      {t.howItWorks?.length > 0 && (
        <section style={{ padding: '64px 20px', background: '#1A2744' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <span className="eyebrow" style={{ color: '#B8916A' }}>Process</span>
            <h2 style={{ fontWeight: 500, color: '#FAF7F2', marginBottom: 36 }}>How it works</h2>
            <div style={{ display: 'grid', gap: 14 }}>
              {t.howItWorks.map((step, i) => (
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

      {/* BENEFITS */}
      {t.benefits?.length > 0 && (
        <section style={{ padding: '64px 20px', background: '#FAF7F2' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <span className="eyebrow">Results</span>
            <h2 style={{ fontWeight: 500, marginBottom: 32 }}>What you can expect</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
              {t.benefits.map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px', background: '#fff', borderRadius: 12, border: '1.5px solid rgba(26,17,9,0.09)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A6741" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span style={{ fontSize: 13.5, fontWeight: 400, color: 'var(--text)' }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BEFORE & AFTER */}
      <section style={{ padding: '64px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <span className="eyebrow">Real Results</span>
          <h2 style={{ fontWeight: 500, marginBottom: 32 }}>Before & After</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ background: '#FAF7F2', borderRadius: 16, overflow: 'hidden', border: '1.5px solid rgba(26,17,9,0.08)' }}>
                <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', height: 200, background: '#F0E8DF' }}>
                  <div style={{ background: '#E2D8CE', display: 'flex', alignItems: 'flex-end', padding: '10px' }}>
                    <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(255,255,255,0.85)', color: '#4A3728', padding: '4px 8px', borderRadius: 4 }}>Before</span>
                  </div>
                  <div style={{ background: '#D4C9BC', display: 'flex', alignItems: 'flex-end', padding: '10px', justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(26,39,68,0.8)', color: '#FAF7F2', padding: '4px 8px', borderRadius: 4 }}>After</span>
                  </div>
                  <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: '#fff', transform: 'translateX(-50%)' }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 28, height: 28, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4A3728" strokeWidth="2.5"><path d="M9 18l-6-6 6-6M15 6l6 6-6 6"/></svg>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '14px 16px 18px' }}>
                  <p style={{ fontSize: 12.5, fontWeight: 300, color: '#7A6A5A', margin: 0 }}>Patient result · {t.meta?.Sessions || '3 sessions'}</p>
                  <p style={{ fontSize: 11, fontWeight: 300, color: '#B8A898', marginTop: 6 }}>Individual results may vary.</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 400, color: '#1A2744', border: '1.5px solid rgba(26,39,68,0.2)', padding: '11px 24px', borderRadius: 999, textDecoration: 'none' }}>
              Book a consultation to see what's possible for you →
            </Link>
          </div>
        </div>
      </section>

      {/* DOCTOR NOTE */}
      <section style={{ padding: '56px 20px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 20, padding: '32px', border: '1.5px solid rgba(26,17,9,0.09)', display: 'grid', gridTemplateColumns: '80px 1fr', gap: 24, alignItems: 'start' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#E8DED4', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B8916A', marginBottom: 8 }}>A note from Dr. Omaima</div>
            <p style={{ fontSize: 14, fontWeight: 300, color: '#4A3728', lineHeight: 1.85, marginBottom: 16 }}>
              "Every treatment at Tvak & Asthi is personally performed by me — not a therapist or technician. I believe in transparent medicine: I will tell you exactly what to expect, how many sessions are realistic, and what results are achievable for your specific skin."
            </p>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>Dr. Omaima Jawed</div>
            <div style={{ fontSize: 12.5, fontWeight: 300, color: '#9A8A7A' }}>MBBS · Aesthetic Physician · 5 Years Experience</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {t.faqs?.length > 0 && (
        <section style={{ padding: '56px 20px' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <span className="eyebrow">FAQ</span>
            <h2 style={{ fontWeight: 500, marginBottom: 28 }}>Common questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {t.faqs.map((f, i) => (
                <details key={i} style={{ background: '#fff', borderRadius: 12, border: '1.5px solid rgba(26,17,9,0.09)', overflow: 'hidden' }}>
                  <summary style={{ padding: '18px 22px', fontSize: 14, fontWeight: 400, cursor: 'pointer', listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    {f.question}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B8916A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="m6 9 6 6 6-6"/></svg>
                  </summary>
                  <p style={{ margin: 0, padding: '4px 22px 20px', fontSize: 13.5, fontWeight: 300, color: '#4A3728', lineHeight: 1.8 }}>{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ padding: '56px 20px', background: '#3B2210' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 500, color: '#FAF7F2', marginBottom: 10 }}>Book your {t.name} session</h2>
          <p style={{ fontSize: 13.5, fontWeight: 300, color: '#C4A998', marginBottom: 28 }}>Speak with Dr. Omaima to find out if this treatment is right for your skin.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ background: '#C4847E', color: '#fff', fontSize: 13, fontWeight: 400, padding: '13px 32px', borderRadius: 999, textDecoration: 'none' }}>Book Consultation</Link>
            <a href="https://wa.me/919811997993" target="_blank" rel="noopener" style={{ background: 'rgba(255,255,255,0.1)', color: '#FAF7F2', fontSize: 13, fontWeight: 400, padding: '13px 32px', borderRadius: 999, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>WhatsApp Us</a>
          </div>
        </div>
      </section>
    </div>
  )
}
