import { getStaffInfosFromCookies } from "@/services/cookies";
import type { Order, UserSys, Notification, DashboardMetrics, Item } from "./types"
import { getAllItens } from "@/app/(app)/_api/items/get-routes";
import { ApiError } from "next/dist/server/api-utils";

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

export  const  mockItems = async():Promise<Item[ ] | void> => {
  try{ 
    const itensInfos= await getAllItens ();

    if(!itensInfos.sucess){
      return ; 
    }
    return itensInfos.datas

  }catch (error) {
    console.error("Erro Captura de informações de itens: ", error);
    return 
  }

}




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

