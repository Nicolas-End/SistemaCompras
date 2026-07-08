import type React from "react"

// ── Cabeçalho de seção do formulário ────────────────────────────────────────
export function SectionHeader({
  icon,
  title,
  sub,
  count,
}: {
  icon: React.ReactNode
  title: string
  sub?: string
  count?: number
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
