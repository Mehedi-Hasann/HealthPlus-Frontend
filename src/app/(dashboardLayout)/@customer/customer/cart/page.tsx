import { getMyCart } from "@/actions/customer.actions";
import CustomerCartItem from "@/components/modules/customer/CustomerCartItem";
import { CartItemProps } from "@/types/routes.type";
import { ShoppingCart, PackageOpen } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const dynamic = "force-dynamic";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function CartPage() {
  const { data } = await getMyCart();

  const enrichedCartItem = await Promise.all(
    (data ?? []).data.map(async (item: CartItemProps) => {
      const res = await fetch(`${API_URL}/api/medicines/${item.medicineId}`);
      const medicine = await res.json();
      return { ...item, medicine };
    })
  );

  const isEmpty = enrichedCartItem.length === 0;

  const subtotal = enrichedCartItem.reduce((sum: number, item: CartItemProps) => {
    return sum + item.quantity * (item.medicine?.data.price ?? 0);
  }, 0);

  const itemCount = enrichedCartItem.reduce(
    (sum: number, item: CartItemProps) => sum + item.quantity,
    0
  );

  return (
    <div className="min-h-[60vh]">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/10 flex items-center justify-center">
          <ShoppingCart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">My Cart</h1>
          <p className="text-xs text-muted-foreground">
            {isEmpty
              ? "Your cart is empty"
              : `${itemCount} item${itemCount !== 1 ? "s" : ""} in your cart`}
          </p>
        </div>
      </div>

      {isEmpty ? (
        /* ── Empty State ── */
        <div className="flex flex-col items-center justify-center py-20 gap-4 rounded-2xl border border-dashed border-border bg-card/50">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
            <PackageOpen className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="text-base font-semibold text-foreground">
              Nothing here yet
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Add medicines to your cart from the shop.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* ── Cart Items Grid ── */}
          <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrichedCartItem.map((item: CartItemProps) => (
              <CustomerCartItem key={item.id} item={item} />
            ))}
          </div>

          {/* ── Order Summary Panel ── */}
          <div className="xl:col-span-1">
            <div className="sticky top-4 rounded-2xl border border-border bg-card shadow-sm p-5 space-y-4">
              <h2 className="text-base font-bold text-foreground">
                Order Summary
              </h2>
              <Separator />

              <div className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Items ({itemCount})
                  </span>
                  <span className="font-medium text-foreground">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
                    Free
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-foreground">
                  Subtotal
                </span>
                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <p className="text-xs text-muted-foreground">
                * Use the <strong>Order Now</strong> button on each item to
                proceed to payment individually.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}