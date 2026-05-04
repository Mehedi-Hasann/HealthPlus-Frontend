import { AppSidebar } from "@/components/app-sidebar"
import { DashboardNavbar } from "@/components/layout/DashboardNavbar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Roles } from "@/constants/roles"
import { userService } from "@/services/user.service"

import { redirect } from "next/navigation";

export default async function Page({admin,customer,seller}: {admin: React.ReactNode,customer: React.ReactNode,seller:React.ReactNode}) {
  
  const session = await userService.getSession();

  if (!session?.data?.user) {
    redirect('/login');
  }

  const data = session.data.user.role;
  const userInfo = {
    role : data
  }
  
  return (
    <SidebarProvider>
      <AppSidebar user={userInfo}/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border bg-card/80 backdrop-blur-sm px-4 sticky top-0 z-10 shadow-sm">
          <SidebarTrigger className="-ml-1" />
          <div className="h-6 w-px bg-border mx-2" /> {/* Separator */}
          <DashboardNavbar />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 overflow-y-auto bg-muted/10">
          {userInfo.role===Roles.admin? admin : userInfo.role===Roles.customer? customer : seller}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}