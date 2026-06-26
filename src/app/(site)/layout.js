import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'

export default function SiteLayout({ children }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
