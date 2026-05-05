"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  ShoppingBag,
  Home,
  Store,
  LayoutDashboard,
  LogIn,
  UserPlus,
  LogOut,
  Cross,
  User,
  Package,
  Info,
  Mail,
  LifeBuoy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MenuItem {
  title: string;
  url?: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url?: string;
    src?: string;
    alt: string;
    title: string;
    className?: string;
  };
  loggedOutMenu?: MenuItem[];
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
    signout: { title: string; url: string };
  };
  userRole?: string;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

const NAV_ICONS: Record<string, React.ReactNode> = {
  Home: <Home className="w-4 h-4" />,
  Shop: <Store className="w-4 h-4" />,
  Dashboard: <LayoutDashboard className="w-4 h-4" />,
  About: <Info className="w-4 h-4" />,
  Contact: <Mail className="w-4 h-4" />,
  Orders: <Package className="w-4 h-4" />,
  Profile: <User className="w-4 h-4" />,
  Support: <LifeBuoy className="w-4 h-4" />,
};

const Navbar = ({
  logo = {
    url: "/",
    alt: "logo",
    title: "HealthPlus Pharmacy",
  },
  loggedOutMenu = [
    { title: "Home", url: "/" },
    { title: "Shop", url: "/shop" },
    { title: "About", url: "/about" },
    { title: "Contact", url: "/contact" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/sign-up" },
    signout: { title: "Sign Out", url: "/sign-out" },
  },
  className,
  userRole,
  userName,
  userEmail,
  userAvatar,
}: Navbar1Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const hasToken = document.cookie.split(";").some((c) => c.trim().startsWith("accessToken="));
    setIsLoggedIn(hasToken);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSignOut = async () => {
    document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    await authClient.signOut();
    setIsLoggedIn(false);
    router.push("/login");
  };

  const roleBase = userRole?.toLowerCase() || "customer";

  const loggedInMenu = [
    { title: "Home", url: "/" },
    { title: "Shop", url: "/shop" },
    { title: "Dashboard", url: `/${roleBase}/dashboard` },
    ...(userRole === "CUSTOMER" || !userRole 
      ? [{ title: "Orders", url: "/customer/orders" }] 
      : []),
    // { title: "Support", url: "/support" },
  ];

  const currentMenu = isLoggedIn ? loggedInMenu : loggedOutMenu;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-card/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* ── Logo ── */}
          <Link href={"/"} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shadow-sm group-hover:shadow-emerald-500/25 group-hover:shadow-md transition-shadow">
              <Cross className="w-4 h-4 text-white rotate-45" />
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">
              {logo.title}
            </span>
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList className="gap-8">
                {currentMenu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.url || "#"}
                        className="group h-9 flex items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[active=true]:bg-transparent data-[active=true]:text-foreground data-[active=true]:hover:bg-transparent data-[active=true]:focus:bg-transparent"
                      >
                        {NAV_ICONS[item.title] && (
                          <span className="text-muted-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {NAV_ICONS[item.title]}
                          </span>
                        )}
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* ── Desktop Right Actions ── */}
          <div className="hidden lg:flex items-center gap-2">
            <ModeToggle />

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={userAvatar} alt="@user" />
                      <AvatarFallback>{roleBase.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 rounded-xl" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none capitalize">{userName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                    <Link href={`/${roleBase}/profile`} className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                    <Link href={`/${roleBase}/orders`} className="flex items-center">
                      <Package className="mr-2 h-4 w-4" />
                      <span>{userRole === "CUSTOMER" ? "My Orders" : "Manage Orders"}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                    <Link href={`/${roleBase}/dashboard`} className="flex items-center">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="rounded-lg cursor-pointer text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{auth.signout.title}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="rounded-xl h-9 px-4 text-sm text-muted-foreground hover:text-foreground"
                >
                  <Link href={auth.login.url}>
                    <LogIn className="w-4 h-4 mr-1.5" />
                    {auth.login.title}
                  </Link>
                </Button>

                <Button
                  asChild
                  size="sm"
                  className="rounded-xl h-9 px-4 text-sm bg-emerald-600 hover:bg-emerald-700 dark:hover:bg-emerald-500 text-white shadow-sm hover:shadow-emerald-500/25 hover:shadow-md transition-all"
                >
                  <Link href={auth.signup.url}>
                    <UserPlus className="w-4 h-4 mr-1.5" />
                    {auth.signup.title}
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* ── Mobile Menu ── */}
          <div className="flex items-center gap-2 lg:hidden">
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl h-9 w-9 text-muted-foreground"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto w-[300px]">
                <SheetHeader className="pb-4">
                  <SheetTitle>
                    <Link
                      href={logo.url || "/"}
                      className="flex items-center gap-2"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                        <Cross className="w-4 h-4 text-white rotate-45" />
                      </div>
                      <span className="text-lg font-bold text-foreground tracking-tight">
                        {logo.title}
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <Separator className="mb-4" />

                {/* Mobile nav links */}
                <div className="flex flex-col gap-1">
                  {currentMenu.map((item) => (
                    <Link
                      key={item.title}
                      href={item.url || "#"}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                      <span className="text-muted-foreground">
                        {NAV_ICONS[item.title] || (
                          <ShoppingBag className="w-4 h-4" />
                        )}
                      </span>
                      {item.title}
                    </Link>
                  ))}
                  {isLoggedIn && (
                     <Link
                      href="/profile"
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                     >
                       <span className="text-muted-foreground"><User className="w-4 h-4" /></span>
                       Profile
                     </Link>
                  )}
                </div>

                <Separator className="my-4" />

                {/* Mobile auth */}
                <div className="flex flex-col gap-2">
                  {isLoggedIn ? (
                    <Button
                      variant="ghost"
                      className="rounded-xl justify-start gap-2 h-10 text-muted-foreground hover:text-red-600 dark:hover:text-red-400"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-4 h-4" />
                      {auth.signout.title}
                    </Button>
                  ) : (
                    <>
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-xl justify-start gap-2 h-10 border-border"
                      >
                        <Link href={auth.login.url}>
                          <LogIn className="w-4 h-4" />
                          {auth.login.title}
                        </Link>
                      </Button>

                      <Button
                        asChild
                        className="rounded-xl justify-start gap-2 h-10 bg-emerald-600 hover:bg-emerald-700 dark:hover:bg-emerald-500 text-white"
                      >
                        <Link href={auth.signup.url}>
                          <UserPlus className="w-4 h-4" />
                          {auth.signup.title}
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Navbar };
