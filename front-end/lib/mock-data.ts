import { getStaffInfosFromCookies } from "@/services/cookies";
import type { Order, UserSys, Notification, DashboardMetrics, Item, ProviderDatas,Orcamento, Produto } from "./types"
import { getAllItens } from "@/app/(app)/_api/items/get-routes";
import { ApiError } from "next/dist/server/api-utils";
import { getAllProviders } from "@/app/(app)/_api/provider/get-routes";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { tr } from "date-fns/locale";

import type {  } from "./types"

export const mockProdutos: Produto[] = [
  { id: "1", nome: "Papel A4 Resma 500fls", codigo: "PAP-A4-001" },
  { id: "2", nome: "Caneta Esferográfica Azul", codigo: "CAN-AZ-002" },
  { id: "3", nome: "Detergente Líquido 500ml", codigo: "LIM-DET-003" },
  { id: "4", nome: "Notebook Dell Inspiron 15", codigo: "EQP-NTB-004" },
  { id: "5", nome: "Cabo de Rede Cat6 10m", codigo: "MAT-CAB-005" },
  { id: "6", nome: "Estante de Aço 5 Prateleiras", codigo: "ESC-EST-006" },
  { id: "7", nome: "Teclado Mecânico USB", codigo: "EQP-TEC-007" },
  { id: "8", nome: "Mouse Sem Fio Logitech", codigo: "EQP-MSE-008" },
  { id: "9", nome: "Resma Papel Sulfite A3", codigo: "PAP-A3-009" },
  { id: "10", nome: "Caixa de Arquivo Morto", codigo: "ESC-ARQ-010" },
]

export const mockOrcamentos: Orcamento[] = [
  {
    id: "1",
    numero: "ORC-2025-001",
    solicitante: "Ana Souza",
    centroCusto: "TI",
    observacoes: "Urgente para o projeto X.",
    itens: [
      { id: "i1", produtoId: "1", produtoNome: "Papel A4 Resma 500fls", quantidade: 10 },
      { id: "i2", produtoId: "4", produtoNome: "Notebook Dell Inspiron 15", quantidade: 2 },
    ],
    anexos: [
      { id: "a1", nome: "requisicao.pdf", tipo: "application/pdf", tamanho: 204800 },
    ],
    status: "aprovado",
    createdAt: "2025-06-01T10:00:00Z",
    updatedAt: "2025-06-02T09:00:00Z",
  },
  {
    id: "2",
    numero: "ORC-2025-002",
    solicitante: "Carlos Lima",
    centroCusto: "RH",
    itens: [
      { id: "i3", produtoId: "2", produtoNome: "Caneta Esferográfica Azul", quantidade: 50 },
      { id: "i4", produtoId: "10", produtoNome: "Caixa de Arquivo Morto", quantidade: 5 },
    ],
    anexos: [],
    status: "pendente",
    createdAt: "2025-06-05T14:30:00Z",
    updatedAt: "2025-06-05T14:30:00Z",
  },
  {
    id: "3",
    numero: "ORC-2025-003",
    solicitante: "Mariana Ferreira",
    centroCusto: "Financeiro",
    itens: [
      { id: "i5", produtoId: "7", produtoNome: "Teclado Mecânico USB", quantidade: 3 },
      { id: "i6", produtoId: "8", produtoNome: "Mouse Sem Fio Logitech", quantidade: 3 },
    ],
    anexos: [
      { id: "a2", nome: "cotacao.pdf", tipo: "application/pdf", tamanho: 512000 },
      { id: "a3", nome: "foto.jpg", tipo: "image/jpeg", tamanho: 102400 },
    ],
    status: "em_cotacao",
    createdAt: "2025-06-10T09:15:00Z",
    updatedAt: "2025-06-11T11:00:00Z",
  },
  {
    id: "4",
    numero: "ORC-2025-004",
    solicitante: "Pedro Alves",
    centroCusto: "Operações",
    itens: [
      { id: "i7", produtoId: "5", produtoNome: "Cabo de Rede Cat6 10m", quantidade: 20 },
    ],
    anexos: [],
    status: "aguardando_aprovacao",
    createdAt: "2025-06-12T16:00:00Z",
    updatedAt: "2025-06-13T08:30:00Z",
  },
  {
    id: "5",
    numero: "ORC-2025-005",
    solicitante: "Juliana Costa",
    centroCusto: "Marketing",
    itens: [
      { id: "i8", produtoId: "3", produtoNome: "Detergente Líquido 500ml", quantidade: 12 },
      { id: "i9", produtoId: "6", produtoNome: "Estante de Aço 5 Prateleiras", quantidade: 1 },
    ],
    anexos: [{ id: "a4", nome: "aprovacao.pdf", tipo: "application/pdf", tamanho: 307200 }],
    status: "finalizado",
    createdAt: "2025-05-28T11:00:00Z",
    updatedAt: "2025-06-01T15:00:00Z",
  },
  {
    id: "6",
    numero: "ORC-2025-006",
    solicitante: "Roberto Nunes",
    centroCusto: "TI",
    itens: [
      { id: "i10", produtoId: "9", produtoNome: "Resma Papel Sulfite A3", quantidade: 5 },
    ],
    anexos: [],
    status: "rejeitado",
    createdAt: "2025-06-15T10:00:00Z",
    updatedAt: "2025-06-15T14:00:00Z",
  },
]

