"use client";

import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";
import { registerUser } from "@/actions/customer.actions";
import { IRegisterUser } from "@/services/customer.service";

/* ---------------- ZOD SCHEMA ---------------- */
const formSchema = z.object({
  name: z.string().min(1, "This field is required"),
  email: z.email(),
  password: z.string().min(2, "Minimum length is 2"),
  image: z.instanceof(File, {
    message: "You have to upload your profile picture",
  }),
});

export function SignupForm(
  props: React.ComponentProps<typeof Card>
) {
  const router = useRouter();

  /* ---------------- FORM ---------------- */
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      image: null as File | null,
    },

    validators: {
      onSubmit: formSchema,
    },

    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating User");

      try {
        // remove null safety before sending
        const payload = {
          ...value,
          image: value.image!,
        };

        const res = await registerUser(payload as IRegisterUser);
        // console.log(res.data)

        if (!res.data) {
          toast.error(res.error, { id: toastId });
          return;
        }

        if (res.data?.data) {
          const { accessToken, refreshToken, token } = res.data.data;

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

          if (token) {
            Cookies.set("better-auth.session_token", token, {
              expires: 7,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
            });
          }
          toast.success("User Registered and Logged In Successfully", { id: toastId });
          router.refresh();
          router.replace("/shop");
        } else {
          toast.success("User Created Successfully", { id: toastId });
          router.replace("/login");
        }
      } catch (error) {
        // console.log(error);
        toast.error("Internal Server Error", { id: toastId });
      }
    },
  });

  /* ---------------- GOOGLE LOGIN ---------------- */
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: window.location.origin,
    });
  };

  return (
    <Card {...props} className="p-5">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="signup-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>

            {/* NAME */}
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Name</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* EMAIL */}
            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      type="email"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* PASSWORD */}
            <form.Field name="password">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Password</FieldLabel>
                    <Input
                      type="password"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* IMAGE */}
            <form.Field name="image">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Profile Image</FieldLabel>

                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file =
                          e.target.files?.[0] || null;
                        field.handleChange(file);
                      }}
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-y-5">
        <Button
          form="signup-form"
          type="submit"
          className="w-full"
        >
          Sign Up
        </Button>

        <Button
          className="w-full"
          onClick={handleGoogleLogin}
          variant="outline"
          type="button"
        >
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  );
}