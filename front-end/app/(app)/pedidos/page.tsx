"use client"

import { useState, useMemo } from "react"
import { OrdersFilters, ActiveFilters } from "@/components/orders/orders-filters"
import { OrdersTable } from "@/components/orders/orders-table"
import { NewOrderDialog } from "@/components/orders/new-order-dialog"
import { mockOrders } from "@/lib/mock-data"
import type { OrderStatus, Priority } from "@/lib/types"

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all")
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all")
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])

  const filteredOrders = useMemo(() => {
    return mockOrders.filter((order) => {
      const matchesSearch =
        searchQuery === "" ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.clientEmail.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "all" || order.status === statusFilter
      const matchesPriority = priorityFilter === "all" || order.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [searchQuery, statusFilter, priorityFilter])

  const handleSelectOrder = (id: string) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(filteredOrders.map((o) => o.id))
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setStatusFilter("all")
    setPriorityFilter("all")
  }

  const hasActiveFilters = searchQuery !== "" || statusFilter !== "all" || priorityFilter !== "all"

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pedidos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os pedidos do sistema
          </p>
        </div>
        <NewOrderDialog />
      </div>

      <OrdersFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <ActiveFilters
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
      />

      <div className="text-sm text-muted-foreground">
        {filteredOrders.length} pedido{filteredOrders.length !== 1 && "s"} encontrado{filteredOrders.length !== 1 && "s"}
        {selectedOrders.length > 0 && (
          <span className="ml-2 text-primary">
            ({selectedOrders.length} selecionado{selectedOrders.length !== 1 && "s"})
          </span>
        )}
      </div>

      <OrdersTable
        orders={filteredOrders}
        selectedOrders={selectedOrders}
        onSelectOrder={handleSelectOrder}
        onSelectAll={handleSelectAll}
      />
    </div>
  )
}
