"use client"

import { Check, Clock, Package, Truck, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { OrderTimelineEvent, OrderStatus } from "@/lib/types"
import { statusConfig, formatDateTime } from "@/lib/order-utils"
import { cn } from "@/lib/utils"

interface OrderTimelineProps {
  timeline: OrderTimelineEvent[]
}

const statusIcons: Record<OrderStatus, typeof Check> = {
  pending: Clock,
  production: Package,
  shipped: Truck,
  completed: Check,
  cancelled: XCircle,
}

export function OrderTimeline({ timeline }: OrderTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico do Pedido</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-border" />

          <div className="space-y-6">
            {timeline.map((event, index) => {
              const config = statusConfig[event.status]
              const Icon = statusIcons[event.status]
              const isLast = index === timeline.length - 1

              return (
                <div key={event.id} className="relative flex gap-4">
                  {/* Icon */}
                  <div
                    className={cn(
                      "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      isLast ? config.bgColor : "bg-muted",
                      isLast ? config.color : "text-muted-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  {/* Content */}
                  <div className={cn("flex-1 pb-6", isLast && "pb-0")}>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className={cn("font-medium", isLast ? config.color : "text-foreground")}>
                          {config.label}
                        </p>
                        {event.note && (
                          <p className="text-sm text-muted-foreground">{event.note}</p>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>{formatDateTime(event.date)}</p>
                        <p className="text-xs">por {event.user}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
