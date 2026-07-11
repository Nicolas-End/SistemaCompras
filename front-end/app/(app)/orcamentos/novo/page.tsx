"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import type { OrcamentoItem, OrcamentoAnexo } from "@/lib/types"
import { uploadFiles } from "../../_api/upload/post-route"
import { PageHeader } from "@/components/orcamento/novo/page-header"
import { FormBanners } from "@/components/orcamento/novo/form-banners"
import { InformacoesGeraisSection } from "@/components/orcamento/novo/informacoes-gerais-section"
import { ItensSection } from "@/components/orcamento/novo/itens-section"
import { AnexosSection } from "@/components/orcamento/novo/anexos-section"
import { ResumoCard } from "@/components/orcamento/novo/resumo-card"
import { FooterActions } from "@/components/orcamento/novo/footer-actions"
import { ACCEPTED_TYPES, type SubmitMode, type SubmitStatus } from "@/components/orcamento/novo/styles"
import { registerNewQuote } from "../../_api/quote/post-routes"
import { api } from "@/services/api"

// ── Página de novo orçamento ────────────────────────────────────────────────
export default function NovoOrcamentoPage() {
  const router = useRouter()

  // Estado do formulário
  const [solicitante, setSolicitante] = useState("")
  const [observacoes, setObservacoes] = useState("")
  const [itens, setItens] = useState<OrcamentoItem[]>([
    { id: Date.now().toString(), produtoId: "", produtoNome: "", quantidade: 1 },
  ])
  const [anexos, setAnexos] = useState<OrcamentoAnexo[]>([])
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle")
  const [submitMode, setSubmitMode] = useState<SubmitMode>("enviar")
  const [errorMsg, setErrorMsg] = useState("")

  // Itens
  const addItem = () =>
    setItens((prev) => [...prev, { id: Date.now().toString(), produtoId: "", produtoNome: "", quantidade: 1 }])

  const removeItem = (id: string) => setItens((prev) => prev.filter((i) => i.id !== id))

  const updateItem = (id: string, patch: Partial<OrcamentoItem>) =>
    setItens((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)))

  // Anexos
  const processFiles = useCallback((files: FileList | File[]) => {
    const arr = Array.from(files)
    const valid = arr.filter((f) => ACCEPTED_TYPES.includes(f.type))
    const newAnexos: OrcamentoAnexo[] = valid.map((f) => ({
      id: `${Date.now()}-${Math.random()}`,
      nome: f.name,
      arquivo: f,
      tipo: f.type,
      tamanho: f.size,
      progresso: 100,
      preview: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined,
    }))
    setAnexos((prev) => [...prev, ...newAnexos])
  }, [])

  const removeAnexo = (id: string) => setAnexos((prev) => prev.filter((a) => a.id !== id))

  function getFileType(tipo: string){
    switch (tipo){
       case "application/pdf":
      return "PDF";

    case "image/png":
      return "PNG";

    case "image/jpeg":
      return "JPEG";

    default:
      setErrorMsg("Tipo da imgem invalido")
      return ""
      
  }


    }
  
  // Envio
  const handleSubmit = async (mode: SubmitMode) => {
    if (itens.some((i) => !i.produtoId)) {
      setErrorMsg("Selecione um produto para cada item.")
      return
    }

    setErrorMsg("")
    setSubmitMode(mode)
    setSubmitStatus("loading")
    const itemsApi = itens.map(
      (item) => {
        return{
        id: item.produtoId,
        quantity: item.quantidade
        }
      }
    )
    const annexes = await (await uploadFiles(anexos)).map((a) =>  {
      return{
      url:a.url,
      type:getFileType(a.fileType),
      key :   a.key,
      name: a.fileName,
      }
    })
    
    const apiResponse = await registerNewQuote("Solicitado por: "+solicitante?solicitante:"Ninguem" + " "+ observacoes , itemsApi, annexes)
    if (apiResponse.sucess !== true){
      setErrorMsg(apiResponse.message?apiResponse.message: "Erro Interno");
      return
    }
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
        <PageHeader onBack={() => router.back()} />

        <FormBanners
          errorMsg={errorMsg}
          isSuccess={isSuccess}
          submitMode={submitMode}
          onClearError={() => setErrorMsg("")}
        />

        {/* Layout de duas colunas */}
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Esquerda: seções do formulário */}
          <div className="flex-1 flex flex-col gap-5 min-w-0">
            <InformacoesGeraisSection
              solicitante={solicitante}
              observacoes={observacoes}
              onSolicitanteChange={setSolicitante}

              onObservacoesChange={setObservacoes}
            />

            <ItensSection
              itens={itens}
              totalItens={totalItens}
              onAddItem={addItem}
              onRemoveItem={removeItem}
              onUpdateItem={updateItem}
            />

            <AnexosSection
              anexos={anexos}
              totalAnexos={totalAnexos}
              onAddFiles={processFiles}
              onRemoveAnexo={removeAnexo}
            />
          </div>

          {/* Direita: card de resumo */}
          <ResumoCard
            solicitante={solicitante}

            totalItens={totalItens}
            totalAnexos={totalAnexos}
            itens={itens}
          />
        </div>

        <FooterActions
          isLoading={isLoading}
          isSuccess={isSuccess}
          submitMode={submitMode}
          onCancel={() => router.back()}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}
