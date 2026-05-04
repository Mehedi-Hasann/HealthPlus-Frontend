
import { createReview } from "@/actions/customer.actions";
import AddReview from "@/components/modules/customer/AddReview";
import AddToCartButton from "@/components/modules/customer/AddToCartButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { medicineService } from "@/services/medicine.service";
import { userService } from "@/services/user.service";
import { CreateReview } from "@/types/routes.type";
import Image from "next/image";


interface Review {
  id: string;
  description: string;
  createdAt: string;
}

export default async function MedicinePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const { data } = await medicineService.getMedicineById(slug);

  const session = await userService.getSession();
  const role = session?.data?.user?.role || "";


  return (
    <div className="min-h-[calc(100vh-75px)] bg-background text-foreground px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Header */}
        <div className="space-y-3">
          <Badge variant="secondary" className="px-4 py-1 rounded-full">
            {data.data.categoryName}
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight">
            {data.data.name}
          </h1>
        </div>

        {/* ✅ Image Added */}
        <div className="w-full flex justify-center">
          <div className="relative w-64 h-64">
            <Image
              src={data.data.image}
              alt={data.data.name}
              fill
              className="object-contain rounded-xl border"
            />
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm">
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="text-2xl font-semibold">
              ${data.data.price}
              <span className="text-sm font-normal text-muted-foreground">
                {" "} / unit
              </span>
            </p>
          </div>

          <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm">
            <p className="text-sm text-muted-foreground">Stock</p>
            <p className="text-2xl font-semibold">
              {data.data.stock} Units
            </p>
          </div>

          <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm">
            <p className="text-sm text-muted-foreground">Category</p>
            <p className="text-2xl font-semibold">
              {data.data.categoryName}
            </p>
          </div>

        </div>


        {/* Action */}
        {(role !== "ADMIN" && role !== "SELLER") && (
          <div className="w-5/12">
            <AddToCartButton medicineId={data.data.id} />
          </div>
        )}

        {/* Submit Review Section  */}
        {/* REVIEW FORM */}
        <div className="border-t pt-6">
          <h2 className="text-2xl font-semibold mb-4">
            Write a Review
          </h2>

          <AddReview medicineId={data.data.id} />
        </div>

        {/* Reviews Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Customer Reviews</h2>

          <div className="space-y-4">
            {data.data.reviews && data.data.reviews.length > 0 ? (
              data.data.reviews.map((review: Review) => (
                <div
                  key={review.id}
                  className="bg-card text-card-foreground p-5 rounded-2xl border shadow-sm"
                >
                  <p className="text-sm text-muted-foreground mb-2">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-base">
                    {review.description}
                  </p>
                </div>
              ))
            ) : (
              <div className="bg-card text-card-foreground p-5 rounded-2xl border shadow-sm text-muted-foreground">
                No reviews yet
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}