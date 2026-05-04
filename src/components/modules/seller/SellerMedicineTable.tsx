"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";
import { deleteMedicine } from "@/actions/medicine.actions";
import { Plus, Edit, Trash2, Pill } from "lucide-react";

interface MedicineUI {
  id: string;
  name: string;
  price: number;
  stock: number;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  medicines: MedicineUI[];
}

export function MedicinesTable({ medicines }: Props) {
  if (!medicines.length) return <p className="text-muted-foreground p-4">No medicines found.</p>;

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting...");
    try {
      const result = await deleteMedicine(id);
      if (result.data) {
        toast.success("Medicine Deletion Success", { id: toastId });
      } else {
        toast.error(result.error?.message || "Something Went Wrong", { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to deleting Medicine", { id: toastId });
    }
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto p-2">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Medicine Inventory</h2>
        <Link href={"/seller/medicines/add-medicine"}>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm hover:shadow-emerald-500/25 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Medicine
          </Button>
        </Link>
      </div>

      <Card className="overflow-hidden border-border bg-card rounded-2xl shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold text-foreground">Name</TableHead>
                <TableHead className="font-semibold text-foreground">Price</TableHead>
                <TableHead className="font-semibold text-foreground">Stock</TableHead>
                <TableHead className="font-semibold text-foreground">Category</TableHead>
                <TableHead className="font-semibold text-foreground hidden md:table-cell">Created</TableHead>
                <TableHead className="font-semibold text-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {medicines.map((med) => (
                <TableRow key={med.id} className="group hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium text-foreground">
                    {med.name}
                  </TableCell>
                  <TableCell className="font-semibold text-emerald-600 dark:text-emerald-400">
                    ${Number(med.price).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={med.stock > 0 ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20" : "border-red-200 bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20"}>
                      {med.stock > 0 ? `${med.stock} in stock` : "Out of stock"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="flex w-fit items-center gap-1 bg-muted/60 text-muted-foreground rounded-lg">
                      <Pill className="w-3 h-3" />
                      {med.categoryName}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground hidden md:table-cell">
                    {new Date(med.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/seller/medicines/${med.id}`}>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        onClick={() => handleDelete(med.id)} 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 text-muted-foreground hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
