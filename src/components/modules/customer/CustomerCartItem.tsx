"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { CartItemProps } from "@/types/routes.type";
import { toast } from "sonner";
import { createMyOrder, decrementItem, incrementItem, removeCartItem } from "@/actions/customer.actions";

export default function CustomerCartItem({ item }: { item: CartItemProps }) {
  // console.log("Cart item => ",item)
  const totalPrice = item.quantity * (item.medicine?.data.price ?? 0);

  const increaseItem = async(medicineId : string) => {
    try {
      const toastId = toast.loading("Item incrementing...");
      const result =  await incrementItem(medicineId);
      
      if(result.data.success){
        toast.success("Item Increment Successful",{id : toastId})
      }else{
        toast.error(result.error?.message || "Something Went Wrong", {id: toastId})
      }
      
    } catch (error) {
      toast.error("Internal Server Error")
    }
  }
  const decreaseItem = async(medicineId : string) => {
    try {
      const toastId = toast.loading("Item decrementing...");
      const res = await decrementItem(medicineId);
      
      if(res.data){
        toast.success("Item Decrement Successful",{id : toastId})
      }else{
        toast.error(res.error?.message || "Something Went Wrong", {id: toastId})
      }
      
    } catch (error: unknown) {
      const toastId = toast.loading("Item decrementing...");
      const message = error instanceof Error ? error.message : "Internal Server Error";
      // console.log(message);
      toast.error(message, {id : toastId});
    }
  }
  const remoteCartItem = async(id : string) => {
    try {
      const toastId = toast.loading("Item removing...");
      const res = await removeCartItem(id);
      
      if(res.data.success){
        toast.success("Item Remove Successful",{id : toastId})
      }else{
        toast.error(res.error?.message || "Something Went Wrong", {id: toastId})
      }
    } catch (error) {
      toast.error("Internal Server Error")
    }
  }
  const orderNow = async(cartId: string) => {
    try {
      const result = await createMyOrder(cartId as string);
      
      if (result.data && result.data.data.paymentUrl) {

        toast.success("Redirecting to payment...");
        console.log("resutl is before",result);
        window.location.href = result.data.data.paymentUrl;
        console.log("resutl is after",result);

      } else {
        toast.error("Address is not Provided Or Internal Server Error");
      }
      
    } catch (error) {
      // console.log('Error in orderNow:', error);
      toast.error("Internal Server Error")
    }
  }
  

  return (
    <Card className="rounded-2xl border border-gray-800 bg-gray-900 text-gray-100 shadow-md hover:shadow-lg hover:border-gray-700 transition-all duration-300">
      <CardContent className="p-6 flex items-center justify-between">

        {/* LEFT - Medicine Info */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-white">
            {item.medicine?.data.name}
          </h2>

          <p className="text-sm text-gray-400">
            Category: {item.medicine?.data.categoryName}
          </p>

          <p className="text-xs text-gray-500">
            Added: {new Date(item.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* MIDDLE - Price & Quantity Control */}
        <div className="flex flex-col items-center space-y-4">

          <div className="text-center">
            <p className="text-xs text-gray-500">Unit Price</p>
            <p className="font-medium text-gray-200">
              $ {item.medicine?.data.price}
            </p>
          </div>

          {/* Quantity Control */}
          <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden">

            <Button
              onClick={() => decreaseItem(item.medicineId)}
              size="icon"
              variant="ghost"
              className="rounded-none text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              <Minus  size={16} />
            </Button>

            <div className="px-4 py-1 text-white font-semibold text-lg bg-gray-800">
              {item.quantity}
            </div>

            <Button
              onClick={() => increaseItem(item.medicineId)}
              size="icon"
              variant="ghost"
              className="rounded-none text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              <Plus  size={16} />
            </Button>

          </div>

        </div>

        {/* RIGHT - Total & Remove */}
        <div className="flex flex-col items-end space-y-4">
          <div className="text-right">
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-2xl font-bold text-white">
              $ {totalPrice}
            </p>
          </div>

          <Button
            onClick={() => remoteCartItem(item.id)}
            variant="outline"
            size="sm"
            className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white transition"
          >
            <Trash2 size={16} className="mr-2" />
            Remove
          </Button>


          <Button
            onClick={() => orderNow(item.id)}
            variant="outline"
            size="sm"
            className= "border-green-500 text-green-500 hover:bg-green-600 hover:text-green-500 transition"
            >    
            Order Now
          </Button>


        </div>

      </CardContent>
    </Card>
  );
}