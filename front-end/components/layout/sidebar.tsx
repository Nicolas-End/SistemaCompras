"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  LogOut,
  ClipboardList,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { logout } from "@/services/cookies"

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const navItems = [
  { href: "/dashboard",     icon: LayoutDashboard, label: "Dashboard" },
  { href: "/pedidos",       icon: Package,         label: "Pedidos" },
  { href: "/orcamentos",    icon: ClipboardList,   label: "Orçamentos" },
  { href: "/itens",         icon: ShoppingCart,    label: "Itens" },
  { href: "/usuarios",      icon: Users,           label: "Usuários" },
  { href: "/configuracoes", icon: Settings,        label: "Configurações" },
]

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen flex-col bg-gradient-to-b from-[#0a2e0d] via-[#0f3d13] to-[#0a2e0d] border-r border-white/[0.06] transition-all duration-300 ease-in-out ${
          collapsed ? "w-[68px]" : "w-[240px]"
        }`}
      >
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Top glow */}
        <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(76,175,80,0.12)_0%,transparent_100%)]" />

        {/* ── Logo ── */}
        <div className={`relative z-10 flex h-16 items-center border-b border-white/[0.07] flex-shrink-0 ${collapsed ? "justify-center px-0" : "gap-3 px-4"}`}>
          {/* Icon mark */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] border border-white/10 flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(27,94,32,0.4)]">
            <Package className="w-[18px] h-[18px] text-white" />
          </div>

          {/* Brand text */}
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-white font-bold text-[14px] leading-none tracking-[-0.02em] truncate">
                Projeto Compras
              </p>
              <p className="text-white/40 text-[10px] font-normal uppercase tracking-widest mt-0.5">
                Compras
              </p>
            </div>
          )}
        </div>

        {/* ── Nav label ── */}
        {!collapsed && (
          <p className="relative z-10 px-4 pt-4 pb-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white/25">
            Menu
          </p>
        )}

        {/* ── Navigation ── */}
        <nav className={`relative z-10 flex-1 flex flex-col gap-0.5 px-2 py-2 overflow-y-auto overflow-x-hidden`}>
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/")
            const Icon = item.icon

            const linkContent = (
              <Link
                href={item.href}
                className={`group relative flex items-center gap-3 h-10 rounded-xl transition-all duration-150 overflow-hidden ${
                  collapsed ? "w-10 justify-center mx-auto" : "px-3"
                } ${
                  isActive
                    ? "bg-gradient-to-r from-[#2E7D32]/90 to-[#388E3C]/70 shadow-[0_2px_8px_rgba(46,125,50,0.35)]"
                    : "hover:bg-white/[0.06] text-white/55 hover:text-white/90"
                }`}
              >
                {/* Active left bar */}
                {isActive && !collapsed && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#81C784] rounded-full" />
                )}

                {/* Shimmer on hover */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-white/[0.04] to-transparent transition-opacity duration-200 pointer-events-none" />

                <Icon
                  className={`flex-shrink-0 transition-colors duration-150 ${
                    collapsed ? "w-[18px] h-[18px]" : "w-4 h-4"
                  } ${isActive ? "text-white" : "text-white/50 group-hover:text-white/80"}`}
                />

                {!collapsed && (
                  <span
                    className={`text-[13px] font-medium leading-none truncate transition-colors duration-150 ${
                      isActive ? "text-white" : "text-white/55 group-hover:text-white/90"
                    }`}
                  >
                    {item.label}
                  </span>
                )}

                {/* Active dot when collapsed */}
                {collapsed && isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#81C784]" />
                )}
              </Link>
            )

            return collapsed ? (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-[#1a3d1d] border border-white/10 text-white text-[12px] font-medium"
                >
                  {item.label}
                </TooltipContent>
              </Tooltip>
            ) : (
              <span key={item.href}>{linkContent}</span>
            )
          })}
        </nav>

        {/* ── Footer ── */}
        <div className="relative z-10 border-t border-white/[0.07] p-2 flex flex-col gap-1 flex-shrink-0">

          {/* Toggle collapse */}
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onToggle}
                  className="flex items-center justify-center w-10 h-10 mx-auto rounded-xl text-white/40 hover:text-white/80 hover:bg-white/[0.06] transition-all duration-150"
                  aria-label="Expandir menu"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-[#1a3d1d] border border-white/10 text-white text-[12px] font-medium"
              >
                Expandir menu
              </TooltipContent>
            </Tooltip>
          ) : (
            <button
              onClick={onToggle}
              className="flex items-center gap-2.5 h-9 px-3 rounded-xl text-white/40 hover:text-white/80 hover:bg-white/[0.06] transition-all duration-150 w-full text-left font-[inherit]"
              aria-label="Recolher menu"
            >
              <ChevronLeft className="w-4 h-4 flex-shrink-0" />
              <span className="text-[12px] font-medium">Recolher</span>
            </button>
          )}

          {/* Logout */}
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <form action={logout} className="flex justify-center">
                  <button
                    type="submit"
                    className="flex items-center justify-center w-10 h-10 rounded-xl text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
                    aria-label="Sair"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </form>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-[#1a3d1d] border border-white/10 text-white text-[12px] font-medium"
              >
                Sair
              </TooltipContent>
            </Tooltip>
          ) : (
            <form action={logout}>
              <button
                type="submit"
                className="flex items-center gap-2.5 h-9 px-3 rounded-xl text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150 w-full text-left font-[inherit]"
              >
                <LogOut className="w-4 h-4 flex-shrink-0" />
                <span className="text-[12px] font-medium">Sair</span>
              </button>
            </form>
          )}

          {/* Version tag */}
          {!collapsed && (
            <p className="text-center text-[10px] text-white/15 pt-1 pb-0.5 tracking-wide">
              v1.0.0 · ProcureSync
            </p>
          )}
        </div>
      </aside>
    </TooltipProvider>
  )
}