"use client"

import { useState } from "react"
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Package,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Item } from "@/lib/types"

type SortKey = "internalCode" | "name" | "providerName" | "price" | "createdAt"
type SortDir = "asc" | "desc"

interface ItemsTableProps {
  items: Item[]
  selectedItems: string[]
  onSelectItem: (id: string) => void
  onSelectAll: () => void
  loading?: boolean
}

const PAGE_SIZE = 8

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

function SkeletonRow() {
  return (
    <tr className="border-b border-[#f0f5f0]">
      <td className="px-4 py-3.5">
        <div className="w-4 h-4 rounded bg-[#e8f0e8] animate-pulse" />
      </td>
      <td className="px-4 py-3.5">
        <div className="h-3 w-20 rounded bg-[#e8f0e8] animate-pulse" />
      </td>
      <td className="px-4 py-3.5">
        <div className="h-3 w-36 rounded bg-[#e8f0e8] animate-pulse" />
      </td>
      <td className="px-4 py-3.5">
        <div className="h-3 w-28 rounded bg-[#e8f0e8] animate-pulse" />
      </td>
      <td className="px-4 py-3.5 text-right">
        <div className="h-3 w-16 rounded bg-[#e8f0e8] animate-pulse ml-auto" />
      </td>
      <td className="px-4 py-3.5 text-right">
        <div className="h-3 w-20 rounded bg-[#e8f0e8] animate-pulse ml-auto" />
      </td>
      <td className="px-4 py-3.5">
        <div className="w-7 h-7 rounded-lg bg-[#e8f0e8] animate-pulse" />
      </td>
    </tr>
  )
}

