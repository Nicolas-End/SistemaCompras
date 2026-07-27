import { Paperclip, FileText, Download, ImageIcon } from "lucide-react"
import { formatFileSize } from "@/lib/types"
import type { OrcamentoAnexo } from "@/lib/types"

interface Props {
  anexos: OrcamentoAnexo[]
}

const IMG_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

function AnexoIcon({ tipo }: { tipo: string }) {
  if (IMG_TYPES.includes(tipo)) return <ImageIcon className="w-4 h-4 text-blue-500" />
  return <FileText className="w-4 h-4 text-[#2E7D32]" />
}

function AnexoCard({ anexo }: { anexo: OrcamentoAnexo }) {
  const isImage = IMG_TYPES.includes(anexo.tipo)

  return (
    <div className="flex items-center gap-3 p-3.5 bg-[#f8faf8] border border-[#edf4ed] rounded-xl hover:border-[#c8e6c9] hover:bg-[#f0faf0] transition-all group">
      {/* Preview or icon */}
      {isImage && anexo.preview ? (
        <img
          src={anexo.preview}
          alt={anexo.nome}
          className="w-10 h-10 rounded-lg object-cover border border-[#e2ece2] flex-shrink-0"
        />
      ) : (
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isImage ? "bg-blue-50 border border-blue-100" : "bg-[#E8F5E9] border border-[#C8E6C9]"}`}>
          <AnexoIcon tipo={anexo.tipo} />
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-[#0d1f0e] truncate">{anexo.nome}</p>
        <p className="text-[11px] text-[#8da48e] mt-0.5">{formatFileSize(anexo.tamanho)}</p>
      </div>

      {/* Download */}
      {anexo.url && (
        <a
          href={anexo.url}
          download={anexo.nome}
          aria-label={`Baixar ${anexo.nome}`}
          className="w-8 h-8 rounded-lg border border-transparent flex items-center justify-center text-[#9aad9b] group-hover:border-[#c8e6c9] group-hover:text-[#2E7D32] group-hover:bg-white transition-all flex-shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  )
}

export function OrcamentoAnexos({ anexos }: Props) {
  return (
    <div className="bg-white border border-[#e2ece2] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[#f0f5f0]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[10px] bg-[#f0faf0] border border-[#c8e6c9] flex items-center justify-center text-[#2E7D32]">
            <Paperclip className="w-4 h-4" />
          </div>
          <h2 className="text-[14px] font-bold text-[#0d1f0e] tracking-[-0.02em]">Anexos</h2>
        </div>
        <span className="inline-flex items-center px-2.5 py-1 bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] rounded-full text-[11px] font-semibold">
          {anexos.length} {anexos.length === 1 ? "arquivo" : "arquivos"}
        </span>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        {anexos.length === 0 ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="w-10 h-10 rounded-xl bg-[#f5f9f5] border border-[#e2ece2] flex items-center justify-center mb-2 text-[#c8d8c9]">
              <Paperclip className="w-5 h-5" />
            </div>
            <p className="text-[13px] font-semibold text-[#8da48e]">Nenhum anexo</p>
            <p className="text-[12px] text-[#b0c4b1] mt-0.5">Este orçamento não possui arquivos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {anexos.map((a) => <AnexoCard key={a.id} anexo={a} />)}
          </div>
        )}
      </div>
    </div>
  )
}