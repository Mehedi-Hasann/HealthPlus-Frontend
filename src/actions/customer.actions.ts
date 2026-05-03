"use server"

import { customerService, EditInfo, ILoginUser, IRegisterUser } from "@/services/customer.service"
import { Address, CreateReview, PaymentStatus, UpdateAddress } from "@/types/routes.type";
import { updateTag } from "next/cache";



export const registerUser = async({name,email,password,image} : IRegisterUser) => {
  // console.log("I am from customer.action.ts");
  const res = await customerService.registerUser({name,email,password,image});
  return res;
}

export const loginUser = async({email,password} : ILoginUser) => {
  const res = await customerService.loginUser({email,password});
  return res;
}

export const getMyProfile = async() => {
  const res = await customerService.getMyProfile();
  return res;
}

export const editMyInfo = async({name, email} : EditInfo) => {
  const res = await customerService.editMyInfo({name,email});
  return res;
}

export const getMyCart = async() => {
  const res = await customerService.getMyCart();
  return res;
}

export const getMySingleCart = async(id : string) => {
  const res = await customerService.getMySingleCart(id);
  return res;
}

export const addToCart = async(medicineId : string) => {
  const res = await customerService.addToCart(medicineId);
  return res;
}

export const incrementItem = async(medicineId : string) => {
  const res = await customerService.incrementItem(medicineId as string);
  updateTag("addToCartTag");
  return res;
}

export const decrementItem = async(medicineId : string) => {
  const res = await customerService.decrementItem(medicineId as string);
  updateTag("addToCartTag");
  return res;
}

export const removeCartItem = async(id : string) => {
  const res = await customerService.removeCartItem(id as string);
  updateTag("addToCartTag");
  return res;
}

export const removeOrderItem = async(id : string) => {
  const res = await customerService.removeOrderItem(id as string);
  updateTag("allOrders");
  return res;
}

export const createMyOrder = async(cartId : string) => {
  const res = await customerService.createMyOrder(cartId);
  updateTag("allOrders");
  return res;
}

export const getMyAllOrders = async() => {
  const res = await customerService.getMyAllOrders();
  return res;
}

export const getMySingleOrders = async(id : string) => {
  const res = await customerService.getMySingleOrders(id);
  return res;
}

export const createMyAddress = async(addressData : Address) => {
  const res = await customerService.createMyAddress(addressData);
  return res;
}

export const updateMyAddress = async(updatedAddressData : UpdateAddress) => {
  const res = await customerService.updateMyAddress(updatedAddressData);
  return res;
}

export const getMyAddress = async() => {
  const res = await customerService.getMyAddress();
  return res;
}

export const createReview = async({medicineId, description} : CreateReview) => {
  const res = await customerService.createReview({medicineId, description});
  return res;
}

// export const orderItem = async(id : string) => {
//   const res = await customerService.orderItem(id as string);
//   updateTag("addToCartTag");
//   return res;
// }