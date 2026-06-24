"use client"

import { useState, useMemo, useEffect } from "react"
import { ItemsTable } from "@/components/items/items-table"


import { mockItems } from "@/lib/mock-data"
import type { ItemCategory, Item } from "@/lib/types"
import { NewItemDialog } from "@/components/items/new-item-dialog"
import { ItemsFilters } from "@/components/items/items-filters"


export default function ItemsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState<boolean> (true)
  const [items, setItems] = useState<Item[]>([])
  const [categoryFilter, setCategoryFilter] = useState<ItemCategory | "all">("all")
  const [stockFilter, setStockFilter] = useState<"all" | "low" | "normal">("all")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  
  

  useEffect (()=> {
    async function loadItens() {
      try {
        const datas = await mockItems();
        if(Array.isArray(datas)){
          setItems(datas)
        }
      }finally{
        setLoading(false)
      }

    }
    loadItens()
  }, [])



   const filteredItems =  useMemo(() => {
      
      return  items.filter((item) => {
        const matchesSearch = 
          searchQuery === "" ||
          
          item?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item?.providerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item?.internalId?.toLowerCase().includes(searchQuery.toLowerCase()) 
    
        return matchesSearch 
      })
    }, [items,searchQuery, categoryFilter, stockFilter])

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
