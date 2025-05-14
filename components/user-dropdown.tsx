"use client";
import { handleSignOut } from "@/lib/cognitoActions";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { fetchUserAttributes } from "aws-amplify/auth";
import { useEffect, useState } from "react";

export default function User() {
  const [user, setUser] = useState<string | undefined>("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await fetchUserAttributes();
      setUser(userData.preferred_username);
    };

    fetchUserData();
  }, []);
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar isBordered as="button" name={user} />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold text-neutral-500">Signed in as</p>
            <p className="font-semibold">{user}</p>
          </DropdownItem>
          <DropdownItem key="help" href="/help" target="blank">
            Help
          </DropdownItem>
          <DropdownItem key="user" href="/auth/profile">
            Profile
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={handleSignOut}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
