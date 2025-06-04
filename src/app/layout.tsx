import './globals.css'
import { Inter, Lexend } from 'next/font/google'
import Link from 'next/link'
import {ThemeSwitcher} from '@/components/theme-switcher'
import AuthButton from '@/components/header-auth'
import { Suspense } from 'react'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })
const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend' })

export const metadata: Metadata = {
  title: 'AI/ML Experiments Platform',
  description: 'A platform for A/B testing, onboarding, and partner enablement with enterprise SSO and compliance.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${lexend.variable}`}>
      <body className={`${inter.className} bg-background text-foreground min-h-screen flex flex-col`}>
        <header className="w-full border-b bg-white/90 dark:bg-zinc-900/90 sticky top-0 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary hover:opacity-90 transition">
                <svg width="28" height="28" viewBox="0 0 24 24" className="text-accent" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="6" fill="currentColor"/>
                  <path d="M8 15l4-4 4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                ExpPlatform
              </Link>
              <nav className="hidden md:flex gap-4 items-center">
                <Link href="/dashboard" className="hover:text-accent font-medium transition">Dashboard</Link>
                <Link href="/dashboard/experiments" className="hover:text-accent font-medium transition">Experiments</Link>
                <Link href="/dashboard/onboarding" className="hover:text-accent font-medium transition">Onboarding</Link>
                <Link href="/dashboard/partners" className="hover:text-accent font-medium transition">Partners</Link>
                <Link href="/instruments" className="hover:text-accent font-medium transition">Instruments</Link>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              <Suspense>
                <AuthButton ssoEnabled />
              </Suspense>
            </div>
          </div>
        </header>
        <main className="flex-1 min-h-0">{children}</main>
        <footer className="border-t text-xs text-muted-foreground py-3 bg-white/80 dark:bg-zinc-900/80">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <span>© {new Date().getFullYear()} ExpPlatform. All rights reserved.</span>
            <span>
              <Link href="/privacy" className="hover:underline">Privacy</Link>
              {' · '}
              <Link href="/terms" className="hover:underline">Terms</Link>
            </span>
          </div>
        </footer>
      </body>
    </html>
  )
}
