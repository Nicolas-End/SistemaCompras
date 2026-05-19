"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import type { OrderStatus } from "@/lib/types"
import { statusConfig } from "@/lib/order-utils"
import { cn } from "@/lib/utils"

interface OrderActionsProps {
  currentStatus: OrderStatus
  onUpdateStatus: (status: OrderStatus, note: string) => Promise<void>
}

const statusOrder: OrderStatus[] = ["pending", "production", "shipped", "completed"]

export function OrderActions({ currentStatus, onUpdateStatus }: OrderActionsProps) {
  const [newStatus, setNewStatus] = useState<OrderStatus>(currentStatus)
  const [note, setNote] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = async () => {
    if (newStatus === currentStatus) return
    setIsLoading(true)
    await onUpdateStatus(newStatus, note)
    setIsLoading(false)
    setNote("")
  }

  const canUpdate = newStatus !== currentStatus && currentStatus !== "cancelled" && currentStatus !== "completed"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Atualizar Status</CardTitle>
        <CardDescription>Altere o status do pedido e adicione uma observação</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Actions */}
        {canUpdate && (
          <div className="flex flex-wrap gap-2">
            {statusOrder.map((status) => {
              const config = statusConfig[status]
              const isNext = statusOrder.indexOf(status) === statusOrder.indexOf(currentStatus) + 1
              const isPast = statusOrder.indexOf(status) <= statusOrder.indexOf(currentStatus)

              if (status === currentStatus || status === "pending") return null

              return (
                <Button
                  key={status}
                  variant={isNext ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNewStatus(status)}
                  disabled={isPast && status !== currentStatus}
                  className={cn(
                    !isNext && newStatus === status && "ring-2 ring-primary ring-offset-2"
                  )}
                >
                  {config.label}
                </Button>
              )
            })}
          </div>
        )}

        {/* Status Select */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Novo Status</label>
          <Select
            value={newStatus}
            onValueChange={(v) => setNewStatus(v as OrderStatus)}
            disabled={currentStatus === "cancelled" || currentStatus === "completed"}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(statusConfig).map(([key, config]) => (
                <SelectItem key={key} value={key}>
                  {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Note */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Observação (opcional)</label>
          <Textarea
            placeholder="Adicione uma nota sobre a atualização..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
          />
        </div>

        {/* Update Button */}
        <Button
          className="w-full"
          onClick={handleUpdate}
          disabled={!canUpdate || isLoading}
        >
          {isLoading ? (
            <>
              <Spinner className="mr-2" />
              Atualizando...
            </>
          ) : (
            "Atualizar Status"
          )}
        </Button>

        {(currentStatus === "completed" || currentStatus === "cancelled") && (
          <p className="text-center text-sm text-muted-foreground">
            Este pedido foi {currentStatus === "completed" ? "concluído" : "cancelado"} e não pode ser alterado.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
