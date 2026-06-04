"use client";

import { addToCart } from "@/actions/customer.actions";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

export default function AddToCartButton({ medicineId }: { medicineId: string }) {
  const handleAddToCart = async () => {
    const toastId = toast.loading("Adding to cart...");
    try {
      const result = await addToCart(medicineId);
      if (result.data.success) {
        toast.success("Added to cart!", { id: toastId });
      } else {
        toast.error("You need to log in first", {
          id: toastId,
        });
      }
    } catch {
      toast.error("Failed to add item to cart", { id: toastId });
    }
  };

  return (
    <Button
      className="w-full flex items-center justify-center gap-2 py-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-medium transition-all duration-200 shadow-sm hover:shadow-emerald-500/25 hover:shadow-md"
      onClick={handleAddToCart}
    >
      <ShoppingCart size={16} />
      Add to Cart
    </Button>
  );
}