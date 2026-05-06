"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  OrderProps,
  OrderStatus,
  PaymentStatus,
} from "@/types/routes.type";
import Link from "next/link";
import {
  Package,
  ChevronRight,
  Calendar,
  Tag,
  Hash,
  CreditCard,
} from "lucide-react";
import Image from "next/image";

/* ── status colour map ── */
const STATUS_STYLES: Record<string, string> = {
  [OrderStatus.CONFIRMED]:
    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  [OrderStatus.PENDING]:
    "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30",
  [OrderStatus.SHIPPED]:
    "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30",
  [OrderStatus.DELIVERED]:
    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  [OrderStatus.CANCELLED]:
    "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30",
};

const PAYMENT_STYLES: Record<string, string> = {
  [PaymentStatus.PAID]:
    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  [PaymentStatus.UNPAID]:
    "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30",
  [PaymentStatus.CANCELLED]:
    "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30",
};

export default function CustomerOrdersItem({ order }: { order: OrderProps }) {
  console.log(order.medicine.image)
  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardContent className="p-5 flex flex-col gap-4">
        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-3">
            <Link href={`/shop/${order.medicineId}`} className="hover:opacity-60">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/10 flex items-center justify-center">
              <Package className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground leading-tight">
                {order.medicine.name}
              </h2>
              <div className="flex items-center gap-1.5 mt-1">
                <Tag className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {order.medicine?.categoryName ?? "N/A"}
                </span>
              </div>
            </div>
          </div>
            </Link>

          <Badge
            variant="outline"
            className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${
              STATUS_STYLES[order.orderStatus] ?? STATUS_STYLES[OrderStatus.PENDING]
            }`}
          >
            {order.orderStatus}
          </Badge>
        </div>

        <Separator />

        {/* ── Info grid ── */}
        <div className="grid grid-cols-3 gap-x-4 gap-y-3 text-sm">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5 flex items-center gap-1">
              <Hash className="w-3 h-3" /> Qty
            </p>
            <p className="font-semibold text-foreground">{order.quantity}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Total</p>
            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              ${Number(order.totalAmount).toFixed(2)}
            </p>
          </div>

          <div className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border border-border bg-muted">
            <p>
              {order.medicine.image ? (
                <Image
                  src={order.medicine.image}
                  alt={order.medicine.name}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Package className="w-6 h-6 text-muted-foreground" />
              )}
              </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Stripe Price</p>
            <p className="font-semibold text-foreground">
              ${(order.medicine?.price ?? 0).toFixed(2)}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-0.5 flex items-center gap-1">
              <CreditCard className="w-3 h-3" /> Payment
            </p>
            <Badge
              variant="outline"
              className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${
                PAYMENT_STYLES[order.paymentStatus] ??
                PAYMENT_STYLES[PaymentStatus.UNPAID]
              }`}
            >
              {order.paymentStatus}
            </Badge>
          </div>

        </div>

        <Separator />

        {/* ── Footer ── */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>

          <Link href={`/orders/${order.id}`}>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 rounded-xl text-xs gap-1 text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              View Details
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}