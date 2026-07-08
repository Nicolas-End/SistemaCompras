"use client"

import { AlertCircle, CheckCircle2, X } from "lucide-react"
import type { SubmitMode } from "./styles"

// ── Banners de erro e sucesso do formulário ─────────────────────────────────
export function FormBanners({
  errorMsg,
  isSuccess,
  submitMode,
  onClearError,
}: {
  errorMsg: string
  isSuccess: boolean
  submitMode: SubmitMode
  onClearError: () => void
}) {
  return (
    <>
      {errorMsg && (
        <div className="flex items-center gap-3 px-4 py-3 mb-6 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-[13px] text-red-700 font-medium">{errorMsg}</p>
          <button onClick={onClearError} className="ml-auto text-red-400 hover:text-red-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {isSuccess && (
        <div className="flex items-center gap-3 px-4 py-3 mb-6 bg-[#E8F5E9] border border-[#C8E6C9] rounded-xl">
          <CheckCircle2 className="w-4 h-4 text-[#2E7D32] flex-shrink-0" />
          <p className="text-[13px] text-[#1B5E20] font-semibold">
            {submitMode === "rascunho" ? "Rascunho salvo!" : "Solicitação enviada com sucesso!"} Redirecionando...
          </p>
        </div>
      )}
    </>
  )
}
