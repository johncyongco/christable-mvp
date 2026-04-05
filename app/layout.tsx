import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/ui/Sidebar'
import TopNav from '@/components/ui/TopNav'
import MainContent from '@/components/ui/MainContent'
import { SidebarProvider } from '@/components/ui/SidebarContext'

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
    <html className="light" lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
        <style>{`
          body { font-family: 'Manrope', sans-serif; }
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }
          .glass-nav {
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
          }
        `}</style>
      </head>
      <body className="bg-surface text-on-surface font-body">
        <SidebarProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <MainContent>
              <TopNav />
              <main className="flex-1 p-8 bg-surface-container-low min-h-screen">
                {children}
              </main>
            </MainContent>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}