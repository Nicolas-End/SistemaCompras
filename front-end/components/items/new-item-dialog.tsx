"use client"

import { useState, useEffect } from "react"
import { Plus, AlertCircle, CheckCircle2, Package, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ProviderDatas } from "@/lib/types"
import { mockProviders } from "@/lib/mock-data"
import { registerNewItem } from "@/app/(app)/_api/items/post-routes"

type SubmitStatus = "idle" | "loading" | "success" | "error"

// ── Shared input class ────────────────────────────────────────────────────────
const inputClass =
  "w-full h-[42px] px-3.5 text-[13px] font-normal text-[#0d1f0e] bg-[#f5f9f5] border-[1.5px] border-[#d4e4d5] rounded-xl outline-none placeholder:text-[#b0c4b1] hover:border-[#a8c4a9] hover:bg-[#f0f8f0] focus:border-[#2E7D32] focus:bg-white focus:shadow-[0_0_0_3px_rgba(46,125,50,0.12)] transition-all duration-150 font-[inherit]"

const labelClass = "block text-[12px] font-semibold text-[#1a2e1b] mb-1.5 tracking-[-0.01em]"

export function NewItemDialog() {
  const [open, setOpen] = useState(false)
  const [suppliers, setSuppliers] = useState<ProviderDatas[]>([])
  const [suppliersLoading, setSuppliersLoading] = useState(false)
  const [suppliersError, setSuppliersError] = useState<string | null>(null)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle")
  const [submitError, setSubmitError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    price: 0,
    providerCNPJ: "",
  })

  useEffect(() => {
    if (!open) return
    setSuppliersLoading(true)
    setSuppliersError(null)

    async function loadSuppliers() {
      try {
        const datas = await mockProviders()
        if (Array.isArray(datas)) setSuppliers(datas)
      } catch {
        setSuppliersError("Não foi possível carregar os fornecedores.")
      } finally {
        setSuppliersLoading(false)
      }
    }

    loadSuppliers()
  }, [open])

  const resetForm = () => {
    setFormData({ name: "", code: "", price: 0, providerCNPJ: "" })
    setSubmitStatus("idle")
    setSubmitError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus("loading")
    setSubmitError(null)

    try {
      const response = await registerNewItem(formData)
      if (response.success === true) {
        setSubmitStatus("success")
      } else {
        setSubmitStatus("error")
        setSubmitError(response.message)
      }

      setTimeout(() => {
        resetForm()
      }, 2500)
    } catch (error) {
      setSubmitStatus("error")
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Erro inesperado ao cadastrar o item. Tente novamente."
      )
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v)
        if (!v) resetForm()
      }}
    >
      {/* Trigger button */}
      <DialogTrigger asChild>
        <button className="relative inline-flex items-center gap-2 h-10 px-4 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white text-[13px] font-bold rounded-[11px] border-none cursor-pointer shadow-[0_3px_12px_rgba(27,94,32,0.28)] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(27,94,32,0.32)] active:translate-y-0 transition-all duration-150 overflow-hidden font-[inherit]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/12 to-transparent pointer-events-none" />
          <Plus className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Novo Produto</span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-lg p-0 overflow-hidden rounded-2xl border border-[#e2ece2] shadow-[0_8px_40px_rgba(27,94,32,0.12)]">
        {/* Modal header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-5 border-b border-[#f0f5f0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] flex items-center justify-center shadow-[0_3px_10px_rgba(27,94,32,0.25)] flex-shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent" />
              <Package className="w-[18px] h-[18px] text-white relative z-10" />
            </div>
            <div>
              <DialogTitle className="text-[16px] font-extrabold text-[#0d1f0e] tracking-[-0.02em] leading-none mb-1">
                Cadastrar Novo Produto
              </DialogTitle>
              <DialogDescription className="text-[12px] text-[#6b7c6d] font-normal leading-none">
                Preencha as informações para adicionar ao catálogo
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">

          {/* Error feedback */}
          {submitStatus === "error" && (
            <div className="flex items-start gap-3 px-4 py-3.5 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[13px] font-semibold text-red-700 leading-none mb-1">Erro ao cadastrar</p>
                <p className="text-[12px] text-red-600 leading-snug">{submitError}</p>
              </div>
            </div>
          )}

          {/* Success feedback */}
          {submitStatus === "success" && (
            <div className="flex items-start gap-3 px-4 py-3.5 bg-[#E8F5E9] border border-[#C8E6C9] rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-[#2E7D32] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[13px] font-semibold text-[#1B5E20] leading-none mb-1">Produto cadastrado!</p>
                <p className="text-[12px] text-[#2E7D32] leading-snug">O item foi adicionado ao catálogo com sucesso.</p>
              </div>
            </div>
          )}

          {/* Name + Code */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="item-name" className={labelClass}>
                Nome do Produto <span className="text-[#2E7D32]">*</span>
              </label>
              <input
                id="item-name"
                type="text"
                placeholder="Ex: Papel A4"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="item-code" className={labelClass}>
                Código <span className="text-[#2E7D32]">*</span>
              </label>
              <input
                id="item-code"
                type="text"
                placeholder="Ex: PAP-A4-001"
                required
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          {/* Supplier + Price */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="item-supplier" className={labelClass}>
                Fornecedor
              </label>
              <Select
                value={formData.providerCNPJ}
                onValueChange={(v) => setFormData({ ...formData, providerCNPJ: v })}
                disabled={suppliersLoading || !!suppliersError}
              >
                <SelectTrigger
                  id="item-supplier"
                  className="h-[42px] text-[13px] border-[#d4e4d5] bg-[#f5f9f5] hover:border-[#a8c4a9] hover:bg-[#f0f8f0] focus:border-[#2E7D32] focus:ring-[#2E7D32]/20 rounded-xl transition-all"
                >
                  <SelectValue
                    placeholder={
                      suppliersLoading
                        ? "Carregando..."
                        : suppliersError
                        ? "Erro ao carregar"
                        : "Selecione o fornecedor"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((s) => (
                    <SelectItem key={s.cnpj} value={s.cnpj}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {suppliersError && (
                <p className="text-[11px] text-red-500 mt-1">{suppliersError}</p>
              )}
            </div>
            <div>
              <label htmlFor="item-price" className={labelClass}>
                Preço (R$) <span className="text-[#2E7D32]">*</span>
              </label>
              <input
                id="item-price"
                type="text"
                inputMode="decimal"
                placeholder="0,00"
                required
                value={formData.price || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9,]/g, "").replace(",", ".")
                  setFormData({ ...formData, price: Number(value) })
                }}
                className={inputClass}
              />
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-2.5 pt-2 mt-1 border-t border-[#f0f5f0]">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-10 px-4 text-[13px] font-semibold text-[#374937] bg-transparent border border-[#d4e4d5] rounded-[11px] hover:border-[#a8c4a9] hover:bg-[#f5f9f5] transition-all duration-150 cursor-pointer font-[inherit]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitStatus === "loading" || submitStatus === "success"}
              className="relative h-10 px-5 text-[13px] font-bold text-white bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-[11px] border-none cursor-pointer shadow-[0_3px_10px_rgba(27,94,32,0.25)] hover:-translate-y-px hover:shadow-[0_5px_16px_rgba(27,94,32,0.32)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 overflow-hidden inline-flex items-center gap-2 font-[inherit]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/12 to-transparent pointer-events-none" />
              {submitStatus === "loading" ? (
                <>
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin relative z-10" />
                  <span className="relative z-10">Cadastrando...</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 relative z-10" />
                  <span className="relative z-10">Cadastrar Produto</span>
                </>
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}