"use client"

import { User, Building2, MessageSquare } from "lucide-react"
import { SectionHeader } from "./section-header"
import { inputClass, textareaClass, labelClass, sectionClass } from "./styles"

// ── Seção de informações gerais (solicitante, centro de custo, observações) ──
export function InformacoesGeraisSection({
  solicitante,
  centroCusto,
  observacoes,
  onSolicitanteChange,
  onCentroCustoChange,
  onObservacoesChange,
}: {
  solicitante: string
  centroCusto: string
  observacoes: string
  onSolicitanteChange: (value: string) => void
  onCentroCustoChange: (value: string) => void
  onObservacoesChange: (value: string) => void
}) {
  return (
    <div className={sectionClass}>
      <SectionHeader
        icon={<User className="w-4 h-4" />}
        title="Informações Gerais"
        sub="Dados do solicitante e centro de custo"
      />
      <div className="px-6 py-5 flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              Solicitante <span className="text-[#2E7D32]">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9aad9b] pointer-events-none" />
              <input
                type="text"
                placeholder="Nome do solicitante"
                value={solicitante}
                onChange={(e) => onSolicitanteChange(e.target.value)}
                className={`${inputClass} pl-9`}
                required
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Centro de Custo</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9aad9b] pointer-events-none" />
              <input
                type="text"
                placeholder="Ex: TI, Financeiro, RH..."
                value={centroCusto}
                onChange={(e) => onCentroCustoChange(e.target.value)}
                className={`${inputClass} pl-9`}
              />
            </div>
          </div>
        </div>
        <div>
          <label className={labelClass}>Observações Gerais</label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-[#9aad9b] pointer-events-none" />
            <textarea
              rows={3}
              placeholder="Informações adicionais, urgência, contexto..."
              value={observacoes}
              onChange={(e) => onObservacoesChange(e.target.value)}
              className={`${textareaClass} pl-9`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
