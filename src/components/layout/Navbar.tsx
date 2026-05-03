"use client";

import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
} from "@/components/ui/accordion";
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
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

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
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
    signout: {
      title : string,
      url : string
    }
  };
}

const Navbar = ({
  logo = {
    url: "https://www.shadcnblocks.com",
    // src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Medi Store",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Shop", url: "/shop" },
    { title: "Dashboard", url: "/dashboard" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/sign-up" },
    signout : {title : "Sign Out", url: "/sign-out"}
  },
  className,
}: Navbar1Props) => {

    const router = useRouter();

    const handleSignOut = async() => {
      await authClient.signOut();
      router.push('/login');

    }

  return (
    <section className={cn("py-4", className)}>
      <div className="container mx-auto">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Button className="flex items-center gap-2">
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </Button>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            <ModeToggle />
            <Button asChild variant="outline" size="sm">
              <Link href={auth.login.url}>{auth.login.title}</Link>
            </Button>
            <Button asChild size="sm">
              <Link href={auth.signup.url}>{auth.signup.title}</Link>
            </Button>
            <Button asChild size="sm" onClick={() => handleSignOut()}>
              <Link href={auth.signout.url}>{auth.signout.title}</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
            
                <div className="flex flex-col gap-6 p-4">
                  <div className="flex w-full flex-col gap-4">
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </div>

                  <div className="flex flex-col gap-3">
                    <ModeToggle />
                    <Button asChild variant="outline">
                      <Link href={auth.login.url}>{auth.login.title}</Link>
                    </Button>
                    <Button asChild>
                      <Link href={auth.signup.url}>{auth.signup.title}</Link>
                    </Button>
                    <Button asChild>
                      <Link href={auth.signout.url}>{auth.signout.title}</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink asChild>
        <Link 
          href={item.url || "#"} 
          className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
        >
          {item.title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {

  return (
    <Link key={item.title} href={item.url || "#"} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};

export { Navbar };
