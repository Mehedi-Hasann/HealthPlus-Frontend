"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

function PaymentNotification() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const success = searchParams.get("success");
    if (success === "true") {
      toast.success("Payment successful! Your order has been placed.");
      // Remove query parameters from the URL
      const params = new URLSearchParams(searchParams.toString());
      params.delete("success");
      const query = params.toString();
      const cleanUrl = query ? `${pathname}?${query}` : pathname;
      router.replace(cleanUrl);
    } else if (success === "false") {
      toast.error("Payment cancelled or failed. Please try again.");
      const params = new URLSearchParams(searchParams.toString());
      params.delete("success");
      const query = params.toString();
      const cleanUrl = query ? `${pathname}?${query}` : pathname;
      router.replace(cleanUrl);
    }
  }, [searchParams, pathname, router]);

  return null;
}

export default function CartPaymentHandler() {
  return (
    <Suspense fallback={null}>
      <PaymentNotification />
    </Suspense>
  );
}
