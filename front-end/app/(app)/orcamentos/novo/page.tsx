"use client"

import { useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  ClipboardList, Plus, Trash2, Upload, X, FileText,
  User, Building2, MessageSquare, Package, Paperclip,
  ChevronDown, CheckCircle2, AlertCircle, Save, Send,
  ImageIcon, Search,
} from "lucide-react"
import type { OrcamentoItem, OrcamentoAnexo, Produto } from "@/lib/types"
import { mockProdutos, formatFileSize } from "@/lib/mock-data"

type SubmitMode = "rascunho" | "enviar"
type SubmitStatus = "idle" | "loading" | "success" | "error"

const ACCEPTED_TYPES = ["application/pdf", "image/png", "image/jpeg", "image/webp"]
const ACCEPTED_EXT = ".pdf,.png,.jpg,.jpeg,.webp"

// ── Shared styles ─────────────────────────────────────────────────────────────
const inputClass =
  "w-full h-[42px] px-3.5 text-[13px] text-[#0d1f0e] bg-[#f5f9f5] border-[1.5px] border-[#d4e4d5] rounded-xl outline-none placeholder:text-[#b0c4b1] hover:border-[#a8c4a9] hover:bg-[#f0f8f0] focus:border-[#2E7D32] focus:bg-white focus:shadow-[0_0_0_3px_rgba(46,125,50,0.12)] transition-all duration-150 font-[inherit]"

const textareaClass =
  "w-full px-3.5 py-3 text-[13px] text-[#0d1f0e] bg-[#f5f9f5] border-[1.5px] border-[#d4e4d5] rounded-xl outline-none placeholder:text-[#b0c4b1] hover:border-[#a8c4a9] hover:bg-[#f0f8f0] focus:border-[#2E7D32] focus:bg-white focus:shadow-[0_0_0_3px_rgba(46,125,50,0.12)] transition-all duration-150 font-[inherit] resize-none"

const labelClass = "block text-[12px] font-semibold text-[#1a2e1b] mb-1.5 tracking-[-0.01em]"

const sectionClass = "bg-white border border-[#e2ece2] rounded-2xl overflow-hidden"

