
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const adminService = {
  getAllOrder : async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/seller/orders`,{
        method : "GET",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        },
        next: {
          tags: ["allOrders"]
        }
      });
      const data = await res.json();
      return {data : data, error : null}

    } catch (error) {
      return {data : null, error : {message : "Internal Server Error"}}
    }
  },
  getAllUsers : async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/admin/users`,{
        method : "GET",
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
  updateUserStatus : async function (userStatus : string, emailVerified: boolean, id : string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/admin/users/${id}`,{
        method : "PATCH",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        },
        body : JSON.stringify({userStatus, emailVerified})
      });
      const data = await res.json();

      return {data : data, error : null}

    } catch (error) {
      return {data : null, error : {message : "Internal Server Error"}}
    }
  },
  getAllCategory : async function() {
    try {
      
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/categories`,{
        method : "GET",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        },
      });

      const data = await res.json();
    
      return {data : data , error : null}
    } catch (error) {
      return {data : null, error : {message : "Fetch Category is not Happen.Internal Server Error"}}
    }
  },
  getSingleCategory : async function (slug : string) {
      try {
        const cookieStore = await cookies();
        const res = await fetch(`${API_URL}/api/categories/${slug}`,{
          method : "GET",
          headers : {
            "Content-Type" : "application/json",
            Cookie : cookieStore.toString(),
          }
        })
        return await res.json();
      } catch (error) {
        return {data : null, error : {message : "Internal Server Error From getSingleCategory"}};
      }
  },
  getStatistics : async function () {
      try {
        const cookieStore = await cookies();
        const res = await fetch(`${API_URL}/api/admin/stats`,{
          method : "GET",
          headers : {
            "Content-Type" : "application/json",
            Cookie : cookieStore.toString(),
          }
        })
        return await res.json();
      } catch (error) {
        return {data : null, error : {message : "Internal Server Error From getSingleCategory"}};
      }
  },
}