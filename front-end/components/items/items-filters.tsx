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
import type { ItemCategory } from "@/lib/types"

interface ItemsFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  categoryFilter: ItemCategory | "all"
  onCategoryChange: (value: ItemCategory | "all") => void
  stockFilter: "all" | "low" | "normal"
  onStockChange: (value: "all" | "low" | "normal") => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

const categories: { value: ItemCategory | "all"; label: string }[] = [
  { value: "all", label: "Todas categorias" },
  { value: "materiais", label: "Materiais" },
  { value: "equipamentos", label: "Equipamentos" },
  { value: "escritorio", label: "Escritorio" },
  { value: "limpeza", label: "Limpeza" },
  { value: "outros", label: "Outros" },
]

const stockOptions: { value: "all" | "low" | "normal"; label: string }[] = [
  { value: "all", label: "Todo estoque" },
  { value: "low", label: "Estoque baixo" },
  { value: "normal", label: "Estoque normal" },
]

export function ItemsFilters({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  stockFilter,
  onStockChange,
  onClearFilters,
  hasActiveFilters,
}: ItemsFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome, SKU ou descricao..."
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
        <Select value={categoryFilter} onValueChange={(value) => onCategoryChange(value as ItemCategory | "all")}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={stockFilter} onValueChange={(value) => onStockChange(value as "all" | "low" | "normal")}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Estoque" />
          </SelectTrigger>
          <SelectContent>
            {stockOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
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
  categoryFilter: ItemCategory | "all"
  stockFilter: "all" | "low" | "normal"
  onCategoryChange: (value: ItemCategory | "all") => void
  onStockChange: (value: "all" | "low" | "normal") => void
}

export function ActiveFilters({
  categoryFilter,
  stockFilter,
  onCategoryChange,
  onStockChange,
}: ActiveFiltersProps) {
  if (categoryFilter === "all" && stockFilter === "all") return null

  const categoryLabel = categories.find((c) => c.value === categoryFilter)?.label
  const stockLabel = stockOptions.find((s) => s.value === stockFilter)?.label

  return (
    <div className="flex flex-wrap gap-2">
      {categoryFilter !== "all" && (
        <Badge variant="secondary" className="gap-1">
          {categoryLabel}
          <button onClick={() => onCategoryChange("all")} className="ml-1 hover:text-foreground">
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
      {stockFilter !== "all" && (
        <Badge variant="secondary" className="gap-1">
          {stockLabel}
          <button onClick={() => onStockChange("all")} className="ml-1 hover:text-foreground">
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
    </div>
  )
}
