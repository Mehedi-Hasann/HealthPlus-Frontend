import { AppSidebar } from "@/components/app-sidebar"
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
  // console.log('session is => ',session);

  

  if (!session?.data?.user) {
    // console.log("/login success");
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
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo.role===Roles.admin? admin : userInfo.role===Roles.customer? customer : seller}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}