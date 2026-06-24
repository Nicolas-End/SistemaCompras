"use client"

import Image from "next/image"
import { MoreHorizontal, Pencil, Trash2, Eye, AlertTriangle } from "lucide-react"
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { Item } from "@/lib/types"

interface ItemsTableProps {
  items: Item[]
  selectedItems: string[]
  onSelectItem: (id: string) => void
  onSelectAll: () => void
}

const categoryLabels: Record<string, string> = {
  materiais: "Materiais",
  equipamentos: "Equipamentos",
  escritorio: "Escritorio",
  limpeza: "Limpeza",
  outros: "Outros",
}

const categoryColors: Record<string, string> = {
  materiais: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  equipamentos: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  escritorio: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  limpeza: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  outros: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export function ItemsTable({
  items,
  selectedItems,
  onSelectItem,
  onSelectAll,
}: ItemsTableProps) {
  const allSelected = items.length > 0 && selectedItems.length === items.length
  const someSelected = selectedItems.length > 0 && selectedItems.length < items.length

  return (
    <TooltipProvider>
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
              
              <TableHead>CODIGO</TableHead>
              <TableHead>NOME</TableHead>
              <TableHead>FORNECEDOR </TableHead>
              <TableHead className="text-right">PRECO</TableHead>
              
              <TableHead className="text-right">DATA DE CADASTRO</TableHead>


              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
         
              return (
                <TableRow
                  key={item.id}
                  className={selectedItems.includes(item.id) ? "bg-muted/50" : ""}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => onSelectItem(item.id)}
                      aria-label={`Selecionar ${item.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg border bg-muted">
                      {item.internalId ? (
                        <p className="font-medium">{item.internalId}</p>
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                          N/A
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                      {item.providerName? (
                        <p className="font-medium">{item.providerName}</p>
                      ): <p className="font-medium">Não Informado</p>}
                    
                  </TableCell>

                  <TableCell className="text-right font-medium">
                    {formatCurrency(item.price)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-destructive font-medium">
                        {item.createdAt}
                      </span>
                    </div>
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
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-32 text-center">
                  <p className="text-muted-foreground">Nenhum item encontrado</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  )
}
