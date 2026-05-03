"use server";

import { adminService } from "@/services/admin.service";

export const getAllOrder = async() => {
  const res = await adminService.getAllOrder();
  return res;
}

export const getAllUsers = async() => {
  const res = await adminService.getAllUsers();
  return res;
}
export const updateUserStatus = async(userStatus: string, id : string) => {
  const res = await adminService.updateUserStatus(userStatus, id);
  return res;
}

export const getAllCategory = async () => {
  const res = await adminService.getAllCategory();
  return res;
}

export const getSingleCategory = async(slug : string) => {
  const res = await adminService.getSingleCategory(slug)
  return res;
}


export const getStatistics = async() => {
  const res = await adminService.getStatistics()
  return res;
}