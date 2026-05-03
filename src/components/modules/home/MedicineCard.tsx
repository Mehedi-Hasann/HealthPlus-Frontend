"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MedicinePost } from "@/types/routes.type";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "../customer/AddToCartButton";
import { Pill } from "lucide-react";

type Props = {
  item: MedicinePost;
};

export default function MedicineCards({ item }: Props) {
  const imageSrc = item.image?.trim()
    ? item.image
    : "/placeholder-medicine.png";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="group h-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950">

        {/* CLICKABLE AREA (ONLY LINK WRAPPING IMAGE + TITLE) */}
        <Link
          href={`/shop/${item.id}`}
          className="block"
        >
          {/* IMAGE */}
          <div className="relative p-2 pb-0">
            <div className="absolute left-3 top-3 z-20 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-sky-700 shadow dark:bg-zinc-900/95 dark:text-sky-300">
              <Pill className="h-3 w-3" />
              {item.categoryName}
            </div>

            <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-sky-100 via-cyan-50 to-white dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
              <Image
                src={imageSrc}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
                className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* TITLE */}
          <div className="px-4 pt-2">
            <h2 className="line-clamp-2 min-h-[20px] text-base font-bold leading-snug text-zinc-900 transition hover:text-sky-600 dark:text-white dark:hover:text-sky-400">
              {item.name}
            </h2>
          </div>
        </Link>

        {/* PRICE + STOCK */}
        <div className="flex justify-between px-4">
          <div className="flex items-end gap-2">
            <span className="text-2xl font-extrabold text-sky-600 dark:text-sky-400">
              $ {item.price}
            </span>
          </div>

          <div className="flex gap-x-10 items-center justify-between rounded-xl bg-zinc-100 px-3 py-2 dark:bg-zinc-900">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Stock
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              {item.stock} pcs
            </span>
          </div>
        </div>

        {/* BUTTON (OUTSIDE LINK → FIXS HYDRATION ERROR) */}
        <div className="px-4 pb-4 flex item-center justify-center">
          <AddToCartButton medicineId={item.id} />
        </div>

      </Card>
    </motion.div>
  );
}