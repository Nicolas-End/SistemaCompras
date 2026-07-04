"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import {
  ClipboardList, Plus, Search, X, SlidersHorizontal,
  Filter, TrendingUp, Clock, CheckCircle2, XCircle, Package,
  TrendingDownIcon,
  SunIcon,
  TrendingDown,
} from "lucide-react"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { MetricCard, MetricSkeleton } from "@/components/orcamento/metric-cards"
import { OrcamentosTable } from "@/components/orcamento/orcamento-table"
import { mockMyQuotes } from "@/lib/mock-data"
import type { Orcamento, OrcamentoStatus } from "@/lib/types"

const STATUS_FILTER_OPTIONS: { value: OrcamentoStatus | "all"; label: string }[] = [
  { value: "all", label: "Todos os status" },
  { value: "SOLICITADO", label: "Pendente" },
  { value: "EM_COTACAO", label: "Em Cotação" },
  { value: "AGUARDANDO_APROVACAO", label: "Aguard. Aprovação" },
  { value: "APROVADO", label: "Aprovado" },
  { value: "REJEITADO", label: "Rejeitado" }
]

export default function OrcamentosPage() {
  const router = useRouter()
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<OrcamentoStatus | "all">("all")
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  useEffect(() => {

    mockMyQuotes().then((data:Orcamento[]) => {
      setOrcamentos(data)
      setLoading(false)
    })
  }, [])

  const filtered = useMemo(() => {
    return orcamentos.filter((o) => {
      const q = search.toLowerCase()
      const matchSearch =
        q === "" ||
        o.status
      const matchStatus = statusFilter === "all" || o.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [orcamentos, search, statusFilter])

  // Metrics
  const total = orcamentos.length
  const pendentes = orcamentos.filter((o) => o.status === "SOLICITADO").length
  const emCotacao = orcamentos.filter((o) => o.status === "EM_COTACAO").length
  const aguardandoAprovacao = orcamentos.filter((o) => o.status === "AGUARDANDO_APROVACAO").length
  const aprovado = orcamentos.filter((o) => o.status === "APROVADO").length
  const rejeitado = orcamentos.filter((o) => o.status === "REJEITADO").length
  

  const handleSelectOne = (id: string) =>
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])

  const handleSelectAll = () =>
    setSelectedIds(selectedIds.length === filtered.length ? [] : filtered.map((o) => o.id))

  const handleDelete = (id: string) => {
    setOrcamentos((prev) => prev.filter((o) => o.id !== id))
    setSelectedIds((prev) => prev.filter((i) => i !== id))
  }

  const hasFilters = search !== "" || statusFilter !== "all"

  const inputClass =
    "w-full h-[38px] text-[13px] text-[#0d1f0e] bg-[#f8faf8] border-[1.5px] border-[#e2ece2] rounded-[10px] outline-none placeholder:text-[#b0c4b1] hover:border-[#a8c4a9] hover:bg-[#f0f8f0] focus:border-[#2E7D32] focus:bg-white focus:shadow-[0_0_0_3px_rgba(46,125,50,0.10)] transition-all duration-150 font-[inherit]"

  return (
    <div className="min-h-screen bg-[#f5f8f5] p-6 lg:p-8 font-sans">

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4 flex-wrap mb-7">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] flex items-center justify-center shadow-[0_4px_12px_rgba(27,94,32,0.25)] flex-shrink-0">
            <ClipboardList className="w-[22px] h-[22px] text-white" />
          </div>
          <div>
            <h1 className="text-[22px] font-extrabold text-[#0d1f0e] tracking-[-0.03em] leading-tight">
              Orçamentos
            </h1>
            <p className="text-[13px] text-[#6b7c6d] mt-0.5 font-normal">
              Visualize e gerencie todas as solicitações de orçamento cadastradas
            </p>
          </div>
        </div>

        <button
          onClick={() => router.push("/orcamentos/novo")}
          className="relative inline-flex items-center gap-2 h-10 px-4 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white text-[13px] font-bold rounded-[11px] cursor-pointer shadow-[0_3px_12px_rgba(27,94,32,0.28)] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(27,94,32,0.32)] active:translate-y-0 transition-all duration-150 overflow-hidden font-[inherit] border-none"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/12 to-transparent pointer-events-none" />
          <Plus className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Novo Orçamento</span>
        </button>
      </div>

      {/* ── Metrics ── */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 mb-6">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <MetricSkeleton key={i} />)
        ) : (
          <>
            <MetricCard
              icon={<ClipboardList className="w-4 h-4" />}
              label="Total de Orçamentos"
              value={total}
              sub="solicitações"
              accent
            />
            <MetricCard
              icon={<Clock className="w-4 h-4" />}
              label="Pendentes"
              value={pendentes}
              sub="aguardando ação"
              color="bg-amber-50 text-amber-600"
            />
            <MetricCard
              icon={<SunIcon className="w-4 h-4" />}
              label="Aprovado"
              value={aprovado}
              sub="aprovado"
              color="bg-green-50 text-green-600"
            />
            <MetricCard
              icon={<TrendingDown className="w-4 h-4" />}
              label="Rejeitado"
              value={rejeitado}
              sub="rejeitado"
              color="bg-red-50 text-red-600"
            />

          </>
        )}
      </div>

      {/* ── Filters ── */}
      <div className="bg-white border border-[#e2ece2] rounded-2xl px-4 py-3.5 mb-4 flex items-center gap-2.5 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9aad9b] group-focus-within:text-[#2E7D32] transition-colors pointer-events-none" />
          <input
            type="search"
            placeholder="Buscar por número, solicitante ou centro de custo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`${inputClass} pl-9 pr-9`}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9aad9b] hover:text-[#2E7D32] hover:bg-[#E8F5E9] w-5 h-5 rounded flex items-center justify-center transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6b7c6d] whitespace-nowrap">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filtros
        </span>

        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as OrcamentoStatus | "all")}>
          <SelectTrigger className="h-[38px] w-[185px] text-[13px] border-[#e2ece2] bg-[#f8faf8] hover:border-[#a8c4a9] focus:border-[#2E7D32] focus:ring-[#2E7D32]/20 rounded-[10px] transition-all">
            <Filter className="mr-1.5 h-3.5 w-3.5 text-[#9aad9b] flex-shrink-0" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_FILTER_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasFilters && (
          <button
            onClick={() => { setSearch(""); setStatusFilter("all") }}
            className="flex items-center gap-1.5 h-[38px] px-3 text-[12px] font-semibold text-[#6b7c6d] border border-[#e2ece2] rounded-[10px] hover:border-[#a8c4a9] hover:text-[#2E7D32] hover:bg-[#f0faf0] transition-all whitespace-nowrap font-[inherit] bg-transparent cursor-pointer"
          >
            <X className="w-3 h-3" />
            Limpar
          </button>
        )}
      </div>

      {/* ── Result bar ── */}
      <div className="flex items-center justify-between mb-3 min-h-7">
        <span className="text-[13px] text-[#8da48e] font-medium">
          {loading ? "Carregando..." : `${filtered.length} orçamento(s) encontrado(s)`}
          {selectedIds.length > 0 && (
            <span className="inline-flex items-center gap-1.5 ml-2 px-2.5 py-0.5 bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] rounded-full text-[12px] font-semibold">
              {selectedIds.length} selecionado(s)
            </span>
          )}
        </span>
      </div>

      {/* ── Table ── */}
      <div className="bg-white border border-[#e2ece2] rounded-2xl overflow-hidden">
        <OrcamentosTable
          items={filtered}
          loading={loading}
          selectedIds={selectedIds}
          onSelectOne={handleSelectOne}
          onSelectAll={handleSelectAll}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}