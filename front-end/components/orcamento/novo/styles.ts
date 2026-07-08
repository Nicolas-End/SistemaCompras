// ── Estilos compartilhados do formulário de novo orçamento ──────────────────

export const inputClass =
  "w-full h-[42px] px-3.5 text-[13px] text-[#0d1f0e] bg-[#f5f9f5] border-[1.5px] border-[#d4e4d5] rounded-xl outline-none placeholder:text-[#b0c4b1] hover:border-[#a8c4a9] hover:bg-[#f0f8f0] focus:border-[#2E7D32] focus:bg-white focus:shadow-[0_0_0_3px_rgba(46,125,50,0.12)] transition-all duration-150 font-[inherit]"

export const textareaClass =
  "w-full px-3.5 py-3 text-[13px] text-[#0d1f0e] bg-[#f5f9f5] border-[1.5px] border-[#d4e4d5] rounded-xl outline-none placeholder:text-[#b0c4b1] hover:border-[#a8c4a9] hover:bg-[#f0f8f0] focus:border-[#2E7D32] focus:bg-white focus:shadow-[0_0_0_3px_rgba(46,125,50,0.12)] transition-all duration-150 font-[inherit] resize-none"

export const labelClass = "block text-[12px] font-semibold text-[#1a2e1b] mb-1.5 tracking-[-0.01em]"

export const sectionClass = "bg-white border border-[#e2ece2] rounded-2xl overflow-hidden"

export const ACCEPTED_TYPES = ["application/pdf", "image/png", "image/jpeg", "image/webp"]
export const ACCEPTED_EXT = ".pdf,.png,.jpg,.jpeg,.webp"

export type SubmitMode = "rascunho" | "enviar"
export type SubmitStatus = "idle" | "loading" | "success" | "error"
