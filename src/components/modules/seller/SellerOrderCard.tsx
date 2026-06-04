"use client"
import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Order, OrderStatus } from "@/types/routes.type"
import { updateOrderStatusBySeller } from "@/actions/medicine.actions"
import { toastError } from "@/lib/toastHelper"
import { toast } from "sonner"
import { Package, Hash, Calendar, DollarSign, Loader2 } from "lucide-react"

export function SellerOrderCard({ items }: { items: Order[] }) {
  const [selectedStatus, setSelectedStatus] = useState<Record<string, OrderStatus>>({})
  const [isUpdating, setIsUpdating] = useState<Record<string, boolean>>({})

  const handleSubmit = async (id: string) => {
    const orderStatus = selectedStatus[id]
    if (!orderStatus) return

    const toastId = toast.loading("Updating Status...");
    setIsUpdating((prev) => ({ ...prev, [id]: true }));

    try {
      const result = await updateOrderStatusBySeller({ id, orderStatus })
      if(result.data){
        toast.success("Status Updated Successfully", { id: toastId })
      }else{
        toastError(result.error?.message || "Something Went Wrong", { id: toastId })
      }

      setSelectedStatus((prev) => {
        const copy = { ...prev }
        delete copy[id]
        return copy
      })
    } catch (error) {
      toastError("Status Update Failed", { id: toastId })
    } finally {
      setIsUpdating((prev) => ({ ...prev, [id]: false }))
    }
  }

  return (
    <div className="space-y-4 max-w-7xl mx-auto p-2">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight">Orders Management</h2>
        <p className="text-muted-foreground">View and update the status of customer orders.</p>
      </div>

      <Card className="p-5 overflow-hidden border-border bg-card rounded-2xl shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold text-foreground"><div className="flex items-center gap-2"><Hash className="w-4 h-4 text-muted-foreground"/> Order ID</div></TableHead>
                <TableHead className="font-semibold text-foreground"><div className="flex items-center gap-2"><Package className="w-4 h-4 text-muted-foreground"/> Product</div></TableHead>
                <TableHead className="font-semibold text-foreground text-center">Qty</TableHead>
                <TableHead className="font-semibold text-foreground">Status</TableHead>
                <TableHead className="font-semibold text-foreground"><div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-muted-foreground"/> Date</div></TableHead>
                <TableHead className="font-semibold text-foreground text-right"><div className="flex justify-end items-center gap-2"><DollarSign className="w-4 h-4 text-muted-foreground"/> Total</div></TableHead>
                <TableHead className="font-semibold text-foreground text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <Package className="w-8 h-8 opacity-20" />
                      <p>No orders found.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {items.map((item: any) => {
                const currentStatus = item.orderStatus as OrderStatus
                const newStatus = selectedStatus[item.id] ?? currentStatus
                const isChanged = newStatus !== currentStatus

                return (
                  <TableRow key={item.id} className="group hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">
                      <span className="text-xs font-mono bg-muted px-2 py-1 rounded-md text-muted-foreground">
                        {item.id}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span className="text-sm font-medium text-foreground">
                        {item.medicine?.name || item.medicineId.slice(0,8)}
                      </span>
                    </TableCell>

                    <TableCell className="text-center font-medium">
                      <Badge variant="outline" className="bg-background">
                        x{item.quantity}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <select
                        value={newStatus}
                        onChange={(e) =>
                          setSelectedStatus((prev) => ({
                            ...prev,
                            [item.id]: e.target.value as OrderStatus,
                          }))
                        }
                        className="bg-card border border-border text-foreground text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 transition-colors cursor-pointer hover:border-emerald-500/50"
                      >
                        {Object.values(OrderStatus).map((status) => (
                          <option key={status} value={status}>
                            {status.replace(/_/g, " ")}
                          </option>
                        ))}
                      </select>
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                        : "N/A"}
                    </TableCell>

                    <TableCell className="text-right">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        ${item.totalAmount.toFixed(2)}
                      </span>
                    </TableCell>

                    <TableCell className="text-center">
                      <Button
                        onClick={() => handleSubmit(item.id)}
                        size="sm"
                        disabled={!isChanged || isUpdating[item.id]}
                        className={`rounded-xl transition-all ${
                          isChanged && !isUpdating[item.id]
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-emerald-500/25"
                            : "bg-muted text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {isUpdating[item.id] ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Update"
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}