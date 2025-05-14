"use client";
import { Navbar } from "@/components/navbar";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Code,
  Divider,
  Snippet,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  Copy,
  UserRoundCog,
  UserRoundMinus,
  UserRoundPlus,
  ShieldCheck,
  Fingerprint,
  UsersRound,
} from "lucide-react";

type UserData = {
  Username: string;
  preferred_username: string;
  Attributes: { Name: string; Value: string }[];
  UserStatus: string;
  Enabled: boolean;
};

export default function AdminPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [admins, setAdmins] = useState<string[]>([]);
  const [newUser, setNewUser] = useState<string>("");
  const [addAdminUser, setAddAdminUser] = useState<string>("");
  const [removeAdminUser, setRemoveAdminUser] = useState<string>("");
  const [deleteUser, setDeleteUser] = useState<string>("");
  const [addUserMessage, setAddUserMessage] = useState<string>("");
  const [adminMessage, setAdminMessage] = useState<string>("");
  const [adminError, setAdminError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loaded, isLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [removeUserError, setremoveUserError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/authActions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUsers(data.users.Users as UserData[]);
        setAdmins(
          data.admins.Users.map(
            (admin: UserData) =>
              admin.Attributes.find(
                (attr) => attr.Name === "preferred_username"
              )?.Value || "N/A"
          )
        );
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = (email: string) => {
    isLoading(true);
    fetch("/api/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "whitelist-user",
        email: newUser,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setAddUserMessage(
          `https://rmitchatgptai.com/auth/sign-up/${data.invite_code}`
        );
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setError("Failed to add user");
        isLoading(false);
      });
  };

  const handleRemoveUser = (email: string) => {
    isLoading(true);
    fetch("/api/removeUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "remove_user",
        email: deleteUser,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setremoveUserError("Failed to remove user");
        isLoading(false);
      });
  };

  const handleMakeAdmin = (email: string) => {
    fetch("/api/adminActions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "make_admin",
        email: addAdminUser,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setAdminMessage(data.message);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setAdminError("Failed to remove user");
        isLoading(false);
      });
  };

  const handleRemoveAdmin = (email: string) => {
    fetch("/api/adminActions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "remove_admin",
        email: removeAdminUser,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setAdminMessage(data.message);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setAdminError("Failed to remove user");
        isLoading(false);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container w-full max-w-4xl mx-auto px-4 py-12 sm:grid grid-cols-1 pl-0 dark:bg-black dark:text-foreground">
        <Breadcrumbs>
          <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/admin">Admin</BreadcrumbItem>
        </Breadcrumbs>
        <h1 className="text-2xl font-bold mt-5 font-medium tracking-tight">
          Admin Settings
        </h1>
        <div className="flex flex-row gap-2 items-center mt-5">
          <UsersRound className="w-5 h-5" />
          <h2 className="text-md font-medium">Users</h2>
        </div>
        <Table
          aria-label="User Management Table"
          selectionMode="none"
          className="mt-4 bg-black text-neutral-300"
          removeWrapper
        >
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Status</TableColumn>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.Username}>
                <TableCell className="text-sm">
                  {user.Attributes.find(
                    (attr) => attr.Name === "preferred_username"
                  )?.Value || "N/A"}
                </TableCell>
                <TableCell className="text-sm">
                  {user.Attributes.find((attr) => attr.Name === "email")
                    ?.Value || "N/A"}
                </TableCell>
                <TableCell>
                  <Chip
                    color={
                      user.UserStatus === "CONFIRMED" ? "success" : "danger"
                    }
                    variant="flat"
                    className="text-xs"
                  >
                    {user.UserStatus.toLowerCase()}
                  </Chip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {admins.length > 0 && (
          <div>
            <Divider className="mt-4" />
            <div className="flex flex-row gap-2 items-center mt-5">
              <ShieldCheck className="w-5 h-5" />
              <h2 className="text-md font-medium">Administrators</h2>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {admins.map((admin, index) => (
                <Chip key={index} color="warning" variant="flat">
                  {admin}
                </Chip>
              ))}
            </div>
          </div>
        )}
        <Divider className="mt-4" />
        <div className="flex flex-row gap-2 items-center mt-5">
          <UserRoundCog className="w-5 h-5" />
          <h2 className="text-md font-medium">User Actions</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="mt-4 text-sm font-medium">Invite User</h2>
            <div>
              <div className="flex items-center">
                <Input
                  type="text"
                  placeholder="Enter new user email"
                  value={newUser}
                  onChange={(e) => setNewUser(e.target.value)}
                  className="flex-1 mr-4 mt-4"
                />
                <Button
                  className="mt-4 bg-white text-black"
                  onClick={() => handleAddUser(newUser)}
                  startContent={<UserRoundPlus />}
                >
                  Invite
                </Button>
              </div>
              <div>
                {addUserMessage && (
                  <div className="text-sm p-2 rounded-md">
                    Here is the invite link for the new user:
                    <Snippet
                      symbol=""
                      className="mt-2"
                      color="success"
                      variant="flat"
                    >
                      {addUserMessage}
                    </Snippet>
                  </div>
                )}
                {error && (
                  <Chip className="text-sm mt-4 p-2 rounded-md bg-red-500 text-white">
                    {error}
                  </Chip>
                )}
              </div>
            </div>
          </div>
          <div>
            <h2 className="mt-4 text-sm font-medium">Remove User</h2>
            <div>
              <div className="flex items-center">
                <Input
                  type="text"
                  placeholder="Enter email of the user you want to remove"
                  value={deleteUser}
                  onChange={(e) => setDeleteUser(e.target.value)}
                  className="flex-1 mr-4 mt-4"
                />
                <Button
                  className="mt-4 bg-white text-black"
                  onClick={() => handleRemoveUser(deleteUser)}
                  startContent={<UserRoundMinus />}
                >
                  Remove
                </Button>
              </div>
              <div>
                {message && (
                  <div className="text-sm mt-4 p-2 rounded-md">
                    <span className="flex gap-2 mt-2 items-center">
                      <Code
                        className="flex flex-row gap-2 items-center"
                        color="success"
                      >
                        <span className="flex-1">{message}</span>
                        <Copy
                          size={16}
                          className="ml-2 cursor-pointer"
                          onClick={() => navigator.clipboard.writeText(message)}
                        />
                      </Code>
                    </span>
                  </div>
                )}
                {removeUserError && (
                  <Chip className="text-sm mt-4 p-2 rounded-md bg-red-500 text-white">
                    {removeUserError}
                  </Chip>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <Divider className="mt-4" />
          <div className="flex flex-row gap-2 items-center mt-5">
            <Fingerprint className="w-5 h-5" />
            <h2 className="text-md font-medium">Roles and Permissions</h2>
          </div>
          <h3 className="text-sm mt-4 font-medium">Add Admin</h3>
          <div className="flex flex-row gap-2 mt-2">
            <Input
              placeholder="Enter email of the user you want to make admin"
              labelPlacement="outside"
              type="text"
              value={addAdminUser}
              onChange={(e) => setAddAdminUser(e.target.value)}
            />
            <Button
              className="bg-white text-black flex items-center ml-2 justify-center space-x-2 px-4 py-2 hover:bg-neutral-200"
              onClick={() => handleMakeAdmin(addAdminUser)}
            >
              Add
            </Button>
          </div>
          <div>
            <h3 className="text-sm mt-4 font-medium">Remove Admin</h3>
            <div className="flex flex-row gap-2 mt-2">
              <Input
                placeholder="Enter email of the user you want to remove admin"
                labelPlacement="outside"
                type="text"
                value={removeAdminUser}
                onChange={(e) => setRemoveAdminUser(e.target.value)}
              />
              <Button
                className="bg-white text-black flex items-center ml-2 justify-center space-x-2 px-4 py-2 hover:bg-neutral-200"
                onClick={() => handleRemoveAdmin(deleteUser)}
              >
                Remove
              </Button>
            </div>
          </div>
          {adminMessage && (
            <Chip color="success" className="rounded-md mt-4">
              <div className="flex flex-row items-center">
                <ShieldCheck className="w-5 h-5" />
                {adminMessage}
              </div>
            </Chip>
          )}
        </div>
      </div>
    </div>
  );
}
