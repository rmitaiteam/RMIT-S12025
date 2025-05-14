/* eslint-disable react/no-unescaped-entities */
"use client";
import { Navbar } from "@/components/navbar";
import { FrequencyChart } from "@/components/radar";
import TopLiveAdsList from "@/components/ui/topAdsLive";
import { BreadcrumbItem, Breadcrumbs, Input, Spinner } from "@nextui-org/react";
import { TriangleAlert } from "lucide-react";
import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function LiveAdsAnalytics() {
  const [query, setQuery] = React.useState<string>("");
  const [fetchUrl, setFetchUrl] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { data, error } = useSWR(fetchUrl, fetcher, {
    onSuccess: () => setIsLoading(false),
    onError: () => setIsLoading(false),
    revalidateOnFocus: false,
  });

  const handleFetch = () => {
    if (query) {
      setIsLoading(true);
      const url = `/api/fetchLiveAds?query=${encodeURIComponent(query)}`;
      setFetchUrl(url);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container w-full max-w-4xl mx-auto px-4 py-12 sm:grid grid-cols-1 pl-0 dark:bg-background dark:text-foreground">
        <Breadcrumbs>
          <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
          <BreadcrumbItem>Analytics</BreadcrumbItem>
          <BreadcrumbItem href="/analytics/live-ads">Live Ads</BreadcrumbItem>
        </Breadcrumbs>
        <h1 className="text-2xl font-bold mb-4 mt-5 font-medium tracking-tight">
          Live Ads Analytics
        </h1>
        <div className="flex flex-row">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a search query like Master of Business or Bachelor of Science"
            labelPlacement="outside"
            type="text"
          />
          <button
            className="bg-white text-black rounded-full flex items-center ml-2 justify-center space-x-2 px-4 py-2 hover:bg-neutral-200"
            onClick={handleFetch}
          >
            Fetch
          </button>
        </div>
        <div className="items-center mb-4">
          <span className="flex flex-row p-2 mt-2 bg-stone-800 border border-yellow-500 rounded-md items-center">
            <h1 className="text-white text-xs ml-1">
              You can only use keywords listed in the{" "}
              <a href="/keywords" className="underline text-blue-400">
                Keywords Actions
              </a>{" "}
              tab. The results you see are current and come from google.com.au
              with the location set to 'Victoria, Australia'. Do note that every
              user could see different keyword ranking results based on search
              history, location, device, and network behaviour. Additionally, to
              get around Google's anti-scraping measures, the proxy service
              (SERP) we use scrapes in a way that may affect the ads you see
              here (if at all). If you do not see any ads, it is likely that the
              proxy service had to refresh their cookies. Trying again in a
              while should work.
            </h1>
          </span>
        </div>
        <div className="container w-full max-w-3.5xl grid grid-cols-1 mt-5 gap-4">
          {isLoading ? (
            <div className="flex justify-center items-center p-10">
              <Spinner size="lg" color="success" />
            </div>
          ) : error ? (
            <div className="flex justify-center items-center p-10 text-red-500">
              Error fetching data
            </div>
          ) : data?.message === "No ads found for the query" ? (
            <div className="flex justify-center items-center p-10 text-gray-500">
              {data.message}
            </div>
          ) : (
            data && (
              <>
                <h1 className="text-xl font-light mb-4 tracking-tight">
                  Visualisations
                </h1>
                <div className="grid grid-cols-2 gap-2">
                  <FrequencyChart
                    chartTitle="Frequency in Titles"
                    chartColor="hsl(var(--chart-1))"
                    data={data.title_data}
                  />

                  <FrequencyChart
                    chartTitle="Frequency in Descriptions"
                    chartColor="hsl(var(--chart-2))"
                    data={data.description_data}
                  />
                </div>
                <TopLiveAdsList ads={data.ads} />
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}
