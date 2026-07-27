"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, ShoppingBag, Pencil } from "lucide-react"
import { STATUS_CONFIG, canTransformToPedido } from "@/lib/types"
import type { Orcamento, UserSys } from "@/lib/types"

interface Props {
  orcamento: Orcamento
  currentUser: UserSys
  onTransform: () => void
}

export function OrcamentoHeader({ orcamento, currentUser, onTransform }: Props) {
  const router = useRouter()
  const cfg = STATUS_CONFIG[orcamento.status]
  const canTransform = canTransformToPedido(orcamento.status, currentUser.role?currentUser.role:"VENDEDOR")

  return (
    <div className="bg-white border-b border-[#e2ece2] sticky top-0 z-20">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Top row ── */}
        <div className="flex items-center justify-between gap-3 py-4 flex-wrap">

          {/* Left: back + title */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => router.back()}
              aria-label="Voltar"
              className="w-9 h-9 flex-shrink-0 rounded-xl border border-[#e2ece2] flex items-center justify-center text-[#6b7c6d] hover:border-[#a8c4a9] hover:text-[#2E7D32] hover:bg-[#f0faf0] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-[16px] sm:text-[18px] font-extrabold text-[#0d1f0e] tracking-[-0.03em] leading-none">
                  {orcamento.id}
                </h1>
                {/* Status badge */}
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                  {cfg.label}
                </span>
              </div>
              <p className="text-[12px] text-[#6b7c6d] mt-1 hidden sm:block">
                Solicitado por <span className="font-semibold text-[#374937]">{orcamento.requestFor}</span>
                {" · "}
                <span className="capitalize">{currentUser.role}</span>
              </p>
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Edit — always visible */}
            <button
              onClick={() => router.push(`/orcamentos/${orcamento.id}/editar`)}
              className="inline-flex items-center gap-1.5 h-9 px-3.5 text-[13px] font-semibold text-[#374937] border border-[#d4e4d5] rounded-xl bg-white hover:border-[#a8c4a9] hover:bg-[#f5f9f5] transition-all"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Editar</span>
            </button>

            {/* Transform — only when approved + right role */}
            {canTransform && (
              <button
                onClick={onTransform}
                className="relative inline-flex items-center gap-2 h-9 px-4 text-[13px] font-bold text-white bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-xl border-none cursor-pointer shadow-[0_3px_12px_rgba(27,94,32,0.28)] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(27,94,32,0.32)] active:translate-y-0 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/12 to-transparent pointer-events-none" />
                <ShoppingBag className="w-4 h-4 relative z-10" />
                <span className="relative z-10 hidden sm:inline">Transformar em Pedido</span>
                <span className="relative z-10 sm:hidden">Criar Pedido</span>
              </button>
            )}
          </div>
        </div>

        {/* ── Breadcrumb ── */}
        <div className="flex items-center gap-1.5 pb-3 text-[11px] text-[#8da48e]">
          <button onClick={() => router.push("/orcamentos")} className="hover:text-[#2E7D32] transition-colors">
            Orçamentos
          </button>
          <span>/</span>
          <span className="text-[#374937] font-medium truncate">{orcamento.id}</span>
        </div>
      </div>
    </div>
  )
}