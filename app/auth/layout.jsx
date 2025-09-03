// app/auth/layout.jsx
import "../auth/global.css"
import Header from '../auth/components/Header'
import Footer from "../auth/components/Footer"
import { AuthProvider } from '../auth/contexts/AuthContexts'
import 'bootstrap/dist/css/bootstrap.min.css'

export const metadata = {
  title: 'Initia – Mock Interview Platform for Students',
  description: 'Initia is a career readiness platform that connects students with real-world professionals for mock interviews, helping them build confidence and prepare for job success.',
  keywords: [
    'mock interviews', 'career readiness', 'student job preparation',
    'interview practice', 'interview training', 'professional mentors',
    'job market preparation', 'student career platform', 'Initia', 'career coaching'
  ].join(', '),
  openGraph: {
    title: 'Initia – Mock Interview Platform for Students',
    description: 'Get real-world interview experience with Initia. Connect with professionals, practice interviews, and boost your confidence for the job market.',
    url: 'https://yourdomain.com',
    type: 'website',
    locale: 'en_US',
    siteName: 'Initia',
    images: [
      {
        url: 'https://yourdomain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Initia – Mock Interview Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Initia – Career Preparation for Students',
    description: 'Mock interviews with working professionals. Build confidence, get feedback, and prepare for real job interviews.',
    images: ['https://yourdomain.com/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  themeColor: '#2E3A59',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="d-flex flex-column min-vh-100">
        <AuthProvider>
          <Header />
          <main className="container p-4 mt-3 ">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
