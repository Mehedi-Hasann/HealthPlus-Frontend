import { Route } from "@/types/routes.type";

export const customerRoutes: Route[] = [
  {
    title: "Customer Management",
    items: [
      {
        title: "Profile",
        url: "/customer/profile",
      },
      {
        title: "Cart",
        url: "/customer/cart",
      },
      {
        title: "Orders",
        url: "/customer/orders",
      }
    ],
  },
]
