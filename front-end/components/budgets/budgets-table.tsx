"use client"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { MoreHorizontal, Pencil, Trash2, Eye, Send, Download, Copy } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Budget, BudgetStatus } from "@/lib/types"

interface BudgetsTableProps {
  budgets: Budget[]
  selectedBudgets: string[]
  onSelectBudget: (id: string) => void
  onSelectAll: () => void
}

const statusConfig: Record<BudgetStatus, { label: string; className: string }> = {
  rascunho: {
    label: "Rascunho",
    className: "bg-muted text-muted-foreground",
  },
  enviado: {
    label: "Enviado",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  },
  aprovado: {
    label: "Aprovado",
    className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
  rejeitado: {
    label: "Rejeitado",
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
  expirado: {
    label: "Expirado",
    className: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  },
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function BudgetsTable({
  budgets,
  selectedBudgets,
  onSelectBudget,
  onSelectAll,
}: BudgetsTableProps) {
  const allSelected = budgets.length > 0 && selectedBudgets.length === budgets.length
  const someSelected = selectedBudgets.length > 0 && selectedBudgets.length < budgets.length

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected}
                onCheckedChange={onSelectAll}
                aria-label="Selecionar todos"
                className={someSelected ? "opacity-50" : ""}
              />
            </TableHead>
            <TableHead>Orcamento</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Itens</TableHead>
            <TableHead className="text-right">Valor Total</TableHead>
            <TableHead>Validade</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {budgets.map((budget) => {
            const status = statusConfig[budget.status]
            const isExpired = new Date(budget.validUntil) < new Date() && budget.status !== "aprovado"
            
            return (
              <TableRow
                key={budget.id}
                className={selectedBudgets.includes(budget.id) ? "bg-muted/50" : ""}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedBudgets.includes(budget.id)}
                    onCheckedChange={() => onSelectBudget(budget.id)}
                    aria-label={`Selecionar ${budget.title}`}
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{budget.title}</p>
                    <p className="text-sm text-muted-foreground">#{budget.id}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {getInitials(budget.clientName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{budget.clientName}</p>
                      <p className="text-xs text-muted-foreground">{budget.clientEmail}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={status.className}>
                    {status.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{budget.items.length} item(ns)</span>
                </TableCell>
                <TableCell className="text-right">
                  <span className="font-semibold">{formatCurrency(budget.total)}</span>
                </TableCell>
                <TableCell>
                  <span className={`text-sm ${isExpired ? "text-destructive" : "text-muted-foreground"}`}>
                    {format(new Date(budget.validUntil), "dd/MM/yyyy", { locale: ptBR })}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {budget.status === "rascunho" && (
                        <DropdownMenuItem>
                          <Send className="mr-2 h-4 w-4" />
                          Enviar para cliente
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Exportar PDF
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
          {budgets.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="h-32 text-center">
                <p className="text-muted-foreground">Nenhum orcamento encontrado</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
