"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowUpDown, ArrowUp, ArrowDown,
  MoreHorizontal, Eye, Pencil, Trash2,
  FileText, Paperclip, ClipboardList,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { StatusBadge } from "./status-badge"
import { formatDate } from "../../lib/mock-data"
import type { Orcamento } from "@/lib/types"

type SortKey = "numero" | "solicitante" | "createdAt" | "status"
type SortDir = "asc" | "desc"
const PAGE_SIZE = 8

function SortBtn({ col, current, dir, onClick }: {
  col: SortKey; current: SortKey; dir: SortDir; onClick: () => void
}) {
  const active = col === current
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-5 h-5 rounded transition-colors ${
        active ? "text-[#2E7D32]" : "text-[#c8d8c9] hover:text-[#2E7D32] hover:bg-[#E8F5E9]"
      }`}
    >
      {active
        ? dir === "asc" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
        : <ArrowUpDown className="w-3 h-3" />}
    </button>
  )
}

function SkeletonRow() {
  return (
    <tr className="border-b border-[#f0f5f0]">
      {Array.from({ length: 8 }).map((_, i) => (
        <td key={i} className="px-4 py-3.5">
          <div
            className="h-3 rounded bg-[#e8f0e8] animate-pulse"
            style={{ width: `${[60, 80, 100, 60, 50, 50, 70, 30][i]}%` }}
          />
        </td>
      ))}
    </tr>
  )
}

interface OrcamentosTableProps {
  items: Orcamento[]
  loading: boolean
  selectedIds: string[]
  onSelectOne: (id: string) => void
  onSelectAll: () => void
  onDelete: (id: string) => void
}

export function OrcamentosTable({
  items, loading, selectedIds, onSelectOne, onSelectAll, onDelete,
}: OrcamentosTableProps) {
  const router = useRouter()
  const [sortKey, setSortKey] = useState<SortKey>("createdAt")
  const [sortDir, setSortDir] = useState<SortDir>("desc")
  const [page, setPage] = useState(1)

  const allSelected = items.length > 0 && selectedIds.length === items.length
  const someSelected = selectedIds.length > 0 && selectedIds.length < items.length

  function toggleSort(key: SortKey) {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    else { setSortKey(key); setSortDir("asc") }
    setPage(1)
  }

  const sorted = [...items].sort((a, b) => {
    let av: string = a[sortKey] ?? ""
    let bv: string = b[sortKey] ?? ""
    if (sortKey === "createdAt") {
      av = new Date(a.createdAt).getTime().toString()
      bv = new Date(b.createdAt).getTime().toString()
    }
    if (av < bv) return sortDir === "asc" ? -1 : 1
    if (av > bv) return sortDir === "asc" ? 1 : -1
    return 0
  })

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const paged = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
    .reduce<(number | "…")[]>((acc, p, idx, arr) => {
      if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("…")
      acc.push(p)
      return acc
    }, [])

  const thClass =
    "text-[11px] font-bold text-[#6b7c6d] uppercase tracking-[0.07em] px-4 py-3 bg-[#f8faf8] border-b border-[#e2ece2] whitespace-nowrap select-none"

  const pageBtn =
    "flex items-center justify-center min-w-[28px] h-[28px] rounded-[7px] border text-[12px] font-medium px-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed border-[#e2ece2] text-[#374937] hover:bg-[#f0faf0] hover:border-[#a8c4a9] hover:text-[#2E7D32]"

  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className={`${thClass} w-11`}>
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={onSelectAll}
                  className={someSelected ? "opacity-50" : ""}
                  aria-label="Selecionar todos"
                />
              </th>
              <th className={thClass}>
                <span className="inline-flex items-center gap-1">
                  Número
                  <SortBtn col="numero" current={sortKey} dir={sortDir} onClick={() => toggleSort("numero")} />
                </span>
              </th>
              <th className={thClass}>
                <span className="inline-flex items-center gap-1">
                  Solicitante
                  <SortBtn col="solicitante" current={sortKey} dir={sortDir} onClick={() => toggleSort("solicitante")} />
                </span>
              </th>
              <th className={`${thClass} text-center`}>Itens</th>
              <th className={`${thClass} text-center`}>Anexos</th>
              <th className={thClass}>
                <span className="inline-flex items-center gap-1">
                  Data
                  <SortBtn col="createdAt" current={sortKey} dir={sortDir} onClick={() => toggleSort("createdAt")} />
                </span>
              </th>
              <th className={thClass}>
                <span className="inline-flex items-center gap-1">
                  Status
                  <SortBtn col="status" current={sortKey} dir={sortDir} onClick={() => toggleSort("status")} />
                </span>
              </th>
              <th className={`${thClass} w-12`} />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonRow key={i} />)
            ) : paged.length === 0 ? (
              <tr>
                <td colSpan={8}>
                  <div className="flex flex-col items-center py-16 px-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#f0faf0] border border-[#c8e6c9] flex items-center justify-center mb-4 text-[#81C784]">
                      <ClipboardList className="w-6 h-6" />
                    </div>
                    <p className="text-[15px] font-bold text-[#0d1f0e] mb-1">Nenhum orçamento encontrado</p>
                    <p className="text-[13px] text-[#8da48e] text-center max-w-xs">
                      Tente ajustar os filtros ou crie um novo orçamento.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paged.map((orc) => {
                const selected = selectedIds.includes(orc.id)
                return (
                  <tr
                    key={orc.id}
                    className={`border-b border-[#f0f5f0] last:border-b-0 transition-colors duration-100 cursor-pointer ${
                      selected ? "bg-[#f0faf0]" : "hover:bg-[#f8faf8]"
                    }`}
                  >
                    <td className="px-4 py-3.5 w-11">
                      <Checkbox
                        checked={selected}
                        onCheckedChange={() => onSelectOne(orc.id)}
                        aria-label={`Selecionar ${orc.numero}`}
                      />
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-[12px] text-[#6b7c6d] bg-[#f5f9f5] border border-[#e2ece2] px-1.5 py-0.5 rounded-[5px] whitespace-nowrap">
                        {orc.numero}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div>
                        <p className="text-[13px] font-semibold text-[#0d1f0e] leading-none">{orc.solicitante}</p>
                        {orc.centroCusto && (
                          <p className="text-[11px] text-[#8da48e] mt-0.5">{orc.centroCusto}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#374937]">
                        <FileText className="w-3 h-3 text-[#9aad9b]" />
                        {orc.itens.length}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#374937]">
                        <Paperclip className="w-3 h-3 text-[#9aad9b]" />
                        {orc.anexos.length}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-[12px] text-[#8da48e] whitespace-nowrap">
                        {formatDate(orc.createdAt)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={orc.status} />
                    </td>
                    <td className="px-3 py-3.5">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            className="flex items-center justify-center w-[30px] h-[30px] rounded-[8px] border border-transparent text-[#9aad9b] hover:bg-[#f0f5f0] hover:border-[#d4e4d5] hover:text-[#2E7D32] transition-all duration-150"
                            aria-label="Ações"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem onClick={() => router.push(`/orcamentos/${orc.id}`)}>
                            <Eye className="mr-2 h-4 w-4" /> Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/orcamentos/${orc.id}/editar`)}>
                            <Pencil className="mr-2 h-4 w-4" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => onDelete(orc.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && sorted.length > PAGE_SIZE && (
        <div className="flex items-center justify-between px-4 py-3.5 border-t border-[#e8f0e8] bg-[#fafcfa] flex-wrap gap-2">
          <span className="text-[12px] text-[#8da48e]">
            Mostrando {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, sorted.length)} de {sorted.length}
          </span>
          <div className="flex items-center gap-1">
            <button disabled={page === 1} onClick={() => setPage(1)} className={pageBtn}>«</button>
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className={pageBtn}>‹</button>
            {pageNumbers.map((p, i) =>
              p === "…" ? (
                <span key={`e${i}`} className="flex items-center justify-center min-w-[28px] h-[28px] text-[12px] text-[#8da48e]">…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p as number)}
                  className={`${pageBtn} ${p === page ? "bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white border-transparent shadow-sm hover:bg-none hover:text-white" : ""}`}
                >
                  {p}
                </button>
              )
            )}
            <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className={pageBtn}>›</button>
            <button disabled={page === totalPages} onClick={() => setPage(totalPages)} className={pageBtn}>»</button>
          </div>
        </div>
      )}
    </>
  )
}