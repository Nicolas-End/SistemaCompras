import { Package } from "lucide-react"
import type { OrcamentoItem } from "@/lib/types"

interface Props {
  itens: OrcamentoItem[]
}

export function OrcamentoItens({ itens }: Props) {
  const total = itens.reduce((acc, i) => acc + i.quantidade, 0)

  return (
    <div className="bg-white border border-[#e2ece2] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[#f0f5f0]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[10px] bg-[#f0faf0] border border-[#c8e6c9] flex items-center justify-center text-[#2E7D32]">
            <Package className="w-4 h-4" />
          </div>
          <h2 className="text-[14px] font-bold text-[#0d1f0e] tracking-[-0.02em]">
            Itens do Orçamento
          </h2>
        </div>
        <span className="inline-flex items-center px-2.5 py-1 bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] rounded-full text-[11px] font-semibold">
          {itens.length} {itens.length === 1 ? "item" : "itens"}
        </span>
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {["#", "Código", "Produto", "Qtd.", "Observação"].map((h, i) => (
                <th
                  key={h}
                  className={`text-[11px] font-bold text-[#6b7c6d] uppercase tracking-[0.07em] px-5 py-3 bg-[#f8faf8] border-b border-[#e2ece2] whitespace-nowrap ${i >= 2 ? "text-left" : i === 3 ? "text-center" : "text-left"}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {itens.map((item, idx) => (
              <tr
                key={item.id}
                className="border-b border-[#f0f5f0] last:border-b-0 hover:bg-[#f8faf8] transition-colors"
              >
                <td className="px-5 py-3.5 text-[12px] text-[#8da48e] font-medium w-10">
                  {idx + 1}
                </td>
                <td className="px-5 py-3.5">
                  <span className="font-mono text-[11px] text-[#6b7c6d] bg-[#f5f9f5] border border-[#e2ece2] px-1.5 py-0.5 rounded-[5px] whitespace-nowrap">
                    {item.produtoId}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-[13px] font-semibold text-[#0d1f0e]">
                  {item.produtoNome}
                </td>
                <td className="px-5 py-3.5 text-center">
                  <span className="inline-flex items-center justify-center w-9 h-7 bg-[#f0faf0] border border-[#c8e6c9] rounded-lg text-[13px] font-bold text-[#2E7D32]">
                    {item.quantidade}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-[12px] text-[#6b7c6d]">
                  {item.observacao ?? <span className="text-[#c8d8c9]">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-[#f8faf8] border-t border-[#e2ece2]">
              <td colSpan={3} className="px-5 py-3 text-[12px] font-semibold text-[#6b7c6d]">
                Total de unidades
              </td>
              <td className="px-5 py-3 text-center">
                <span className="inline-flex items-center justify-center w-9 h-7 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-lg text-[13px] font-bold text-white shadow-sm">
                  {total}
                </span>
              </td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Mobile: cards */}
      <div className="sm:hidden flex flex-col divide-y divide-[#f0f5f0]">
        {itens.map((item, idx) => (
          <div key={item.id} className="px-4 py-3.5 flex items-start gap-3">
            <span className="w-6 h-6 rounded-md bg-[#f0faf0] border border-[#c8e6c9] flex items-center justify-center text-[10px] font-bold text-[#2E7D32] flex-shrink-0 mt-0.5">
              {idx + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[13px] font-semibold text-[#0d1f0e] leading-snug">{item.produtoNome}</p>
                <span className="flex-shrink-0 inline-flex items-center justify-center w-9 h-7 bg-[#f0faf0] border border-[#c8e6c9] rounded-lg text-[13px] font-bold text-[#2E7D32]">
                  {item.quantidade}
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#8da48e] bg-[#f5f9f5] border border-[#e2ece2] px-1.5 py-0.5 rounded mt-1 inline-block">
                {item.produtoId}
              </span>
              {item.observacao && (
                <p className="text-[12px] text-[#6b7c6d] mt-1.5">{item.observacao}</p>
              )}
            </div>
          </div>
        ))}

        {/* Mobile total */}
        <div className="px-4 py-3 bg-[#f8faf8] flex items-center justify-between">
          <span className="text-[12px] font-semibold text-[#6b7c6d]">Total de unidades</span>
          <span className="inline-flex items-center justify-center w-9 h-7 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-lg text-[13px] font-bold text-white">
            {total}
          </span>
        </div>
      </div>
    </div>
  )
}