'use client'

import { useSidebar } from './SidebarContext'

export default function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar()

  return (
    <div className={`flex-1 flex flex-col ml-64`}>
      {children}
    </div>
  )
}