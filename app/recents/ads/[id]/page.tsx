"use client";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chip, Spinner } from "@nextui-org/react";

interface Ad {
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

export default function AdDetails() {
  const query = usePathname();
  const id = query.split("/")[3];
  const [ad, setAd] = useState<Ad | null>(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await axios.get(`/api/getGenAds?id=${id}`);
        const parsedAd = JSON.parse(response.data.body);
        console.log("Fetched ad:", parsedAd);
        setAd(parsedAd);
      } catch (error) {
        console.error("Error fetching ad:", error);
      }
    };

    if (id) {
      fetchAd();
    }
  }, [id]);

  if (!ad) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="md" color="success" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-4xl mx-auto px-4 py-12 font-light">
        <CardHeader>
          <CardTitle className="font-medium">
            <div className="flex items-center">
              {ad.headline1}
              {new Date().getTime() - new Date(ad.creation_date).getTime() <
                2 * 24 * 60 * 60 * 1000 && (
                <Chip color="success" size="sm" className="ml-2">
                  New!
                </Chip>
              )}
            </div>
          </CardTitle>
          <div className="flex items-center">
            Rating:{""}
            <span className="text-lg font-semibold ml-2">{ad.rating}</span>
            <Star className="w-5 h-5 text-yellow-600 ml-1" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">
            Created on: {new Date(ad.creation_date).toLocaleString()}
          </p>
          <div className="grid gap-4 mb-6 mt-2">
            <div>
              <h3 className="font-semibold mb-2">Headlines</h3>
              <ul className="list-disc pl-5">
                <li>{ad.headline1}</li>
                <li>{ad.headline2}</li>
                <li>{ad.headline3}</li>
                <li>{ad.headline4}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Descriptions</h3>
              <ul className="list-disc pl-5">
                <li>{ad.description1}</li>
                <li>{ad.description2}</li>
                <li>{ad.description3}</li>
                <li>{ad.description4}</li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Additional Information</h3>
            <p>Quality Level: {ad.quality_level}</p>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
