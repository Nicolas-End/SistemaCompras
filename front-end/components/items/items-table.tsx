"use client"

import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"
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
import {
  TooltipProvider,
} from "@/components/ui/tooltip"
import type { Item } from "@/lib/types"

interface ItemsTableProps {
  items: Item[]
  selectedItems: string[]
  onSelectItem: (id: string) => void
  onSelectAll: () => void
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
              <TableHead>CÓDIGO</TableHead>
              <TableHead>NOME</TableHead>
              <TableHead>FORNECEDOR</TableHead>
              <TableHead className="text-right">PREÇO</TableHead>
              <TableHead className="text-right">DATA DE CADASTRO</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
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

                {/* Código */}
                <TableCell>
                  <span className="font-mono text-sm text-muted-foreground">
                    {item.internalCode ?? "—"}
                  </span>
                </TableCell>

                {/* Nome */}
                <TableCell>
                  <p className="font-medium">{item.name}</p>
                </TableCell>

                {/* Fornecedor */}
                <TableCell>
                  <p className="text-sm text-muted-foreground">
                    {item.providerName ?? "Não informado"}
                  </p>
                </TableCell>

                {/* Preço */}
                <TableCell className="text-right font-medium">
                  {formatCurrency(item.price)}
                </TableCell>

                {/* Data */}
                <TableCell className="text-right text-sm text-muted-foreground">
                  {item.createdAt}
                </TableCell>

                {/* Ações */}
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
            ))}

            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center">
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