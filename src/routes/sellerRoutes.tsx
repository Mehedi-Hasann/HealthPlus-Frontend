import { Route } from "@/types/routes.type";

export const sellerRoutes: Route[] = [
  {
    title: "Seller Management",
    items: [
      {
        title : "My Profile",
        url : "/seller/profile"
      },
      {
        title: "All Orders",
        url: "/seller/orders",
      },
      {
        title: "Manage Medicines",
        url: "/seller/medicines",
      },
      {
        title: "Dashboard",
        url: "/seller/dashboard",
      }
    ],
  },
]
