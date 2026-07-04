"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MoreHorizontal, Eye, Pencil, Trash2, FileText, Paperclip, ClipboardList, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { StatusBadge } from "./status-badge"
import { formatDate } from "@/lib/mock-data"
import type { Orcamento } from "@/lib/types"

type SortKey = "numero" | "solicitante" | "createdAt" | "status"
type SortDir = "asc" | "desc"
const PAGE_SIZE = 8

const thCls = "text-[11px] font-bold text-[#6b7c6d] uppercase tracking-[0.07em] px-4 py-3 bg-[#f8faf8] border-b border-[#e2ece2] whitespace-nowrap select-none text-left"
const pgBtn = "flex items-center justify-center min-w-[30px] h-8 rounded-lg border border-[#e2ece2] text-[12px] font-medium px-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-[#374937] hover:bg-[#f0faf0] hover:border-[#a8c4a9] hover:text-[#2E7D32]"

interface Props {
  items: Orcamento[]
  loading: boolean
  selectedIds: string[]
  onSelectOne: (id: string) => void
  onSelectAll: () => void
  onDelete: (id: string) => void
}

export function OrcamentosTable({ items, loading, selectedIds, onSelectOne, onSelectAll, onDelete }: Props) {
  const router = useRouter()
  const [sortKey, setSortKey] = useState<SortKey>("createdAt")
  const [sortDir, setSortDir] = useState<SortDir>("desc")
  const [page, setPage] = useState(1)

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) setSortDir(d => d === "asc" ? "desc" : "asc")
    else { setSortKey(key); setSortDir("asc") }
    setPage(1)
  }

  const sorted = [...items].sort((a, b) => {
    const av = sortKey === "createdAt" ? new Date(a.createdAt).getTime().toString() : (a[sortKey] ?? "") as string
    const bv = sortKey === "createdAt" ? new Date(b.createdAt).getTime().toString() : (b[sortKey] ?? "") as string
    return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av)
  })

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const paged = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortKey === col
      ? sortDir === "asc" ? <ArrowUp className="w-3 h-3 text-[#2E7D32]" /> : <ArrowDown className="w-3 h-3 text-[#2E7D32]" />
      : <ArrowUpDown className="w-3 h-3 text-[#c8d8c9]" />

  const Actions = ({ orc }: { orc: Orcamento }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center w-8 h-8 rounded-lg border border-transparent text-[#9aad9b] hover:bg-[#f0f5f0] hover:border-[#d4e4d5] hover:text-[#2E7D32] transition-all" aria-label="Ações">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => router.push(`/orcamentos/${orc.id}`)}><Eye className="mr-2 h-4 w-4" />Visualizar</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/orcamentos/${orc.id}/editar`)}><Pencil className="mr-2 h-4 w-4" />Editar</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => onDelete(orc.id)}><Trash2 className="mr-2 h-4 w-4" />Excluir</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  const Empty = () => (
    <div className="flex flex-col items-center py-14 px-6">
      <div className="w-12 h-12 rounded-2xl bg-[#f0faf0] border border-[#c8e6c9] flex items-center justify-center mb-3 text-[#81C784]">
        <ClipboardList className="w-5 h-5" />
      </div>
      <p className="text-[14px] font-bold text-[#0d1f0e] mb-1">Nenhum orçamento encontrado</p>
      <p className="text-[12px] text-[#8da48e] text-center">Ajuste os filtros ou crie um novo orçamento.</p>
    </div>
  )

  const Pagination = () => sorted.length <= PAGE_SIZE ? null : (
    <div className="flex items-center justify-between px-4 py-3 border-t border-[#e8f0e8] bg-[#fafcfa] flex-wrap gap-2">
      <span className="text-[11px] text-[#8da48e]">{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, sorted.length)} de {sorted.length}</span>
      <div className="flex gap-1">
        <button disabled={page === 1} onClick={() => setPage(1)} className={pgBtn}>«</button>
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className={pgBtn}>‹</button>
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
          .reduce<(number | "…")[]>((acc, p, i, arr) => {
            if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("…")
            acc.push(p); return acc
          }, [])
          .map((p, i) => p === "…"
            ? <span key={`e${i}`} className="flex items-center justify-center min-w-[30px] h-8 text-[12px] text-[#8da48e]">…</span>
            : <button key={p} onClick={() => setPage(p as number)} className={`${pgBtn} ${p === page ? "bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] !text-white !border-transparent" : ""}`}>{p}</button>
          )}
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className={pgBtn}>›</button>
        <button disabled={page === totalPages} onClick={() => setPage(totalPages)} className={pgBtn}>»</button>
      </div>
    </div>
  )

  // ── Skeleton rows ──────────────────────────────────────────────────────────
  const skeletonWidths = [44, 100, 120, 50, 50, 80, 90, 30]

  return (
    <>
      {/* ── MOBILE: cards ─────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col gap-2.5 p-3">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white border border-[#e2ece2] rounded-2xl p-4 flex flex-col gap-3">
                <div className="flex justify-between">
                  <div className="h-3 w-28 rounded bg-[#e8f0e8] animate-pulse" />
                  <div className="h-5 w-20 rounded-full bg-[#e8f0e8] animate-pulse" />
                </div>
                <div className="h-3 w-36 rounded bg-[#e8f0e8] animate-pulse" />
                <div className="flex gap-3 pt-2 border-t border-[#f0f5f0]">
                  <div className="h-2.5 w-14 rounded bg-[#e8f0e8] animate-pulse" />
                  <div className="h-2.5 w-14 rounded bg-[#e8f0e8] animate-pulse" />
                </div>
              </div>
            ))
          : paged.length === 0
          ? <Empty />
          : paged.map(orc => {
              const sel = selectedIds.includes(orc.id)
              return (
                <div key={orc.id} className={`relative rounded-2xl border p-4 transition-all ${sel ? "bg-[#f0faf0] border-[#a8d5a9]" : "bg-white border-[#e2ece2]"}`}>
                  {sel && <span className="absolute left-0 top-4 bottom-4 w-[3px] bg-[#2E7D32] rounded-r-full" />}

                  {/* Top */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Checkbox checked={sel} onCheckedChange={() => onSelectOne(orc.id)} aria-label={`Selecionar ${orc.id}`} />
                      <span className="font-mono text-[11px] text-[#6b7c6d] bg-[#f5f9f5] border border-[#e2ece2] px-2 py-0.5 rounded-md">{orc.id}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <StatusBadge status={orc.status} />
                      <Actions orc={orc} />
                    </div>
                  </div>

                  {/* Solicitante */}
                  <p className="text-[10px] font-bold text-[#9aad9b] uppercase tracking-wider mb-0.5">Solicitante</p>
                  <p className="text-[13px] font-semibold text-[#0d1f0e] mb-3">{orc.requestFor}</p>

                  {/* Footer */}
                  <div className="flex items-center gap-3 pt-2.5 border-t border-[#f0f5f0]">
                    <span className="flex items-center gap-1 text-[11px] font-medium text-[#374937]">
                      <FileText className="w-3.5 h-3.5 text-[#9aad9b]" />{orc.itemsQuantity} itens
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-medium text-[#374937]">
                      <Paperclip className="w-3.5 h-3.5 text-[#9aad9b]" />{orc.annexQuantity ?? 0} anexos
                    </span>
                    <span className="ml-auto text-[10px] text-[#8da48e]">{formatDate(orc.createdAt)}</span>
                  </div>
                </div>
              )
            })}
        <Pagination />
      </div>

      {/* ── DESKTOP: table ────────────────────────────────────────── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className={`${thCls} w-11`}>
                <Checkbox checked={items.length > 0 && selectedIds.length === items.length} onCheckedChange={onSelectAll} aria-label="Selecionar todos" />
              </th>
              {(["numero", "solicitante"] as SortKey[]).map(col => (
                <th key={col} className={thCls}>
                  <button onClick={() => toggleSort(col)} className="inline-flex items-center gap-1 hover:text-[#2E7D32] transition-colors">
                    {col === "numero" ? "Número" : "Solicitante"} <SortIcon col={col} />
                  </button>
                </th>
              ))}
              <th className={`${thCls} text-center`}>Itens</th>
              <th className={`${thCls} text-center`}>Anexos</th>
              <th className={thCls}>
                <button onClick={() => toggleSort("createdAt")} className="inline-flex items-center gap-1 hover:text-[#2E7D32] transition-colors">
                  Data <SortIcon col="createdAt" />
                </button>
              </th>
              <th className={thCls}>
                <button onClick={() => toggleSort("status")} className="inline-flex items-center gap-1 hover:text-[#2E7D32] transition-colors">
                  Status <SortIcon col="status" />
                </button>
              </th>
              <th className={`${thCls} w-12`} />
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <tr key={i} className="border-b border-[#f0f5f0]">
                    {skeletonWidths.map((w, j) => (
                      <td key={j} className="px-4 py-3.5">
                        <div className="h-3 rounded bg-[#e8f0e8] animate-pulse" style={{ width: w }} />
                      </td>
                    ))}
                  </tr>
                ))
              : paged.length === 0
              ? <tr><td colSpan={8}><Empty /></td></tr>
              : paged.map(orc => {
                  const sel = selectedIds.includes(orc.id)
                  return (
                    <tr key={orc.id} className={`border-b border-[#f0f5f0] last:border-0 transition-colors ${sel ? "bg-[#f0faf0]" : "hover:bg-[#f8faf8]"}`}>
                      <td className="px-4 py-3.5"><Checkbox checked={sel} onCheckedChange={() => onSelectOne(orc.id)} /></td>
                      <td className="px-4 py-3.5">
                        <span className="font-mono text-[12px] text-[#6b7c6d] bg-[#f5f9f5] border border-[#e2ece2] px-1.5 py-0.5 rounded-[5px]">{orc.id}</span>
                      </td>
                      <td className="px-4 py-3.5 text-[13px] font-semibold text-[#0d1f0e]">{orc.requestFor}</td>
                      <td className="px-4 py-3.5 text-center">
                        <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#374937]"><FileText className="w-3 h-3 text-[#9aad9b]" />{orc.itemsQuantity}</span>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#374937]"><Paperclip className="w-3 h-3 text-[#9aad9b]" />{orc.annexQuantity ?? 0}</span>
                      </td>
                      <td className="px-4 py-3.5 text-[12px] text-[#8da48e] whitespace-nowrap">{formatDate(orc.createdAt)}</td>
                      <td className="px-4 py-3.5"><StatusBadge status={orc.status} /></td>
                      <td className="px-3 py-3.5"><Actions orc={orc} /></td>
                    </tr>
                  )
                })}
          </tbody>
        </table>
        <Pagination />
      </div>
    </>
  )
}