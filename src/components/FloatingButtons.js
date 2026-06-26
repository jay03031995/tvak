export default function FloatingButtons() {
  return (
    <div style={{ position: 'fixed', bottom: 24, left: 20, zIndex: 100, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <a href="https://wa.me/919811997993" target="_blank" rel="noopener" aria-label="WhatsApp"
        style={{ width: 48, height: 48, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(37,211,102,0.35)', transition: 'transform .2s' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.2-5.3A8.5 8.5 0 1 1 21 11.5Z"/>
        </svg>
      </a>
      <a href="tel:09811997993" aria-label="Call"
        style={{ width: 48, height: 48, borderRadius: '50%', background: '#1A2744', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(26,39,68,0.3)', transition: 'transform .2s' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.49 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.97a16 16 0 0 0 6.06 6.06l1.27-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      </a>
    </div>
  )
}
