"use client";

import { deleteMedicine } from "@/actions/medicine.actions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function DeleteMedicineButton({ medicineId }: { medicineId: string }) {
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // just in case
    const toastId = toast.loading("Deleting medicine...");
    try {
      const result = await deleteMedicine(medicineId);
      if (result.error) {
        toast.error(result.error.message || "Failed to delete medicine", { id: toastId });
      } else {
        toast.success("Medicine deleted successfully!", { id: toastId });
      }
    } catch {
      toast.error("Failed to delete medicine", { id: toastId });
    }
  };

  return (
    <Button
      variant="destructive"
      className="w-full flex items-center justify-center gap-2 py-5 rounded-xl font-medium transition-all duration-200 shadow-sm"
      onClick={handleDelete}
    >
      <Trash2 size={16} />
      Delete Medicine
    </Button>
  );
}
