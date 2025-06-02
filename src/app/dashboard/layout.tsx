import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const dashboardNavItems = [
  { href: '/dashboard', label: 'Overview', icon: '🏠' },
  { href: '/dashboard/experiments', label: 'Experiments', icon: '🧪' },
  { href: '/dashboard/onboarding', label: 'Onboarding', icon: '🎉' },
  { href: '/dashboard/partners', label: 'Partners', icon: '🤝' },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // Server components can't use hooks, so highlight active via pathname logic in client component if needed
  return (
    <div className="min-h-screen flex bg-muted">
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r flex flex-col py-6 px-4 gap-4">
        <div className="mb-6">
          <Link href="/" className="text-2xl font-bold text-primary tracking-tight flex items-center gap-2">
            <span className="text-accent text-3xl">🧬</span>
            ExpPlatform
          </Link>
        </div>
        <nav className="flex flex-col gap-2">
          {dashboardNavItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/10 font-medium transition"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto text-xs text-muted-foreground">
          Secure • HIPAA Compliant
        </div>
      </aside>
      <main className="flex-1 min-h-0 overflow-x-auto">{children}</main>
    </div>
  )
}
