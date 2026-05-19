"use client"

import { Search, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { OrderStatus, Priority } from "@/lib/types"
import { statusConfig, priorityConfig } from "@/lib/order-utils"

interface OrdersFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: OrderStatus | "all"
  onStatusChange: (value: OrderStatus | "all") => void
  priorityFilter: Priority | "all"
  onPriorityChange: (value: Priority | "all") => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

export function OrdersFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  onClearFilters,
  hasActiveFilters,
}: OrdersFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por ID, cliente..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <Select value={statusFilter} onValueChange={(v) => onStatusChange(v as OrderStatus | "all")}>
          <SelectTrigger className="w-40">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            {Object.entries(statusConfig).map(([key, config]) => (
              <SelectItem key={key} value={key}>
                {config.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={(v) => onPriorityChange(v as Priority | "all")}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {Object.entries(priorityConfig).map(([key, config]) => (
              <SelectItem key={key} value={key}>
                {config.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="gap-1">
            <X className="h-4 w-4" />
            Limpar
          </Button>
        )}
      </div>
    </div>
  )
}

interface ActiveFiltersProps {
  statusFilter: OrderStatus | "all"
  priorityFilter: Priority | "all"
  onStatusChange: (value: OrderStatus | "all") => void
  onPriorityChange: (value: Priority | "all") => void
}

export function ActiveFilters({
  statusFilter,
  priorityFilter,
  onStatusChange,
  onPriorityChange,
}: ActiveFiltersProps) {
  const hasFilters = statusFilter !== "all" || priorityFilter !== "all"

  if (!hasFilters) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">Filtros ativos:</span>
      {statusFilter !== "all" && (
        <Badge variant="secondary" className="gap-1">
          Status: {statusConfig[statusFilter].label}
          <button onClick={() => onStatusChange("all")} className="ml-1 hover:text-destructive">
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
      {priorityFilter !== "all" && (
        <Badge variant="secondary" className="gap-1">
          Prioridade: {priorityConfig[priorityFilter].label}
          <button onClick={() => onPriorityChange("all")} className="ml-1 hover:text-destructive">
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
    </div>
  )
}
