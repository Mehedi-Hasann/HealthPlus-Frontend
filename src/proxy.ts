import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";
import { jwtUtils } from "./lib/jwtUtils";
import { redirect } from "next/dist/server/api-utils";

export async function proxy (request : NextRequest) {

  const pathname = request.nextUrl.pathname;

  const accessToken = request.cookies.get("accessToken")?.value;

  const decodedAccessToken = accessToken && jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string).data;
  // console.log("decoded => ", decodedAccessToken);

  let isAuthenticated = false;
  let role = null;

  if(decodedAccessToken){
    isAuthenticated = true;
    role = decodedAccessToken.role
  }
  // console.log("role => ",role)
  // console.log("isAuthenticated => ",isAuthenticated)

  if(!isAuthenticated){
    // console.log("I am executed");
    // console.log(request.url);
    return NextResponse.redirect( new URL("/login",request.url) );
  }
  

  if(role===Roles.admin && (pathname.startsWith('/dashboard') || pathname.startsWith('/seller') || pathname.startsWith('/customer') ) ){
    return NextResponse.redirect( new URL("/admin/dashboard",request.url) );
  }
  else if(role===Roles.seller && (pathname.startsWith('/dashboard') || pathname.startsWith('/admin') || pathname.startsWith('/customer') ) ){
    return NextResponse.redirect( new URL("/seller/dashboard",request.url) );
  }
  else if(role===Roles.customer && (pathname.startsWith('/dashboard')|| pathname.startsWith('/customer/dashboard') || pathname.startsWith('/admin') || pathname.startsWith('/seller') ) ){
    console.log("Hi From customerRoutes");
    return NextResponse.redirect( new URL("/customer/cart", request.url) );
  }
  

  return NextResponse.next();
}

export const config = {
  matcher : [
    '/dashboard',
    '/dashboard/:path*',
    '/cart',
    '/admin',
    '/admin/:path*',
    '/seller',
    '/seller/:path*',
    '/customer',
    '/customer/:path*']
}