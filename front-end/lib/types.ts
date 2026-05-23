import { UUID } from "crypto"

export type OrderStatus = "CHEGANDO" | "RECEBIDO" | "CANCELADO " | "completed" | "cancelled"

export type Priority = "low" | "medium" | "high"

export type UserRole = "ADMINISTRADOR" | "COMPRADOR" | "VENDEDOR" | "MOTORISTA"

export interface User {
  id: UUID 
  name: string
  email: string
  role: UserRole
  avatar?: string
  createdAt: Date
}

export interface OrderItem {
  id: UUID 
  name: string
  quantity: number
  price: number
}

export interface OrderTimelineEvent {
  id: UUID 
  status: OrderStatus
  date: Date
  user: string
  note?: string
}

export interface Order {
  id: UUID 
  employeerName: string
  employeerEmail: string
  status: OrderStatus
  items: OrderItem[]
  total: number
  createdAt: Date
  updatedAt: Date
  assignedTo?: string
}


export interface DashboardMetrics {
  totalOrders: number
  inProgress: number
  completed: number
  delayed: number
  recentOrders: Order[]
  chartData: {
    name: string
    pedidos: number
    concluidos: number
  }[]
}
