"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
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

// Mock: substitua pela URL real quando tiver o endpoint
// Ex: const SUPPLIERS_URL = "/api/suppliers"
async function fetchSuppliers(): Promise<{ id: string; name: string }[]> {
  await new Promise((resolve) => setTimeout(resolve, 800)) // simula latência
  return [
    { id: "1", name: "Fornecedor A" },
    { id: "2", name: "Fornecedor B" },
    { id: "3", name: "Fornecedor C" },
  ]
  // Quando tiver endpoint real, troque por:
  // const res = await fetch(SUPPLIERS_URL)
  // if (!res.ok) throw new Error("Erro ao buscar fornecedores")
  // return res.json()
}

export function NewItemDialog() {
  const [open, setOpen] = useState(false)
  const [suppliers, setSuppliers] = useState<ProviderDatas[]>([])
  const [suppliersLoading, setSuppliersLoading] = useState(false)
  const [suppliersError, setSuppliersError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    category: "" as ItemCategory | "",
    price: "",
    supplier: "",
  })

  // Busca fornecedores ao abrir o modal
  useEffect(() => {
    async function loadItens() {
          try {
            const datas = await mockProviders();
            if(Array.isArray(datas)){
              setSuppliers(datas)
              
            }
          }finally{
            setSuppliersLoading(false)
          }
    
        }
        loadItens()
    if (!open) return
    setSuppliersLoading(true)
    setSuppliersError(null)
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement item creation
    console.log("Item data:", formData)
    setOpen(false)
    setFormData({
      name: "",
      code: "",
      category: "",
      price: "",
      supplier: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                value={formData.supplier}
                onValueChange={(value) => setFormData({ ...formData, supplier: value })}
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
                type="number"
                step="0.01"
                min="0"
                placeholder="0,00"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Cadastrar Item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}