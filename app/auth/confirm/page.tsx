"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Divider } from "@nextui-org/divider";
import { useFormState, useFormStatus } from "react-dom";
import { handleConfirmSignUp } from "@/lib/cognitoActions";
import { CircleAlert } from "lucide-react";

export default function ConfirmSignup() {
  const [errorMessage, dispatch] = useFormState(handleConfirmSignUp, undefined);

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

      {/* Right side with sign-in/sign-up forms */}
      <div className="flex items-center justify-center p-6 lg:p-10 border-l border-muted/20">
        <Tabs defaultValue="sign-in" className="w-full max-w-[400px]">
          <TabsList>
            <TabsTrigger value="sign-up">Confirm Sign Up</TabsTrigger>
          </TabsList>

          {/* Sign Up Form */}
          <form action={dispatch}>
            <TabsContent value="sign-up">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">OTP</Label>
                  <Input id="code" name="code" type="code" required />
                </div>
                <Button className="w-full bg-blue-600">Sign Up</Button>
                {errorMessage && (
                  <div>
                    <CircleAlert className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">{errorMessage}</p>
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
