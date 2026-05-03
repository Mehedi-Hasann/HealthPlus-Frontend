"use client"
import { useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Order, OrderStatus } from "@/types/routes.type"
import { updateOrderStatusBySeller } from "@/actions/medicine.actions"
import { toast } from "sonner"

export function SellerOrderCard({ items }: { items: Order[] }) {
  console.log(items);
  const [selectedStatus, setSelectedStatus] = useState<Record<string, OrderStatus>>({})
  const [isUpdating, setIsUpdating] = useState<Record<string, boolean>>({})
  console.log("previous status ",selectedStatus)

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
        toast.error(result.error?.message || "Something Went Wrong", { id: toastId })
      }

      setSelectedStatus((prev) => {
        const copy = { ...prev }
        delete copy[id]
        return copy
      })
    } catch (error) {
      toast.error("Status Update Failed", { id: toastId })
    } finally {
      setIsUpdating((prev) => ({ ...prev, [id]: false }))
    }
  }

  return (
    <Table>
      <TableCaption>A list of your recent orders.</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Medicine ID</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.length === 0 && (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-6">
              No Orders Found
            </TableCell>
          </TableRow>
        )}

        {items.map((item: any) => {
          const currentStatus = item.orderStatus as OrderStatus
          const newStatus = selectedStatus[item.id] ?? currentStatus
          const isChanged = newStatus !== currentStatus

          return (
            <TableRow key={item.id}>
              <TableCell className="font-medium break-all">
                {item.id}
              </TableCell>

              <TableCell className="break-all">
                {item.medicineId}
              </TableCell>

              <TableCell>{item.quantity}</TableCell>

              <TableCell>
                <select
                  value={newStatus}
                  onChange={(e) =>
                    setSelectedStatus((prev) => ({
                      ...prev,
                      [item.id]: e.target.value as OrderStatus,
                    }))
                  }
                  className="border rounded-md px-2 py-1 text-sm font-semibold"
                >
                  {Object.values(OrderStatus).map((status) => (
                    <option className="bg-black text-white" key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </TableCell>

              <TableCell>
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleString()
                  : ""}
              </TableCell>

              <TableCell className="text-right font-semibold">
                ${item.totalAmount.toFixed(2)}
              </TableCell>

              <TableCell className="text-center">
                <Button
                  onClick={() => handleSubmit(item.id)}
                  size="sm"
                  disabled={!isChanged || isUpdating[item.id]}
                >
                  {isUpdating[item.id] ? "Updating..." : "Submit"}
                </Button>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}