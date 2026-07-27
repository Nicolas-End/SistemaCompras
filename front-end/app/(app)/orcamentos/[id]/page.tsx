"use client"

import { useState, useEffect } from "react"
import { OrcamentoHeader }  from "@/components/orcamento/id/orcamento-header"
import { OrcamentoInfo }    from "@/components/orcamento/id/orcamento-infos"
import { OrcamentoItens }   from "@/components/orcamento/id/orcamento-items"
import { OrcamentoAnexos }  from "@/components/orcamento/id/orcamento-annexes"
import { TransformDialog }  from "@/components/orcamento/id/transform-dialog"
import type { Orcamento, UserSys } from "@/lib/types"
import { useParams } from "next/navigation"

// ── Mock fetch — replace with your real API call ─────────────────────────────
async function fetchOrcamento(id: string): Promise<Orcamento> {
  await new Promise((r) => setTimeout(r, 700))
  return {
    id,
    requestFor: "Ana Souza",
    observacoes: "Itens urgentes para o projeto de migração de infraestrutura. Favor priorizar a entrega.",
    status: "APROVADO",
    createdAt: "2025-06-01T10:00:00Z",
    updatedAt: "2025-06-03T15:30:00Z",
    itens: [
      { id: "i1", produtoId: "1", produtoNome: "Notebook Dell Inspiron 15", quantidade: 2 },
      { id: "i2", produtoId: "2", produtoNome: "Teclado Mecânico USB" , quantidade: 2, observacao: "Preferência ABNT2" },
      { id: "i3", produtoId: "3", produtoNome: "Mouse Sem Fio Logitech", quantidade: 2 },
      { id: "i4", produtoId: "4", produtoNome: "Cabo de Rede Cat6 10m", quantidade: 10 },
    ],
    anexos: [
      { id: "a1", nome: "requisicao-ti.pdf",  tipo: "application/pdf", tamanho: 204800, url: "#" },
      { id: "a2", nome: "aprovacao-gerente.pdf", tipo: "application/pdf", tamanho: 98304, url: "#" },
    ],

  }
}

// ── Mock current user — replace with your auth session ───────────────────────
const CURRENT_USER: UserSys = {
  id: "u1-dw-dwd-dw-dw",
  name: "Carlos Andrade",
  role: "ADMINISTRADOR", // try "solicitante" to hide the button
}

// ── Skeleton ─────────────────────────────────────────────────────────────────
function PageSkeleton() {
  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-5">
      {/* header skeleton */}
      <div className="h-10 w-64 rounded-xl bg-[#e8f0e8] animate-pulse" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 flex flex-col gap-5">
          {[140, 220, 120].map((h, i) => (
            <div key={i} className="bg-white border border-[#e2ece2] rounded-2xl" style={{ height: h }}>
              <div className="h-full animate-pulse bg-gradient-to-r from-[#f5f9f5] via-[#edf4ed] to-[#f5f9f5] bg-[length:200%_100%]" style={{ animation: "shimmer 1.4s ease infinite" }} />
            </div>
          ))}
        </div>
        <div className="h-48 bg-white border border-[#e2ece2] rounded-2xl animate-pulse" />
      </div>
    </div>
  )
}

// ── Summary sidebar card ──────────────────────────────────────────────────────
function SummarySidebar({ orcamento }: { orcamento: Orcamento }) {
  const cfg: Record<string, string> = {
    aprovado: "text-[#2E7D32]",
    pendente: "text-amber-600",
    rejeitado: "text-red-600",
    finalizado: "text-slate-500",
    em_cotacao: "text-blue-600",
    aguardando_aprovacao: "text-purple-600",
  }

  return (
    <div className="bg-white border border-[#e2ece2] rounded-2xl overflow-hidden">
      <div className="px-5 py-4 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] border-b border-[#f0f5f0]">
        <h3 className="text-[14px] font-bold text-white tracking-[-0.02em]">Resumo</h3>
        <p className="text-[11px] text-white/55 mt-0.5">Visão geral do orçamento</p>
      </div>
      <div className="px-5 py-4 flex flex-col gap-4">
        {[
          { label: "Número", value: orcamento.id },
          { label: "Solicitante", value: orcamento.requestFor },
          { label: "Total de Itens", value: `${orcamento.itens?.length } produto(s)` },
          { label: "Total de Unidades", value: `${orcamento.itens?.reduce((a, i) => a + i.quantidade, 0)} un.` },
          { label: "Anexos", value: `${orcamento.anexos?.length} arquivo(s)` },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-[10px] font-bold text-[#9aad9b] uppercase tracking-[0.07em]">{label}</p>
            <p className="text-[13px] font-semibold text-[#0d1f0e] mt-0.5">{value}</p>
          </div>
        ))}
        <div>
          <p className="text-[10px] font-bold text-[#9aad9b] uppercase tracking-[0.07em]">Status</p>
          <p className={`text-[13px] font-bold mt-0.5 ${cfg[orcamento.status] ?? "text-[#374937]"}`}>
            {orcamento.status.replace("_", " ").replace(/^\w/, c => c.toUpperCase())}
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function OrcamentoViewPage() {
    const params = useParams();
    const id = params.id as string
  const [orcamento, setOrcamento] = useState<Orcamento | null>(null)
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    fetchOrcamento(id).then((data) => {
      setOrcamento(data)
      setLoading(false)
    })
  }, [params.id])

  if (loading) return <PageSkeleton />
  if (!orcamento) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
      <p className="text-[16px] font-bold text-[#0d1f0e]">Orçamento não encontrado</p>
      <p className="text-[13px] text-[#8da48e]">Verifique o número e tente novamente.</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f5f8f5] font-sans">
      {/* Sticky header with back + status + action button */}
      <OrcamentoHeader
        orcamento={orcamento}
        currentUser={CURRENT_USER}
        onTransform={() => setDialogOpen(true)}
      />

      {/* Page content */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-7">
        <div className="flex flex-col lg:flex-row gap-5">

          {/* ── Main column ── */}
          <div className="flex-1 flex flex-col gap-5 min-w-0">
            <OrcamentoInfo   orcamento={orcamento} />
            <OrcamentoItens  itens={orcamento.itens?orcamento.itens : []} />
            <OrcamentoAnexos anexos={orcamento.anexos?orcamento.anexos : []} />
          </div>

          {/* ── Sidebar ── */}
          <div className="lg:w-[260px] flex-shrink-0">
            <div className="lg:sticky lg:top-[88px]">
              <SummarySidebar orcamento={orcamento} />
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation dialog */}
      <TransformDialog
        orcamento={orcamento}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  )
}