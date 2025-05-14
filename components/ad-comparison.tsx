"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Ad {
  source: string;
  title: string;
  description: string;
  link: string;
  title_similarity: number;
}

interface AdComparisonProps {
  competitorAds: Ad[];
}

export default function AdComparisonComponent({
  competitorAds,
}: AdComparisonProps) {
  const [activeTab, setActiveTab] = useState("competitor");

  const renderAds = (ads: Ad[]) => (
    <ScrollArea className="h-[300px] w-full">
      <div className="space-y-4 p-4">
        {ads.map((ad, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-md font-normal text-blue-400">
                {ad.title}
              </CardTitle>
              <CardDescription className="text-xs">{ad.source}</CardDescription>
              <p className="text-xs text-neutral-500">{ad.link}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                {ad.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full max-w-4xl mx-auto"
    >
      <TabsContent value="competitor">
        <Card>
          <CardHeader>
            <CardTitle className="font-normal text-xl tracking-tight">
              Competitor Ads
            </CardTitle>
            <CardDescription>
              Advertisements from competing universities
            </CardDescription>
          </CardHeader>
          <CardContent>{renderAds(competitorAds)}</CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
