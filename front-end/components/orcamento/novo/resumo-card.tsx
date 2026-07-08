import { User, Building2, Package, Paperclip, ClipboardList } from "lucide-react"
import type { OrcamentoItem } from "@/lib/types"

// ── Card lateral de resumo da solicitação ───────────────────────────────────
export function ResumoCard({
  solicitante,
  centroCusto,
  totalItens,
  totalAnexos,
  itens,
}: {
  solicitante: string
  centroCusto: string
  totalItens: number
  totalAnexos: number
  itens: OrcamentoItem[]
}) {
  const resumo = [
    { icon: <User className="w-3.5 h-3.5" />, label: "Solicitante", value: solicitante || "—" },
    { icon: <Building2 className="w-3.5 h-3.5" />, label: "Centro de Custo", value: centroCusto || "—" },
    { icon: <Package className="w-3.5 h-3.5" />, label: "Total de Itens", value: `${totalItens} produto(s)` },
    { icon: <Paperclip className="w-3.5 h-3.5" />, label: "Anexos", value: `${totalAnexos} arquivo(s)` },
    { icon: <ClipboardList className="w-3.5 h-3.5" />, label: "Data", value: new Date().toLocaleDateString("pt-BR") },
  ]

  return (
    <div className="xl:w-[300px] flex-shrink-0">
      <div className="sticky top-6 flex flex-col gap-4">
        {/* Resumo */}
        <div className="bg-white border border-[#e2ece2] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#f0f5f0] bg-gradient-to-br from-[#1B5E20] to-[#2E7D32]">
            <h3 className="text-[14px] font-bold text-white tracking-[-0.02em]">Resumo da Solicitação</h3>
            <p className="text-[11px] text-white/60 mt-0.5">Confira os dados antes de enviar</p>
          </div>
          <div className="px-5 py-4 flex flex-col gap-3.5">
            {resumo.map(({ icon, label, value }) => (
              <div key={label} className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-[7px] bg-[#f0faf0] flex items-center justify-center text-[#2E7D32] flex-shrink-0 mt-0.5">
                  {icon}
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-[#8da48e] uppercase tracking-[0.05em]">{label}</p>
                  <p className="text-[13px] font-semibold text-[#0d1f0e] truncate">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prévia dos itens */}
        {totalItens > 0 && (
          <div className="bg-white border border-[#e2ece2] rounded-2xl px-5 py-4">
            <p className="text-[11px] font-bold text-[#6b7c6d] uppercase tracking-[0.06em] mb-3">Produtos selecionados</p>
            <div className="flex flex-col gap-2">
              {itens
                .filter((i) => i.produtoId)
                .map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-2">
                    <p className="text-[12px] text-[#374937] truncate flex-1">{item.produtoNome}</p>
                    <span className="flex-shrink-0 text-[11px] font-semibold text-[#2E7D32] bg-[#E8F5E9] border border-[#C8E6C9] px-1.5 py-0.5 rounded-md">
                      ×{item.quantidade}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
