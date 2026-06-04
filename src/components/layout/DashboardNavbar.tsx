"use client";

import { Home, Store, LogOut } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { useRouter } from "next/navigation";
import { SignOutUser } from "@/actions/customer.actions";
import { toast } from "sonner";

export function DashboardNavbar() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // Call server action to logout (forwards cookies server-side)
      const result = await SignOutUser();

      if(result.error){
        console.log("error => ",result.error);
        toast.error(result.error.message);
        return;
      }

      // Clear client-side cookies
      document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "better-auth.session_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      
      // Redirect
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="flex items-center justify-between w-full ml-2">
      <div className="flex items-center gap-4">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-emerald-600 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Home</span>
        </Link>
        <Link 
          href="/shop" 
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-emerald-600 transition-colors"
        >
          <Store className="w-4 h-4" />
          <span className="hidden sm:inline">Shop</span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <ModeToggle />
        <button 
          onClick={handleSignOut}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
