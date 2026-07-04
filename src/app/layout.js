import { Poppins, Playfair_Display, Raleway, Montserrat } from 'next/font/google'
import './globals.css'
import SiteShell from '@/components/SiteShell'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-raleway',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata = {
  title: 'Tvak & Asthi by Artham — Aesthetic Dermatology, Noida',
  description: 'Doctor-led skin, hair and aesthetic clinic in Noida. Evidence-based treatments under Dr. Omaima Jawed, MBBS Aesthetic Physician.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable} ${raleway.variable} ${montserrat.variable}`}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
