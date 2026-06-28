interface MetricCardProps {
  icon: React.ReactNode
  label: string
  value: number | string
  sub?: string
  accent?: boolean
  color?: string
}

export function MetricCard({ icon, label, value, sub, accent, color }: MetricCardProps) {
  return (
    <div
      className={`rounded-2xl p-5 border transition-all duration-150 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] ${
        accent
          ? "bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] border-transparent"
          : "bg-white border-[#e2ece2]"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-[10px] font-bold uppercase tracking-[0.07em] ${
            accent ? "text-white/65" : "text-[#6b7c6d]"
          }`}
        >
          {label}
        </span>
        <span
          className={`w-[32px] h-[32px] rounded-[9px] flex items-center justify-center ${
            accent
              ? "bg-white/15 text-white"
              : color
              ? color
              : "bg-[#f0faf0] text-[#2E7D32]"
          }`}
        >
          {icon}
        </span>
      </div>
      <div
        className={`text-[28px] font-extrabold tracking-[-0.04em] leading-none ${
          accent ? "text-white" : "text-[#0d1f0e]"
        }`}
      >
        {value}
      </div>
      {sub && (
        <div
          className={`text-[11px] mt-1.5 ${accent ? "text-white/60" : "text-[#8da48e]"}`}
        >
          {sub}
        </div>
      )}
    </div>
  )
}

export function MetricSkeleton() {
  return (
    <div className="bg-white border border-[#e2ece2] rounded-2xl p-5">
      <div className="h-2.5 w-3/5 rounded bg-[#e8f0e8] animate-pulse mb-3" />
      <div className="h-7 w-2/5 rounded bg-[#e8f0e8] animate-pulse" />
    </div>
  )
}