import AddReview from "@/components/modules/customer/AddReview";
import AddToCartButton from "@/components/modules/customer/AddToCartButton";
import { Badge } from "@/components/ui/badge";
import { medicineService } from "@/services/medicine.service";
import { userService } from "@/services/user.service";
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
  const response = await medicineService.getMedicineById(slug);
  const medicine = response?.data?.data;

  const session = await userService.getSession();
  const role = session?.data?.user?.role || "";

  if (!medicine) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Medicine not found.</p>
      </div>
    );
  }


  return (
    <div className="min-h-[calc(100vh-75px)] bg-background text-foreground px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Header */}
        <div className="space-y-3">
          <Badge variant="secondary" className="px-4 py-1 rounded-full">
            {medicine.categoryName}
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight">
            {medicine.name}
          </h1>
        </div>

        {/* ✅ Image Added */}
        <div className="w-full flex justify-center">
          <div className="relative w-64 h-64">
            <Image
              src={medicine.image}
              alt={medicine.name}
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
              ${medicine.price}
              <span className="text-sm font-normal text-muted-foreground">
                {" "} / unit
              </span>
            </p>
          </div>

          <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm">
            <p className="text-sm text-muted-foreground">Stock</p>
            <p className="text-2xl font-semibold">
              {medicine.stock} Units
            </p>
          </div>

          <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm">
            <p className="text-sm text-muted-foreground">Category</p>
            <p className="text-2xl font-semibold">
              {medicine.categoryName}
            </p>
          </div>

        </div>


        {/* Action */}
        {(role !== "ADMIN" && role !== "SELLER") && (
          <div className="w-5/12">
            <AddToCartButton medicineId={medicine.id} />
          </div>
        )}

        {/* Submit Review Section  */}
        {/* REVIEW FORM */}
        <div className="border-t pt-6">
          <h2 className="text-2xl font-semibold mb-4">
            Write a Review
          </h2>

          <AddReview medicineId={medicine.id} />
        </div>

        {/* Reviews Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Customer Reviews</h2>

          <div className="space-y-4">
            {medicine.reviews && medicine.reviews.length > 0 ? (
              medicine.reviews.map((review: Review) => (
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