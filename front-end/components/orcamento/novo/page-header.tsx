"use client"

import { ClipboardList } from "lucide-react"

// ── Cabeçalho da página de novo orçamento ───────────────────────────────────
export function PageHeader({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex items-center gap-3.5 mb-8">
      <button
        onClick={onBack}
        className="w-9 h-9 rounded-xl border border-[#e2ece2] bg-white flex items-center justify-center text-[#6b7c6d] hover:border-[#a8c4a9] hover:text-[#2E7D32] hover:bg-[#f0faf0] transition-all"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] flex items-center justify-center shadow-[0_4px_12px_rgba(27,94,32,0.25)]">
        <ClipboardList className="w-[22px] h-[22px] text-white" />
      </div>
      <div>
        <h1 className="text-[20px] font-extrabold text-[#0d1f0e] tracking-[-0.03em] leading-none">Novo Orçamento</h1>
        <p className="text-[12px] text-[#6b7c6d] mt-1">
          Preencha as informações abaixo para criar uma solicitação de orçamento
        </p>
      </div>
    </div>
  )
}
