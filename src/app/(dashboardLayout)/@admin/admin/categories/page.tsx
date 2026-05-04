import { getAllCategory } from "@/actions/admin.actions"; 
import AdminGetAllCategoryCard from "@/components/modules/admin/AdminGetAllCategory";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Layers } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const { data } = await getAllCategory(); 

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
            <Layers className="w-5 h-5 text-indigo-500" />
          </div>
          Manage Categories
        </h1>
        
        <Link href={'categories/create-category'}>
          <Button className="rounded-xl shadow-sm gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
            <Plus className="w-4 h-4" />
            Add Category
          </Button>
        </Link>
      </div>

      <AdminGetAllCategoryCard data={data.data} />
    </div>
  );
}