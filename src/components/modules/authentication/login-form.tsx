"use client"
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);

  const executeLogin = async (value: ILoginUser) => {
    const toastId = toast.loading("Logging User");
    try {
      const res = await loginUser(value);
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

  const form = useForm({
    defaultValues : {
      email : "",
      password : ""
    },
    validators : {
      onSubmit : formSchema
    },
    onSubmit : async ({value}) => {
      await executeLogin({...value} as ILoginUser);
    }
  })
  const handleGoogleLogin = async() => {
    const data = await authClient.signIn.social({
      provider : "google",
      callbackURL : process.env.NEXT_PUBLIC_FRONTEND_URL
    })
  }

  return (
    <Card {...props} className="p-5">
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
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            )
          } } />
        </FieldGroup>
          
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-y-4 justify-end">
        <Button form="login-form" type="submit" className="w-full">Log In</Button>
        <Button className="w-full" onClick={() => handleGoogleLogin()} variant="outline" type="button">
          Continue with Google
        </Button>

        <div className="w-full relative mt-6 border-t border-dashed">
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-card px-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Quick Access</p>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-6">
            <Button 
              variant="outline" 
              className="h-auto py-2.5 flex flex-col gap-1 border-border hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-200" 
              type="button" 
              onClick={() => {
                form.setFieldValue("email", "customer@gmail.com");
                form.setFieldValue("password", "customer1234");
              }}
            >
              <span className="text-sm font-semibold">Customer</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-2.5 flex flex-col gap-1 border-border hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-200" 
              type="button" 
              onClick={() => {
                form.setFieldValue("email", "seller@gmail.com");
                form.setFieldValue("password", "seller1234");
              }}
            >
              <span className="text-sm font-semibold">Seller</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-2.5 flex flex-col gap-1 border-border hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-200" 
              type="button" 
              onClick={() => {
                form.setFieldValue("email", "admin@gmail.com");
                form.setFieldValue("password", "admin1234");
              }}
            >
              <span className="text-sm font-semibold">Admin</span>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}