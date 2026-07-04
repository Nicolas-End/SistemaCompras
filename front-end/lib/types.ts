import { UUID } from "crypto"

export type OrcamentoStatus =
  | "SOLICITADO"
  | "EM_COTACAO"
  | "AGUARDANDO_APROVACAO"
  | "APROVADO"
  | "REJEITADO"

export interface OrcamentoItem {
  id: string
  produtoId: string
  produtoNome: string
  quantidade: number
  observacao?: string
}

export interface OrcamentoAnexo {
  id: string
  nome: string
  tipo: string
  tamanho: number
  url?: string
  progresso?: number
  preview?: string
}

export interface Orcamento {
  id: string
  observacoes?: string
  requestFor:String
  itens?: OrcamentoItem[]
  anexos?: OrcamentoAnexo[]
  itemsQuantity?:number
  annexQuantity?:number
  status: OrcamentoStatus
  createdAt: string
  updatedAt: string
}

export interface Produto {
  id: string
  nome: string
  codigo: string
}

export const STATUS_CONFIG: Record<
  OrcamentoStatus,
  { label: string; color: string; bg: string; border: string; dot: string }
> = {
  SOLICITADO: {
    label: "Pendente",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  EM_COTACAO: {
    label: "Em Cotação",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    dot: "bg-blue-500",
  },
  AGUARDANDO_APROVACAO: {
    label: "Aguard. Aprovação",
    color: "text-purple-700",
    bg: "bg-purple-50",
    border: "border-purple-200",
    dot: "bg-purple-500",
  },
  APROVADO: {
    label: "Aprovado",
    color: "text-[#2E7D32]",
    bg: "bg-[#E8F5E9]",
    border: "border-[#C8E6C9]",
    dot: "bg-[#4CAF50]",
  },
  REJEITADO: {
    label: "Rejeitado",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    dot: "bg-red-500",
  }

}

export type OrderStatus = "CHEGANDO" | "RECEBIDO" | "CANCELADO" 

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
  success: boolean | null,
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

export interface Item {
  id:UUID,
  internalCode?: string, 
  name:string,
  price:number,
  createdAt:Date,
  providerName?: string
}


export interface ResponseFront{
    success: boolean,
    datas?:any
    path?:string; 
    title? : string,
    message?: string,
}

export interface ProviderDatas{
    cnpj:string ,
    name:string | null, 
    telephone?:string |null, 
    address?:string |null, 
}



export type ItemCategory = "materiais" | "equipamentos" | "escritorio" | "limpeza" | "outros"