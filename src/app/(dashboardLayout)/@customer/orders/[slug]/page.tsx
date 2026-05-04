import { getMySingleOrders, getMyAddress } from "@/actions/customer.actions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  Calendar,
  Hash,
  DollarSign,
  MapPin,
  ClipboardList,
  ArrowLeft,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function SingleOrder({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const response = await getMySingleOrders(slug);
  const order = response?.data.data;

  const addressResponse = await getMyAddress();
  const userAddress = addressResponse?.data?.data || addressResponse?.data;

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
          <Package className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-base font-semibold text-foreground">
          Order not found
        </p>
        <p className="text-sm text-muted-foreground">
          This order may have been removed or doesn&apos;t exist.
        </p>
        <Link href="/orders">
          <Button
            variant="outline"
            className="mt-2 rounded-xl gap-2 text-sm border-border hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Button>
        </Link>
      </div>
    );
  }

  /* ── Status badge styling ── */
  const statusStyle =
    order.orderStatus === "CONFIRMED" || order.orderStatus === "DELIVERED"
      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
      : order.orderStatus === "SHIPPED"
      ? "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30"
      : order.orderStatus === "CANCELLED"
      ? "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30"
      : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30";

  return (
    <div className="min-h-[60vh]">
      {/* Back link + page title */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/orders">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/10 flex items-center justify-center">
            <ClipboardList className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              Order Details
            </h1>
            <p className="text-xs text-muted-foreground font-mono">
              #{order.id.slice(0, 12)}…
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl space-y-5">
        {/* ── Main Order Card ── */}
        <Card className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          {/* Accent bar */}
          <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />

          <CardContent className="p-6 space-y-5">
            {/* Status row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-400/10 flex items-center justify-center">
                  <Package className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-sm font-semibold text-foreground">
                  Order Status
                </span>
              </div>
              <Badge
                variant="outline"
                className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${statusStyle}`}
              >
                {order.orderStatus}
              </Badge>
            </div>

            <Separator />

            {/* ── Details grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Order ID */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Hash className="w-3 h-3" /> Order ID
                </p>
                <p className="text-sm font-medium text-foreground font-mono break-all">
                  {order.id}
                </p>
              </div>

              {/* Medicine ID */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Layers className="w-3 h-3" /> Medicine ID
                </p>
                <p className="text-sm font-medium text-foreground font-mono break-all">
                  {order.medicineId}
                </p>
              </div>

              {/* Quantity */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Package className="w-3 h-3" /> Quantity
                </p>
                <p className="text-lg font-bold text-foreground">
                  {order.quantity}
                </p>
              </div>

              {/* Total Amount */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <DollarSign className="w-3 h-3" /> Total Amount
                </p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  ${Number(order.totalAmount).toFixed(2)}
                </p>
              </div>

              {/* Created At */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" /> Created
                </p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Shipping Address Card ── */}
        <Card className="rounded-2xl border border-border bg-card shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-400/10 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Shipping Address
                </h3>
                <p className="text-xs text-muted-foreground">
                  Delivery destination
                </p>
              </div>
            </div>

            <Separator className="mb-4" />

            {order.shippingAddress || userAddress ? (
              <div className="px-4 py-3 rounded-xl bg-muted/40 border border-border/50">
                {order.shippingAddress ? (
                  <p className="text-sm text-foreground leading-relaxed">
                    {order.shippingAddress}
                  </p>
                ) : (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">{userAddress.fullName}</p>
                    <p className="text-xs text-muted-foreground">{userAddress.phone}</p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {[userAddress.houseNo, userAddress.street, userAddress.area, userAddress.city, userAddress.postalCode].filter(Boolean).join(", ")}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 gap-2">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  No address provided
                </p>
                <p className="text-xs text-muted-foreground">
                  Shipping address was not set for this order.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}