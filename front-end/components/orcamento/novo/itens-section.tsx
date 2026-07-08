"use client"

import { Package, Plus, Trash2 } from "lucide-react"
import type { OrcamentoItem, Produto } from "@/lib/types"
import { SectionHeader } from "./section-header"
import { ProductSelect } from "./product-select"
import { inputClass, sectionClass } from "./styles"

// ── Seção de itens do orçamento ─────────────────────────────────────────────
export function ItensSection({
  itens,
  totalItens,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
}: {
  itens: OrcamentoItem[]
  totalItens: number
  onAddItem: () => void
  onRemoveItem: (id: string) => void
  onUpdateItem: (id: string, patch: Partial<OrcamentoItem>) => void
}) {
  return (
    <div className={sectionClass}>
      <SectionHeader
        icon={<Package className="w-4 h-4" />}
        title="Itens do Orçamento"
        sub="Selecione os produtos desejados"
        count={totalItens}
      />
      <div className="px-6 py-5 flex flex-col gap-3">
        {/* Cabeçalho de colunas */}
        <div className="hidden sm:grid grid-cols-[1fr_120px_48px] gap-3 px-1">
          <span className="text-[11px] font-bold text-[#6b7c6d] uppercase tracking-[0.06em]">Produto</span>
          <span className="text-[11px] font-bold text-[#6b7c6d] uppercase tracking-[0.06em]">Qtd.</span>
          <span />
        </div>

        {itens.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 sm:grid-cols-[1fr_120px_48px] gap-3 items-start p-3 bg-[#f8faf8] border border-[#edf4ed] rounded-xl"
          >
            {/* Seleção de produto */}
            <div>
              <label className="sm:hidden text-[11px] font-semibold text-[#6b7c6d] mb-1.5 block">Produto</label>
              <ProductSelect
                value={item.produtoId}
                excludeIds={itens.filter((i) => i.id !== item.id).map((i) => i.produtoId)}
                onChange={(p: Produto) => onUpdateItem(item.id, { produtoId: p.id, produtoNome: p.nome })}
              />
            </div>

            {/* Quantidade */}
            <div>
              <label className="sm:hidden text-[11px] font-semibold text-[#6b7c6d] mb-1.5 block">Quantidade</label>
              <input
                type="number"
                min={1}
                value={item.quantidade}
                onChange={(e) => onUpdateItem(item.id, { quantidade: Math.max(1, Number(e.target.value)) })}
                className={inputClass}
              />
            </div>

            {/* Remover */}
            <button
              type="button"
              onClick={() => onRemoveItem(item.id)}
              disabled={itens.length === 1}
              className="sm:mt-0 mt-1 w-[42px] h-[42px] flex items-center justify-center rounded-xl border border-[#e2ece2] text-[#9aad9b] hover:border-red-200 hover:text-red-500 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddItem}
          className="flex items-center justify-center gap-2 w-full h-10 border-[1.5px] border-dashed border-[#c8e6c9] text-[#2E7D32] text-[13px] font-semibold rounded-xl hover:border-[#2E7D32] hover:bg-[#f0faf0] transition-all"
        >
          <Plus className="w-4 h-4" />
          Adicionar Item
        </button>
      </div>
    </div>
  )
}
