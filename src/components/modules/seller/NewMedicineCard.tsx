"use client"

import { createMedicine, getAllCategory } from "@/actions/medicine.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { Pill, Plus, Type, DollarSign, Layers, Package, ImageIcon } from "lucide-react";

const formSchema = z.object({
  name : z.string().min(1, "You must Provide Medicine Name"),
  price : z.string().min(1, "Price is required"),
  stock : z.string().min(1, "Stock can not be empty"),
  categoryName : z.string().min(1, "Category con not be empty"),
  image: z.instanceof(File, {
      message: "You have to upload a product image",
  }),
})

export function NewMedicineCard () {
  const form = useForm({
    defaultValues : {
      name : "",
      price : "",
      stock : "",
      categoryName : "",
      image: null as File | null,
    },
    validators : {
      onSubmit : formSchema
    },
    onSubmit : async ({value}) => {
      const toastId = toast.loading("Adding Medicine...");
      const formData = new FormData();
      
      formData.append("name", value.name);
      formData.append("price", value.price);
      formData.append("stock", value.stock);
      formData.append("categoryName", value.categoryName);
      
      if (value.image) {
        formData.append("file", value.image);
      }

      try {
        const result = await createMedicine(formData);
        if(result.data){
          toast.success("Medicine Created Successfully",{id : toastId})
          form.reset();        
        }else{
          toast.error(result?.error?.message, {id : toastId})
        }
      } catch (error) {
        toast.error("Medicine Creation Failed",{id : toastId})
      }
    }
  })
  
  const [categories, setCategories] = useState<{categoryName : string}[]>([]);
  
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategory();
      if(data?.data.data){
        setCategories(data.data.data);
        form.setFieldValue("categoryName", data.data.data[0].categoryName);
      }
    }
    fetchCategories();
  }, [])

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6">
      <Card className="border-border/50 bg-card/40 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-emerald-500 to-teal-600" />
        
        <CardHeader className="space-y-4 pb-8 pt-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center shrink-0 border border-teal-500/20 shadow-inner">
              <Pill className="w-7 h-7 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Create Medicine
              </CardTitle>
              <CardDescription className="text-base mt-1.5">
                Add a new product to your inventory catalog.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <form id="add-medicine" onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}>
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="md:col-span-2">
                <form.Field name="name" children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field className="space-y-2">
                      <FieldLabel className="text-sm font-semibold flex items-center gap-2 text-foreground">
                        <Type className="w-4 h-4 text-muted-foreground" /> Medicine Name
                      </FieldLabel>
                      <Input 
                        type="text" 
                        placeholder="e.g. Amoxicillin 500mg"
                        id={field.name} 
                        value={field.state.value} 
                        onChange={(e) => field.handleChange(e.target.value)} 
                        className="h-12 rounded-xl bg-background border-border/50 focus-visible:ring-teal-500/50 transition-all shadow-sm"
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} className="text-rose-500 text-sm" />}
                    </Field>
                  )
                }}/>
              </div>

              <form.Field name="categoryName" children={(field) => (
                <Field className="space-y-2">
                  <FieldLabel className="text-sm font-semibold flex items-center gap-2 text-foreground">
                    <Layers className="w-4 h-4 text-muted-foreground" /> Category
                  </FieldLabel>
                  <div className="relative">
                    <select
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full h-12 rounded-xl border border-border/50 bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all appearance-none cursor-pointer shadow-sm"
                    >
                      {categories.map((cat) => (
                        <option key={cat.categoryName} value={cat.categoryName} className="bg-background text-foreground">
                          {cat.categoryName}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </Field>
              )} />

              <form.Field name="price" children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field className="space-y-2">
                    <FieldLabel className="text-sm font-semibold flex items-center gap-2 text-foreground">
                      <DollarSign className="w-4 h-4 text-muted-foreground" /> Price <span className="text-xs text-muted-foreground font-normal">(per unit)</span>
                    </FieldLabel>
                    <Input 
                      type="number" 
                      placeholder="0.00"
                      id={field.name} 
                      value={field.state.value} 
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="h-12 rounded-xl bg-background border-border/50 focus-visible:ring-teal-500/50 transition-all shadow-sm"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} className="text-rose-500 text-sm" />}
                  </Field>
                )
              }}/>

              <form.Field name="stock" children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return(
                  <Field className="space-y-2">
                    <FieldLabel className="text-sm font-semibold flex items-center gap-2 text-foreground">
                      <Package className="w-4 h-4 text-muted-foreground" /> Initial Stock
                    </FieldLabel>
                    <Input 
                      type="number" 
                      placeholder="e.g. 100"
                      id={field.name} 
                      value={field.state.value} 
                      onChange={(e) => field.handleChange(e.target.value)} 
                      className="h-12 rounded-xl bg-background border-border/50 focus-visible:ring-teal-500/50 transition-all shadow-sm"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} className="text-rose-500 text-sm" />}
                  </Field>
                )
              }} />

              <div className="md:col-span-2">
                <form.Field name="image" children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="space-y-2">
                      <FieldLabel className="text-sm font-semibold flex items-center gap-2 text-foreground">
                        <ImageIcon className="w-4 h-4 text-muted-foreground" /> Product Image
                      </FieldLabel>
                      
                      <div className="relative group">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            field.handleChange(file);
                          }}
                          className="h-14 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-500/10 file:text-teal-600 dark:file:text-teal-400 hover:file:bg-teal-500/20 cursor-pointer rounded-xl bg-background border-border/50 focus-visible:ring-teal-500/50 transition-all shadow-sm pt-2"
                        />
                      </div>

                      {isInvalid && <FieldError errors={field.state.meta.errors} className="text-rose-500 text-sm" />}
                    </Field>
                  );
                }} />
              </div>

            </FieldGroup>
          </form>
        </CardContent>
        
        <CardFooter className="pt-6 pb-8 border-t border-border/50 bg-muted/10">
          <Button 
            form="add-medicine" 
            type="submit"
            className="w-full sm:w-auto ml-auto h-12 px-8 rounded-xl bg-teal-600 hover:bg-teal-700 text-white shadow-md hover:shadow-teal-500/25 transition-all text-base font-semibold gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Medicine
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}