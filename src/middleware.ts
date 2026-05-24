import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./constants/roles";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const accessToken = request.cookies.get("accessToken")?.value;

  let isAuthenticated = false;
  let role = null;

  if (accessToken) {
    try {
      // Decode JWT payload (Edge-compatible)
      const payloadBase64 = accessToken.split('.')[1];
      if (payloadBase64) {
        const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
        );
        const decoded = JSON.parse(jsonPayload);
        const user = decoded.user ? decoded.user : decoded;
        isAuthenticated = true;
        role = user.role;
      }
    } catch (e) {
      console.error("JWT Decode error in middleware:", e);
    }
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    role === Roles.admin &&
    (pathname.startsWith('/dashboard') ||
      pathname.startsWith('/seller') ||
      pathname.startsWith('/customer'))
  ) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  } else if (
    role === Roles.seller &&
    (pathname.startsWith('/dashboard') ||
      pathname.startsWith('/admin') ||
      pathname.startsWith('/customer'))
  ) {
    return NextResponse.redirect(new URL("/seller/dashboard", request.url));
  } else if (
    role === Roles.customer &&
    (pathname.startsWith('/dashboard') ||
      pathname.startsWith('/customer/dashboard') ||
      pathname.startsWith('/admin') ||
      pathname.startsWith('/seller'))
  ) {
    return NextResponse.redirect(new URL("/customer/cart", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/cart',
    '/admin',
    '/admin/:path*',
    '/seller',
    '/seller/:path*',
    '/customer',
    '/customer/:path*',
  ],
};
