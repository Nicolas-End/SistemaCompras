import { UUID } from "crypto"

export type OrderStatus = "CHEGANDO" | "RECEBIDO" | "CANCELADO " | "completed" | "cancelled"

export type Priority = "low" | "medium" | "high"

export type UserRole = "ADMINISTRADOR" | "COMPRADOR" | "VENDEDOR" | "MOTORISTA"


export interface LoginDatas{
    email:string;
    password:string;
}


export interface UserSys {
  id?: UUID
  name?: string 
  email?: string 
  role?: UserRole
  avatar?: string
  createdAt?: Date
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


export interface ApiResponse{ 
  error:string |null,
  message:string | null,
  path:string | null,
  status: string | null,
  sucess: boolean | null,
  time: Date | null
}


export interface Notification {
  id:string,
  title:string,
  message:string,
  type:string,
  read:boolean,
  createdAt:Date,
  orderId:string
}

// Tipos para Itens
export interface Item {
  id: string
  name: string
  description: string
  category: string
  sku: string
  price: number
  quantity: number
  minStock: number
  unit: string
  supplier?: string
  imageUrl?: string
  createdAt: Date
  updatedAt: Date
}

export type ItemCategory = "materiais" | "equipamentos" | "escritorio" | "limpeza" | "outros"

// Tipos para Orcamentos
export type BudgetStatus = "rascunho" | "enviado" | "aprovado" | "rejeitado" | "expirado"

export interface BudgetItem {
  id: string
  itemId: string
  itemName: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface Budget {
  id: string
  title: string
  description?: string
  clientName: string
  clientEmail: string
  clientPhone?: string
  status: BudgetStatus
  items: BudgetItem[]
  subtotal: number
  discount: number
  tax: number
  total: number
  validUntil: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
  createdBy: string
}
