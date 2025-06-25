import "./global.css"
import Header from "../components/Hearder"
import Footer from "../components/footer"
import "./global.css"

import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: 'Initia – Mock Interview Platform for Students',
  description: 'Initia is a career readiness platform that connects students with real-world professionals for mock interviews, helping them build confidence and prepare for job success.',
  keywords: [
    'mock interviews',
    'career readiness',
    'student job preparation',
    'interview practice',
    'interview training',
    'professional mentors',
    'job market preparation',
    'student career platform',
    'Initia',
    'career coaching'
  ].join(', '),
  openGraph: {
    title: 'Initia – Mock Interview Platform for Students',
    description: 'Get real-world interview experience with Initia. Connect with professionals, practice interviews, and boost your confidence for the job market.',
    url: 'https://yourdomain.com', // replace with your actual domain
    type: 'website',
    locale: 'en_US',
    siteName: 'Initia',
    images: [
      {
        url: 'https://yourdomain.com/og-image.jpg', // optional: social media preview image
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
    images: ['https://yourdomain.com/twitter-image.jpg'], // optional
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  themeColor: '#2E3A59', // Optional, adjust to your branding
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="d-flex flex-column min-vh-100">
        <Header />
        
        <main className="flex-grow-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}
