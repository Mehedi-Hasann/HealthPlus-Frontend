"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createReview } from "@/actions/customer.actions";
import { useRouter } from "next/navigation";

type Props = {
  medicineId: string;
};

export default function AddReview({ medicineId }: Props) {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!description.trim()) return;

    setLoading(true);

    try {
      await createReview({
        medicineId,
        description,
      });

      setDescription("");
      router.refresh(); // instantly update reviews
    } catch (error) {
      console.error("Review submit failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Write your review..."
        className="w-full min-h-[100px] p-3 border rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />

      <Button
        onClick={handleSubmit}
        disabled={loading}
        className=" bg-emerald-500 hover:bg-emerald-600 text-white"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </div>
  );
}