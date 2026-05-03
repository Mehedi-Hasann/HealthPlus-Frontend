"use client"
import Cookies from "js-cookie";
import { loginUser } from "@/actions/customer.actions"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { ILoginUser } from "@/services/customer.service"
import { useForm } from "@tanstack/react-form"
import { useRouter } from "next/navigation"

import { toast } from "sonner"
import * as z from "zod"

const formSchema = z.object({
  password : z.string().min(2, "Minimum length is 2"),
  email : z.string().email("Invalid Email")
})



export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
const router = useRouter();
  const form = useForm({
    defaultValues : {
      email : "",
      password : ""
    },
    validators : {
      onSubmit : formSchema
    },
    onSubmit : async ({value}) => {
      const toastId = toast.loading("Logging User");
      try {
        const res = await loginUser({...value} as ILoginUser);
        if(res.error){
          toast.error(res.error, {id : toastId});
          return;
        }
        if (res.data?.data) {
  const { accessToken, refreshToken } = res.data.data;

  Cookies.set("accessToken", accessToken, {
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  Cookies.set("refreshToken", refreshToken, {
    expires: 7,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}
        router.replace("/shop");
        toast.success("Log In Successfully",{id : toastId});
      } catch (error) {
        toast.error("Internal Server Error", {id : toastId})
      }
    }
  })
  const handleGoogleLogin = async() => {
    const data = await authClient.signIn.social({
      provider : "google",
      callbackURL : process.env.NEXT_PUBLIC_FRONTEND_URL
    })
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}>
        
        <FieldGroup>
          <form.Field name="email" children={ (field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input 
                  type = "email"
                  id = {field.name}
                  name = {field.name}
                  value = {field.state.value}
                  onChange = {(e) => field.handleChange(e.target.value)}
                />
                {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            )
          } } />
          <form.Field name="password" children={ (field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input 
                  type = "password"
                  id = {field.name}
                  name = {field.name}
                  value = {field.state.value}
                  onChange = {(e) => field.handleChange(e.target.value)}
                />
                {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            )
          } } />
        </FieldGroup>
          
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-y-5 justify-end">
        <Button form="login-form" type="submit" className="w-full">Log In</Button>
        <Button className="w-full" onClick={() => handleGoogleLogin()} variant="outline" type="button">
                          Continue with Google
                        </Button>
      </CardFooter>
    </Card>
  )
}