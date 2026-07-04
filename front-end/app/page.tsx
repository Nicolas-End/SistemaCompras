"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Package,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ShoppingCart,
  BarChart3,
  Truck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { getStaffLogin } from "./(app)/_api/staffs/api"

const FEATURES = [
  {
    icon: ShoppingCart,
    title: "Pedidos Inteligentes",
    desc: "Automatize aprovações e rastreie em tempo real",
  },
  {
    icon: BarChart3,
    title: "Relatórios Avançados",
    desc: "Dashboards com KPIs e análises preditivas",
  },
  {
    icon: Truck,
    title: "Logística Integrada",
    desc: "Gestão completa de fornecedores e entregas",
  },
]

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [errorTitle, setErrorTitle] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [showErrorDialog, setShowErrorDialog] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const isAuthenticated = await getStaffLogin({ email, password })
    if (!isAuthenticated.success) {
      setErrorMessage(isAuthenticated.message ?? "LOGIN INVÁLIDO")
      setErrorTitle(isAuthenticated.title ?? "LOGIN INVALIDADO")
      setShowErrorDialog(true)
      setIsLoading(false)
      return
    }

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex font-sans bg-[#f0f4f0]">

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-14 relative overflow-hidden bg-gradient-to-br from-[#0a2e0d] via-[#1B5E20] to-[#388E3C]">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_20%_20%,rgba(76,175,80,0.18)_0%,transparent_60%)]" />

        {/* Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-[17px] tracking-tight leading-none">Projeto Compras</p>
            <p className="text-white/45 text-[11px] font-normal uppercase tracking-widest mt-0.5">Sistema de Compras</p>
          </div>
        </div>

        {/* Hero */}
        <div className="relative z-10 flex flex-col gap-5">


          <h1 className="text-[38px] font-extrabold text-white leading-[1.1] tracking-[-0.04em]">
            Gestão de compras<br />
            <span className="text-[#81C784]">simplificada.</span>
          </h1>

          <p className="text-white/55 text-[15px] leading-relaxed max-w-sm font-normal">
            Do pedido à entrega, controle cada etapa do processo de aquisição com precisão e agilidade.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-1">
            {[
              { val: "100%", lbl: "Developer Java" },
              { val: "Posgresql", lbl: "O banco de dados otimizado" },
              { val: "Git", lbl: "versionamento garantido" },
            ].map(({ val, lbl }, i) => (
              <div key={lbl} className="flex items-center gap-6">
                {i > 0 && <div className="w-px h-8 bg-white/12" />}
                <div className="flex flex-col gap-0.5">
                  <span className="text-white font-extrabold text-[22px] tracking-[-0.04em] leading-none">{val}</span>
                  <span className="text-white/45 text-[11px] font-normal">{lbl}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Feature cards */}
          <div className="flex flex-col gap-3 mt-2">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-3.5 px-4 py-3.5 rounded-[14px] bg-white/[0.06] border border-white/[0.09] backdrop-blur-sm hover:bg-white/10 hover:border-white/16 transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-[9px] bg-[#81C784]/15 border border-[#81C784]/25 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[#81C784]" />
                </div>
                <div>
                  <p className="text-white text-[13px] font-semibold leading-none mb-1">{title}</p>
                  <p className="text-white/45 text-[12px] leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-white/25 text-[11px]">
          © 2025 ProcureSync · Todos os direitos reservados
        </p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="w-full lg:w-[480px] lg:flex-shrink-0 flex items-center justify-center p-8 bg-[#f0f4f0]">
        <div className="w-full max-w-[400px] bg-white rounded-3xl border border-[#1B5E20]/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_32px_rgba(27,94,32,0.08),0_32px_64px_rgba(0,0,0,0.06)] p-10 animate-[fadeUp_0.4s_ease_both]">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] flex items-center justify-center mx-auto mb-5 shadow-[0_8px_24px_rgba(27,94,32,0.3)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent" />
              <Package className="w-[26px] h-[26px] text-white relative z-10" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#0d1f0e] tracking-[-0.03em] mb-1.5">
              Bem-vindo de volta
            </h2>
            <p className="text-[14px] text-[#6b7c6d] font-normal leading-relaxed">
              Faça login para acessar o painel de compras
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-[13px] font-semibold text-[#1a2e1b] tracking-[-0.01em]">
                E-mail corporativo
              </label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9aad9b] group-focus-within:text-[#2E7D32] transition-colors" />
                <input
                  id="email"
                  type="email"
                  placeholder="seu@empresa.com"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[46px] pl-10 pr-3.5 text-[14px] font-normal text-[#0d1f0e] bg-[#f5f9f5] border-[1.5px] border-[#d4e4d5] rounded-xl outline-none placeholder:text-[#b0c4b1] hover:border-[#a8c4a9] hover:bg-[#f0f8f0] focus:border-[#2E7D32] focus:bg-white focus:shadow-[0_0_0_3px_rgba(46,125,50,0.12)] transition-all duration-150"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-[13px] font-semibold text-[#1a2e1b] tracking-[-0.01em]">
                Senha
              </label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9aad9b] group-focus-within:text-[#2E7D32] transition-colors" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[46px] pl-10 pr-10 text-[14px] font-normal text-[#0d1f0e] bg-[#f5f9f5] border-[1.5px] border-[#d4e4d5] rounded-xl outline-none placeholder:text-[#b0c4b1] hover:border-[#a8c4a9] hover:bg-[#f0f8f0] focus:border-[#2E7D32] focus:bg-white focus:shadow-[0_0_0_3px_rgba(46,125,50,0.12)] transition-all duration-150"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9aad9b] hover:text-[#2E7D32] hover:bg-[#2E7D32]/10 rounded-md p-1 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between mt-[-2px]">
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center gap-2 group"
              >
                <div className={`w-[18px] h-[18px] rounded-[5px] border-[1.5px] flex items-center justify-center transition-all duration-150 ${rememberMe ? "bg-[#2E7D32] border-[#2E7D32]" : "bg-[#f5f9f5] border-[#d4e4d5] group-hover:border-[#a8c4a9]"}`}>
                  {rememberMe && <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />}
                </div>
                <span className="text-[13px] text-[#5a6e5b] select-none">Lembrar-me</span>
              </button>
              <button
                type="button"
                className="text-[13px] font-medium text-[#2E7D32] hover:text-[#1B5E20] hover:underline transition-colors"
              >
                Esqueceu a senha?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full h-12 mt-1 flex items-center justify-center gap-2 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white text-[14px] font-bold tracking-[-0.01em] rounded-[13px] border-none cursor-pointer shadow-[0_4px_16px_rgba(27,94,32,0.3),0_1px_3px_rgba(27,94,32,0.2)] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(27,94,32,0.35)] active:translate-y-0 active:shadow-[0_2px_8px_rgba(27,94,32,0.25)] disabled:opacity-75 disabled:cursor-not-allowed transition-all duration-150 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/12 to-transparent pointer-events-none" />
              {isLoading ? (
                <>
                  <span className="w-[18px] h-[18px] rounded-full border-[2.5px] border-white/30 border-t-white animate-spin" />
                  <span className="relative z-10">Entrando...</span>
                </>
              ) : (
                <>
                  <span className="relative z-10">Entrar no sistema</span>
                  <ArrowRight className="w-4 h-4 relative z-10" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#e8f0e8]" />
            <span className="text-[11px] text-[#b0c4b1] font-medium tracking-widest whitespace-nowrap">
              CONEXÃO SEGURA
            </span>
            <div className="flex-1 h-px bg-[#e8f0e8]" />
          </div>

          {/* Security badges */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {["SSL 256-bit", "LGPD", "2FA Disponível"].map((badge) => (
              <div key={badge} className="flex items-center gap-1.5 text-[11px] text-[#8da48e] font-medium">
                <CheckCircle2 className="w-3 h-3 text-[#4CAF50]" />
                {badge}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center mt-7 pt-6 border-t border-[#f0f5f0]">
            <p className="text-[13px] text-[#8da48e]">
              Problemas para acessar?{" "}
              <button className="text-[#2E7D32] font-semibold hover:text-[#1B5E20] transition-colors">
                Contate o suporte
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Error Dialog */}
      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <AlertDialogTitle>{errorTitle}</AlertDialogTitle>
            </div>
            <AlertDialogDescription>{errorMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction onClick={() => setShowErrorDialog(false)}>
            Fechar
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}