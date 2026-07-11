"use client"
import { useState, useRef, useEffect } from "react"
import { ChevronDown, Package, Search } from "lucide-react"
import type { Item, Produto } from "@/lib/types"
import { mockItems, mockProdutos } from "@/lib/mock-data"

// ── Dropdown de busca de produtos ───────────────────────────────────────────
export function ProductSelect({
  value,
  onChange,
  excludeIds,
}: {
  value: string
  onChange: (p: Item) => void
  excludeIds: string[]
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [itens, setItens] = useState<Item[] | null>([])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mockItems().then(setItens)
  }, [])

  const filtered = itens?.filter(
    (p) =>
      !excludeIds.includes(p.id) &&
      (query === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.internalCode?.toLowerCase().includes(query.toLowerCase())),
  )

  const selected = itens?.find((p) => p.id === value)

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full h-[42px] px-3.5 flex items-center justify-between text-[13px] bg-[#f5f9f5] border-[1.5px] border-[#d4e4d5] rounded-xl hover:border-[#a8c4a9] hover:bg-[#f0f8f0] focus:border-[#2E7D32] focus:bg-white transition-all font-[inherit] cursor-pointer"
      >
        <span className={selected ? "text-[#0d1f0e]" : "text-[#b0c4b1]"}>
          {selected ? selected.name : "Selecionar produto..."}
        </span>
        <ChevronDown className={`w-4 h-4 text-[#9aad9b] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-[#e2ece2] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="p-2 border-b border-[#f0f5f0]">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9aad9b]" />
              <input
                autoFocus
                type="text"
                placeholder="Buscar produto..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-8 pl-8 pr-3 text-[12px] bg-[#f8faf8] border border-[#e2ece2] rounded-lg outline-none focus:border-[#2E7D32] transition-colors font-[inherit]"
              />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filtered?.length === 0 ? (
              <p className="px-3 py-4 text-[12px] text-[#8da48e] text-center">Nenhum produto encontrado</p>
            ) : (
              filtered?.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    onChange(p)
                    setOpen(false)
                    setQuery("")
                  }}
                  className="w-full flex items-start gap-2.5 px-3 py-2.5 hover:bg-[#f8faf8] transition-colors text-left"
                >
                  <div className="w-7 h-7 rounded-[7px] bg-[#f0faf0] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Package className="w-3.5 h-3.5 text-[#2E7D32]" />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-[#0d1f0e] leading-none">{p.name}</p>
                    <p className="text-[10px] text-[#8da48e] mt-0.5 font-mono">{p.internalCode}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}