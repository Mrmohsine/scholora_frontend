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
  description:
    'Find expert tutors across Morocco. Personalized learning experiences for academic excellence.',
  keywords: [
    // 🇫🇷 Français
    'tuteur au Maroc', 'professeur particulier', 'cours particuliers', 'aide scolaire', 'apprentissage en ligne', 'formation', 'enseignement', 'soutien scolaire', 'prof en ligne', 'plateforme éducative',
    // 🇬🇧 English
    'tutor in Morocco', 'private teacher', 'online tutoring', 'learning platform', 'education', 'home tutor', 'student help', 'study support', 'e-learning Morocco',
    // 🇦🇪 Arabic
    'مدرس خاص في المغرب', 'دروس خصوصية', 'تعلم عبر الإنترنت', 'منصة تعليمية', 'مدرسين في المغرب', 'مساعدة الطلاب', 'تعليم عن بعد',
  ],
  authors: [{ name: 'Scholora Team' }],
  openGraph: {
    title: 'Scholora - Connect with Verified Tutors in Morocco',
    description:
      'Find verified tutors across Morocco. Learn smarter with Scholora — your trusted tutoring platform.',
    url: 'https://www.scholora.ma',
    siteName: 'Scholora',
    locale: 'en_MA',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Scholora - Find Tutors in Morocco',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scholora - Connect with Verified Tutors in Morocco',
    description:
      'Find verified tutors in Morocco and start your learning journey today.',
    images: ['/images/og-image.jpg'],
    creator: '@scholora_ma',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: 'https://www.scholora.ma',
  },
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
