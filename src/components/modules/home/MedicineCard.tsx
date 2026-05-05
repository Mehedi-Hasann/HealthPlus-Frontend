"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { MedicinePost } from "@/types/routes.type";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "../customer/AddToCartButton";
import DeleteMedicineButton from "../seller/DeleteMedicineButton";
import { Pill, Package } from "lucide-react";

type Props = {
  item: MedicinePost;
  role?: string;
};

export default function MedicineCards({ item, role }: Props) {
  const hasImage = !!item.image?.trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="group h-full flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-lg">

        {/* CLICKABLE AREA */}
        <Link href={`/shop/${item.id}`} className="block">

          {/* ── IMAGE SECTION ── */}
          <div className="relative">
            {/* Category badge */}
            <div className="absolute left-3  z-10">
              <Badge
                variant="secondary"
                className="rounded-full px-2.5 py-0.5 text-[11px] font-medium gap-1 bg-card/90 backdrop-blur-sm text-foreground border border-border/50 shadow-sm"
              >
                <Pill className="h-3 w-3" />
                {item.categoryName}
              </Badge>
            </div>

            {/* Stock indicator */}
            <div className="absolute right-3 z-10">
              <Badge
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold border shadow-sm backdrop-blur-sm ${
                  item.stock > 0
                    ? "bg-primary/15 text-primary border-primary/25 hover:bg-primary/20 hover:text-primary"
                    : "bg-destructive/15 text-destructive border-destructive/25 hover:bg-destructive/20 hover:text-destructive"
                }`}
              >
                {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
              </Badge>
            </div>

            {/* Image container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/30">
              {hasImage ? (
                <>
                  {/* Blurred background fill */}
                  <Image
                    src={item.image!}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover scale-110 blur-xl opacity-40"
                    aria-hidden="true"
                  />
                  {/* Crisp foreground */}
                  <Image
                    src={item.image!}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                    className="object-contain p-6 relative z-[1] transition-transform duration-500 group-hover:scale-105"
                  />
                </>
              ) : (
                /* Elegant placeholder */
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-muted/50 to-muted">
                  <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
                    <Package className="w-7 h-7 text-muted-foreground/60" />
                  </div>
                  <span className="text-[11px] text-muted-foreground/50 font-medium">
                    No image
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ── TITLE ── */}
          <div className="px-4 pt-3">
            <h2 className="line-clamp-2 min-h-[20px] text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
              {item.name}
            </h2>
          </div>
        </Link>

        {/* ── PRICE ── */}
        <div className="px-4 mt-auto">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-primary">
              ${item.price.toFixed(2)}
            </span>
            <span className="text-xs text-muted-foreground">/stripe</span>
          </div>
        </div>

        {/* ── ACTIONS ── */}
        <div className="px-4 pb-4">
          {(role === "ADMIN" || role === "SELLER") ? (
            <DeleteMedicineButton medicineId={item.id} />
          ) : (
            <AddToCartButton medicineId={item.id} />
          )}
        </div>

      </Card>
    </motion.div>
  );
}