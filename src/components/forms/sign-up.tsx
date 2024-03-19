"use client";
import Loader from "@/components/loaders/loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { CreateUser } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string({
      required_error: "Username is required",
    })
    .email(),
  username: z.string({
    required_error: "Username is required",
  }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password should be more than 8 characters",
    }),
});

function SignUpForm() {
  const { toast } = useToast();
  const router = useRouter();

  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmittingForm(true);
    CreateUser(values)
      .then(() => {
        setIsSubmittingForm(false);
        toast({
          title: "Account Created",
          description: `Your Account has been created. You will be redirected to sign in`,
        });
        router.push("/sign-in");
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `${err}`,
        });
        setIsSubmittingForm(false);
      });
  }

  return (
    <div className="w-screen h-screen">
      <div className="flex justify-center items-center h-full max-w-md mx-auto p-5">
        <div className="w-full">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Welcome to issues.io
          </h3>
          <p className="text-sm text-neutral-600 mt-2">
            Already have an account?{" "}
            <span className="font-semibold text-black dark:text-white">
              <Link href={`/sign-in`}>Sign In</Link>
            </span>
          </p>
          <br />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <br />
              <Button type="submit" className="w-full">
                {isSubmittingForm ? (
                  <Loader width="20" height="20" color="black" />
                ) : (
                  "Sign Up"
                )}
              </Button>
              <Separator />
              <p className="text-sm dark:text-neutral-600">
                By signing in, you agree to the{" "}
                <span className="underline">Terms of Service</span> and{" "}
                <span className="underline">Privacy Policy</span>.
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
