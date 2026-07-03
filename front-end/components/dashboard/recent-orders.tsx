"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Order } from "@/lib/types"
import { statusConfig, priorityConfig, formatCurrency, formatDate } from "@/lib/order-utils"
import { cn } from "@/lib/utils"

interface RecentOrdersProps {
  orders: Order[]
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Pedidos Recentes</CardTitle>
          <CardDescription>Últimos pedidos adicionados ao sistema</CardDescription>
        </div>
        <Link href="/pedidos">
          <Button variant="ghost" size="sm" className="gap-1">
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.status]

            return (
              <Link
                key={order.id}
                href={`/pedidos/${order.id}`}
                className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{order.id}</span>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          
                          "border-transparent"
                        )}
                      >
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{order.employeerName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden text-right sm:block">
                    <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      status.color,
                      status.bgColor,
                      "border-transparent"
                    )}
                  >
                    {status.label}
                  </Badge>
                </div>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
