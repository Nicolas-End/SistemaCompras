"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "./sidebar"
import { Navbar } from "./navbar"
import { cn } from "@/lib/utils"
import { currentUser } from "@/lib/mock-data"
import { UserSys } from "@/lib/types"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<UserSys | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true)
      }
    }
    
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await currentUser()
        setUser(userData)
      } catch (error) {
        console.error("Erro ao carregar usuario:", error)
      }
    }
    loadUser()
  }, [])

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen)
    } else {
      setSidebarCollapsed(!sidebarCollapsed)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Overlay */}
      {isMobile && mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "transition-transform duration-300 lg:transition-none",
          isMobile && !mobileMenuOpen && "-translate-x-full"
        )}
      >
        <Sidebar
          collapsed={isMobile ? false : sidebarCollapsed}
          onToggle={toggleSidebar}
        />
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "flex min-h-screen flex-col transition-all duration-300",
          isMobile ? "ml-0" : sidebarCollapsed ? "ml-16" : "ml-64"
        )}
      >
        <Navbar 
          onMenuClick={toggleSidebar} 
          showMenuButton={isMobile}
          currentUser={user}
        />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
