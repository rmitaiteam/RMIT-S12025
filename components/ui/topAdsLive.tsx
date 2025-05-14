/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Info } from "lucide-react";
import { Tooltip } from "@nextui-org/react";

type Ad = {
  Source: string;
  Title: string;
  Description: string | null;
  "Displayed link": string | null;
};

export default function TopLiveAdsList({ ads }: { ads: Ad[] }) {
  return (
    <div className="mt-6">
      {ads && ads.length > 0 && (
        <div className="flex flex-row ">
          <h2 className="text-xl font-light mb-4 tracking-tight">Top Ads</h2>
          <Tooltip
            content={
              <div className="px-1 py-2">
                <div className="text-small font-bold">Disclaimer</div>
                <div className="text-tiny">
                  Ranking position is not always reliable as it can be impacted
                  by the search engine's personalised search results. 
                  <br />
                  All major search engines (Google, Bing and Baidu) provide
                  personalised search results. 
                  <br />
                  Every user could see different keywords ranking results based
                  on your search history, location, device, and network
                  behaviour.  
                </div>
              </div>
            }
            color="default"
            placement="right-end"
          >
            <Info className="w-4 h-4 ml-2 mt-1.5" />
          </Tooltip>
        </div>
      )}
      <ul className="space-y-4">
        {ads &&
          ads.map((ad, index) => (
            <li key={index} className="p-4 border rounded-lg shadow-sm">
              <h4 className="text-xs font-medium text-neutral-500">
                {ad.Source}
              </h4>
              <h3 className="text-lg font-normal text-blue-500">{ad.Title}</h3>
              <p className="text-sm text-neutral-300">{ad["Displayed link"]}</p>
              {ad.Description && (
                <p className="mt-2 text-sm text-neutral-400">
                  {ad.Description}
                </p>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
