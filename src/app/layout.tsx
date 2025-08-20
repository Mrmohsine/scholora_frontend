import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Scholora - Connect with Verified Tutors in Morocco',
  description: 'Find expert tutors across Morocco. Personalized learning experiences for academic excellence.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body 
        className="font-sans antialiased" 
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  )
}