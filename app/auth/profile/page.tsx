"use client";
import { useEffect, useState } from "react";
import { Avatar, BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Divider } from "@nextui-org/divider";
import { Navbar } from "@/components/navbar";
import { fetchUserAttributes, fetchAuthSession } from "aws-amplify/auth";
import {
  handleUpdatePassword,
  handleUpdateUserAttribute,
} from "@/lib/cognitoActions";
import { Chip } from "@nextui-org/react";
import { ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  const [username, setUsername] = useState<string>("");
  const [admin, isAdmin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [passwordUpdateStatus, setPasswordUpdateStatus] = useState<
    "success" | "error" | undefined
  >(undefined);
  const [attributeUpdateStatus, setAttributeUpdateStatus] = useState<
    "success" | "error" | undefined
  >(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      const session = await fetchUserAttributes();
      setUsername(session.preferred_username || "");
      setEmail(session.email || "");
    };
    const fetchRole = async () => {
      const session = await fetchAuthSession();
      const user_group = session.tokens?.idToken?.payload[
        "cognito:groups"
      ] as string[];
      if (Array.isArray(user_group) && user_group.includes("Admin")) {
        console.log("User is an Admin");
        isAdmin(true);
      }
    };
    fetchUser();
    fetchRole();
  }, []);

  const handleUpdateProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const result = await handleUpdateUserAttribute(
      attributeUpdateStatus || "",
      formData
    );
    setAttributeUpdateStatus(result === "success" ? "success" : "error");
  };

  const handleUpdatePasswordForm = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const result = await handleUpdatePassword(passwordUpdateStatus, formData);
    setPasswordUpdateStatus(result === "success" ? "success" : "error");
  };

  return (
    <div>
      <Navbar />
      <div className="container max-w-4xl mx-auto px-4 py-12 tracking-tight">
        <Breadcrumbs>
          <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/auth/profile">Profile</BreadcrumbItem>
        </Breadcrumbs>
        <h1 className="text-2xl mt-4 font-medium mb-6">My Profile</h1>
        <div className="flex items-center space-x-4 mb-6">
          <Avatar
            showFallback
            src="https://images.unsplash.com/broken"
            color="success"
            size="lg"
          />
          <div>
            <div className="flex flex-row gap-1 items-center">
              <h2 className="text-xl font-medium">{username}</h2>
              {admin ? (
                <Chip
                  color="warning"
                  variant="flat"
                  className="text-sm rounded-full items-center justify-center"
                  startContent={<ShieldCheck className="ml-2" />}
                >
                  Admin
                </Chip>
              ) : null}
            </div>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>
        <Divider className="my-6" />

        {/* Update Profile Form */}
        <h2 className="text-lg font-medium mb-4">Update Profile</h2>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current_username">Preferred Username</Label>
            <Input
              id="current_username"
              name="current_username"
              defaultValue={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <Button type="submit">Save Changes</Button>
          <div>
            {attributeUpdateStatus === "success" && (
              <Chip color="success" variant="flat">
                Profile updated successfully!
              </Chip>
            )}
          </div>
          {attributeUpdateStatus === "error" && (
            <p>Error updating profile. Please try again.</p>
          )}
        </form>

        <Divider className="my-6" />

        {/* Update Password Form */}
        <h2 className="text-lg font-medium mb-4">Change Password</h2>
        <form onSubmit={handleUpdatePasswordForm} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current_password">Current Password</Label>
            <Input
              id="current_password"
              name="current_password"
              type="password"
              placeholder="Enter current password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new_password">New Password</Label>
            <Input
              id="new_password"
              name="new_password"
              type="password"
              placeholder="Enter new password"
            />
          </div>
          <Button type="submit">Update Password</Button>
          <div>
            {passwordUpdateStatus === "success" && (
              <Chip color="success" variant="flat">
                Password updated successfully!
              </Chip>
            )}
          </div>
          {passwordUpdateStatus === "error" && (
            <Chip color="danger" variant="flat">
              Error updating password. Please try again.
            </Chip>
          )}
        </form>
      </div>
    </div>
  );
}
