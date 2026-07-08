"use client"

import { Save, Send, CheckCircle2 } from "lucide-react"
import type { SubmitMode } from "./styles"

// ── Ações do rodapé (cancelar, salvar rascunho, enviar) ─────────────────────
export function FooterActions({
  isLoading,
  isSuccess,
  submitMode,
  onCancel,
  onSubmit,
}: {
  isLoading: boolean
  isSuccess: boolean
  submitMode: SubmitMode
  onCancel: () => void
  onSubmit: (mode: SubmitMode) => void
}) {
  return (
    <div className="flex items-center justify-between gap-3 mt-6 pt-6 border-t border-[#e2ece2] flex-wrap">
      <button
        type="button"
        onClick={onCancel}
        disabled={isLoading}
        className="h-10 px-5 text-[13px] font-semibold text-[#374937] border border-[#d4e4d5] rounded-[11px] hover:border-[#a8c4a9] hover:bg-[#f5f9f5] disabled:opacity-50 disabled:cursor-not-allowed transition-all bg-transparent font-[inherit] cursor-pointer"
      >
        Cancelar
      </button>

      <div className="flex items-center gap-2.5">
        {/* Salvar rascunho */}
        <button
          type="button"
          disabled={isLoading || isSuccess}
          onClick={() => onSubmit("rascunho")}
          className="relative h-10 px-4 text-[13px] font-semibold text-[#2E7D32] border border-[#C8E6C9] bg-[#E8F5E9] rounded-[11px] hover:border-[#2E7D32] hover:bg-[#d4eed5] disabled:opacity-50 disabled:cursor-not-allowed transition-all overflow-hidden inline-flex items-center gap-2 font-[inherit] cursor-pointer"
        >
          {isLoading && submitMode === "rascunho" ? (
            <span className="w-3.5 h-3.5 rounded-full border-2 border-[#2E7D32]/30 border-t-[#2E7D32] animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          Salvar Rascunho
        </button>

        {/* Enviar */}
        <button
          type="button"
          disabled={isLoading || isSuccess}
          onClick={() => onSubmit("enviar")}
          className="relative h-10 px-5 text-[13px] font-bold text-white bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-[11px] border-none cursor-pointer shadow-[0_3px_12px_rgba(27,94,32,0.28)] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(27,94,32,0.32)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed transition-all overflow-hidden inline-flex items-center gap-2 font-[inherit]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/12 to-transparent pointer-events-none" />
          {isLoading && submitMode === "enviar" ? (
            <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin relative z-10" />
          ) : isSuccess ? (
            <CheckCircle2 className="w-3.5 h-3.5 relative z-10" />
          ) : (
            <Send className="w-3.5 h-3.5 relative z-10" />
          )}
          <span className="relative z-10">
            {isLoading && submitMode === "enviar" ? "Enviando..." : isSuccess ? "Enviado!" : "Enviar Solicitação"}
          </span>
        </button>
      </div>
    </div>
  )
}