export async function fetchOrcamentos(): Promise<Orcamento[]> {
  await new Promise((r) => setTimeout(r, 800))
  return mockOrcamentos
}

export async function fetchProdutos(): Promise<Produto[]> {
  await new Promise((r) => setTimeout(r, 400))
  return mockProdutos
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
interface MockReponse{
  success:false,
  datas?: any
}



export async function currentUser(): Promise<UserSys> {
  try {
  
    const userInfos = await getStaffInfosFromCookies();

    return {
      name: userInfos.staffName || "Usuario",
      email: userInfos.staffEmail || "",
      role: userInfos.staffRole,
      createdAt: userInfos.createdAt,
      avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${userInfos.staffName || "User"}`
    };
  } catch (error) {
    console.error("Erro ao obter informacoes do usuario:", error);
    return {
      name: "Usuario",
      email: "",
      role: undefined,
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=User"
    };
  }
} 

export const mockItems = async (): Promise<Item[] | null> => {
  try {
    const response = await getAllItens()
    if (!response.success) {
      
      return null
    }
    
    return response.datas
  } catch (error) {
    console.error("Erro ao capturar informações de itens: ", error)
    return null
  }
}

export const mockProviders = async (): Promise<ProviderDatas[] | null> => {
  try {
    const response = await getAllProviders()
   
    if (!response.success) {

      return null
    
    }

    const nullProvider:ProviderDatas = {
      cnpj:"Não informar",
      name:"Não Informar",
    
    }
    
    return  [... response.datas, nullProvider]
  } catch (error) {
    console.error("Erro ao buscar fornecedores: ", error)
    return null
  }
}


export const mockUsers: UserSys[]= [

]

export const mockOrders: Order[] = [
  
   
]

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Pedido Atualizado",
    message: "O pedido PED-002 foi movido para produção",
    type: "info",
    read: false,
    createdAt: new Date("2024-12-12T10:30:00"),
    orderId: "PED-002",
  },
  {
    id: "2",
    title: "Pedido Concluído",
    message: "O pedido PED-001 foi entregue com sucesso",
    type: "success",
    read: false,
    createdAt: new Date("2024-12-10T15:45:00"),
    orderId: "PED-001",
  },
  {
    id: "3",
    title: "Prazo Próximo",
    message: "O pedido PED-003 vence em 6 dias",
    type: "warning",
    read: true,
    createdAt: new Date("2024-12-12T08:00:00"),
    orderId: "PED-003",
  },
  {
    id: "4",
    title: "Novo Pedido",
    message: "Um novo pedido foi criado: PED-006",
    type: "info",
    read: true,
    createdAt: new Date("2024-12-08T14:20:00"),
    orderId: "PED-006",
  },
]

export const mockDashboardMetrics: DashboardMetrics = {
  totalOrders: 156,
  inProgress: 42,
  completed: 98,
  delayed: 8,
  recentOrders: mockOrders.slice(0, 5),
  chartData: [
    { name: "Jan", pedidos: 45, concluidos: 38 },
    { name: "Fev", pedidos: 52, concluidos: 45 },
    { name: "Mar", pedidos: 61, concluidos: 55 },
    { name: "Abr", pedidos: 58, concluidos: 52 },
    { name: "Mai", pedidos: 72, concluidos: 65 },
    { name: "Jun", pedidos: 68, concluidos: 62 },
    { name: "Jul", pedidos: 85, concluidos: 78 },
    { name: "Ago", pedidos: 91, concluidos: 84 },
    { name: "Set", pedidos: 78, concluidos: 71 },
    { name: "Out", pedidos: 95, concluidos: 88 },
    { name: "Nov", pedidos: 102, concluidos: 95 },
    { name: "Dez", pedidos: 156, concluidos: 98 },
  ],
}

