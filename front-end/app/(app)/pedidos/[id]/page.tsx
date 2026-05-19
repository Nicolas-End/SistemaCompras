"use client"

import { use, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Edit, Trash2, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OrderInfo } from "@/components/orders/order-info"
import { OrderItems } from "@/components/orders/order-items"
import { OrderTimeline } from "@/components/orders/order-timeline"
import { OrderActions } from "@/components/orders/order-actions"
import { mockOrders } from "@/lib/mock-data"
import type { OrderStatus } from "@/lib/types"

interface OrderDetailPageProps {
  params: Promise<{ id: string }>
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = use(params)
  const [order, setOrder] = useState(() => {
    return mockOrders.find((o) => o.id === id)
  })

  if (!order) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Pedido não encontrado</h1>
        <p className="text-muted-foreground">O pedido {id} não existe no sistema.</p>
        <Link href="/pedidos">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar para pedidos
          </Button>
        </Link>
      </div>
    )
  }

  const handleUpdateStatus = async (newStatus: OrderStatus, note: string) => {
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setOrder((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        status: newStatus,
        updatedAt: new Date(),
        timeline: [
          ...prev.timeline,
          {
            id: String(prev.timeline.length + 1),
            status: newStatus,
            date: new Date(),
            user: "Carlos Silva",
            note: note || undefined,
          },
        ],
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link href="/pedidos">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{order.id}</h1>
            <p className="text-muted-foreground">{order.clientName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Printer className="h-4 w-4" />
            Imprimir
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Edit className="h-4 w-4" />
            Editar
          </Button>
          <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" />
            Excluir
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          <OrderInfo order={order} />
          <OrderItems items={order.items} />
          <OrderTimeline timeline={order.timeline} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <OrderActions
            currentStatus={order.status}
            onUpdateStatus={handleUpdateStatus}
          />
        </div>
      </div>
    </div>
  )
}
