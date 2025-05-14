"use client";

import React from "react";
import axios from "axios";
import { Input, Spinner } from "@nextui-org/react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { Navbar } from "@/components/navbar";
import { CompViz } from "@/components/visualisation";
import TopAdsList from "@/components/ui/topAds";
import { FrequencyChart } from "@/components/radar";
import { TriangleAlert } from "lucide-react";
import CompTable from "@/components/compadstable";

export default function CompetitorAnalytics() {
  const [query, setQuery] = React.useState<string>("");
  const [timeframe, setTimeframe] = React.useState<string>("yesterday");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>(null);
  const [error, setError] = React.useState<any>(null);

  const handleFetch = async () => {
    if (query) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://agzutz09qe.execute-api.ap-southeast-2.amazonaws.com/default/RDStoApp-DSAI",
          {
            q: query,
            timeframe: timeframe,
          }
        );
        setData(response.data.body);
        setError(null);
      } catch (error) {
        setError(error);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <Navbar />
      <div className="container w-full max-w-4xl mx-auto px-4 py-12 sm:grid grid-cols-1 pl-0 dark:bg-black dark:text-foreground">
        <Breadcrumbs>
          <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
          <BreadcrumbItem>Analytics</BreadcrumbItem>
          <BreadcrumbItem href="/analytics/competitors">
            Competitors
          </BreadcrumbItem>
        </Breadcrumbs>
        <h1 className="text-2xl font-bold mb-4 mt-5 font-medium tracking-tight">
          Competitor Analytics
        </h1>
        <div className="flex flex-row">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a search query like Master of Business or Bachelor of Science"
            labelPlacement="outside"
            endContent={
              <div className="flex items-center">
                <label className="sr-only">Filter</label>
                <select
                  className="outline-none border-0 bg-transparent text-default-400 text-small"
                  id="filter"
                  name="filter"
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                >
                  <option value="yesterday">Yesterday</option>
                  <option value="last7days">Last 7 days</option>
                  <option value="last14days">Last 14 days</option>
                  <option value="last30days">Last 30 days</option>
                  <option value="last3months">Last 3 months</option>
                  <option value="lastyear">Last year</option>
                </select>
              </div>
            }
            type="text"
          />
          <button
            className="bg-white text-black rounded-full flex items-center ml-2 justify-center space-x-2 px-4 py-2 hover:bg-neutral-200"
            onClick={handleFetch}
          >
            Fetch
          </button>
          <button
            className="bg-white text-black rounded-full flex items-center ml-2 justify-center space-x-2 px-4 py-2 hover:bg-neutral-200"
            onClick={handlePrint}
          >
            Print
          </button>
        </div>
        <div className="items-center mb-2">
          <span className="flex flex-row p-2 mt-2 bg-stone-800 border border-yellow-500 rounded-md items-center">
            <TriangleAlert className="w-4 h-4 ml-1" />
            <h1 className="text-white text-xs ml-1">
              You can only use keywords listed in the{" "}
              <a href="/keywords" className="underline text-blue-400">
                Keyword Actions
              </a>{" "}
              tab. Additionally, if you have just added a keyword, please wait
              for 24-48 hours for getting useful analytics. Even if you see the
              keyword in the keywords page, it may not return any data if it did
              not return any ads in the last 24 hours. So increase the timeframe
              if necessary.
            </h1>
          </span>
        </div>
        <div className="items-center">
          <span className="flex flex-row p-2 mt-2 bg-stone-800 border border-grey-500 rounded-md items-center text-neutral-600">
            <h1 className="text-white text-xs ml-1 text-neutral-500">
              Ranking position is not always reliable as it can be impacted by
              personalised search results. All major search engines (Google,
              Bing, and Baidu) provide personalised search results. Every user
              could see different keyword ranking results based on search
              history, location, device, and network behaviour. Impressions are
              calculated based on the number of times the ad was scraped in a
              given timeframe divided by the total number of ads scraped in that
              timeframe for the given keyword. Additionally, depending on the
              time of day, you may not see ads for a given keyword.
            </h1>
          </span>
        </div>
        <div className="container w-full max-w-3.5xl grid grid-cols-1 mt-5 gap-4">
          {isLoading ? (
            <div className="flex justify-center items-center p-10">
              <Spinner size="lg" color="success" />
            </div>
          ) : (
            data && (
              <>
                <CompViz data={data.json_data} error={error} keyword={query} />
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
                <CompTable data={data} />
                <TopAdsList ads={data.top_10_output} />
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}
