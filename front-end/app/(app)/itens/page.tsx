"use client"

import { useState, useMemo } from "react"
import { ItemsTable } from "@/components/items/items-table"
import { ItemsFilters } from "@/components/items/items-filters"
import { NewItemDialog } from "@/components/items/new-item-dialog"
import { mockItems } from "@/lib/mock-data"
import type { ItemCategory } from "@/lib/types"

export default function ItemsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<ItemCategory | "all">("all")
  const [stockFilter, setStockFilter] = useState<"all" | "low" | "normal">("all")
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const filteredItems = useMemo(() => {
    return mockItems.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
      
      const isLowStock = item.quantity <= item.minStock
      const matchesStock = 
        stockFilter === "all" || 
        (stockFilter === "low" && isLowStock) ||
        (stockFilter === "normal" && !isLowStock)

      return matchesSearch && matchesCategory && matchesStock
    })
  }, [searchQuery, categoryFilter, stockFilter])

  const handleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredItems.map((i) => i.id))
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setCategoryFilter("all")
    setStockFilter("all")
  }

  const hasActiveFilters = searchQuery !== "" || categoryFilter !== "all" || stockFilter !== "all"

  const lowStockCount = mockItems.filter(item => item.quantity <= item.minStock).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Itens</h1>
          <p className="text-muted-foreground">
            Gerencie o catalogo de itens do sistema
          </p>
        </div>
        <NewItemDialog />
      </div>

      {lowStockCount > 0 && (
        <div className="rounded-lg border border-warning/50 bg-warning/10 p-4">
          <p className="text-sm font-medium text-warning-foreground">
            {lowStockCount} item(ns) com estoque baixo
          </p>
        </div>
      )}

      <ItemsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        stockFilter={stockFilter}
        onStockChange={setStockFilter}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <div className="text-sm text-muted-foreground">
        {filteredItems.length} item(ns) encontrado(s)
        {selectedItems.length > 0 && (
          <span className="ml-2 text-primary">
            ({selectedItems.length} selecionado(s))
          </span>
        )}
      </div>

      <ItemsTable
        items={filteredItems}
        selectedItems={selectedItems}
        onSelectItem={handleSelectItem}
        onSelectAll={handleSelectAll}
      />
    </div>
  )
}
