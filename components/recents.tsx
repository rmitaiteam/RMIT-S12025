import { Star } from "lucide-react";
import Link from "next/link";

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

interface RecentlyGeneratedProps {
  ads: Ads[];
  limit?: number;
}

export function RecentlyGenerated({ ads, limit }: RecentlyGeneratedProps) {
  const displayedAds = limit ? ads.slice(0, limit) : ads;

  return (
    <div className="mt-5">
      {displayedAds.map((ad) => (
        <div key={ad.id} className="bg-stone-900 mb-2 rounded-lg shadow-md p-5">
          <p className="text-sm text-neutral-500">
            Created on: {new Date(ad.creation_date).toDateString()}
          </p>
          <div className="flex flex-row items-center mb-2">
            <h3 className="text-lg font-normal hover:text-blue-500">
              <Link href={`recents/ads/${ad.id}`}>
                {ad.headline1} | {ad.headline3}
              </Link>
            </h3>
            <div className="flex flex-row items-center ml-3">
              <Star className="w-5 h-5 text-yellow-600 mr-1" />
              <p>{ad.rating}</p>
            </div>
          </div>
          <div className="flex flex-row">
            <p className="text-muted-foreground mb-2">
              {ad.description1} <br />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
