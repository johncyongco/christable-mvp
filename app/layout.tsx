import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/ui/Sidebar'
import TopNav from '@/components/ui/TopNav'
import MainContent from '@/components/ui/MainContent'
import { SidebarProvider } from '@/components/ui/SidebarContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Christable | Event Command Dashboard',
  description: 'Real-time event coordination and command dashboard for managing people, teams, pings, schedules, zones, and operational activity during live events.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <SidebarProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <MainContent>
              <TopNav />
              <main className="flex-1 p-6">
                {children}
              </main>
            </MainContent>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}