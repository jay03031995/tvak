export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    // ── HERO ──────────────────────────────────────
    {
      name: 'hero', title: 'Hero Section', type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow Text', type: 'string' },
        { name: 'headingLine1', title: 'Heading Line 1', type: 'string' },
        { name: 'headingItalic', title: 'Heading Italic Part', type: 'string' },
        { name: 'headingLine2', title: 'Heading Line 2', type: 'string' },
        { name: 'headingItalic2', title: 'Heading Italic Part 2', type: 'string' },
        { name: 'subtext', title: 'Sub Paragraph', type: 'text' },
        { name: 'ctaPrimary', title: 'Primary CTA Text', type: 'string' },
        { name: 'ctaSecondary', title: 'Secondary CTA Text', type: 'string' },
        { name: 'mainImage', title: 'Main Image', type: 'image', options: { hotspot: true } },
        { name: 'resultImage', title: 'Result/Overlay Image', type: 'image', options: { hotspot: true } },
        {
          name: 'badges', title: 'Floating Badges', type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'text', title: 'Badge Text', type: 'string' },
              { name: 'subtext', title: 'Sub Text', type: 'string' },
            ]
          }]
        },
        {
          name: 'stats', title: 'Stats Row', type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'value', title: 'Value (e.g. 5+)', type: 'string' },
              { name: 'label', title: 'Label', type: 'string' },
            ]
          }]
        },
      ]
    },

    // ── TRUST BAR ─────────────────────────────────
    {
      name: 'trustBar', title: 'Trust Bar', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'text', title: 'Capsule Text', type: 'string' },
        ]
      }]
    },

    // ── TREATMENTS SECTION ────────────────────────
    {
      name: 'treatmentsSection', title: 'Treatments Section', type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'subtext', title: 'Subtext', type: 'string' },
        {
          name: 'featured', title: 'Featured Treatments',
          type: 'array', of: [{ type: 'reference', to: [{ type: 'treatment' }] }]
        },
      ]
    },

    // ── CONCERNS SECTION ──────────────────────────
    {
      name: 'concernsSection', title: 'Concerns Section', type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        {
          name: 'featured', title: 'Featured Concerns',
          type: 'array', of: [{ type: 'reference', to: [{ type: 'concern' }] }]
        },
      ]
    },

    // ── WHY US ────────────────────────────────────
    {
      name: 'whyUs', title: 'Why Us Section', type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        {
          name: 'points', title: 'Points', type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'title', title: 'Title', type: 'string' },
              { name: 'description', title: 'Description', type: 'text' },
            ]
          }]
        },
      ]
    },

    // ── BEFORE & AFTER ────────────────────────────
    {
      name: 'beforeAfter', title: 'Before & After Section', type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        {
          name: 'pairs', title: 'Before/After Pairs', type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'before', title: 'Before Image', type: 'image', options: { hotspot: true } },
              { name: 'after', title: 'After Image', type: 'image', options: { hotspot: true } },
              { name: 'label', title: 'Treatment Label', type: 'string' },
              { name: 'sessions', title: 'Sessions', type: 'string' },
            ]
          }]
        },
      ]
    },

    // ── TESTIMONIALS ──────────────────────────────
    {
      name: 'testimonials', title: 'Testimonials Section', type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        {
          name: 'items', title: 'Testimonials', type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'name', title: 'Patient Name', type: 'string' },
              { name: 'initials', title: 'Initials', type: 'string' },
              { name: 'rating', title: 'Star Rating', type: 'number' },
              { name: 'text', title: 'Review Text', type: 'text' },
              { name: 'treatment', title: 'Treatment Name', type: 'string' },
              { name: 'date', title: 'Date', type: 'string' },
            ]
          }]
        },
      ]
    },

    // ── FAQS ──────────────────────────────────────
    {
      name: 'faqs', title: 'FAQ Section', type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        {
          name: 'items', title: 'FAQ Items', type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'question', title: 'Question', type: 'string' },
              { name: 'answer', title: 'Answer', type: 'text' },
            ]
          }]
        },
      ]
    },

    // ── CTA BANNER ────────────────────────────────
    {
      name: 'ctaBanner', title: 'CTA Banner', type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'subtext', title: 'Subtext', type: 'string' },
        { name: 'primaryCta', title: 'Primary CTA Text', type: 'string' },
        { name: 'secondaryCta', title: 'Secondary CTA Text', type: 'string' },
      ]
    },

    // ── SEO ───────────────────────────────────────
    {
      name: 'seo', title: 'SEO', type: 'object',
      fields: [
        { name: 'title', title: 'Meta Title', type: 'string' },
        { name: 'description', title: 'Meta Description', type: 'text', rows: 2 },
      ]
    },
  ],
  preview: { prepare: () => ({ title: 'Home Page' }) }
}
