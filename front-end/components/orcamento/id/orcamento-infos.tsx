import { User, Building2, MessageSquare, Calendar, RefreshCw } from "lucide-react"
import { formatDate } from "@/lib/types"
import type { Orcamento } from "@/lib/types"

interface Props {
  orcamento: Orcamento
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="w-8 h-8 rounded-[9px] bg-[#f0faf0] border border-[#e2ece2] flex items-center justify-center text-[#4CAF50] flex-shrink-0 mt-0.5">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold text-[#9aad9b] uppercase tracking-[0.07em]">{label}</p>
        <p className="text-[13px] font-semibold text-[#0d1f0e] mt-0.5 break-words">{value}</p>
      </div>
    </div>
  )
}

export function OrcamentoInfo({ orcamento }: Props) {
  return (
    <div className="bg-white border border-[#e2ece2] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[#f0f5f0]">
        <div className="w-8 h-8 rounded-[10px] bg-[#f0faf0] border border-[#c8e6c9] flex items-center justify-center text-[#2E7D32]">
          <User className="w-4 h-4" />
        </div>
        <h2 className="text-[14px] font-bold text-[#0d1f0e] tracking-[-0.02em]">
          Informações Gerais
        </h2>
      </div>

      {/* Body */}
      <div className="px-5 py-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <InfoRow
          icon={<User className="w-4 h-4" />}
          label="Solicitante"
          value={orcamento.requestFor}
        />

        <InfoRow
          icon={<Calendar className="w-4 h-4" />}
          label="Data da Solicitação"
          value={formatDate(orcamento.createdAt)}
        />
        <InfoRow
          icon={<RefreshCw className="w-4 h-4" />}
          label="Última Atualização"
          value={formatDate(orcamento.updatedAt?orcamento.updatedAt : orcamento.createdAt)}
        />
      </div>

      {/* Observations */}
      {orcamento.observation && (
        <div className="px-5 pb-5">
          <div className="flex items-start gap-3 p-4 bg-[#f8faf8] border border-[#edf4ed] rounded-xl">
            <MessageSquare className="w-4 h-4 text-[#4CAF50] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[10px] font-bold text-[#9aad9b] uppercase tracking-[0.07em] mb-1">Observações</p>
              <p className="text-[13px] text-[#374937] leading-relaxed">{orcamento.observation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}