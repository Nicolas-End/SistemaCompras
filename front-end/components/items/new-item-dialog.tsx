"use client"

import { useState, useEffect } from "react"
import { Plus, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ItemCategory, ProviderDatas } from "@/lib/types"
import { mockProviders } from "@/lib/mock-data"
import { registerNewItem } from "@/app/(app)/_api/items/post-routes"

type SubmitStatus = "idle" | "loading" | "success" | "error"

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

  // Busca fornecedores ao abrir o modal
  useEffect(() => {
    if (!open) return

    setSuppliersLoading(true)
    setSuppliersError(null)

    async function loadSuppliers() {
      try {
        const datas = await mockProviders()
        if (Array.isArray(datas)) {
          setSuppliers(datas)
        }
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
      if (response.success === true){
        setSubmitStatus("success")
      }else{
        setSubmitStatus("error")
        setSubmitError(response.message)
      }
      
      // Fecha o modal após 1.5s mostrando o sucesso
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
    <Dialog open={open} onOpenChange={(value) => { setOpen(value); if (!value) resetForm() }}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Item
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Item</DialogTitle>
          <DialogDescription>
            Preencha as informações do item para adicioná-lo ao catálogo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Feedback de erro */}
          {submitStatus === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro ao cadastrar</AlertTitle>
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          {/* Feedback de sucesso */}
          {submitStatus === "success" && (
            <Alert className="border-green-500 text-green-600">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle>Item cadastrado!</AlertTitle>
              <AlertDescription>O item foi adicionado ao catálogo com sucesso.</AlertDescription>
            </Alert>
          )}

          {/* Nome + Código */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Item *</Label>
              <Input
                id="name"
                placeholder="Ex: Papel A4"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku">Código *</Label>
              <Input
                id="sku"
                placeholder="Ex: PAP-A4-001"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Fornecedor + Preço */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supplier">Fornecedor</Label>
              <Select
                value={formData.providerCNPJ}
                onValueChange={(value) => setFormData({ ...formData, providerCNPJ: value })}
                disabled={suppliersLoading || !!suppliersError}
              >
                <SelectTrigger id="supplier">
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
                <p className="text-xs text-destructive">{suppliersError}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$) *</Label>
              <Input
                id="price"
                inputMode="decimal"
                placeholder="0,00"
                value={formData.price || ""}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^0-9,]/g, "")
                    .replace(",", ".")
                  setFormData({ ...formData, price: Number(value) })
                }}
                required
              />
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={submitStatus === "loading" || submitStatus === "success"}>
              {submitStatus === "loading" ? "Cadastrando..." : "Cadastrar Item"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}