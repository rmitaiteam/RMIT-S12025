"use client";
import Image from "next/image";
import Link from "next/link";
import { GitMerge } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import User from "./user-dropdown";
import { fetchAuthSession } from "aws-amplify/auth";
import { useEffect, useState } from "react";

export function Navbar() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  useEffect(() => {
    const fetchUser = async () => {
      const session = await fetchAuthSession();
      const user_group = session.tokens?.idToken?.payload[
        "cognito:groups"
      ] as string[];
      if (Array.isArray(user_group) && user_group.includes("Admin")) {
        console.log("User is an Admin");
        setIsAdmin(true);
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between h-16 px-4 bg-black text-white">
      <div className="flex items-center space-x-8 text-sm">
        <div className="flex items-center space-x-2 pt-2">
          <Image src="/NavLogo.png" width={40} height={40} alt="Logo" />
          <Link href={"/"}></Link>
        </div>

        <div className="flex items-center space-x-8 pt-2 font-normal">
          <Link href={"/dashboard"}>
            <div className="flex items-center space-x-2 hover:bg-emerald-900 rounded-full p-2">
              {/* <Gauge className="w-5 h-5" /> */}
              <span>Dashboard</span>
            </div>
          </Link>

          <Dropdown>
            <DropdownTrigger accessKey="">
              <button className="hover:bg-emerald-900 rounded-full p-2 flex items-center">
                {/* <ChartColumn className="w-5 h-5" /> */}
                <span>Analytics</span>
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Analytics Options">
              <DropdownItem
                key="live-ads-analytics"
                description="Analyse Ads that are live right now"
                href="/analytics/live-ads"
              >
                Live Ads Analytics
              </DropdownItem>
              <DropdownItem
                key="competitor-analytics"
                description="Analyse Competitor Ads"
                href="/analytics/competitors"
              >
                Competitor Analytics
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Link href={"/generate"}>
            <div className="flex items-center space-x-2 hover:bg-emerald-900 rounded-full p-2">
              {/* <Sparkles className="w-5 h-5" /> */}
              <span>Generate</span>
            </div>
          </Link>
          <Link href={"/recents"}>
            <div className="flex items-center space-x-2 hover:bg-emerald-900 rounded-full p-2">
              {/* <GalleryHorizontalEnd className="w-5 h-5" /> */}
              <span>Recent Ads</span>
            </div>
          </Link>
          <Link href={"/keywords"}>
            <div className="flex items-center space-x-2 hover:bg-emerald-900 rounded-full p-2">
              {/* <WholeWord className="w-5 h-5" /> */}
              <span>Keyword Actions</span>
            </div>
          </Link>

          {isAdmin ? (
            <Link href={"/admin"}>
              <div className="flex items-center space-x-2 hover:bg-emerald-900 rounded-full p-2">
                {/* <ShieldCheck className="w-5 h-5" /> */}
                <span>Admin</span>
              </div>
            </Link>
          ) : null}
        </div>
      </div>

      <div className="flex items-center space-x-8 mt-4 sm:mt-0">
        <div className="flex items-center space-x-2">
          <GitMerge className="w-5 h-5" />
          <span className="text-sm">Version 3.0</span>
        </div>
        <User />
      </div>
    </nav>
  );
}
