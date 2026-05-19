export type OrderStatus = "pending" | "production" | "shipped" | "completed" | "cancelled"

export type Priority = "low" | "medium" | "high"

export type UserRole = "admin" | "employee"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  createdAt: Date
}

export interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
}

export interface OrderTimelineEvent {
  id: string
  status: OrderStatus
  date: Date
  user: string
  note?: string
}

export interface Order {
  id: string
  clientName: string
  clientEmail: string
  status: OrderStatus
  priority: Priority
  items: OrderItem[]
  total: number
  createdAt: Date
  updatedAt: Date
  dueDate: Date
  timeline: OrderTimelineEvent[]
  assignedTo?: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: Date
  orderId?: string
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
