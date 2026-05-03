/* eslint-disable @typescript-eslint/no-explicit-any */

import { cookies } from "next/headers";
import { medicineService } from "./medicine.service";
import { revalidateTag } from "next/cache";
import { Address, CreateReview, Order, UpdateAddress } from "@/types/routes.type";


const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface EditInfo{
  name : string,
  email : string
}
export interface IRegisterUser{
  name : string,
  email : string,
  password : string,
  image : File
}
export interface ILoginUser{
    email : string,
    password : string,
}

export const customerService = {

  registerUser: async function (payload: IRegisterUser) {
  try {
    // console.log(payload);

    const formData = new FormData();

    formData.append("name", payload.name);
    formData.append("email", payload.email);
    formData.append("password", payload.password);

    if (payload.image) {
      formData.append("file", payload.image);
    }

    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      body: formData, // ❌ no JSON
    });

    const data = await res.json();
    // console.log(data)
    if(data.success==false){
      return {data : null, error : data.message};
    }

    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: { message: "Internal Server Error" } };
  }
},

  loginUser : async function (payload : ILoginUser) {
    try {
      // console.log(payload);
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/auth/login`,{
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        },
        body : JSON.stringify(payload),
      })

      const data = await res.json();
      // console.log("console from loginUser => ",data);
      if(data.success==false){
        return {data : null, error : data.message};
      }

    return { data: data, error: null };
    } catch (error) {
      return {data : null, error : {message : "Internal Server Error"}}
    }
  },
 
  getMyProfile : async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/customer/me`,{
        method : "GET",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        }
      })
      const data = await res.json();
  
    
      return {data : data, error : null}
    } catch (error) {
      return {data : null, error : {message : "Error Happen Due to Internal Server Error for getting MyInfo"}}
    }
  },

  editMyInfo : async function (payload : EditInfo) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/customer/profile`,{
        method : "PUT",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        },
        body : JSON.stringify(payload)
      })
      const data = await res.json();
    
      return {data : data, error : null}
    } catch (error) {
      return {data : null, error : {message : "Internal Server Error"}}
    }
  },

  getMyCart : async function () {
    try {
      // const medicine = await medicineService.getMedicineById();
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/customer/cart`,{
        method : "GET",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        },
        next : {
          tags : ["addToCartTag"]
        }
      })
      const data = await res.json();
      // console.log("data from getMyCart : ",data)
      
    
      return {data : data, error : null}
    } catch (error) {
      return {data : null, error : {message : "Internal Server Error"}}
    }
  },

  getMySingleCart : async function (id : string) {
    try {
  
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/customer/cart/${id}`,{
        method : "GET",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        }
      })
      const data = await res.json();
      
      return {data : data, error : null}
    } catch (error) {
      return {data : null, error : {message : "Internal Server Error"}}
    }
  },

  addToCart : async function (medicineId : string) {
    try {
      // console.log(medicineId);
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/customer/cart`,{
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        },
        body : JSON.stringify({medicineId}),
        next : {
          tags : ['cartItems']
        }
      })
      const data = await res.json();
    
      return {data : data, error : null}
    } catch (error) {
      return {data : null, error : {message : "Internal Server Error"}}
    }
  },

  incrementItem : async function (medicineId : string) {
    const medicineInfo = {medicineId};

    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/customer/cart`,{
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        },
        body : JSON.stringify(medicineInfo),
      })
      
      const data = await res.json();
      return {data : data, error : null}
    } catch (error) {
      return {data : null, error : {message : "Item increment failed"}}
    }
  },

  decrementItem : async function (medicineId : string) {
    const medicineInfo = {medicineId};

    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/customer/decrement`,{
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        },
        body : JSON.stringify(medicineInfo),
      })
      const val = await res.json();
      // console.log('val is => ',val.message);
      if(!val.success){
        return {data : null, error : {message : val.message || "Item decrement failed"}}
      }
      return {data : val, error : null}
    } catch (error) {
      return {data : null, error : {message : "Item decrement failed"}}
    }
  },

  removeCartItem : async function (id : string) {

    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/customer/${id}`,{
        method : "DELETE",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        }
      })
      if(!res.ok){
        return {data : null, error : {message : "Item decrement failed"}}
      }
      const data = await res.json();
      return {data : data, error : null}
    } catch (error) {
      return {data : null, error : {message : "Item decrement failed"}}
    }
  },

  removeOrderItem : async function (id : string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/orders/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) {
        return { data: null, error: { message: "Order removal failed" } };
      }

      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Order removal failed" } };
    }
  },

  createMyOrder : async function (cartId : string) {
    
    try {
      const userAddress = await this.getMyAddress();
      const cartItem = await this.getMySingleCart(cartId);
      const medicineId = cartItem.data.data.medicineId;
      const quantity = cartItem.data.data.quantity;
      const addressId = userAddress.data.data.id;

      const payload = {
        medicineId,
        quantity,
        addressId
      }
      // console.log("Ordering item payload ",payload);
      if(!addressId){
        return {data : null, error : {message : "Provide your Address"}}
      }
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/orders`,{
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        },
        body : JSON.stringify(payload)
      })
      const data = await res.json();
      console.log("Data received after order => ",data);
      // await this.removeCartItem(cartId)
      return {data : data, error : null};

    } catch (error) {
      
      return {data : null, error : {message : "Item decrement failed"}}
    }
  },

  getMyAllOrders : async function () {

    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/customer/orders`,{
        method : "GET",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        },
        next : {
          tags : ["allOrders"]
        }
      })
      const data = await res.json();
      return {data : data, error : null};

    } catch (error) {
      return {data : null, error : {message : "Item decrement failed"}}
    }
  },

  getMySingleOrders : async function (id : string) {

    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/customer/orders/${id}`,{
        method : "GET",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        }
      })
      const data = await res.json();
      return {data : data, error : null};

    } catch (error) {
      return {data : null, error : {message : "Item decrement failed"}}
    }
  },

  createMyAddress : async function (addressData : Address) {
    
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/customer/address`,{
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        },
        body : JSON.stringify(addressData)
      })
      const data = await res.json();
      return {data : data, error : null};

    } catch (error) {
      return {data : null, error : {message : "Item decrement failed"}}
    }
  },
  
  getMyAddress : async function () {
    
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/customer/my-address`,{
        method : "GET",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        },
      })
      const data = await res.json();
      return {data : data, error : null};

    } catch (error : any) {
      return {data : null, error : {message : "Item decrement failed"}}
    }
  },

  updateMyAddress : async function(updatedAddressData : UpdateAddress) {
    try {
      const cookieStore = await cookies();
      // console.log('updatedAddressData => ', updatedAddressData);
      const res = await fetch(`${API_URL}/api/customer/update-my-address`,{
        method : "PUT",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        },
        body : JSON.stringify(updatedAddressData)
      })

      const data = await res.json();

      return {data : data, error : null}
    } catch (error : any) {
      return {data : null, error : {message : "Updating Address Failed"}}
    }
  },

  createReview : async function ({medicineId, description} : CreateReview) {
    const reviewData = {
      medicineId,
      description
    }
    
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/customer/review`,{
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
          Cookie : cookieStore.toString()
        },
        body : JSON.stringify(reviewData)
      })
      const data = await res.json();

      return {data : data, error : null};

    } catch (error) {
      return {data : null, error : {message : "Creating Review failed"}}
    }
  },
}