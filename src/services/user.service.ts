
import { cookies } from "next/headers";

const AUTH_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

import { jwtUtils } from "@/lib/jwtUtils";


export const userService = {
  getSession : async function () {
    try {
          const cookieStore = await cookies();
          const accessToken = cookieStore.get("accessToken")?.value;
          // console.log("access token is => ", accessToken);

          if(!accessToken){
            return {data : null, error : {message : "Session is missing"}};
          }

          const decoded = jwtUtils.decodedToken(accessToken);

          if(!decoded){
            return {data : null, error : {message : "Invalid token"}};
          }

          // Return in the format expected by layout.tsx: session.data.user
          const user = decoded.user ? decoded.user : decoded;

          return {data : { user }, error : null};
    } catch (error) {
    
      return {data : null, error : {message : "Something Went Wrong . The error => ",details : error}}
    }

  },
    SignOutUser : async function () {
      try {
        const cookieStore = await cookies();
        const res = await fetch(`${API_URL}/auth/logout`,{
          method : "POST",
          headers : {
            "Content-Type" : "application/json",
            Cookie : cookieStore.toString()
          },
        });
        const data = await res.json();
        return {data : data, error : null}
  
      } catch (error) {
        return {data : null, error : {message : "Internal Server Error"}}
      }
    },
}