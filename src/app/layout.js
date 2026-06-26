import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata = {
  title: 'Tvak & Asthi by Artham — Aesthetic Dermatology, Noida',
  description: 'Doctor-led skin, hair and aesthetic clinic in Noida. Evidence-based treatments under Dr. Omaima Jawed, MBBS Aesthetic Physician.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>{children}</body>
    </html>
  )
}
