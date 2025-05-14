/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, ChangeEvent } from "react";
import { Chip, Input as NextInput } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Tooltip } from "@nextui-org/react";
import { Info, TriangleAlert } from "lucide-react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import SequentialLoadingAnimation from "@/components/ui/sequential-loading";
import AdComparison from "@/components/ad-comparison";
import AdQualityTabs from "@/components/ad-gen-tabs";
import axios from "axios";

interface Ad {
  source: string;
  title: string;
  description: string;
  link: string;
  title_similarity: number;
}

interface AdsResponse {
  competitor_ads: Ad[];
  rmit_ads: Ad[];
  generated_ads: {
    competitorAdsEvaluation: string;
    qualityLevel: {
      Best: {
        headlines_30_characters: string[];
        descriptions_90_characters: string[];
      };
      Good: {
        headlines_30_characters: string[];
        descriptions_90_characters: string[];
      };
      Low: {
        headlines_30_characters: string[];
        descriptions_90_characters: string[];
      };
    };
    generatedAdEvaluation: string;
  };
}

export default function GenerateAds() {
  const [approved, setApproved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeywords] = useState<string>();
  const [adCopy, setAdCopy] = useState<AdsResponse | null>(null);

  const handleApprove = () => {
    setApproved(true);
  };

  const handleKeywordInput = (event: ChangeEvent<HTMLInputElement>) => {
    setKeywords(event.target.value);
  };

  const generateChips = () => {
    return (
      <Chip color="success" variant="flat">
        {keyword}
      </Chip>
    );
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await axios.post<AdsResponse>("/api/generateAds", {
        keyword,
      });
      setAdCopy(response.data);
    } catch (error) {
      console.error("Failed to generate ads:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container w-full max-w-4xl mx-auto px-4 py-12 dark:bg-background dark:text-foreground">
        <Breadcrumbs>
          <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/generate">Generate Ad</BreadcrumbItem>
        </Breadcrumbs>
        <h2 className="text-2xl font-bold mt-5 font-medium tracking-tight">
          Generate New Ads
        </h2>
        <div className="flex items-center">
          <NextInput
            type="text"
            placeholder="Enter keyword to generate ads for."
            className="flex-1 mr-4 mt-4"
            onChange={handleKeywordInput}
          />
          <Button className="button mt-4" onClick={handleGenerate}>
            Generate
          </Button>
        </div>
        <div className="items-center mb-4">
          <span className="flex flex-row p-2 mt-2 bg-stone-800 border border-yellow-500 rounded-md">
            <TriangleAlert className="w-4 h-4 ml-1" />
            <h1 className="text-white text-xs ml-1">
              You can only use one keyword at a time. Additionally, you can only
              use keywords listed in the{" "}
              <a href="/keywords" className="underline text-blue-400">
                Keyword Actions
              </a>{" "}
              tab.
            </h1>
          </span>
        </div>
        <div className="flex flex-wrap mb-8 mt-2">{generateChips()}</div>
        {loading ? (
          <SequentialLoadingAnimation delay={4000} />
        ) : (
          adCopy && (
            <>
              <div className="mb-8">
                <h1 className="text-xl font-medium mb-4 font-light tracking-tight">
                  <div className="flex flex-row gap-2 text-xl font-medium mb-2">
                    Referenced Ads
                  </div>
                </h1>
                <AdComparison competitorAds={adCopy.competitor_ads} />
              </div>
              <div className="mb-8 mt-5">
                <h1>
                  <div className="flex flex-row gap-2 text-xl font-medium mb-4">
                    Analysis
                  </div>
                </h1>
                <p className="text-neutral-300 text-sm">
                  {adCopy.generated_ads.competitorAdsEvaluation}
                </p>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-row">
                  <h2 className="text-xl font-medium mb-4 font-light tracking-tight">
                    <div className="flex flex-row">New Ad Recommendations</div>
                  </h2>
                </div>
                <Tooltip
                  content={
                    <div>
                      The system will generate three ad copies, ranked between
                      Best, Good, and Low qualities. <br />
                      This is based on GPT's self-evaluation and is not
                      objective.
                    </div>
                  }
                  placement="right"
                >
                  <Info className="w-4 h-4 ml-2 mt-1.5" />
                </Tooltip>
              </div>
              <AdQualityTabs
                adData={adCopy.generated_ads.qualityLevel}
                onApprove={handleApprove}
              />
              <p className="text-neutral-300 text-sm">
                {adCopy.generated_ads.generatedAdEvaluation}
              </p>
            </>
          )
        )}
      </div>
    </div>
  );
}
