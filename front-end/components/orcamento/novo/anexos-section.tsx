"use client"

import { useCallback, useRef, useState } from "react"
import { Paperclip, Upload, FileText, X } from "lucide-react"
import type { OrcamentoAnexo } from "@/lib/types"
import { formatFileSize } from "@/lib/mock-data"
import { SectionHeader } from "./section-header"
import { sectionClass, ACCEPTED_TYPES, ACCEPTED_EXT } from "./styles"

// ── Seção de anexos com drag-and-drop ───────────────────────────────────────
export function AnexosSection({
  anexos,
  totalAnexos,
  onAddFiles,
  onRemoveAnexo,
}: {
  anexos: OrcamentoAnexo[]
  totalAnexos: number
  onAddFiles: (files: FileList | File[]) => void
  onRemoveAnexo: (id: string) => void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      onAddFiles(e.dataTransfer.files)
    },
    [onAddFiles],
  )

  return (
    <div className={sectionClass}>
      <SectionHeader
        icon={<Paperclip className="w-4 h-4" />}
        title="Anexos"
        sub="PDF, PNG, JPG, JPEG, WEBP"
        count={totalAnexos}
      />
      <div className="px-6 py-5 flex flex-col gap-4">
        {/* Zona de drop */}
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragOver(true)
          }}
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
            onChange={(e) => e.target.files && onAddFiles(e.target.files)}
          />
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
              isDragOver ? "bg-[#2E7D32]/15 text-[#2E7D32]" : "bg-[#e8f5e8] text-[#4CAF50]"
            }`}
          >
            <Upload className="w-5 h-5" />
          </div>
          <div className="text-center">
            <p className="text-[13px] font-semibold text-[#374937]">
              {isDragOver ? "Solte os arquivos aqui" : "Arraste arquivos ou clique para selecionar"}
            </p>
            <p className="text-[11px] text-[#8da48e] mt-1">PDF, PNG, JPG, JPEG, WEBP</p>
          </div>
        </div>

        {/* Lista de arquivos */}
        {anexos.length > 0 && (
          <div className="flex flex-col gap-2">
            {anexos.map((a) => (
              <div key={a.id} className="flex items-center gap-3 p-3 bg-[#f5f9f5] border border-[#e2ece2] rounded-xl">
                {a.preview ? (
                  <img
                    src={a.preview || "/placeholder.svg"}
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
                  onClick={() => onRemoveAnexo(a.id)}
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
  )
}
