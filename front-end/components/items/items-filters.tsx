"use client"

import { Search, X, Filter, SlidersHorizontal } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ItemCategory } from "@/lib/types"

const categories: { value: ItemCategory | "all"; label: string }[] = [
  { value: "all", label: "Todas categorias" },
  { value: "materiais", label: "Materiais" },
  { value: "equipamentos", label: "Equipamentos" },
  { value: "escritorio", label: "Escritório" },
  { value: "limpeza", label: "Limpeza" },
  { value: "outros", label: "Outros" },
]

const stockOptions: { value: "all" | "low" | "normal"; label: string }[] = [
  { value: "all", label: "Todo estoque" },
  { value: "low", label: "Estoque baixo" },
  { value: "normal", label: "Estoque normal" },
]

// ── Active filter chip ────────────────────────────────────────────────────────
function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#E8F5E9] border border-[#C8E6C9] rounded-full text-[12px] font-semibold text-[#2E7D32]">
      {label}
      <button
        onClick={onRemove}
        aria-label={`Remover filtro ${label}`}
        className="flex items-center justify-center w-3.5 h-3.5 rounded-full text-[#81C784] hover:text-[#1B5E20] hover:bg-[#C8E6C9] transition-colors"
      >
        <X className="w-2.5 h-2.5" />
      </button>
    </span>
  )
}

// ── Main filters ──────────────────────────────────────────────────────────────
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
    <div className="flex flex-col gap-3">
      {/* Top row */}
      <div className="flex items-center gap-2.5 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px] group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-[#9aad9b] group-focus-within:text-[#2E7D32] transition-colors pointer-events-none" />
          <input
            type="search"
            placeholder="Buscar por nome, código ou fornecedor..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Buscar produtos"
            className="w-full h-[38px] pl-9 pr-9 text-[13px] font-normal text-[#0d1f0e] bg-[#f8faf8] border-[1.5px] border-[#e2ece2] rounded-[10px] outline-none placeholder:text-[#b0c4b1] hover:border-[#a8c4a9] hover:bg-[#f0f8f0] focus:border-[#2E7D32] focus:bg-white focus:shadow-[0_0_0_3px_rgba(46,125,50,0.10)] transition-all duration-150"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              aria-label="Limpar busca"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded-[5px] text-[#9aad9b] hover:text-[#2E7D32] hover:bg-[#E8F5E9] transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Selects + label */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6b7c6d] px-1 whitespace-nowrap">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filtros
          </span>

          <Select
            value={categoryFilter}
            onValueChange={(v) => onCategoryChange(v as ItemCategory | "all")}
          >
            <SelectTrigger className="h-[38px] w-[170px] text-[13px] border-[#e2ece2] bg-[#f8faf8] hover:border-[#a8c4a9] hover:bg-[#f0f8f0] focus:ring-[#2E7D32]/20 focus:border-[#2E7D32] rounded-[10px] transition-all">
              <Filter className="mr-1.5 h-3.5 w-3.5 text-[#9aad9b] flex-shrink-0" />
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={stockFilter}
            onValueChange={(v) => onStockChange(v as "all" | "low" | "normal")}
          >
            <SelectTrigger className="h-[38px] w-[155px] text-[13px] border-[#e2ece2] bg-[#f8faf8] hover:border-[#a8c4a9] hover:bg-[#f0f8f0] focus:ring-[#2E7D32]/20 focus:border-[#2E7D32] rounded-[10px] transition-all">
              <SelectValue placeholder="Estoque" />
            </SelectTrigger>
            <SelectContent>
              {stockOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center gap-1.5 h-[38px] px-3 text-[12px] font-semibold text-[#6b7c6d] bg-transparent border border-[#e2ece2] rounded-[10px] hover:border-[#a8c4a9] hover:text-[#2E7D32] hover:bg-[#f0faf0] transition-all whitespace-nowrap"
            >
              <X className="w-3 h-3" />
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Active chips row */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-1.5">
          {categoryFilter !== "all" && (
            <FilterChip
              label={categories.find((c) => c.value === categoryFilter)?.label ?? ""}
              onRemove={() => onCategoryChange("all")}
            />
          )}
          {stockFilter !== "all" && (
            <FilterChip
              label={stockOptions.find((s) => s.value === stockFilter)?.label ?? ""}
              onRemove={() => onStockChange("all")}
            />
          )}
          {searchQuery && (
            <FilterChip
              label={`"${searchQuery}"`}
              onRemove={() => onSearchChange("")}
            />
          )}
        </div>
      )}
    </div>
  )
}

// ── ActiveFilters (standalone, backward compat) ───────────────────────────────
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

  return (
    <div className="flex flex-wrap gap-1.5">
      {categoryFilter !== "all" && (
        <FilterChip
          label={categories.find((c) => c.value === categoryFilter)?.label ?? ""}
          onRemove={() => onCategoryChange("all")}
        />
      )}
      {stockFilter !== "all" && (
        <FilterChip
          label={stockOptions.find((s) => s.value === stockFilter)?.label ?? ""}
          onRemove={() => onStockChange("all")}
        />
      )}
    </div>
  )
}