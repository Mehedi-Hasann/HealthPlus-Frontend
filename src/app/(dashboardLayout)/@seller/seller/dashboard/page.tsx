import { getStatistics } from "@/actions/admin.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, ShoppingBag, DollarSign, Pill, Layers } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const data = await getStatistics();

  const stats = [
    { 
      title: "Total Users", 
      value: data?.totalUser ?? 0, 
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    { 
      title: "Total Customers", 
      value: data?.totalCustomer ?? 0, 
      icon: UserCheck,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    { 
      title: "Total Orders", 
      value: data?.totalOrder ?? 0, 
      icon: ShoppingBag,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    { 
      title: "Total Revenue", 
      value: `$${(data?.totalOrderAmount ?? 0).toLocaleString()}`, 
      icon: DollarSign,
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    { 
      title: "Total Medicines", 
      value: data?.totalMedicine ?? 0, 
      icon: Pill,
      color: "text-rose-500",
      bg: "bg-rose-500/10"
    },
    { 
      title: "Total Categories", 
      value: data?.totalCategory ?? 0, 
      icon: Layers,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10"
    },
  ];

  return (
    <div className="p-6 space-y-8 max-w-full ">
      
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Seller Dashboard</h1>
        <p className="text-muted-foreground">Overview of your store's performance and statistics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 hover:border-emerald-500/20"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {stat.title}
                </CardTitle>
                <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

    </div>
  );
}