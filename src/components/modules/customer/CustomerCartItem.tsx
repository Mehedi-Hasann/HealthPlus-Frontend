"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, ShoppingBag, Package } from "lucide-react";
import { CartItemProps } from "@/types/routes.type";
import { toast } from "sonner";
import {
  createMyOrder,
  decrementItem,
  incrementItem,
  removeCartItem,
} from "@/actions/customer.actions";

export default function CustomerCartItem({ item }: { item: CartItemProps }) {
  const totalPrice = item.quantity * (item.medicine?.data.price ?? 0);
  const unitPrice = item.medicine?.data.price ?? 0;

  const increaseItem = async (medicineId: string) => {
    try {
      const toastId = toast.loading("Updating quantity...");
      const result = await incrementItem(medicineId);
      if (result.data.success) {
        toast.success("Quantity updated", { id: toastId });
      } else {
        toast.error(result.error?.message || "Something went wrong", {
          id: toastId,
        });
      }
    } catch {
      toast.error("Internal Server Error");
    }
  };

  const decreaseItem = async (medicineId: string) => {
    try {
      const toastId = toast.loading("Updating quantity...");
      const res = await decrementItem(medicineId);
      if (res.data) {
        toast.success("Quantity updated", { id: toastId });
      } else {
        toast.error(res.error?.message || "Something went wrong", {
          id: toastId,
        });
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal Server Error";
      toast.error(message);
    }
  };

  const remoteCartItem = async (id: string) => {
    try {
      const toastId = toast.loading("Removing item...");
      const res = await removeCartItem(id);
      if (res.data.success) {
        toast.success("Item removed", { id: toastId });
      } else {
        toast.error(res.error?.message || "Something went wrong", {
          id: toastId,
        });
      }
    } catch {
      toast.error("Internal Server Error");
    }
  };

  const orderNow = async (cartId: string) => {
    try {
      const toastId = toast.loading("Preparing your order...");
      const result = await createMyOrder(cartId as string);
      if (result.data && result.data.data.paymentUrl) {
        toast.success("Redirecting to payment...", { id: toastId });
        window.location.href = result.data.data.paymentUrl;
      } else {
        toast.error("Address not provided or Internal Server Error", {
          id: toastId,
        });
      }
    } catch {
      toast.error("Internal Server Error");
    }
  };

  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardContent className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          {/* Medicine icon + Info */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground leading-tight">
                {item.medicine?.data.name}
              </h2>
              <Badge
                variant="secondary"
                className="mt-1 text-xs font-normal px-2 py-0.5"
              >
                {item.medicine?.data.categoryName}
              </Badge>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Added {new Date(item.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Remove button */}
          <Button
            onClick={() => remoteCartItem(item.id)}
            variant="ghost"
            size="icon"
            className="flex-shrink-0 h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            title="Remove item"
          >
            <Trash2 size={15} />
          </Button>
        </div>

        <Separator className="mb-4" />

        {/* Price & Quantity row */}
        <div className="flex items-center justify-between gap-3">
          {/* Unit Price */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-0.5">Unit Price</p>
            <p className="text-sm font-semibold text-foreground">
              ${unitPrice.toFixed(2)}
            </p>
          </div>

          {/* Quantity Control */}
          <div className="flex items-center gap-1 bg-muted rounded-xl p-1">
            <Button
              onClick={() => decreaseItem(item.medicineId)}
              size="icon"
              variant="ghost"
              className="h-7 w-7 rounded-lg text-muted-foreground hover:bg-background hover:text-foreground transition-colors"
            >
              <Minus size={13} />
            </Button>
            <span className="min-w-[2rem] text-center text-sm font-bold text-foreground px-1">
              {item.quantity}
            </span>
            <Button
              onClick={() => increaseItem(item.medicineId)}
              size="icon"
              variant="ghost"
              className="h-7 w-7 rounded-lg text-muted-foreground hover:bg-background hover:text-foreground transition-colors"
            >
              <Plus size={13} />
            </Button>
          </div>

          {/* Total Price */}
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-0.5">Total</p>
            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Order Now CTA */}
        <div className="mt-4">
          <Button
            onClick={() => orderNow(item.id)}
            className="w-full h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-medium text-sm gap-2 transition-all duration-200 shadow-sm hover:shadow-emerald-500/25 hover:shadow-md"
          >
            <ShoppingBag size={15} />
            Order Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}