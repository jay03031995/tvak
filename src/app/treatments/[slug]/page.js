import Link from 'next/link'
import { fetchTreatment, fetchTreatments } from '@/sanity/client'

export const revalidate = 60

export async function generateStaticParams() {
  const base = [
    'hydrafacial-md', 'carbon-laser-facial', 'prp-hair', 'gfc-hair', 'chemical-peel',
    'microneedling', 'dermal-fillers', 'botox', 'laser-hair', 'acne-treatment',
    'laser-tattoo-removal', 'exosomes-face', 'micro-mesotherapy', 'cold-laser-therapy',
    'scalp-micro-pigmentation', 'lip-enhancement', 'cheek-enhancement', 'chin-enhancement',
    'nose-enhancement', 'cryolipolysis', 'hifu', 'intragen', 'vanquish', 'bio-re-peel',
  ].map(slug => ({ slug }))
  const sanity = await fetchTreatments().catch(() => [])
  const sanityParams = sanity
    .filter(t => t.slug?.current)
    .map(t => ({ slug: t.slug.current }))
  const seen = new Set(base.map(p => p.slug))
  sanityParams.forEach(p => { if (!seen.has(p.slug)) base.push(p) })
  return base
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const t = await fetchTreatment(slug).catch(() => null)
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
  'laser-tattoo-removal': {
    name: 'Laser Tattoo Removal', category: 'Skin & Glow', tagline: 'Safe tattoo fading & removal',
    description: 'Laser tattoo removal uses Q-switched Nd:YAG laser technology to break down tattoo ink particles into fragments small enough for the immune system to eliminate. Multiple sessions are required depending on tattoo size, ink colour, age, and depth. Our laser is safe for Indian skin tones.',
    meta: { Duration: '15–45 min', Sessions: '6–12 sessions', Recovery: '2–5 days healing', Results: 'Progressive fading' },
    howItWorks: [
      { step: 1, title: 'Tattoo Assessment', description: 'Dr. Omaima evaluates ink colours, depth, age, and skin tone to estimate the number of sessions required and set realistic expectations.' },
      { step: 2, title: 'Laser Treatment', description: 'Q-switched Nd:YAG laser pulses break ink pigment into tiny particles. Black and dark blue inks respond fastest; greens and yellows take more sessions.' },
      { step: 3, title: 'Immune Clearance', description: 'The body\'s lymphatic system gradually eliminates the fragmented ink particles over 6–8 weeks between sessions.' },
      { step: 4, title: 'Progressive Fading', description: 'Each session delivers further fading. Complete removal depends on ink depth and colours but most tattoos can be significantly lightened or cleared.' },
    ],
    benefits: ['Gradual, safe removal', 'Safe for Indian skin tones', 'Minimal scarring risk', 'Can lighten for cover-up', 'Treats all tattoo colours', 'No permanent marks'],
    faqs: [
      { question: 'How many sessions will I need?', answer: 'Amateur tattoos typically need 4–6 sessions; professional tattoos need 8–12. Black ink responds fastest. Dr. Omaima will estimate based on your tattoo.' },
      { question: 'Does it hurt?', answer: 'The procedure feels like a rubber band snapping against the skin. Topical numbing cream is applied before treatment. A cold air device also helps during the session.' },
      { question: 'Will it leave a scar?', answer: 'When performed correctly, laser tattoo removal should not scar. Following aftercare instructions — keeping the area clean, avoiding sun, and not picking — is critical.' },
      { question: 'How long between sessions?', answer: 'Sessions are spaced 6–8 weeks apart to allow the immune system to clear broken-down ink and for the skin to fully heal.' },
    ],
  },
  'exosomes-face': {
    name: 'Exosomes Face Treatment', category: 'Hair Restoration', tagline: 'Next-gen skin & hair regeneration',
    description: 'Exosomes are nano-sized vesicles derived from stem cells that carry powerful growth factors, proteins, and genetic signalling molecules. When applied to the skin or scalp, they trigger cellular regeneration, collagen synthesis, and hair follicle activation — representing the cutting edge of regenerative aesthetics.',
    meta: { Duration: '45–60 min', Sessions: '3–4 sessions', Recovery: 'None', Results: '4–8 weeks' },
    howItWorks: [
      { step: 1, title: 'Skin Preparation', description: 'The skin is cleansed and optionally micro-needled to create micro-channels that maximise exosome penetration into the dermis or scalp.' },
      { step: 2, title: 'Exosome Application', description: 'Purified exosome solution is applied topically or injected into the treatment area, delivering concentrated regenerative signals directly to target cells.' },
      { step: 3, title: 'Cellular Signalling', description: 'Exosomes communicate with skin cells and hair follicles, triggering collagen production, anti-inflammatory responses, and stem cell activation.' },
      { step: 4, title: 'Progressive Regeneration', description: 'Skin texture, hydration, and elasticity improve over 4–8 weeks. For hair, follicle reactivation is visible at 3–4 months.' },
    ],
    benefits: ['Superior to PRP in growth factor concentration', 'Anti-inflammatory & regenerative', 'Improves skin texture and glow', 'Stimulates hair follicles', 'No downtime', 'Safe for all skin types'],
    faqs: [
      { question: 'How are exosomes different from PRP?', answer: 'Exosomes are much smaller than platelets and carry a more targeted payload of growth factors and genetic signals. They have stronger regenerative effects with less inflammation than PRP.' },
      { question: 'Is this treatment for face or hair?', answer: 'Exosomes work for both. Facial exosome treatment improves skin quality, elasticity, and radiance. Scalp exosome treatment stimulates dormant hair follicles for regrowth.' },
      { question: 'How many sessions are needed?', answer: 'Three to four sessions spaced 4 weeks apart give optimal initial results. A maintenance session every 6 months is recommended.' },
    ],
  },
  'micro-mesotherapy': {
    name: 'Micro-Mesotherapy', category: 'Hair Restoration', tagline: 'Micronutrient scalp & skin infusion',
    description: 'Micro-mesotherapy delivers a customised cocktail of vitamins, minerals, amino acids, hyaluronic acid, and growth factors directly into the mesoderm (middle layer) of skin or scalp using a series of micro-injections. It nourishes hair follicles, hydrates skin, and stimulates cellular renewal at a targeted depth.',
    meta: { Duration: '30–45 min', Sessions: '4–6 sessions', Recovery: 'None', Results: '4–6 weeks' },
    howItWorks: [
      { step: 1, title: 'Bespoke Cocktail Design', description: 'Dr. Omaima selects a targeted mesotherapy cocktail based on your hair loss pattern, skin type, or specific deficiencies identified during consultation.' },
      { step: 2, title: 'Micro-injection Delivery', description: 'A fine meso-gun or manual technique delivers the cocktail into the scalp or skin at precise depths of 1–4mm for maximum absorption.' },
      { step: 3, title: 'Follicle & Cell Nourishment', description: 'Micronutrients directly feed hair follicles and skin cells, improving circulation, reducing inflammation, and stimulating collagen and keratin production.' },
      { step: 4, title: 'Progressive Improvement', description: 'Hair fall reduces noticeably from session 3. Skin hydration, glow, and firmness improve progressively with each session.' },
    ],
    benefits: ['Customised to individual needs', 'Directly targets hair follicles', 'Improves scalp circulation', 'Boosts skin hydration', 'Minimal discomfort', 'Safe for all hair types'],
    faqs: [
      { question: 'Is mesotherapy the same as PRP?', answer: 'No — mesotherapy uses a pharmaceutical cocktail of vitamins and growth factors, while PRP uses your own blood-derived platelets. They can be combined for enhanced results.' },
      { question: 'Is it painful?', answer: 'The needles used are very fine. Most patients experience mild pinprick sensations. Numbing cream can be applied beforehand if preferred.' },
    ],
  },
  'cold-laser-therapy': {
    name: 'Cold Laser Therapy (LLLT)', category: 'Hair Restoration', tagline: 'Low-level laser for hair & skin',
    description: 'Low-Level Laser Therapy (LLLT) uses specific wavelengths of red or near-infrared light to stimulate cellular activity without generating heat. For hair loss, it increases blood flow to hair follicles and stimulates the anagen (growth) phase. For skin, it accelerates wound healing and reduces inflammation.',
    meta: { Duration: '20–30 min', Sessions: '12–16 sessions', Recovery: 'None', Results: '3–6 months' },
    howItWorks: [
      { step: 1, title: 'Device Application', description: 'A cold laser device emitting 630–670nm red light is applied to the scalp or skin. No heat is generated — the therapy is completely painless.' },
      { step: 2, title: 'Photobiomodulation', description: 'Laser photons are absorbed by mitochondria in hair follicle cells, increasing ATP (energy) production and cellular metabolism.' },
      { step: 3, title: 'Follicle Stimulation', description: 'Improved cellular energy extends the anagen growth phase and increases scalp blood flow, leading to thicker and more numerous hairs over time.' },
      { step: 4, title: 'Cumulative Results', description: 'Results build over months. Cold laser works best as a standalone treatment for mild-moderate hair loss or in combination with PRP/GFC.' },
    ],
    benefits: ['Completely painless', 'No downtime', 'Safe for all skin types', 'Stimulates hair growth cycle', 'Reduces shedding', 'Can combine with PRP or GFC'],
    faqs: [
      { question: 'Is it effective on its own?', answer: 'Cold laser is effective for mild to moderate androgenetic alopecia. For best results, Dr. Omaima often combines it with PRP or GFC therapy.' },
      { question: 'How many sessions are needed?', answer: 'A course of 12–16 sessions (2 per week for 8 weeks) forms the primary treatment. Maintenance sessions every 2–4 weeks are recommended thereafter.' },
    ],
  },
  'scalp-micro-pigmentation': {
    name: 'Scalp Micro Pigmentation (SMP)', category: 'Hair Restoration', tagline: 'Hair follicle tattoo for density illusion',
    description: 'Scalp Micro Pigmentation is a specialised cosmetic tattooing technique that replicates the appearance of shaved hair follicles on the scalp. It creates the illusion of density, fills hairline recessions, and camouflages scars — making it ideal for patients with advanced baldness or alopecia who want an immediate, long-lasting solution.',
    meta: { Duration: '3–5 hours / session', Sessions: '2–3 sessions', Recovery: '5–7 days', Results: 'Immediate, lasts 3–5 years' },
    howItWorks: [
      { step: 1, title: 'Design & Consultation', description: 'Dr. Omaima designs the hairline and density pattern to match your face shape, existing hair, and personal preference. The design is agreed before any procedure begins.' },
      { step: 2, title: 'Pigment Application', description: 'Medical-grade pigments are deposited into the scalp using a specialised micro-needle at precise depths to replicate natural follicle dots.' },
      { step: 3, title: 'Multiple Sessions', description: 'Two to three sessions build layered pigment depth for a natural, realistic result. Each session refines and adds density.' },
      { step: 4, title: 'Fading & Maintenance', description: 'SMP fades gradually over 3–5 years. A single maintenance session restores colour and sharpness as needed.' },
    ],
    benefits: ['Immediate visible result', 'Works for all baldness grades', 'Covers scars and alopecia patches', 'No surgery or downtime', 'Natural, realistic appearance', 'Long-lasting 3–5 years'],
    faqs: [
      { question: 'Does SMP look natural?', answer: 'When performed by a skilled practitioner, SMP is indistinguishable from a closely shaved head. Pigment selection and dot placement are critical for a realistic result.' },
      { question: 'Is it suitable for women?', answer: 'Yes — SMP can increase the appearance of hair density in women with diffuse thinning, creating the illusion of a fuller scalp.' },
      { question: 'Does it hurt?', answer: 'Topical numbing cream is applied before the session. Most patients experience mild discomfort, similar to a traditional tattoo.' },
    ],
  },
  'lip-enhancement': {
    name: 'Lip Enhancement', category: 'Anti-Ageing', tagline: 'Fuller, defined, naturally beautiful lips',
    description: 'Lip enhancement using hyaluronic acid fillers adds volume, definition, and symmetry to the lips without an artificial appearance. From subtle hydration to significant augmentation, Dr. Omaima tailors every lip treatment to your facial proportions and personal goals — prioritising a natural, kissable result.',
    meta: { Duration: '30–45 min', Sessions: '1 session', Recovery: '24–48 hrs mild swelling', Results: 'Immediate, lasts 9–12 months' },
    howItWorks: [
      { step: 1, title: 'Lip Design Consultation', description: 'Dr. Omaima assesses your lip anatomy, facial proportions, and goals. A lip design is sketched and agreed before treatment begins.' },
      { step: 2, title: 'Numbing', description: 'Topical anaesthetic cream is applied for 20 minutes. Most fillers also contain built-in lidocaine for comfort throughout the procedure.' },
      { step: 3, title: 'Filler Injection', description: 'Small amounts of soft hyaluronic acid filler are injected into specific lip zones (vermillion border, body, cupid\'s bow, corners) using a fine needle or cannula.' },
      { step: 4, title: 'Moulding & Review', description: 'The filler is gently moulded to achieve symmetry. A 2-week review is included to assess results and add touch-up if needed.' },
    ],
    benefits: ['Immediate natural-looking fullness', 'Define lip border & cupid\'s bow', 'Correct lip asymmetry', 'Hydrated, plump appearance', 'Reversible with hyaluronidase', 'Lasts 9–12 months'],
    faqs: [
      { question: 'Will it look overdone?', answer: 'Dr. Omaima\'s philosophy is always natural enhancement. Conservative amounts are used, and the 2-week review allows for gradual build-up to your desired result.' },
      { question: 'How long does swelling last?', answer: 'Mild swelling and bruising typically resolve within 24–72 hours. Final results are fully visible at 2 weeks.' },
      { question: 'Is it reversible?', answer: 'Yes — hyaluronic acid fillers can be dissolved with hyaluronidase at any time if you\'re unhappy with the result.' },
    ],
  },
  'cheek-enhancement': {
    name: 'Cheek Enhancement', category: 'Anti-Ageing', tagline: 'Lift, contour & restore cheek volume',
    description: 'Cheek enhancement using dermal fillers restores the mid-face volume lost with ageing, creating a lifted, youthful facial contour. Strategic filler placement in the cheeks also indirectly lifts nasolabial folds and jowls, providing a natural non-surgical facelift effect.',
    meta: { Duration: '30–45 min', Sessions: '1 session', Recovery: '24–48 hrs mild swelling', Results: 'Immediate, lasts 12–18 months' },
    howItWorks: [
      { step: 1, title: 'Facial Analysis', description: 'Dr. Omaima assesses cheekbone structure, volume distribution, and the degree of mid-face deflation to plan precise filler placement.' },
      { step: 2, title: 'Topical Numbing', description: 'Anaesthetic cream is applied for patient comfort. The fillers used also contain lidocaine to minimise discomfort during injection.' },
      { step: 3, title: 'Filler Placement', description: 'Premium hyaluronic acid filler is placed at the correct supraperiosteal plane (above the cheekbone) using a cannula for safety and natural lift.' },
      { step: 4, title: 'Sculpting & Assessment', description: 'The filler is sculpted for symmetry and the overall facial result is assessed before completing the procedure.' },
    ],
    benefits: ['Restores youthful mid-face volume', 'Creates natural cheekbone definition', 'Indirectly lifts nasolabial folds', 'Immediate result', 'Lasts 12–18 months', 'Safe, reversible procedure'],
    faqs: [
      { question: 'How much filler do cheeks need?', answer: 'Typically 1–2ml per side depending on the degree of volume loss. Dr. Omaima always recommends starting conservatively and building up at a review.' },
      { question: 'Will it look natural?', answer: 'When placed correctly on the bone, cheek filler looks completely natural and does not create an artificial puffiness.' },
    ],
  },
  'chin-enhancement': {
    name: 'Chin Enhancement', category: 'Anti-Ageing', tagline: 'Define your jawline non-surgically',
    description: 'Chin enhancement with dermal fillers projects and defines a weak or recessed chin, improving facial balance and profile. A well-projected chin also makes the jawline appear more defined and the neck slimmer — without surgery, anaesthesia, or significant downtime.',
    meta: { Duration: '20–30 min', Sessions: '1 session', Recovery: '24–48 hrs mild swelling', Results: 'Immediate, lasts 12–18 months' },
    howItWorks: [
      { step: 1, title: 'Profile Analysis', description: 'Dr. Omaima analyses the chin from frontal and lateral views to assess the degree of projection needed for ideal facial balance.' },
      { step: 2, title: 'Structural Filler Injection', description: 'A firmer hyaluronic acid filler is injected at the chin bone, providing structural support and projection similar to a surgical implant effect.' },
      { step: 3, title: 'Profile Refinement', description: 'The chin shape is refined for symmetry and the desired degree of projection, checking the profile view throughout.' },
      { step: 4, title: 'Review', description: 'A 2-week review checks for symmetry and allows for any refinement before results are finalised.' },
    ],
    benefits: ['Projects recessed chin', 'Defines jawline without surgery', 'Creates better facial balance', 'Immediate result', 'Lasts 12–18 months', 'Reversible'],
    faqs: [
      { question: 'Can it replace chin implant surgery?', answer: 'For moderate projection needs, chin filler provides excellent results without surgery. For significant projection requirements, surgical implants may give a more permanent result — Dr. Omaima will advise honestly.' },
    ],
  },
  'nose-enhancement': {
    name: 'Non-Surgical Nose Enhancement', category: 'Anti-Ageing', tagline: 'Reshape your nose without surgery',
    description: 'Non-surgical rhinoplasty uses small amounts of dermal filler to smooth bumps, lift the nasal tip, straighten the nose, or improve symmetry — with immediate results and no surgical risk. It is an excellent option for patients who want to address a specific nasal concern without committing to rhinoplasty surgery.',
    meta: { Duration: '20–30 min', Sessions: '1 session', Recovery: 'None to 24 hrs mild swelling', Results: 'Immediate, lasts 9–12 months' },
    howItWorks: [
      { step: 1, title: 'Nasal Assessment', description: 'Dr. Omaima evaluates the nasal anatomy and identifies specific areas for improvement — dorsal hump, nasal tip, bridge irregularities, or asymmetry.' },
      { step: 2, title: 'Topical Numbing', description: 'Topical anaesthetic is applied before injection. The filler contains lidocaine for comfort during the procedure.' },
      { step: 3, title: 'Precise Filler Placement', description: 'Small amounts of filler are placed at strategic points to disguise bumps, lift the tip, or improve nasal symmetry. The nasal area requires extreme precision due to blood vessel proximity.' },
      { step: 4, title: 'Immediate Assessment', description: 'Results are visible immediately. Photographs are compared to confirm the desired improvement has been achieved.' },
    ],
    benefits: ['Immediate result', 'No surgery or anaesthesia', 'Corrects dorsal humps', 'Lifts drooping nasal tip', 'Improves symmetry', 'Reversible with hyaluronidase'],
    faqs: [
      { question: 'Is non-surgical rhinoplasty safe?', answer: 'The nose has a complex blood supply and requires an experienced injector. Dr. Omaima uses blunt cannulas and aspiration technique to minimise vascular risk.' },
      { question: 'Can it make my nose smaller?', answer: 'Non-surgical rhinoplasty can create the illusion of a slimmer nose by camouflaging bumps and improving tip projection, but cannot physically reduce nose size.' },
    ],
  },
  'cryolipolysis': {
    name: 'Cool Shape Cryolipolysis', category: 'Laser & Devices', tagline: 'Freeze away stubborn fat non-surgically',
    description: 'Cryolipolysis uses controlled cooling to selectively destroy fat cells in targeted areas. Fat cells are more sensitive to cold than surrounding tissue, so the treatment eliminates them while leaving skin and nerves unaffected. The body then gradually eliminates the destroyed fat cells over 4–12 weeks.',
    meta: { Duration: '45–60 min / area', Sessions: '1–2 sessions per area', Recovery: 'None', Results: '4–12 weeks' },
    howItWorks: [
      { step: 1, title: 'Target Area Marking', description: 'Dr. Omaima marks the target fat deposit areas — typically abdomen, flanks, thighs, arms, or double chin — and selects appropriate applicator cups.' },
      { step: 2, title: 'Cooling Application', description: 'The cryolipolysis applicator suctions the fat tissue and cools it to -9°C to -11°C, inducing controlled fat cell apoptosis (cell death).' },
      { step: 3, title: 'Fat Cell Death', description: 'Chilled fat cells crystallise and trigger a natural cell death process (apoptosis) while surrounding tissue remains unaffected.' },
      { step: 4, title: 'Lymphatic Elimination', description: 'Over 4–12 weeks, the immune system gradually eliminates dead fat cells through the lymphatic system, reducing fat layer thickness by 20–25%.' },
    ],
    benefits: ['20–25% fat reduction per treatment', 'No surgery or needles', 'Multiple areas treatable simultaneously', 'No downtime', 'Long-lasting results', 'Safe, FDA-cleared technology'],
    faqs: [
      { question: 'Is cryolipolysis a weight loss treatment?', answer: 'No — cryolipolysis is for targeting specific fat deposits that are resistant to diet and exercise. It is not a substitute for weight loss and works best when you are near your target weight.' },
      { question: 'How many sessions are needed?', answer: 'Most patients see significant results from one session per area. A second session can enhance results further if desired.' },
      { question: 'Is it painful?', answer: 'The first 5–10 minutes of cooling may cause intense cold, tingling, and pulling sensations. After that, the area numbs and most patients read or use their phone during treatment.' },
    ],
  },
  'hifu': {
    name: 'Ultralift — HIFU', category: 'Anti-Ageing', tagline: 'Non-surgical skin lifting & tightening',
    description: 'High-Intensity Focused Ultrasound (HIFU) delivers focused ultrasound energy to the SMAS layer — the same layer targeted in surgical facelifts. This triggers collagen contraction and new collagen synthesis, providing a gradual, natural lifting and tightening effect on the face, neck, and brow without surgery.',
    meta: { Duration: '60–90 min', Sessions: '1 session (annual)', Recovery: 'None to mild redness 24 hrs', Results: '3–6 months (progressive)' },
    howItWorks: [
      { step: 1, title: 'Facial Mapping', description: 'Dr. Omaima uses HIFU ultrasound imaging to map the tissue depth and identify the correct energy delivery planes for maximum lifting effect.' },
      { step: 2, title: 'Energy Delivery', description: 'Focused ultrasound energy is delivered at precise depths of 1.5mm, 3mm, and 4.5mm — targeting superficial dermis, deep dermis, and SMAS layer respectively.' },
      { step: 3, title: 'Thermal Coagulation', description: 'At each focal point, temperatures reach 60–70°C briefly, coagulating tissue and triggering an intense collagen repair response.' },
      { step: 4, title: 'Progressive Lifting', description: 'New collagen forms and contracts over 3–6 months, producing visible lifting of the brow, jawline, cheeks, and neck. Results last 12–18 months.' },
    ],
    benefits: ['Lifts brow, cheeks, jawline, neck', 'Targets SMAS (surgical facelift layer)', 'Progressive, natural-looking result', 'No downtime', 'Single annual session', 'Safe, FDA-cleared technology'],
    faqs: [
      { question: 'How does HIFU compare to a surgical facelift?', answer: 'HIFU targets the same SMAS layer as a facelift but produces a more subtle, gradual improvement over months. It\'s ideal for patients with mild-moderate laxity who want to delay surgery.' },
      { question: 'Is it painful?', answer: 'Some areas produce a brief intense heat sensation as energy is delivered. Dr. Omaima adjusts energy levels and can provide oral analgesia for sensitive patients.' },
    ],
  },
  'bio-re-peel': {
    name: 'Bio Re Peel', category: 'Skin & Glow', tagline: 'Advanced no-downtime chemical peel',
    description: 'Bio Re Peel is an innovative biostimulating chemical peel that works at the dermal level without surface peeling. Its unique tricholoroacetic acid (TCA) formula combines a keratolytic phase with a biostimulating phase, improving skin texture, tone, pores, and acne scars — with no visible peeling or downtime.',
    meta: { Duration: '30 min', Sessions: '4–6 sessions', Recovery: 'None (no visible peeling)', Results: '2–4 weeks' },
    howItWorks: [
      { step: 1, title: 'Skin Preparation', description: 'The skin is cleansed and degreased. A skin sensitivity assessment ensures the peel is safe and appropriate for your skin type.' },
      { step: 2, title: 'Peel Application', description: 'Bio Re Peel solution is applied in two phases — first the keratolytic phase (TCA) penetrates the skin, then the biostimulating phase activates regenerative processes.' },
      { step: 3, title: 'Penetration', description: 'Unlike traditional peels, Bio Re Peel works without visible surface peeling. Clients experience mild warmth during application and no significant discomfort.' },
      { step: 4, title: 'Post-treatment Glow', description: 'Immediately after, skin looks brighter and smoother. Over the following days, continued collagen synthesis and cell turnover improve texture progressively.' },
    ],
    benefits: ['No visible peeling or downtime', 'Safe for all skin tones', 'Improves acne scars', 'Reduces pore size', 'Boosts collagen synthesis', 'Immediate brightening effect'],
    faqs: [
      { question: 'If there is no peeling, how does it work?', answer: 'Bio Re Peel works at the dermal level, stimulating collagen and accelerating cell renewal without damaging the surface epidermis enough to cause visible peeling.' },
      { question: 'Is it suitable for dark Indian skin?', answer: 'Yes — because it avoids surface peeling, the risk of post-inflammatory hyperpigmentation (PIH) is significantly lower than traditional TCA peels.' },
    ],
  },
  'intragen': {
    name: 'Intragen Radiofrequency', category: 'Anti-Ageing', tagline: 'Deep RF for skin tightening & hair growth',
    description: 'Intragen is a professional radiofrequency technology that delivers multi-polar RF energy to heat the deep dermis and stimulate collagen contraction and new synthesis. For the scalp, it improves blood circulation and follicle health. For the face, it tightens skin and reduces fine lines.',
    meta: { Duration: '45–60 min', Sessions: '4–6 sessions', Recovery: 'None', Results: '4–8 weeks' },
    howItWorks: [
      { step: 1, title: 'RF Energy Application', description: 'Multi-polar radiofrequency energy is delivered through an applicator handpiece, heating the deep dermis to 40–42°C — the optimal temperature for collagen stimulation.' },
      { step: 2, title: 'Collagen Contraction', description: 'Existing collagen fibres contract immediately under heat, producing an immediate tightening effect visible even after the first session.' },
      { step: 3, title: 'New Collagen Synthesis', description: 'The thermal stimulus triggers fibroblasts to produce new collagen over 4–8 weeks, progressively tightening and firming the skin.' },
      { step: 4, title: 'Scalp Stimulation', description: 'On the scalp, Intragen improves blood microcirculation and follicle oxygenation, supporting hair growth and reducing shedding.' },
    ],
    benefits: ['Tightens skin without surgery', 'Improves scalp circulation for hair growth', 'Immediate visible result', 'No downtime', 'Progressive collagen improvement', 'Comfortable, warming sensation'],
    faqs: [
      { question: 'Is Intragen safe for all skin tones?', answer: 'Yes — radiofrequency is colour-blind and safe for all Fitzpatrick skin types including darker Indian skin tones.' },
      { question: 'How many sessions for visible results?', answer: 'Most patients notice results from session 2–3. A full course of 4–6 sessions gives optimal results, with improvement continuing for 3 months after the last session.' },
    ],
  },
  'vanquish': {
    name: 'VANQUISH Body Contouring', category: 'Laser & Devices', tagline: 'Contactless fat reduction technology',
    description: 'VANQUISH uses selective radiofrequency energy to heat and destroy subcutaneous fat cells without any contact with the body. Its large panel heats a wide area simultaneously, making it ideal for treating the full abdomen or flanks in a single session. It is a comfortable, completely non-invasive fat reduction treatment.',
    meta: { Duration: '45 min', Sessions: '4–6 sessions', Recovery: 'None', Results: '4–8 weeks' },
    howItWorks: [
      { step: 1, title: 'Non-Contact Energy Delivery', description: 'The VANQUISH panel is positioned 1–2cm above the treatment area without touching the skin, delivering uniform RF energy across the full treatment zone.' },
      { step: 2, title: 'Selective Fat Heating', description: 'RF energy selectively heats fat cells to 45°C while the skin surface remains below 42°C, sparing skin and surrounding tissue.' },
      { step: 3, title: 'Fat Cell Apoptosis', description: 'Heat-stressed fat cells undergo programmed cell death (apoptosis) over the days following treatment.' },
      { step: 4, title: 'Gradual Elimination', description: 'Dead fat cells are removed by the lymphatic system over 4–8 weeks, reducing fat layer thickness and improving abdominal contour.' },
    ],
    benefits: ['Contactless — completely comfortable', 'Large area treatment in one session', 'No downtime', 'Reduces abdominal fat', 'Progressive results over weeks', 'Suitable for most body types'],
    faqs: [
      { question: 'Does VANQUISH hurt?', answer: 'No — VANQUISH produces a comfortable warming sensation throughout the treatment. No contact means no pressure, suction, or discomfort.' },
      { question: 'How much fat does it remove?', answer: 'On average 3–5cm of circumference reduction is seen after a full course of 4–6 sessions. Results vary based on starting fat thickness.' },
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
  const { slug } = await params
  const treatment = await fetchTreatment(slug).catch(() => null)
  const t = treatment || FALLBACK_TREATMENTS[slug] || {
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
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
