"use client";
import { SignUp } from "@/components/signup";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./loading";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const invite_uuid = usePathname().split("/")[3];
  console.log("Invite code:", invite_uuid);
  useEffect(() => {
    setLoading(true);
    fetch("/api/verifyInvite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "verify-invite", invite_uuid }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.email && data.email.response && data.email.response[0]) {
          console.log(data.email.response[0]);
          setEmail(data.email.response[0]);
          setLoading(false);
        } else {
          router.push("/404");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [invite_uuid]);
  return <div>{loading ? <Loading /> : <SignUp email={email} />}</div>;
}
