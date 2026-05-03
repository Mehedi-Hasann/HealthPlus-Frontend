"use client";

import { addToCart } from "@/actions/customer.actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AddToCartButton({medicineId} : {medicineId : string}) {
  
  const handleAddToCart = async() => {
    const toastId = toast.loading("Adding item to cart.....")
    try {
      const result = await addToCart(medicineId);
      if(result.data.success){
        toast.success("Adding Item to Cart Successful",{id : toastId})
      }
      else{
          toast.error(result?.data?.message || "Failed to add item to cart", {
        id: toastId,
      })
      }
    } catch (error) {
      toast.error("Adding item to Card Failed")
    }
  };

  return (
<Button
  className="w-5/6 flex items-center justify-center py-5 bg-green-600 hover:bg-green-700 text-white"
  onClick={handleAddToCart}
>
  Add to Cart
</Button>
  );
}