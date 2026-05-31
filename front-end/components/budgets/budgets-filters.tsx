"use client"

import { Search, X, Filter } from "lucide-react"
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
import type { BudgetStatus } from "@/lib/types"

interface BudgetsFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: BudgetStatus | "all"
  onStatusChange: (value: BudgetStatus | "all") => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

const statuses: { value: BudgetStatus | "all"; label: string }[] = [
  { value: "all", label: "Todos os status" },
  { value: "rascunho", label: "Rascunho" },
  { value: "enviado", label: "Enviado" },
  { value: "aprovado", label: "Aprovado" },
  { value: "rejeitado", label: "Rejeitado" },
  { value: "expirado", label: "Expirado" },
]

export function BudgetsFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  onClearFilters,
  hasActiveFilters,
}: BudgetsFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por ID, titulo ou cliente..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
            onClick={() => onSearchChange("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <Select value={statusFilter} onValueChange={(value) => onStatusChange(value as BudgetStatus | "all")}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="ghost" onClick={onClearFilters} className="text-muted-foreground">
            Limpar filtros
          </Button>
        )}
      </div>
    </div>
  )
}

interface ActiveFiltersProps {
  statusFilter: BudgetStatus | "all"
  onStatusChange: (value: BudgetStatus | "all") => void
}

export function ActiveFilters({
  statusFilter,
  onStatusChange,
}: ActiveFiltersProps) {
  if (statusFilter === "all") return null

  const statusLabel = statuses.find((s) => s.value === statusFilter)?.label

  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary" className="gap-1">
        {statusLabel}
        <button onClick={() => onStatusChange("all")} className="ml-1 hover:text-foreground">
          <X className="h-3 w-3" />
        </button>
      </Badge>
    </div>
  )
}
