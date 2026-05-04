"use client";

import { Home, Store, LogOut } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function DashboardNavbar() {
  const router = useRouter();

  const handleSignOut = async () => {
    document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    await authClient.signOut();
    router.push("/login");
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
