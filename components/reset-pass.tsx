"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useFormState, useFormStatus } from "react-dom";
import {
  handleResetPassword,
  handleConfirmResetPassword,
} from "@/lib/cognitoActions";
import { CircleAlert } from "lucide-react";
import PasswordInput from "./ui/password-fields";
import AuthUI from "./ui/auth-ui";
import Link from "next/link";

export function Reset() {
  const [selected, setSelected] = useState("login");
  const [resetError, resetDispatch] = useFormState(
    handleResetPassword,
    undefined
  );
  const [confirmError, confirmDispatch] = useFormState(
    handleConfirmResetPassword,
    undefined
  );
  const { pending } = useFormStatus();

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
      <AuthUI />
      <div className="flex items-center justify-center p-6 lg:p-10 border-l border-muted/20">
        <Tabs defaultValue="reset" className="w-full max-w-[400px]">
          <TabsList>
            <TabsTrigger value="reset">Reset Password</TabsTrigger>
            <TabsTrigger value="confirm" disabled={!isButtonClicked}>
              Confirm Reset
            </TabsTrigger>
          </TabsList>

          <form action={resetDispatch}>
            <TabsContent value="reset">
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
                <Link href="#" onClick={() => setSelected("confirm")}>
                  <Button
                    className="w-full bg-blue-600 mt-2"
                    aria-disabled={pending}
                    onClick={() => {
                      setSelected("confirm");
                      setIsButtonClicked(true);
                    }}
                  >
                    Send Verification Code
                  </Button>
                </Link>
                {resetError && (
                  <div>
                    <CircleAlert className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">{resetError}</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </form>

          <form action={confirmDispatch}>
            <TabsContent value="confirm">
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
                <PasswordInput label="New Password" />
                <div className="space-y-2">
                  <Label htmlFor="code">Verification Code</Label>
                  <Input id="code" name="code" type="code" required />
                </div>
                <Button className="w-full bg-blue-600">Confirm</Button>
                {confirmError && (
                  <div className="flex flex-row gap-2">
                    <CircleAlert className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">{confirmError}</p>
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
