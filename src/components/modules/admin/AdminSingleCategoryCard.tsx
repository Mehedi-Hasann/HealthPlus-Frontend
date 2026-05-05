"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Pill } from "lucide-react"

interface Medicine {
  name: string
  price: number
}

interface Category {
  id: string
  categoryName: string
  description: string | null
  medicines: Medicine[]
}

export default function AdminSingleCategoryCard({ data }: { data: Category }) {


  return (
    <Card className="p-5 w-full max-w-2xl rounded-2xl shadow-lg mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">
              {data.categoryName}
            </CardTitle>
            <CardDescription className="mt-1 text-sm">
              {data.description ?? "No description provided."}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-sm px-3 py-1 rounded-xl">
            {data.medicines.length} Medicines
          </Badge>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-4">
        <ScrollArea className="h-60 pr-4">
          <div className="space-y-3">
            {data.medicines.map((medicine, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl border bg-muted/40 hover:bg-muted transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <Pill className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-base">
                    {medicine.name}
                  </span>
                </div>
                <span className="font-semibold text-base">
                  ${medicine.price}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>

        <Separator className="my-4" />

      </CardContent>
    </Card>
  )
}