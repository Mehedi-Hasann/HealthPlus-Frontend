/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllCategory } from "@/actions/admin.actions";
import { getAllMedicine } from "@/actions/medicine.actions";
import MedicineCards from "@/components/modules/home/MedicineCard";
import { MedicinePost } from "@/types/routes.type";

export interface Props {
  search?: string;
  category?: string;
  price?: string;
}

export default async function Home({ searchParams}: {searchParams: Promise<Props> }) {

  const params = await searchParams;

  const search = params?.search || "";
  const category = params?.category || "";
  const price = params?.price || "";

  const { data } = await getAllMedicine({ search, category, price });
  // console.log(data.data.data);
  const result = await getAllCategory();
  const categoryData = result.data;

  return (
    <div>

      <form className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 my-6 px-4">

        <input
          name="search"
          defaultValue={search}
          placeholder="Enter Medicine Name"
          className="w-full sm:w-auto border p-2 rounded-md"
        />

        <select
          name="category"
          defaultValue={category}
          className="w-full sm:w-auto border p-2 rounded-md bg-black text-white"
        >
          <option value="">All Categories</option>

          {categoryData?.data.map((cat: any) => (
            <option key={cat.id} value={cat.categoryName}>
              {cat.categoryName}
            </option>
          ))}

        </select>

        <input
          name="price"
          defaultValue={price}
          placeholder="Enter Price"
          className="w-full sm:w-auto border p-2 rounded-md"
        />

        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>

      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4 gap-6">
        {data?.data?.data?.map((item: MedicinePost) => (
          <MedicineCards key={item.id} item={item} />
        ))}
      </div>

    </div>
  );
}