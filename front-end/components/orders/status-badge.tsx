"use client"

import { Badge } from "@/components/ui/badge"
import type { OrderStatus, Priority } from "@/lib/types"
import { statusConfig, priorityConfig } from "@/lib/order-utils"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: OrderStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <Badge
      variant="outline"
      className={cn(config.color, config.bgColor, "border-transparent font-medium")}
    >
      {config.label}
    </Badge>
  )
}

interface PriorityBadgeProps {
  priority: Priority
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config = priorityConfig[priority]
  return (
    <Badge
      variant="outline"
      className={cn(config.color, config.bgColor, "border-transparent font-medium")}
    >
      {config.label}
    </Badge>
  )
}
