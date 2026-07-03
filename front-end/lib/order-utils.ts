import type { OrderStatus, Priority } from "./types"

export const statusConfig: Record<OrderStatus, { label: string; color: string; bgColor: string }> = {
  CHEGANDO: { label: "Pendente", color: "text-amber-600", bgColor: "bg-amber-100" },
  RECEBIDO: { label: "Em Produção", color: "text-blue-600", bgColor: "bg-blue-100" },
  CANCELADO: { label: "Enviado", color: "text-purple-600", bgColor: "bg-purple-100" }
}

export const priorityConfig: Record<Priority, { label: string; color: string; bgColor: string }> = {
  low: { label: "Baixa", color: "text-slate-600", bgColor: "bg-slate-100" },
  medium: { label: "Média", color: "text-amber-600", bgColor: "bg-amber-100" },
  high: { label: "Alta", color: "text-red-600", bgColor: "bg-red-100" },
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date))
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}

export function getRelativeTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - new Date(date).getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return "Agora mesmo"
  if (minutes < 60) return `Há ${minutes} min`
  if (hours < 24) return `Há ${hours}h`
  if (days === 1) return "Ontem"
  if (days < 7) return `Há ${days} dias`
  return formatDate(date)
}
