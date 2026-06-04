"use client";

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { SearchForm } from "@/components/search-form"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { adminRoutes } from "@/routes/adminRoutes"
import { customerRoutes } from "@/routes/customerRoutes"
import { sellerRoutes } from "@/routes/sellerRoutes"
import { Route } from "@/types/routes.type"
import { Roles } from "@/constants/roles"
import { cn } from "@/lib/utils"
import { Cross, Home, Store, LogOut } from "lucide-react"
import { ModeToggle } from "@/components/layout/ModeToggle"
import { SignOutUser } from "@/actions/customer.actions"

export function AppSidebar({user, ...props }: {user : {role: string} & React.ComponentProps<typeof Sidebar>}) {
  const pathname = usePathname();
  const router = useRouter();
  
  let routes: Route[] = [];
  switch (user.role) {
    case Roles.admin:
      routes = adminRoutes;
      break;
    case Roles.customer:
      routes = customerRoutes;
      break;
    case Roles.seller:
      routes = sellerRoutes
      break;
  
    default:
      routes = [];
      break;
  }

  const handleSignOut = async () => {
    try {
      await SignOutUser();
      // Clear client-side cookies
      document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "better-auth.session_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      router.push("/login");
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Sidebar className="border-r border-border bg-card flex flex-col h-full" {...props}>
      <SidebarHeader className="h-16 flex items-center px-6 border-b border-border bg-card/50 backdrop-blur-sm shrink-0">
        <Link href={"/"} className="flex items-center gap-2 group w-full">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shadow-sm group-hover:shadow-emerald-500/25 group-hover:shadow-md transition-shadow">
              <Cross className="w-4 h-4 text-white rotate-45" />
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">
              HealthPlus Pharmacy
            </span>
          </Link>
      </SidebarHeader>
      
      <SidebarContent className="px-3 py-4 gap-4 flex-1 overflow-y-auto">
        {routes.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`);
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild
                        className={cn(
                          "w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                          isActive 
                            ? "bg-emerald-600/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400 font-semibold"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <Link href={item.url}>
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}

