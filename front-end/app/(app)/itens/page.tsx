"use client"

import { useState, useMemo, useEffect } from "react"
import { Package, TrendingUp, Users, Clock } from "lucide-react"
import { ItemsTable } from "@/components/items/items-table"
import { mockItems } from "@/lib/mock-data"
import type { ItemCategory, Item } from "@/lib/types"
import { NewItemDialog } from "@/components/items/new-item-dialog"
import { ItemsFilters } from "@/components/items/items-filters"

// ── Skeleton card ─────────────────────────────────────────────────────────────
function MetricSkeleton() {
  return (
    <div className="bg-white border border-[#e2ece2] rounded-2xl p-5">
      <div className="h-2.5 w-[55%] rounded bg-[#e8f0e8] animate-pulse mb-3" />
      <div className="h-7 w-[38%] rounded bg-[#e8f0e8] animate-pulse" />
    </div>
  )
}

// ── Metric card ───────────────────────────────────────────────────────────────
interface MetricCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  sub?: string
  accent?: boolean
}

function MetricCard({ icon, label, value, sub, accent }: MetricCardProps) {
  return (
    <div
      className={`rounded-2xl p-5 border transition-all duration-150 hover:-translate-y-px hover:shadow-[0_4px_18px_rgba(27,94,32,0.09)] ${
        accent
          ? "bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] border-transparent"
          : "bg-white border-[#e2ece2]"
      }`}
    >
      <div className="flex items-center justify-between mb-2.5">
        <span
          className={`text-[10px] font-bold uppercase tracking-[0.06em] ${
            accent ? "text-white/65" : "text-[#6b7c6d]"
          }`}
        >
          {label}
        </span>
        <span
          className={`w-[30px] h-[30px] rounded-[8px] flex items-center justify-center ${
            accent ? "bg-white/15 text-white" : "bg-[#f0faf0] text-[#2E7D32]"
          }`}
        >
          {icon}
        </span>
      </div>
      <div
        className={`text-[26px] font-extrabold tracking-[-0.04em] leading-none ${
          accent ? "text-white" : "text-[#0d1f0e]"
        }`}
      >
        {value}
      </div>
      {sub && (
        <div
          className={`text-[11px] mt-1.5 truncate ${
            accent ? "text-white/60" : "text-[#8da48e]"
          }`}
        >
          {sub}
        </div>
      )}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ItemsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<Item[]>([])
  const [categoryFilter, setCategoryFilter] = useState<ItemCategory | "all">("all")
  const [stockFilter, setStockFilter] = useState<"all" | "low" | "normal">("all")
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  useEffect(() => {
    async function loadItems() {
      try {
        const datas = await mockItems()
        if (Array.isArray(datas)) setItems(datas)
      } finally {
        setLoading(false)
      }
    }
    loadItems()
  }, [])

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const q = searchQuery.toLowerCase()
      return (
        q === "" ||
        item?.name.toLowerCase().includes(q) ||
        item?.providerName?.toLowerCase().includes(q) ||
        item?.internalCode?.includes(searchQuery)
      )
    })
  }, [items, searchQuery, categoryFilter, stockFilter])

  const thisMonth = useMemo(() => {
    const now = new Date()
    return items.filter((i) => {
      const d = new Date(i.createdAt)
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    }).length
  }, [items])

  const uniqueProviders = useMemo(
    () => new Set(items.map((i) => i.providerName).filter(Boolean)).size,
    [items]
  )

  const lastItem = useMemo(
    () =>
      [...items].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0],
    [items]
  )

  const handleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) setSelectedItems([])
    else setSelectedItems(filteredItems.map((i) => i.id))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setCategoryFilter("all")
    setStockFilter("all")
  }

  const hasActiveFilters =
    searchQuery !== "" || categoryFilter !== "all" || stockFilter !== "all"

  return (
    <div className="min-h-screen bg-[#f5f8f5] p-8 font-sans">

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4 flex-wrap mb-7">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] flex items-center justify-center shadow-[0_4px_12px_rgba(27,94,32,0.25)] flex-shrink-0">
            <Package className="w-[22px] h-[22px] text-white" />
          </div>
          <div>
            <h1 className="text-[22px] font-extrabold text-[#0d1f0e] tracking-[-0.03em] leading-tight">
              Produtos
            </h1>
            <p className="text-[13px] text-[#6b7c6d] mt-0.5 font-normal">
              Visualize, cadastre, edite e exclua produtos do sistema
            </p>
          </div>
        </div>
        <NewItemDialog />
      </div>

      {/* ── Metrics ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 mb-6">
        {loading ? (
          <>
            <MetricSkeleton />
            <MetricSkeleton />
            <MetricSkeleton />
            <MetricSkeleton />
          </>
        ) : (
          <>
            <MetricCard
              icon={<Package className="w-[15px] h-[15px]" />}
              label="Total de Produtos"
              value={items.length}
              sub="itens no catálogo"
              accent
            />
            <MetricCard
              icon={<TrendingUp className="w-[15px] h-[15px]" />}
              label="Cadastrados no Mês"
              value={thisMonth}
              sub="novos este mês"
            />
            <MetricCard
              icon={<Users className="w-[15px] h-[15px]" />}
              label="Fornecedores"
              value={uniqueProviders}
              sub="fornecedores ativos"
            />
            <MetricCard
              icon={<Clock className="w-[15px] h-[15px]" />}
              label="Último Cadastrado"
              value={lastItem?.name ?? "—"}
              sub={
                lastItem
                  ? new Date(lastItem.createdAt).toLocaleDateString("pt-BR")
                  : ""
              }
            />
          </>
        )}
      </div>


      <div className="bg-white border border-[#e2ece2] rounded-2xl px-4 py-3.5 mb-4">
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
      </div>


      <div className="flex items-center justify-between mb-3 min-h-7">
        <span className="text-[13px] text-[#8da48e] font-medium">
          {loading ? "Carregando..." : `${filteredItems.length} produto(s) encontrado(s)`}
          {selectedItems.length > 0 && (
            <span className="inline-flex items-center gap-1.5 ml-2 px-2.5 py-0.5 bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] rounded-full text-[12px] font-semibold">
              {selectedItems.length} selecionado(s)
            </span>
          )}
        </span>
      </div>


      <div className="bg-white border border-[#e2ece2] rounded-2xl overflow-hidden">
        <ItemsTable
          items={filteredItems}
          selectedItems={selectedItems}
          onSelectItem={handleSelectItem}
          onSelectAll={handleSelectAll}
          loading={loading}
        />
      </div>
    </div>
  )
}