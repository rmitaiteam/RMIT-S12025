"use client";
import { Navbar } from "@/components/navbar";
import { RecentlyGenerated } from "@/components/recents";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface Ads {
  id: number;
  creation_date: string;
  description1: string;
  description2: string;
  description3: string;
  description4: string;
  headline1: string;
  headline2: string;
  headline3: string;
  headline4: string;
  quality_level: string;
  query: string;
  rating: number;
}

export default function RecentAds() {
  const [ads, setAds] = useState<Ads[]>([]);

  useEffect(() => {
    fetch("/api/getGenAds")
      .then((response) => response.json())
      .then((data) => setAds(data))
      .catch((error) => console.error("Error fetching ads data:", error));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container w-full max-w-4xl mx-auto px-4 py-12 sm:grid grid-cols-1 pl-0">
        <Breadcrumbs>
          <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/recents">Generated Ads</BreadcrumbItem>
        </Breadcrumbs>
        <h2 className="text-2xl font-bold mt-5 font-medium tracking-tight">
          Recently Generated Ads
        </h2>
        <RecentlyGenerated ads={ads} />
      </div>
    </div>
  );
}
