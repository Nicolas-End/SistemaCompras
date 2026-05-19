"use client"

import { Package, Clock, CheckCircle, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { DashboardMetrics } from "@/lib/types"
import { cn } from "@/lib/utils"

interface MetricsCardsProps {
  metrics: DashboardMetrics
}

const cards = [
  {
    key: "totalOrders",
    title: "Total de Pedidos",
    icon: Package,
    color: "text-primary",
    bgColor: "bg-primary/10",
    trend: "+12%",
    trendUp: true,
  },
  {
    key: "inProgress",
    title: "Em Andamento",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    trend: "+5%",
    trendUp: true,
  },
  {
    key: "completed",
    title: "Concluídos",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
    trend: "+18%",
    trendUp: true,
  },
  {
    key: "delayed",
    title: "Atrasados",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-100",
    trend: "-3%",
    trendUp: false,
  },
] as const

export function MetricsCards({ metrics }: MetricsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon
        const value = metrics[card.key]

        return (
          <Card key={card.key} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={cn("rounded-lg p-2", card.bgColor)}>
                <Icon className={cn("h-4 w-4", card.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{value}</div>
              <div className="mt-1 flex items-center gap-1 text-xs">
                {card.trendUp ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                <span className={card.trendUp ? "text-green-600" : "text-red-600"}>
                  {card.trend}
                </span>
                <span className="text-muted-foreground">vs mês anterior</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
