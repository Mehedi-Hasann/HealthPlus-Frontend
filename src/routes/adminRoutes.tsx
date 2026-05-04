
import { Route } from "@/types/routes.type";

export const adminRoutes: Route[] = [
  {
    title: "Admin Management",
    items: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
      },
      {
        title: "Manage Users",
        url: "/admin/users",
      },
      {
        title: "All Orders",
        url: "/admin/orders",
      },
      {
        title: "Manage Categories",
        url: "/admin/categories",
      },
    ],
  },
]
