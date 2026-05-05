/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllCategory } from "@/actions/admin.actions";
import { getAllMedicine } from "@/actions/medicine.actions";
import MedicineCards from "@/components/modules/home/MedicineCard";
import PaginationDemo from "@/components/pagination-control";
import { MedicinePost } from "@/types/routes.type";
import { userService } from "@/services/user.service";

export interface Props {
  search?: string;
  category?: string;
  price?: string;
  page ?: string;
  sortBetweenPrice ?: string;
}

export default async function Home({ searchParams}: {searchParams: Promise<Props> }) {

  const params = await searchParams;

  const search = params?.search || "";
  const category = params?.category || "";
  const price = params?.price || "";
  const page = params?.page || "1";
  const sortBetweenPrice = params?.sortBetweenPrice || "asc";

  const response= await getAllMedicine({ search, category, price, page, sortBetweenPrice });
  const post = response.data.data.data || [];

  const result = await getAllCategory();
  const categoryData = result.data;


  const pagination = response.data?.data?.pagination || {
    total : 0,
    page : 1,
    limit : 6,
    totalPages : 1
  };
  
  const session = await userService.getSession();
  const role = session?.data?.user?.role || "";
  // console.log(pagination)

  return (
    <div className="min-h-screen">

      {/* ── Page Header ── */}
      {/* <div className="bg-muted/30 py-12 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Explore Medicines</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find exactly what you need from our comprehensive catalog of verified medical products.
          </p>
        </div>
      </div> */}

      {/* ── Filter Section ── */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <form className="rounded-3xl border border-border/50 bg-card shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            
            {/* Search input */}
            <div className="lg:col-span-2 space-y-2">
              <label htmlFor="search" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 ml-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                Search Medicine
              </label>
              <input
                id="search"
                name="search"
                defaultValue={search}
                placeholder="What are you looking for?"
                className="w-full h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm"
              />
            </div>

            {/* Category select */}
            <div className="space-y-2">
              <label htmlFor="category" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 ml-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                defaultValue={category}
                className="w-full h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all appearance-none cursor-pointer shadow-sm"
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
            <div className="space-y-2">
              <label htmlFor="price" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 ml-1">
                Max Price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                defaultValue={price}
                placeholder="$ Any"
                className="w-full h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm"
              />
            </div>

            {/* Sort select */}
            <div className="space-y-2">
              <label htmlFor="sortBetweenPrice" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 ml-1">
                Sort By Price
              </label>
              <select
                id="sortBetweenPrice"
                name="sortBetweenPrice"
                defaultValue={sortBetweenPrice}
                className="w-full h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all appearance-none cursor-pointer shadow-sm"
              >
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
                {/* <option value="newest">Newest Arrivals</option> */}
              </select>
            </div>

            {/* Search button */}
            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-semibold shadow-md hover:shadow-primary/25 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              Filter Results
            </button>
          </div>
        </form>
      </div>

      {/* ── Medicine Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto px-4 gap-6 pb-8">
        {post.map((item: MedicinePost) => (
          <MedicineCards key={item.id} item={item} role={role} />
        ))}
      </div>

      {/* ── Pagination ── */}
      <div className="max-w-7xl mx-auto px-4 pb-10">
        <PaginationDemo meta={pagination} />
      </div>

    </div>
  );
}