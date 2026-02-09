import React from "react"
import type { Metadata } from 'next'
import { Slabo_27px } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const slabo = Slabo_27px({ 
  subsets: ["latin"],
  weight: ["400"],
  variable: '--font-slabo'
});

export const metadata: Metadata = {
  title: 'Pure Pilates | Studio für Körper & Geist',
  description: 'Entdecke die transformierende Kraft von Pilates. Matten- und Reformer-Kurse für alle Altersgruppen und Fitnesslevel.',
  generator: 'v0.app',
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
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${slabo.variable} font-slabo antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
