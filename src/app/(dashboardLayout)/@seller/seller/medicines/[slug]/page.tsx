"use client"

import { getSingleMedicine, updateMedicine } from "@/actions/medicine.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {  useForm } from "@tanstack/react-form";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function EditMedicinePage() {
  const params = useParams();
  const slug = params.slug as string;

  const form = useForm({
    defaultValues: {
      name: "",
      price: "",
      stock: "",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating...");
      const medicineData = {
        name : value.name,
        price : Number(value.price),
        stock : Number(value.stock)
      }
      try {
        const res = await updateMedicine(slug, medicineData )
        if (res.data.success) {
          toast.success("Medicine Update Successful", {id : toastId})
        } else {
          toast.error(res.error?.message || "Something Went Wrong", {id: toastId})
        }
      } catch (error) {
        toast.error("Something Went Wrong", {id: toastId})
      }
    },
  });

  useEffect( () => {
    async function fetchMedicine() {
      try {
        const res = await getSingleMedicine(slug);
        // console.log(res.data.data)

        if(res?.data.data){
          form.setFieldValue("name" , res.data.data.name);
          form.setFieldValue("price" , res.data.data.price);
          form.setFieldValue("stock" , res.data.data.stock);

        }
      } catch (error) {
        
      }
    }
    if(slug){
      fetchMedicine();
    }
  }, [slug])

  return (
    <div>

      <Card className="p-5 min-h-1/3 max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Medicine</CardTitle>
          <CardDescription>
            Enter your information to edit Medicine Details
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="update-medicine"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field name = "name" children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input disabled type="text" id={field.name} name={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)}/>
                  </Field>
              )
              }}/>
              <form.Field name="price" children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel>Price</FieldLabel>
                    <Input type="text" id={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)}/>
                  </Field>
                )
              }}/>
              <form.Field name="stock" children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel>Stock</FieldLabel>
                    <Input type="text" id={field.name} value={field.state.value} onChange = {(e) => field.handleChange(e.target.value)}/>
                  </Field>
                )
              }}/>
            </FieldGroup>
            
          </form>
        </CardContent>

        <CardFooter>
          <Button form="update-medicine" type="submit">
            Update
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
