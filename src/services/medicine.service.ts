
import { Props } from "@/app/(commonLayout)/shop/page";
import { CreateNewCategory, CreateNewMedicine, MedicineData, medicineParams, OrderStatus } from "@/types/routes.type";
import {  updateTag } from "next/cache";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface ICreateMedicine{
  name : string,
  price : number,
  stock : number,
  category : string,
  image : File
}

export const medicineService = {
  createMedicine : async function (data : ICreateMedicine) {
    try {
      const cookieStore = await cookies();

      const formData = new FormData();

      formData.append("name",data.name);
      formData.append("price",data.price.toString());
      formData.append("stock",data.stock.toString());
      formData.append("categoryName",data.category);

      if(data.image){
        formData.append("file",data.image);
      }
      
      const res = await fetch(`${API_URL}/api/seller/medicines`,{
        method: "POST",
        body : formData,
        headers: {
          Cookie: cookieStore.toString(),
        }
      });

      const result = await res.json();
      console.log("Result after create message : ",result);
      if (result.error) {
        return {
          data: null,
          error: { message: "Error: Post not created." },
        };
      }
      updateTag("medicinePosts");
      return {data : result, error : null }
    } catch (error) {
      return {data : null, error : {message : "New Medicine Creation Failed"}}
    }
  },

  createCategory : async function (data : CreateNewCategory) {
    try {
      const cookieStore = await cookies(); 
      const val = await this.getSingleCategory(data.categoryName);
      
      const updatedData = {
        description : data.description,
        categoryName : data.categoryName
      }
      
      
      const res = await fetch(`${API_URL}/api/categories`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body : JSON.stringify(updatedData)
      });
      const result = await res.json();
      if (result.error) {
        return {
          data: null,
          error: { message: "Error: Post not created." },
        };
      }
      return {data : result, error : null }
    } catch (error) {
      return {data : null, error : {message : "New Medicine Creation Failed"}}
    }
  },

  getSingleCategory : async function (cName : string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/categories/${cName}`,{
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
  getAllMedicine : async function (params ?: Props) {
    try {
      console.log({})

      const url = new URL(`${API_URL}/api/medicines`);

      if(params){
        Object.entries(params).map( ([key,value]) => {
          if(value !== undefined && value !== null &&  value !== ""){
            url.searchParams.append(key,value);
          }
        } )
      }

      const res = await fetch(url.toString(),{
        next : {
          tags : ["medicinePosts"]
        }
      });
      // if(res.ok){
      //   revalidateTag("medicinePosts","max");
      //   updateTag("medicinePosts");
      // }
      const data = await res.json();

      return {data: data, error : null};
    } catch (error) {
      return {data : null, error : {message : "Something Went Wrong !"}};
    }
  },
  getMedicineById : async function(slug : string) {
    try {
      const res = await fetch(`${API_URL}/api/medicines/${slug}`);
      const data = await res.json();

      return {data : data, error : null};
    } catch (error) {
     
      return {data : null, error : {message : "Something went wrong to fetch single medicine"}}
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
        }
      });
      const data = await res.json();
      return {data : data , error : null}
    } catch (error) {
      return {data : null, error : {message : "Fetch Category is not Happen.Internal Server Error"}}
    }
  },
  updateMedicine : async function(slug : string, medicineData : MedicineData) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/seller/medicines/${slug}`,{
        method : "PUT",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        },
        body : JSON.stringify(medicineData)
      });
      const data = await res.json();

      return {data : data, error : null}
    } catch (error) {
      return {data : null, error : {message : "Update Medicine failed due to Internal Error"}}
    }
  },
  deleteMedicine : async function (slug : string){
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/seller/medicines/${slug}`,{
        method : "DELETE",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString(),
        },
      })
      if(res.ok){
        updateTag("medicinePosts");
      }
      const data = await res.json();
      return {data : data, error : null};

    } catch (error) {
      return {data : null, error : {message : "Medicine Deletion Failed due to Internal Error"}}
    }
  },
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
  updateOrderStatusBySeller : async function ({id, orderStatus} : {id : string, orderStatus : OrderStatus}) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/seller/orders/${id}`,{
        method : "PATCH",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        },
        body : JSON.stringify({orderStatus})
      })
      const data = await res.json();
      updateTag("allOrders");
      return {data : data, error : null}
    } catch (error) {
      return {data : null, error : {message : "Update Status Failed Due to Internal Server Error"}}
    }
  }
}