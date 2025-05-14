/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Info } from "lucide-react";
import { Tooltip } from "@nextui-org/react";

type Ad = {
  title: string;
  description: string | null;
  link: string | null;
  avg_position: number;
  impression_rate: number;
};

export default function TopAdsList({ ads }: { ads: Ad[] }) {
  const [sortedAds, setSortedAds] = React.useState<Ad[]>([]);
  const [sortCriteria, setSortCriteria] =
    React.useState<string>("impression_rate");

  // Sort ads based on the selected criteria
  React.useEffect(() => {
    if (ads && ads.length > 0) {
      const sorted = [...ads].sort((a, b) => {
        if (sortCriteria === "impression_rate") {
          return b.impression_rate - a.impression_rate;
        } else {
          return a.avg_position - b.avg_position;
        }
      });
      setSortedAds(sorted);
    }
  }, [ads, sortCriteria]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(e.target.value);
  };

  return (
    <div className="mt-6">
      {ads && ads.length > 0 && (
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center justify-center">
            <h2 className="text-xl font-light mb-4 tracking-tight">
              Top 5 Ads
            </h2>
            <Tooltip
              content={
                <div className="px-1">
                  <div className="text-small font-bold">Disclaimer</div>
                  <div className="text-tiny">
                    Ranking position is not always reliable as it can be
                    impacted by the search engine's personalised search results.
                    <br />
                    All major search engines (Google, Bing, and Baidu) provide
                    personalised search results.
                    <br />
                    Every user could see different keyword ranking results based
                    on search history, location, device, and network behaviour.
                    <br />
                    Impressions are calculated based on the number of times the
                    ad was scraped in a given timeframe divided by
                    <br />
                    the total number of ads scraped in that timeframe for the
                    given keyword. Additionally, depending on the time of day,
                    you may not
                    <br />
                    see 5 ads for a given keyword.
                  </div>
                </div>
              }
              color="default"
              placement="right-end"
            >
              <Info className="w-4 h-4 ml-2 mb-4" />
            </Tooltip>
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <label htmlFor="sort" className="text-sm text-neutral-400">
              Sort by:
            </label>
            <select
              id="sort"
              name="sort"
              className="outline-none border rounded-lg px-1 py-1 bg-stone-800 text-white"
              value={sortCriteria}
              onChange={handleSortChange}
            >
              <option value="impression_rate">Impression Rate</option>
              <option value="avg_position">Average Position</option>
            </select>
          </div>
        </div>
      )}
      <ul className="space-y-4">
        {sortedAds &&
          sortedAds.map((ad, index) => (
            <li key={index} className="p-4 border rounded-lg shadow-sm">
              <h3 className="text-lg font-normal text-blue-500">{ad.title}</h3>
              <p className="text-sm text-neutral-300">{ad.link}</p>
              {ad.description && (
                <p className="mt-2 text-sm text-neutral-400">
                  {ad.description}
                </p>
              )}
              <div className="flex flex-row mt-2 gap-2 text-sm text-white">
                {ad.impression_rate && (
                  <p>Impression Rate: {ad.impression_rate.toFixed(3)}</p>
                )}
                {ad.avg_position && (
                  <p>Average Position: {ad.avg_position.toFixed(3)}</p>
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
