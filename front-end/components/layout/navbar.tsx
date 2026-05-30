"use client"

import { useEffect, useState } from "react"
import { Bell, Search, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { mockNotifications, currentUser } from "@/lib/mock-data"
import {UserSys} from "@/lib/types"
import { getRelativeTime } from "@/lib/order-utils"
import { cn } from "@/lib/utils"
import Link from "next/link"


const  [showCurrentUser , setShowCurrentUser] = useState< UserSys | null> (null)

interface NavbarProps {
  onMenuClick: () => void
  showMenuButton: boolean
}


export function Navbar({ onMenuClick, showMenuButton }: NavbarProps) {
  const [notifications] = useState(mockNotifications)
  const unreadCount = notifications.filter((n) => !n.read).length
  useEffect(() => {
  async function setUser() {
    const user = await currentUser(); 
    setShowCurrentUser(user);
  }

  setUser(); 
  }, [])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500"
      case "warning":
        return "bg-amber-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-blue-500"
    }
  }
function carregando () {

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:px-6">
      <div className="flex items-center gap-4">
        {showMenuButton && (
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar pedidos, clientes..."
            className="w-80 pl-9 bg-secondary/50 border-transparent focus:border-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center bg-destructive text-destructive-foreground">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="flex items-center justify-between border-b border-border p-4">
              <h4 className="font-semibold">Notificações</h4>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                Marcar todas como lidas
              </Button>
            </div>
            <ScrollArea className="h-80">
              {notifications.length === 0 ? (
                <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                  Nenhuma notificação
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {notifications.map((notification) => (
                    <Link
                      key={notification.id}
                      href={notification.orderId ? `/pedidos/${notification.orderId}` : "#"}
                      className={cn(
                        "flex gap-3 p-4 transition-colors hover:bg-muted/50",
                        !notification.read && "bg-primary/5"
                      )}
                    >
                      <div
                        className={cn(
                          "mt-1 h-2 w-2 shrink-0 rounded-full",
                          getNotificationIcon(notification.type)
                        )}
                      />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {notification.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {getRelativeTime(notification.createdAt)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </ScrollArea>
          </PopoverContent>
        </Popover>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={showCurrentUser?.avatar} alt={showCurrentUser?.name} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {showCurrentUser != null && showCurrentUser.name != undefined  ? showCurrentUser.name.split(" ").map((n) => n[0]).join(""): "Carregando"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left lg:block">
                <p className="text-sm font-medium">{showCurrentUser?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {showCurrentUser?.role}
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href="/">
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                Sair
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
}
