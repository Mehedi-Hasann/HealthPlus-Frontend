import { MedicinesTable } from "@/components/modules/seller/SellerMedicineTable"
import { medicineService } from "@/services/medicine.service"

export const dynamic = "force-dynamic";

export interface sellerCart {
  page ?: string;
}

export default async function AllMedicinesPage({ searchParams}: {searchParams: Promise<sellerCart> }) {
  const allMedicine = await medicineService.getAllMedicine()

  const medicines = allMedicine?.data || [];

  const pagination = allMedicine.data?.data?.pagination || {
    total : 0,
    page : 1,
    limit : 6,
    totalPages : 1
  };

  return (
    <div className="space-y-6">
      <MedicinesTable medicines = {medicines.data.data} />
    </div>
  )
}
