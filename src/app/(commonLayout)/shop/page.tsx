/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllCategory } from "@/actions/admin.actions";
import { getAllMedicine } from "@/actions/medicine.actions";
import MedicineCards from "@/components/modules/home/MedicineCard";
import PaginationDemo from "@/components/pagination-control";
import { MedicinePost } from "@/types/routes.type";

export interface Props {
  search?: string;
  category?: string;
  price?: string;
  page ?: string;
}

export default async function Home({ searchParams}: {searchParams: Promise<Props> }) {

  const params = await searchParams;

  const search = params?.search || "";
  const category = params?.category || "";
  const price = params?.price || "";
  const page = params?.page || "1";

  const response= await getAllMedicine({ search, category, price, page });
  const post = response.data.data.data || [];

  const result = await getAllCategory();
  const categoryData = result.data;


  const pagination = response.data?.data?.pagination || {
    total : 0,
    page : 1,
    limit : 6,
    totalPages : 1
  };
  // console.log(pagination)

  return (
    <div className="min-h-screen">

      {/* ── Filter Section ── */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <form className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3">

            {/* Search input */}
            <div className="flex-1 space-y-1.5">
              <label htmlFor="search" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                Medicine Name
              </label>
              <input
                id="search"
                name="search"
                defaultValue={search}
                placeholder="Search medicines..."
                className="w-full h-10 rounded-xl border border-border bg-muted/40 px-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
              />
            </div>

            {/* Category select */}
            <div className="flex-1 space-y-1.5">
              <label htmlFor="category" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>
                Category
              </label>
              <select
                id="category"
                name="category"
                defaultValue={category}
                className="w-full h-10 rounded-xl border border-border bg-muted/40 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all appearance-none cursor-pointer"
              >
                <option value="">All Categories</option>
                {categoryData?.data.map((cat: any) => (
                  <option key={cat.id} value={cat.categoryName}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>

            {/* Price input */}
            <div className="sm:w-36 space-y-1.5">
              <label htmlFor="price" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                Max Price
              </label>
              <input
                id="price"
                name="price"
                defaultValue={price}
                placeholder="$ 0.00"
                className="w-full h-10 rounded-xl border border-border bg-muted/40 px-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
              />
            </div>

            {/* Search button */}
            <button
              type="submit"
              className="h-10 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:hover:bg-emerald-500 text-white text-sm font-medium shadow-sm hover:shadow-emerald-500/25 hover:shadow-md transition-all flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              Search
            </button>

          </div>
        </form>
      </div>

      {/* ── Medicine Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4 gap-6 pb-8">
        {post.map((item: MedicinePost) => (
          <MedicineCards key={item.id} item={item} />
        ))}
      </div>

      {/* ── Pagination ── */}
      <div className="max-w-7xl mx-auto px-4 pb-10">
        <PaginationDemo meta={pagination} />
      </div>

    </div>
  );
}