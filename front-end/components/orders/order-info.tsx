"use client"

import { Mail, Calendar, User, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge, PriorityBadge } from "./status-badge"
import type { Order } from "@/lib/types"
import { formatDate, formatCurrency } from "@/lib/order-utils"

interface OrderInfoProps {
  order: Order
}

export function OrderInfo({ order }: OrderInfoProps) {
  const isDelayed = new Date(order.dueDate) < new Date() && order.status !== "completed" && order.status !== "cancelled"

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Informações do Pedido</CardTitle>
          <div className="flex items-center gap-2">
            <StatusBadge status={order.status} />
            <PriorityBadge priority={order.priority} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Client Info */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Cliente</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{order.clientName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${order.clientEmail}`} className="text-primary hover:underline">
                {order.clientEmail}
              </a>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Datas</h4>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Criado em</p>
                <p className="text-sm">{formatDate(order.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className={`h-4 w-4 ${isDelayed ? "text-destructive" : "text-muted-foreground"}`} />
              <div>
                <p className="text-xs text-muted-foreground">Prazo de entrega</p>
                <p className={`text-sm ${isDelayed ? "text-destructive font-medium" : ""}`}>
                  {formatDate(order.dueDate)}
                  {isDelayed && (
                    <span className="ml-2 inline-flex items-center gap-1 text-xs">
                      <AlertCircle className="h-3 w-3" />
                      Atrasado
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="rounded-lg bg-muted p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Total do Pedido</span>
            <span className="text-2xl font-bold">{formatCurrency(order.total)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
