"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Divider } from "@nextui-org/divider";
import { useFormState, useFormStatus } from "react-dom";
import { handleSignIn } from "@/lib/cognitoActions";
import { handleSignUp } from "@/lib/cognitoActions";
import { CircleAlert } from "lucide-react";
import PasswordInput from "./ui/password-fields";

interface SignUpData {
  email: string;
}

export function SignUp({ email }: SignUpData) {
  const [signInErrorMessage, signInDispatch] = useFormState(
    handleSignIn,
    undefined
  );
  const [signUpErrorMessage, signUpDispatch] = useFormState(
    handleSignUp,
    undefined
  );

  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center bg-black">
        <div className="mx-auto flex max-w-[400px] flex-col gap-2">
          <Image src="/AdLabLogo.png" width={520} height={340} alt="Logo" />
          <Divider className="bg-white" />
          <Image src="/RMIT-symbol.jpg" width={420} height={420} alt="Logo" />
          <p className="tracking-tight text-white text-center">
            RMIT Data Science Post-Graduate Project
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-10 border-l border-muted/20">
        <Tabs defaultValue="sign-up" className="w-full max-w-[400px]">
          <TabsList>
            <TabsTrigger value="sign-in">Sign In</TabsTrigger>
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          </TabsList>

          <form action={signInDispatch}>
            <TabsContent value="sign-in">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" />
                </div>
                <LoginButton />
                <Link
                  href={"/auth/reset-password"}
                  className="text-blue-500 hover:underline pt-4"
                >
                  Forgot your password?
                </Link>
                {signInErrorMessage && (
                  <div>
                    <CircleAlert className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">{signInErrorMessage}</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </form>

          {/* Sign Up Form */}
          <form action={signUpDispatch}>
            <TabsContent value="sign-up">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={email}
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                  />
                </div>
                <PasswordInput label="Password" />
                <Button className="w-full bg-blue-600 text-white hover:text-black">
                  Sign Up
                </Button>
                {signUpErrorMessage && (
                  <div className="flex flex-row gap-2">
                    <CircleAlert className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">{signUpErrorMessage}</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </form>
        </Tabs>
      </div>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full bg-blue-600" aria-disabled={pending}>
      Sign In
    </Button>
  );
}
