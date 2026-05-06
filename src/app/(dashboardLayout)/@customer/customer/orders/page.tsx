import { getMyAllOrders } from "@/actions/customer.actions";
import CustomerOrdersItem from "@/components/modules/customer/CustomerOrdersItem";
import { OrderProps } from "@/types/routes.type";
import { ClipboardList, PackageOpen } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const { data } = await getMyAllOrders();
  const orders: OrderProps[] = data?.data ?? [];
  const isEmpty = orders.length === 0;
  // console.log("orders is => ",orders)

  return (
    <div className="min-h-[60vh]">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/10 flex items-center justify-center">
          <ClipboardList className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">My Orders</h1>
          <p className="text-xs text-muted-foreground">
            {isEmpty
              ? "You haven't placed any orders yet"
              : `${orders.length} order${orders.length !== 1 ? "s" : ""}`}
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
              No orders yet
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Browse the shop and place your first order!
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.map((order: OrderProps) => (
            <CustomerOrdersItem key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}