import { getStatistics } from "@/actions/admin.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserSquare, Store, ShoppingCart, DollarSign, Pill, Layers, Activity } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const data = await getStatistics();

  const stats = [
    { title: "Total Revenue", value: `$${Number(data?.totalOrderAmount || 0).toFixed(2)}`, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Total Orders", value: data?.totalOrder ?? 0, icon: ShoppingCart, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Total Users", value: data?.totalUser ?? 0, icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Customers", value: data?.totalCustomer ?? 0, icon: UserSquare, color: "text-amber-500", bg: "bg-amber-500/10" },
    { title: "Sellers", value: data?.totalSeller ?? 0, icon: Store, color: "text-rose-500", bg: "bg-rose-500/10" },
    { title: "Medicines", value: data?.totalMedicine ?? 0, icon: Pill, color: "text-teal-500", bg: "bg-teal-500/10" },
    { title: "Categories", value: data?.totalCategory ?? 0, icon: Layers, color: "text-indigo-500", bg: "bg-indigo-500/10" },
  ];

  return (
    <div className="space-y-8 min-h-[70vh]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            Admin Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Overview of your stores performance and activity.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="p-5 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 relative z-10">
                <CardTitle className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {stat.title}
                </CardTitle>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>

              <CardContent className="relative z-10">
                <p className="text-3xl font-bold text-foreground tracking-tight">
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}