"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Layers, ArrowRight } from "lucide-react";

interface Category {
  id: string;
  categoryName: string;
  description: string | null;
}

interface Props {
  data: Category[];
}

export default function AdminGetAllCategoryCard({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground bg-card/40 border border-border/50 rounded-2xl">
        <Layers className="w-12 h-12 opacity-20 mb-4" />
        <p>No categories found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {data.map((category) => (
        <Card 
          key={category.id} 
          className="group relative overflow-hidden rounded-2xl border-border/50 bg-card/40 backdrop-blur-sm shadow-sm hover:shadow-xl hover:border-indigo-500/30 transition-all duration-300 flex flex-col"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <CardHeader className="relative z-10 pb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-2">
              <Layers className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold tracking-tight text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {category.categoryName}
              </CardTitle>
              <p className="text-xs text-muted-foreground font-mono truncate">
                ID: {category.id.slice(0, 8)}...
              </p>
            </div>
          </CardHeader>

          <CardContent className="relative z-10 flex-grow flex flex-col justify-between gap-6">
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {category.description || "No description available for this category."}
            </p>
            
            <div className="pt-4 border-t border-border/50">
              <Link href={`/admin/categories/${category.categoryName}`} className="block">
                <Button
                  variant="ghost"
                  className="w-full rounded-xl gap-2 hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Show Details
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}