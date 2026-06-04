import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./constants/roles";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let accessToken = request.cookies.get("accessToken")?.value;
  const sessionToken = request.cookies.get("better-auth.session_token")?.value || 
                       request.cookies.get("__Secure-better-auth.session_token")?.value;

  let newAccessToken = null;
  let newRefreshToken = null;
  let exchangedUser = null;

  if (!accessToken && sessionToken) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/session-to-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-token": sessionToken
        }
      });
      const data = await res.json();
      if (data.success && data.data) {
        newAccessToken = data.data.accessToken;
        newRefreshToken = data.data.refreshToken;
        exchangedUser = data.data.user;
        accessToken = newAccessToken;
      }
    } catch (e) {
      console.error("Failed to exchange better-auth session for accessToken in middleware:", e);
    }
  }

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

  const protectedPrefixes = ['/dashboard', '/admin', '/seller', '/customer', '/cart'];
  const isProtectedRoute = protectedPrefixes.some(prefix => pathname === prefix || pathname.startsWith(prefix + '/'));

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const requestHeaders = new Headers(request.headers);
  if (newAccessToken && newRefreshToken) {
    let cookieHeader = requestHeaders.get("cookie") || "";
    if (cookieHeader) {
      cookieHeader = cookieHeader
        .split(";")
        .map(c => c.trim())
        .filter(c => !c.startsWith("accessToken=") && !c.startsWith("refreshToken="))
        .join("; ");
    }
    const newCookies = [
      `accessToken=${newAccessToken}`,
      `refreshToken=${newRefreshToken}`
    ];
    cookieHeader = cookieHeader 
      ? `${cookieHeader}; ${newCookies.join("; ")}` 
      : newCookies.join("; ");
      
    requestHeaders.set("cookie", cookieHeader);
  }

  let response = NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  });

  if (pathname === '/cart') {
    const url = request.nextUrl.clone();
    url.pathname = '/customer/cart';
    response = NextResponse.redirect(url);
  } else if (
    isAuthenticated &&
    role === Roles.admin &&
    (pathname.startsWith('/dashboard') ||
      pathname.startsWith('/seller') ||
      pathname.startsWith('/customer'))
  ) {
    response = NextResponse.redirect(new URL("/admin/dashboard", request.url));
  } else if (
    isAuthenticated &&
    role === Roles.seller &&
    (pathname.startsWith('/dashboard') ||
      pathname.startsWith('/admin') ||
      pathname.startsWith('/customer'))
  ) {
    response = NextResponse.redirect(new URL("/seller/dashboard", request.url));
  } else if (
    isAuthenticated &&
    role === Roles.customer &&
    (pathname.startsWith('/dashboard') ||
      pathname.startsWith('/customer/dashboard') ||
      pathname.startsWith('/admin') ||
      pathname.startsWith('/seller'))
  ) {
    response = NextResponse.redirect(new URL("/customer/cart", request.url));
  }

  if (newAccessToken && newRefreshToken) {
    response.cookies.set("accessToken", newAccessToken, {
      path: '/',
      maxAge: 60 * 60 * 24 * 10,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    response.cookies.set("refreshToken", newRefreshToken, {
      path: '/',
      maxAge: 60 * 60 * 24 * 20,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, icon.svg, etc. (favicon/metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
