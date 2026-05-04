"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Order, OrderStatus, PaymentStatus } from "@/types/routes.type"
import { Package, Hash, Calendar, DollarSign, Layers, ShoppingCart, Info } from "lucide-react"

type ApiResponse = {
  success: boolean
  message: string
  data: {
      id : string,
      quantity : number,
      totalAmount : number,
      userId : string,
      medicineId : string,
      addressId : string,
      orderStatus : OrderStatus,
      paymentStatus : PaymentStatus,
      createdAt : string
  }[]
}

export function AdminOrderCard({ items }: { items: ApiResponse }) {
  const orders = items?.data ?? [];
  console.log(orders)

  const getStatusBadge = (status: string) => {
    switch (status) {
      // Order Status
      case "DELIVERED":
        return <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 px-2.5 py-0.5">Delivered</Badge>
      case "SHIPPED":
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20 px-2.5 py-0.5">Shipped</Badge>
      case "CONFIRMED":
        return <Badge variant="outline" className="bg-purple-500/10 text-purple-600 border-purple-500/20 px-2.5 py-0.5">Confirmed</Badge>
      
      // Payment Status
      case "PAID":
        return <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 px-2.5 py-0.5">Paid</Badge>
      case "UNPAID":
        return <Badge variant="outline" className="bg-rose-500/10 text-rose-600 border-rose-500/20 px-2.5 py-0.5">Unpaid</Badge>

      // Shared
      case "CANCELLED":
        return <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/20 px-2.5 py-0.5">Cancelled</Badge>
      case "PENDING":
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 px-2.5 py-0.5">Pending</Badge>

      default:
        return <Badge variant="outline" className="bg-gray-500/10 text-gray-600 border-gray-500/20 px-2.5 py-0.5">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-blue-500" />
          </div>
          All Orders
        </h1>
      </div>

      <Card className="border-border/50 bg-card/40 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-blue-500 via-teal-400 to-emerald-500" />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold text-muted-foreground py-4 px-6">
                    <span className="flex items-center gap-1.5"><Hash className="w-4 h-4" /> Order ID</span>
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Layers className="w-4 h-4" /> Medicine ID</span>
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Package className="w-4 h-4" /> Qty</span>
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Info className="w-4 h-4" /> OrderStatus</span>
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Info className="w-4 h-4" /> PaymentStatus</span>
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Created At</span>
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground text-right px-6">
                    <span className="flex items-center justify-end gap-1.5"><DollarSign className="w-4 h-4" /> Total</span>
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10">
                      <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                        <Package className="w-8 h-8 opacity-50" />
                        <p>No orders found.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((item) => (
                    <TableRow key={item.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="px-6 font-mono text-xs text-muted-foreground">
                        {item.id}
                      </TableCell>

                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {item.medicineId}
                      </TableCell>

                      <TableCell className="font-medium">
                        {item.quantity}
                      </TableCell>

                      <TableCell>
                        {getStatusBadge(item.orderStatus)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(item.paymentStatus)}
                      </TableCell>

                      <TableCell className="text-sm">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric'
                        }) : "-"}
                      </TableCell>

                      <TableCell className="text-right px-6 font-semibold text-foreground">
                        ${Number(item.totalAmount).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}