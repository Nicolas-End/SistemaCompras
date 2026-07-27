"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ShoppingBag, CheckCircle2, AlertCircle,
  Package, FileText, User, X,
} from "lucide-react"
import type { Orcamento } from "@/lib/types"

interface Props {
  orcamento: Orcamento
  open: boolean
  onClose: () => void
}

type Status = "idle" | "loading" | "success" | "error"

export function TransformDialog({ orcamento, open, onClose }: Props) {
  const router = useRouter()
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  if (!open) return null

  async function handleConfirm() {
    setStatus("loading")
    try {
      // TODO: replace with your real API call
      // await createPedidoFromOrcamento(orcamento.id)
      await new Promise((r) => setTimeout(r, 1800))
      setStatus("success")
      setTimeout(() => {
        onClose()
        router.push("/pedidos")
      }, 1800)
    } catch {
      setStatus("error")
      setErrorMsg("Não foi possível criar o pedido. Tente novamente.")
    }
  }

  function handleClose() {
    if (status === "loading") return
    setStatus("idle")
    setErrorMsg("")
    onClose()
  }

  const isLoading = status === "loading"
  const isSuccess = status === "success"

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
    >
      {/* Dialog */}
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#e2ece2] shadow-[0_24px_64px_rgba(0,0,0,0.14)] overflow-hidden">

        {/* ── Header ── */}
        <div className="relative px-6 pt-6 pb-5 border-b border-[#f0f5f0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] flex items-center justify-center shadow-[0_3px_10px_rgba(27,94,32,0.25)] relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent" />
              <ShoppingBag className="w-5 h-5 text-white relative z-10" />
            </div>
            <div>
              <h2 className="text-[16px] font-extrabold text-[#0d1f0e] tracking-[-0.03em] leading-none">
                Transformar em Pedido
              </h2>
              <p className="text-[12px] text-[#6b7c6d] mt-1">
                Confirme os dados antes de continuar
              </p>
            </div>
          </div>
          {!isLoading && !isSuccess && (
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 w-7 h-7 rounded-lg flex items-center justify-center text-[#9aad9b] hover:text-[#374937] hover:bg-[#f0f5f0] transition-all"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* ── Body ── */}
        <div className="px-6 py-5 flex flex-col gap-4">

          {/* Error */}
          {status === "error" && (
            <div className="flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-[13px] text-red-700 font-medium">{errorMsg}</p>
            </div>
          )}

          {/* Success */}
          {status === "success" && (
            <div className="flex flex-col items-center py-4 text-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#E8F5E9] border border-[#C8E6C9] flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-[#2E7D32]" />
              </div>
              <div>
                <p className="text-[15px] font-bold text-[#0d1f0e]">Pedido criado com sucesso!</p>
                <p className="text-[12px] text-[#6b7c6d] mt-1">Redirecionando para Pedidos...</p>
              </div>
            </div>
          )}

          {/* Confirmation summary — shown on idle/loading */}
          {(status === "idle" || status === "loading" || status === "error") && (
            <>
              <p className="text-[13px] text-[#374937] leading-relaxed">
                Ao confirmar, um novo pedido será criado com base neste orçamento. Esta ação não pode ser desfeita.
              </p>

              {/* Summary box */}
              <div className="bg-[#f8faf8] border border-[#edf4ed] rounded-xl px-4 py-4 flex flex-col gap-3">
                {[
                  { icon: <FileText className="w-3.5 h-3.5" />, label: "Orçamento", value: orcamento.id },
                  { icon: <User className="w-3.5 h-3.5" />, label: "Solicitante", value: orcamento.requestFor },
                  {
                    icon: <Package className="w-3.5 h-3.5" />,
                    label: "Itens",
                    value: `${orcamento.itens?.length} produto(s) · ${orcamento.itens?.reduce((a, i) => a + i.quantidade, 0)} unidades`,
                  },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-[7px] bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32] flex-shrink-0 mt-0.5">
                      {icon}
                    </span>
                    <div>
                      <p className="text-[10px] font-bold text-[#9aad9b] uppercase tracking-[0.06em]">{label}</p>
                      <p className="text-[13px] font-semibold text-[#0d1f0e]">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── Footer ── */}
        {!isSuccess && (
          <div className="flex items-center justify-end gap-2.5 px-6 py-4 border-t border-[#f0f5f0]">
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="h-10 px-4 text-[13px] font-semibold text-[#374937] border border-[#d4e4d5] rounded-xl hover:border-[#a8c4a9] hover:bg-[#f5f9f5] disabled:opacity-50 disabled:cursor-not-allowed transition-all bg-transparent font-[inherit] cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className="relative h-10 px-5 text-[13px] font-bold text-white bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-xl border-none cursor-pointer shadow-[0_3px_10px_rgba(27,94,32,0.25)] hover:-translate-y-px hover:shadow-[0_5px_16px_rgba(27,94,32,0.32)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed transition-all overflow-hidden inline-flex items-center gap-2 font-[inherit]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/12 to-transparent pointer-events-none" />
              {isLoading ? (
                <>
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin relative z-10" />
                  <span className="relative z-10">Criando pedido...</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 relative z-10" />
                  <span className="relative z-10">Confirmar e Criar Pedido</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}