// ── Section header ────────────────────────────────────────────────────────────
function SectionHeader({ icon, title, sub, count }: {
  icon: React.ReactNode; title: string; sub?: string; count?: number
}) {
  return (
    <div className="flex items-center gap-3 px-6 py-4 border-b border-[#f0f5f0]">
      <div className="w-9 h-9 rounded-[10px] bg-[#f0faf0] border border-[#c8e6c9] flex items-center justify-center text-[#2E7D32] flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-[14px] font-bold text-[#0d1f0e] tracking-[-0.02em]">{title}</h3>
          {count !== undefined && (
            <span className="inline-flex items-center px-2 py-0.5 bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] rounded-full text-[11px] font-semibold">
              {count}
            </span>
          )}
        </div>
        {sub && <p className="text-[11px] text-[#8da48e] mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

// ── Product search dropdown ───────────────────────────────────────────────────
function ProductSelect({
  value, onChange, excludeIds,
}: {
  value: string; onChange: (p: Produto) => void; excludeIds: string[]
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const ref = useRef<HTMLDivElement>(null)

  const filtered = mockProdutos.filter(
    (p) =>
      !excludeIds.includes(p.id) &&
      (query === "" ||
        p.nome.toLowerCase().includes(query.toLowerCase()) ||
        p.codigo.toLowerCase().includes(query.toLowerCase()))
  )

  const selected = mockProdutos.find((p) => p.id === value)

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full h-[42px] px-3.5 flex items-center justify-between text-[13px] bg-[#f5f9f5] border-[1.5px] border-[#d4e4d5] rounded-xl hover:border-[#a8c4a9] hover:bg-[#f0f8f0] focus:border-[#2E7D32] focus:bg-white transition-all font-[inherit] cursor-pointer"
      >
        <span className={selected ? "text-[#0d1f0e]" : "text-[#b0c4b1]"}>
          {selected ? selected.nome : "Selecionar produto..."}
        </span>
        <ChevronDown className={`w-4 h-4 text-[#9aad9b] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-[#e2ece2] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="p-2 border-b border-[#f0f5f0]">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9aad9b]" />
              <input
                autoFocus
                type="text"
                placeholder="Buscar produto..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-8 pl-8 pr-3 text-[12px] bg-[#f8faf8] border border-[#e2ece2] rounded-lg outline-none focus:border-[#2E7D32] transition-colors font-[inherit]"
              />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="px-3 py-4 text-[12px] text-[#8da48e] text-center">Nenhum produto encontrado</p>
            ) : (
              filtered.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => { onChange(p); setOpen(false); setQuery("") }}
                  className="w-full flex items-start gap-2.5 px-3 py-2.5 hover:bg-[#f8faf8] transition-colors text-left"
                >
                  <div className="w-7 h-7 rounded-[7px] bg-[#f0faf0] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Package className="w-3.5 h-3.5 text-[#2E7D32]" />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-[#0d1f0e] leading-none">{p.nome}</p>
                    <p className="text-[10px] text-[#8da48e] mt-0.5 font-mono">{p.codigo}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function NovoOrcamentoPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  // Form state
  const [solicitante, setSolicitante] = useState("")
  const [centroCusto, setCentroCusto] = useState("")
  const [observacoes, setObservacoes] = useState("")
  const [itens, setItens] = useState<OrcamentoItem[]>([
    { id: Date.now().toString(), produtoId: "", produtoNome: "", quantidade: 1 },
  ])
  const [anexos, setAnexos] = useState<OrcamentoAnexo[]>([])
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle")
  const [submitMode, setSubmitMode] = useState<SubmitMode>("enviar")
  const [errorMsg, setErrorMsg] = useState("")

  // Items
  const addItem = () =>
    setItens((prev) => [
      ...prev,
      { id: Date.now().toString(), produtoId: "", produtoNome: "", quantidade: 1 },
    ])

  const removeItem = (id: string) =>
    setItens((prev) => prev.filter((i) => i.id !== id))

  const updateItem = (id: string, patch: Partial<OrcamentoItem>) =>
    setItens((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)))

  // Attachments
  const processFiles = useCallback((files: FileList | File[]) => {
    const arr = Array.from(files)
    const valid = arr.filter((f) => ACCEPTED_TYPES.includes(f.type))
    const newAnexos: OrcamentoAnexo[] = valid.map((f) => ({
      id: `${Date.now()}-${Math.random()}`,
      nome: f.name,
      tipo: f.type,
      tamanho: f.size,
      progresso: 100,
      preview: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined,
    }))
    setAnexos((prev) => [...prev, ...newAnexos])
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      processFiles(e.dataTransfer.files)
    },
    [processFiles]
  )

  const removeAnexo = (id: string) =>
    setAnexos((prev) => prev.filter((a) => a.id !== id))

  // Submit
  const handleSubmit = async (mode: SubmitMode) => {
    if (!solicitante.trim()) { setErrorMsg("Informe o solicitante."); return }
    if (itens.some((i) => !i.produtoId)) { setErrorMsg("Selecione um produto para cada item."); return }
    setErrorMsg("")
    setSubmitMode(mode)
    setSubmitStatus("loading")
    await new Promise((r) => setTimeout(r, 1800))
    setSubmitStatus("success")
    setTimeout(() => router.push("/orcamentos"), 1500)
  }

  const totalItens = itens.filter((i) => i.produtoId).length
  const totalAnexos = anexos.length
  const isLoading = submitStatus === "loading"
  const isSuccess = submitStatus === "success"

  return (
    <div className="min-h-screen bg-[#f5f8f5] font-sans">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-8">

        {/* ── Page header ── */}
        <div className="flex items-center gap-3.5 mb-8">
          <button
            onClick={() => router.back()}
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
            <h1 className="text-[20px] font-extrabold text-[#0d1f0e] tracking-[-0.03em] leading-none">
              Novo Orçamento
            </h1>
            <p className="text-[12px] text-[#6b7c6d] mt-1">
              Preencha as informações abaixo para criar uma solicitação de orçamento
            </p>
          </div>
        </div>

        {/* ── Global error ── */}
        {errorMsg && (
          <div className="flex items-center gap-3 px-4 py-3 mb-6 bg-red-50 border border-red-200 rounded-xl">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-[13px] text-red-700 font-medium">{errorMsg}</p>
            <button onClick={() => setErrorMsg("")} className="ml-auto text-red-400 hover:text-red-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── Success banner ── */}
        {isSuccess && (
          <div className="flex items-center gap-3 px-4 py-3 mb-6 bg-[#E8F5E9] border border-[#C8E6C9] rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-[#2E7D32] flex-shrink-0" />
            <p className="text-[13px] text-[#1B5E20] font-semibold">
              {submitMode === "rascunho" ? "Rascunho salvo!" : "Solicitação enviada com sucesso!"} Redirecionando...
            </p>
          </div>
        )}

        {/* ── Two-column layout ── */}
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Left: form sections */}
          <div className="flex-1 flex flex-col gap-5 min-w-0">

            {/* ─ Informações Gerais ─ */}
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
                        onChange={(e) => setSolicitante(e.target.value)}
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
                        onChange={(e) => setCentroCusto(e.target.value)}
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
                      onChange={(e) => setObservacoes(e.target.value)}
                      className={`${textareaClass} pl-9`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ─ Itens do Orçamento ─ */}
            <div className={sectionClass}>
              <SectionHeader
                icon={<Package className="w-4 h-4" />}
                title="Itens do Orçamento"
                sub="Selecione os produtos desejados"
                count={totalItens}
              />
              <div className="px-6 py-5 flex flex-col gap-3">
                {/* Column headers */}
                <div className="hidden sm:grid grid-cols-[1fr_120px_48px] gap-3 px-1">
                  <span className="text-[11px] font-bold text-[#6b7c6d] uppercase tracking-[0.06em]">Produto</span>
                  <span className="text-[11px] font-bold text-[#6b7c6d] uppercase tracking-[0.06em]">Qtd.</span>
                  <span />
                </div>

                {itens.map((item, idx) => (
                  <div key={item.id} className="grid grid-cols-1 sm:grid-cols-[1fr_120px_48px] gap-3 items-start p-3 bg-[#f8faf8] border border-[#edf4ed] rounded-xl">
                    {/* Product select */}
                    <div>
                      <label className="sm:hidden text-[11px] font-semibold text-[#6b7c6d] mb-1.5 block">Produto</label>
                      <ProductSelect
                        value={item.produtoId}
                        excludeIds={itens.filter((i) => i.id !== item.id).map((i) => i.produtoId)}
                        onChange={(p) =>
                          updateItem(item.id, { produtoId: p.id, produtoNome: p.nome })
                        }
                      />
                    </div>

                    {/* Quantity */}
                    <div>
                      <label className="sm:hidden text-[11px] font-semibold text-[#6b7c6d] mb-1.5 block">Quantidade</label>
                      <input
                        type="number"
                        min={1}
                        value={item.quantidade}
                        onChange={(e) =>
                          updateItem(item.id, { quantidade: Math.max(1, Number(e.target.value)) })
                        }
                        className={inputClass}
                      />
                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      disabled={itens.length === 1}
                      className="sm:mt-0 mt-1 w-[42px] h-[42px] flex items-center justify-center rounded-xl border border-[#e2ece2] text-[#9aad9b] hover:border-red-200 hover:text-red-500 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addItem}
                  className="flex items-center justify-center gap-2 w-full h-10 border-[1.5px] border-dashed border-[#c8e6c9] text-[#2E7D32] text-[13px] font-semibold rounded-xl hover:border-[#2E7D32] hover:bg-[#f0faf0] transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar Item
                </button>
              </div>
            </div>

            {/* ─ Anexos ─ */}
            <div className={sectionClass}>
              <SectionHeader
                icon={<Paperclip className="w-4 h-4" />}
                title="Anexos"
                sub="PDF, PNG, JPG, JPEG, WEBP"
                count={totalAnexos}
              />
              <div className="px-6 py-5 flex flex-col gap-4">
                {/* Drop zone */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative flex flex-col items-center justify-center gap-3 min-h-[140px] border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                    isDragOver
                      ? "border-[#2E7D32] bg-[#E8F5E9]"
                      : "border-[#c8e6c9] bg-[#f8faf8] hover:border-[#2E7D32] hover:bg-[#f0faf0]"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept={ACCEPTED_EXT}
                    className="hidden"
                    onChange={(e) => e.target.files && processFiles(e.target.files)}
                  />
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    isDragOver ? "bg-[#2E7D32]/15 text-[#2E7D32]" : "bg-[#e8f5e8] text-[#4CAF50]"
                  }`}>
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="text-center">
                    <p className="text-[13px] font-semibold text-[#374937]">
                      {isDragOver ? "Solte os arquivos aqui" : "Arraste arquivos ou clique para selecionar"}
                    </p>
                    <p className="text-[11px] text-[#8da48e] mt-1">PDF, PNG, JPG, JPEG, WEBP</p>
                  </div>
                </div>

                {/* File list */}
                {anexos.length > 0 && (
                  <div className="flex flex-col gap-2">
                    {anexos.map((a) => (
                      <div
                        key={a.id}
                        className="flex items-center gap-3 p-3 bg-[#f5f9f5] border border-[#e2ece2] rounded-xl"
                      >
                        {a.preview ? (
                          <img
                            src={a.preview}
                            alt={a.nome}
                            className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-[#e2ece2]"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-[#E8F5E9] border border-[#C8E6C9] flex items-center justify-center flex-shrink-0">
                            <FileText className="w-4 h-4 text-[#2E7D32]" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-semibold text-[#0d1f0e] truncate">{a.nome}</p>
                          <p className="text-[11px] text-[#8da48e]">{formatFileSize(a.tamanho)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAnexo(a.id)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-[#9aad9b] hover:text-red-500 hover:bg-red-50 transition-all flex-shrink-0"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: summary card */}
          <div className="xl:w-[300px] flex-shrink-0">
            <div className="sticky top-6 flex flex-col gap-4">
              {/* Summary */}
              <div className="bg-white border border-[#e2ece2] rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-[#f0f5f0] bg-gradient-to-br from-[#1B5E20] to-[#2E7D32]">
                  <h3 className="text-[14px] font-bold text-white tracking-[-0.02em]">Resumo da Solicitação</h3>
                  <p className="text-[11px] text-white/60 mt-0.5">Confira os dados antes de enviar</p>
                </div>
                <div className="px-5 py-4 flex flex-col gap-3.5">
                  {[
                    {
                      icon: <User className="w-3.5 h-3.5" />,
                      label: "Solicitante",
                      value: solicitante || "—",
                    },
                    {
                      icon: <Building2 className="w-3.5 h-3.5" />,
                      label: "Centro de Custo",
                      value: centroCusto || "—",
                    },
                    {
                      icon: <Package className="w-3.5 h-3.5" />,
                      label: "Total de Itens",
                      value: `${totalItens} produto(s)`,
                    },
                    {
                      icon: <Paperclip className="w-3.5 h-3.5" />,
                      label: "Anexos",
                      value: `${totalAnexos} arquivo(s)`,
                    },
                    {
                      icon: <ClipboardList className="w-3.5 h-3.5" />,
                      label: "Data",
                      value: new Date().toLocaleDateString("pt-BR"),
                    },
                  ].map(({ icon, label, value }) => (
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

              {/* Itens preview */}
              {totalItens > 0 && (
                <div className="bg-white border border-[#e2ece2] rounded-2xl px-5 py-4">
                  <p className="text-[11px] font-bold text-[#6b7c6d] uppercase tracking-[0.06em] mb-3">
                    Produtos selecionados
                  </p>
                  <div className="flex flex-col gap-2">
                    {itens.filter((i) => i.produtoId).map((item) => (
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
        </div>

        {/* ── Footer actions ── */}
        <div className="flex items-center justify-between gap-3 mt-6 pt-6 border-t border-[#e2ece2] flex-wrap">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isLoading}
            className="h-10 px-5 text-[13px] font-semibold text-[#374937] border border-[#d4e4d5] rounded-[11px] hover:border-[#a8c4a9] hover:bg-[#f5f9f5] disabled:opacity-50 disabled:cursor-not-allowed transition-all bg-transparent font-[inherit] cursor-pointer"
          >
            Cancelar
          </button>

          <div className="flex items-center gap-2.5">
            {/* Save draft */}
            <button
              type="button"
              disabled={isLoading || isSuccess}
              onClick={() => handleSubmit("rascunho")}
              className="relative h-10 px-4 text-[13px] font-semibold text-[#2E7D32] border border-[#C8E6C9] bg-[#E8F5E9] rounded-[11px] hover:border-[#2E7D32] hover:bg-[#d4eed5] disabled:opacity-50 disabled:cursor-not-allowed transition-all overflow-hidden inline-flex items-center gap-2 font-[inherit] cursor-pointer"
            >
              {isLoading && submitMode === "rascunho" ? (
                <span className="w-3.5 h-3.5 rounded-full border-2 border-[#2E7D32]/30 border-t-[#2E7D32] animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              Salvar Rascunho
            </button>

            {/* Submit */}
            <button
              type="button"
              disabled={isLoading || isSuccess}
              onClick={() => handleSubmit("enviar")}
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
                {isLoading && submitMode === "enviar"
                  ? "Enviando..."
                  : isSuccess
                  ? "Enviado!"
                  : "Enviar Solicitação"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}