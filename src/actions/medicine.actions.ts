"use server";

import { Props } from "@/app/(commonLayout)/shop/page";
import {  ICreateMedicine, medicineService } from "@/services/medicine.service";
import { CreateNewCategory, CreateNewMedicine, MedicineData, OrderStatus } from "@/types/routes.type";

export const getSingleMedicine = async(slug : string) => {
  const res = await medicineService.getMedicineById(slug)
  return res;
}

export const getAllCategory = async () => {
  const res = await medicineService.getAllCategory();
  return res;
}
export const getAllMedicine = async ({search,category,price,page} : Props ) => {
  const res = await medicineService.getAllMedicine({search,category,price,page} as {search : string, category : string, price : string,page: string});
  return res;
}
export const createMedicine = async(formData : FormData) => {
  const payload: ICreateMedicine = {
    name: formData.get("name") as string,
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")),
    category: formData.get("categoryName") as string,
    image: formData.get("file") as File,
  };
  const res = await medicineService.createMedicine(payload);
  return res;
}

export const createCategory = async(data : CreateNewCategory) => {
  const res = await medicineService.createCategory(data);
  return res;
}

export const updateMedicine = async(slug: string, data : MedicineData) => {
  const res = await medicineService.updateMedicine(slug, data);
  return res;
}

export const deleteMedicine = async(slug : string) => {
  const res = await medicineService.deleteMedicine(slug);
  return res;
}
export const updateOrderStatusBySeller = async({id,orderStatus} : {id : string, orderStatus : OrderStatus}) => {
  const res = await medicineService.updateOrderStatusBySeller({id, orderStatus});
  return res;
}