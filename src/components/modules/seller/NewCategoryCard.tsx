"use client"

import { createCategory } from "@/actions/medicine.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";

type FormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  description : z.string().min(1, "Description can not be empty"),
  categoryName : z.string().min(2, "Category name can not be empty")
})


export function NewCategoryCard () {

  const form = useForm({
    defaultValues : {
      description : "",
      categoryName : "",
    },
    validators : {
      onSubmit : formSchema
    },
    onSubmit : async ({value}) => {
      const toastId = toast.loading("Adding Category...");
      const categoryData = {
        description : value.description,
        categoryName : value.categoryName
      };
      try {
        const result = await createCategory(categoryData);
        if(result.data){
          toast.success("Category Created Successfully",{id : toastId})
          form.reset();
        }else{
          toast.error(result.error?.message || "Something Went Wrong", {id: toastId})
        }
      } catch (error) {
        toast.error("Category Creation Failed",{id : toastId})
      }
    }
  })

  
  return (
    
    <div className="max-w-2/3 mx-auto">
      <Card className="p-5">
        <CardHeader>
          <CardTitle>Create New Category</CardTitle>
          <CardDescription>Provide Information to Create a new Category</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="add-category" onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}>
            <FieldGroup>

              <form.Field name="categoryName" children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel className="text-lg">Category Name</FieldLabel>
                    <Input type="text" id={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                    {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                  </Field>
                )
              }}/>

              <form.Field name="description" children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return(
                  <Field>
                    <FieldLabel className="text-lg">Description</FieldLabel>
                    <Input type="text" id={field.name} value={field.state.value} onChange={(e) => {
                      field.handleChange(e.target.value)
                    }} />
                    {isInvalid && ( <FieldError errors={field.state.meta.errors} /> )}
                  </Field>
                )
              }} />

            </FieldGroup>

          </form>
        </CardContent>
        <CardFooter>
          <Button form="add-category" type="submit">Add Category</Button>
        </CardFooter>
      </Card>

    </div>
    
  );
}