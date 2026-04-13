import type { Metadata } from 'next'
import { Slabo_27px } from 'next/font/google'
import './globals.css'

const slabo = Slabo_27px({ 
  subsets: ["latin"],
  weight: ["400"],
  variable: '--font-slabo'
})

export const metadata: Metadata = {
  title: 'Pilates in Konstanz | Reformer & Mattenkurse – Pure Pilates',
  description: 'Pilates in Konstanz: Reformer- und Mattenkurse für alle Level. Persönliches Training für Körper & Geist. Jetzt Termin vereinbaren.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={`${slabo.variable} font-slabo antialiased`}>
        {children}
      </body>
    </html>
  )
}