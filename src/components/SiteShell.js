'use client'
import { usePathname } from 'next/navigation'
import Nav from './Nav'
import Footer from './Footer'
import FloatingButtons from './FloatingButtons'

export default function SiteShell({ children }) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')

  if (isStudio) return <>{children}</>

  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
