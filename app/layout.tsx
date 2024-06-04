import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Life Progress Meter',
  description: 'This Life Progress Meter calculates the remaining time in days, weeks, months, and years, as well as the percentage of life passed and remaining, and important life events.',
  keywords: ['life progress', 'time remaining', 'life events'],
  openGraph: {
    title: 'Life Progress Meter - Track Your Life Progress',
    description: 'This Life Progress Meter calculates the remaining time in days, weeks, months, and years, as well as the percentage of life passed and remaining, and important life events.',
    url: 'https://life-progress-meter.vercel.app',
    type: 'website',
    images: [
      {
        url: 'https://life-progress-meter.vercel.appprogress-bar.png',
        alt: 'Life Progress Meter - Track Your Life Progress',
      },
    ],
  }
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