function SortBtn({
  col,
  current,
  dir,
  onClick,
}: {
  col: SortKey
  current: SortKey
  dir: SortDir
  onClick: () => void
}) {
  const active = col === current
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-[18px] h-[18px] rounded transition-colors ${
        active
          ? "text-[#2E7D32]"
          : "text-[#b0c4b1] hover:text-[#2E7D32] hover:bg-[#E8F5E9]"
      }`}
    >
      {active ? (
        dir === "asc" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
      ) : (
        <ArrowUpDown className="w-3 h-3" />
      )}
    </button>
  )
}
export function ItemsTable({
  items,
  selectedItems,
  onSelectItem,
  onSelectAll,
  loading,
}: ItemsTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("createdAt")
  const [sortDir, setSortDir] = useState<SortDir>("desc")
  const [page, setPage] = useState(1)

  const allSelected = items.length > 0 && selectedItems.length === items.length
  const someSelected = selectedItems.length > 0 && selectedItems.length < items.length

  function toggleSort(key: SortKey) {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    else { setSortKey(key); setSortDir("asc") }
    setPage(1)
  }

  const sorted = [...items].sort((a, b) => {
    let av: string | number = a[sortKey as keyof Item] as string ?? ""
    let bv: string | number = b[sortKey as keyof Item] as string ?? ""
    if (sortKey === "price") { av = a.price; bv = b.price }
    if (sortKey === "createdAt") {
      av = new Date(a.createdAt).getTime()
      bv = new Date(b.createdAt).getTime()
    }
    if (av < bv) return sortDir === "asc" ? -1 : 1
    if (av > bv) return sortDir === "asc" ? 1 : -1
    return 0
  })

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const paged = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // Pagination pages array with ellipsis
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
    .reduce<(number | "…")[]>((acc, p, idx, arr) => {
      if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("…")
      acc.push(p)
      return acc
    }, [])

  const thClass =
    "text-[11px] font-bold text-[#6b7c6d] uppercase tracking-[0.07em] px-4 py-3 bg-[#f8faf8] border-b border-[#e2ece2] whitespace-nowrap"

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
                  aria-label="Selecionar todos"
                  className={someSelected ? "opacity-50" : ""}
                />
              </th>
              <th className={thClass}>
                <span className="inline-flex items-center gap-1">
                  Código
                  <SortBtn col="internalCode" current={sortKey} dir={sortDir} onClick={() => toggleSort("internalCode")} />
                </span>
              </th>
              <th className={thClass}>
                <span className="inline-flex items-center gap-1">
                  Nome do Produto
                  <SortBtn col="name" current={sortKey} dir={sortDir} onClick={() => toggleSort("name")} />
                </span>
              </th>
              <th className={thClass}>
                <span className="inline-flex items-center gap-1">
                  Fornecedor
                  <SortBtn col="providerName" current={sortKey} dir={sortDir} onClick={() => toggleSort("providerName")} />
                </span>
              </th>
              <th className={`${thClass} text-right`}>
                <span className="inline-flex items-center justify-end gap-1 w-full">
                  Preço
                  <SortBtn col="price" current={sortKey} dir={sortDir} onClick={() => toggleSort("price")} />
                </span>
              </th>
              <th className={`${thClass} text-right`}>
                <span className="inline-flex items-center justify-end gap-1 w-full">
                  Cadastro
                  <SortBtn col="createdAt" current={sortKey} dir={sortDir} onClick={() => toggleSort("createdAt")} />
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
                <td colSpan={7}>
                  <div className="flex flex-col items-center py-16 px-6">
                    <div className="w-[52px] h-[52px] rounded-[14px] bg-[#f0faf0] border border-[#c8e6c9] flex items-center justify-center mb-3.5 text-[#81C784]">
                      <Package className="w-[22px] h-[22px]" />
                    </div>
                    <p className="text-[15px] font-bold text-[#0d1f0e] mb-1">
                      Nenhum produto encontrado
                    </p>
                    <p className="text-[13px] text-[#8da48e] text-center max-w-xs">
                      Tente ajustar os filtros ou cadastre um novo produto.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paged.map((item) => {
                const selected = selectedItems.includes(item.id)
                return (
                  <tr
                    key={item.id}
                    className={`border-b border-[#f0f5f0] last:border-b-0 transition-colors duration-100 ${
                      selected ? "bg-[#f0faf0]" : "hover:bg-[#f8faf8]"
                    }`}
                  >
                    <td className="px-4 py-3.5 w-11">
                      <Checkbox
                        checked={selected}
                        onCheckedChange={() => onSelectItem(item.id)}
                        aria-label={`Selecionar ${item.name}`}
                      />
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-[12px] text-[#6b7c6d] bg-[#f5f9f5] border border-[#e2ece2] px-1.5 py-0.5 rounded-[5px]">
                        {item.internalCode ?? "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-[13px] font-semibold text-[#0d1f0e]">
                        {item.name}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-[12px] text-[#8da48e]">
                        {item.providerName ?? "Não informado"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <span className="text-[13px] font-bold text-[#0d1f0e] tabular-nums">
                        {formatCurrency(item.price)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <span className="text-[12px] text-[#8da48e] whitespace-nowrap">
                        {formatDate(new Date(item.createdAt).toDateString())}
                      </span>
                    </td>
                    <td className="px-3 py-3.5">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            className="flex items-center justify-center w-[30px] h-[30px] rounded-[8px] border border-transparent text-[#9aad9b] hover:bg-[#f0f5f0] hover:border-[#d4e4d5] hover:text-[#2E7D32] transition-all duration-150"
                            aria-label="Ações do produto"
                          >
                            <MoreHorizontal className="w-[15px] h-[15px]" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar produto
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
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

      {/* ── Pagination ── */}
      {!loading && sorted.length > PAGE_SIZE && (
        <div className="flex items-center justify-between px-4 py-3.5 border-t border-[#e8f0e8] bg-[#fafcfa] flex-wrap gap-2">
          <span className="text-[12px] text-[#8da48e]">
            Mostrando {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, sorted.length)} de {sorted.length}
          </span>

          <div className="flex items-center gap-1">
            {/* First / Prev */}
            <button
              disabled={page === 1}
              onClick={() => setPage(1)}
              className="flex items-center justify-center min-w-[28px] h-[28px] rounded-[7px] border border-[#e2ece2] text-[12px] font-medium text-[#374937] hover:bg-[#f0faf0] hover:border-[#a8c4a9] hover:text-[#2E7D32] disabled:opacity-40 disabled:cursor-not-allowed transition-all px-1.5"
            >
              «
            </button>
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="flex items-center justify-center min-w-[28px] h-[28px] rounded-[7px] border border-[#e2ece2] text-[12px] font-medium text-[#374937] hover:bg-[#f0faf0] hover:border-[#a8c4a9] hover:text-[#2E7D32] disabled:opacity-40 disabled:cursor-not-allowed transition-all px-1.5"
            >
              ‹
            </button>

            {/* Page numbers */}
            {pageNumbers.map((p, i) =>
              p === "…" ? (
                <span
                  key={`e${i}`}
                  className="flex items-center justify-center min-w-[28px] h-[28px] text-[12px] text-[#8da48e]"
                >
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p as number)}
                  className={`flex items-center justify-center min-w-[28px] h-[28px] rounded-[7px] border text-[12px] font-medium transition-all px-1.5 ${
                    p === page
                      ? "bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white border-transparent shadow-sm"
                      : "border-[#e2ece2] text-[#374937] hover:bg-[#f0faf0] hover:border-[#a8c4a9] hover:text-[#2E7D32]"
                  }`}
                >
                  {p}
                </button>
              )
            )}

            {/* Next / Last */}
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="flex items-center justify-center min-w-[28px] h-[28px] rounded-[7px] border border-[#e2ece2] text-[12px] font-medium text-[#374937] hover:bg-[#f0faf0] hover:border-[#a8c4a9] hover:text-[#2E7D32] disabled:opacity-40 disabled:cursor-not-allowed transition-all px-1.5"
            >
              ›
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(totalPages)}
              className="flex items-center justify-center min-w-[28px] h-[28px] rounded-[7px] border border-[#e2ece2] text-[12px] font-medium text-[#374937] hover:bg-[#f0faf0] hover:border-[#a8c4a9] hover:text-[#2E7D32] disabled:opacity-40 disabled:cursor-not-allowed transition-all px-1.5"
            >
              »
            </button>
          </div>
        </div>
      )}
    </>
  )
}