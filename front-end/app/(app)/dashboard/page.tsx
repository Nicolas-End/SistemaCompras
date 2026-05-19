import { MetricsCards } from "@/components/dashboard/metrics-cards"
import { OrdersChart } from "@/components/dashboard/orders-chart"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { mockDashboardMetrics } from "@/lib/mock-data"

export default function DashboardPage() {
  const metrics = mockDashboardMetrics

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do sistema de gerenciamento de pedidos
        </p>
      </div>

      <MetricsCards metrics={metrics} />

      <div className="grid gap-6 lg:grid-cols-3">
        <OrdersChart data={metrics.chartData} />
        <RecentOrders orders={metrics.recentOrders} />
      </div>
    </div>
  )
}
