"use client"

import { useState, useMemo } from "react"
import { BudgetsTable } from "@/components/budgets/budgets-table"
import { BudgetsFilters } from "@/components/budgets/budgets-filters"
import { NewBudgetDialog } from "@/components/budgets/new-budget-dialog"
import { BudgetStats } from "@/components/budgets/budget-stats"
import { mockBudgets } from "@/lib/mock-data"
import type { BudgetStatus } from "@/lib/types"

export default function BudgetsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<BudgetStatus | "all">("all")
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([])

  const filteredBudgets = useMemo(() => {
    return mockBudgets.filter((budget) => {
      const matchesSearch =
        searchQuery === "" ||
        budget.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        budget.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        budget.clientName.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "all" || budget.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [searchQuery, statusFilter])

  const handleSelectBudget = (id: string) => {
    setSelectedBudgets((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedBudgets.length === filteredBudgets.length) {
      setSelectedBudgets([])
    } else {
      setSelectedBudgets(filteredBudgets.map((b) => b.id))
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setStatusFilter("all")
  }

  const hasActiveFilters = searchQuery !== "" || statusFilter !== "all"

  // Calculate stats
  const stats = {
    total: mockBudgets.length,
    approved: mockBudgets.filter(b => b.status === "aprovado").length,
    pending: mockBudgets.filter(b => b.status === "enviado").length,
    totalValue: mockBudgets
      .filter(b => b.status === "aprovado")
      .reduce((sum, b) => sum + b.total, 0),
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orcamentos</h1>
          <p className="text-muted-foreground">
            Gerencie os orcamentos e propostas do sistema
          </p>
        </div>
        <NewBudgetDialog />
      </div>

      <BudgetStats stats={stats} />

      <BudgetsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <div className="text-sm text-muted-foreground">
        {filteredBudgets.length} orcamento(s) encontrado(s)
        {selectedBudgets.length > 0 && (
          <span className="ml-2 text-primary">
            ({selectedBudgets.length} selecionado(s))
          </span>
        )}
      </div>

      <BudgetsTable
        budgets={filteredBudgets}
        selectedBudgets={selectedBudgets}
        onSelectBudget={handleSelectBudget}
        onSelectAll={handleSelectAll}
      />
    </div>
  )
}
