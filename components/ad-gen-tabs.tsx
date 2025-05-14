"use client";

import { useState } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, SliderProps } from "@nextui-org/react";
import { Slider } from "@nextui-org/react";
import ApproveButton from "@/components/ui/ApproveButton";

type AdData = {
  headlines_30_characters: string[];
  descriptions_90_characters: string[];
};

type AdQualityData = {
  Best: AdData;
  Good: AdData;
  Low: AdData;
};

type AdQualityTabsProps = {
  adData: AdQualityData;
  onApprove: (quality: keyof AdQualityData, score: number) => void;
};

export default function AdQualityTabs({
  adData,
  onApprove,
}: AdQualityTabsProps) {
  const [sliderValues, setSliderValues] = useState<
    Record<keyof AdQualityData, number>
  >({
    Best: 0,
    Good: 0,
    Low: 0,
  });

  const [activeTab, setActiveTab] = useState<keyof AdQualityData>("Best");

  const handleSliderChange = (
    quality: keyof AdQualityData,
    value: number | number[]
  ) => {
    const newValue = Array.isArray(value) ? value[0] : value;
    setSliderValues((prev) => {
      const updated = { ...prev, [quality]: newValue };
      return updated;
    });
  };

  const handleApprove = async (quality: keyof AdQualityData) => {
    const activeData = adData[quality];

    try {
      const response = await axios.post("/api/insertGenAds", {
        quality,
        headlines: activeData.headlines_30_characters,
        descriptions: activeData.descriptions_90_characters,
        rating: sliderValues[quality],
      });
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error sending data to server:", error);
    }

    onApprove(quality, sliderValues[quality]);
  };

  return (
    <Tabs
      defaultValue="Best"
      className="w-full max-w-4xl mx-auto"
      onValueChange={(value) => {
        console.log("Tab changed to:", value);
        setActiveTab(value as keyof AdQualityData);
      }}
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="Best">Best</TabsTrigger>
        <TabsTrigger value="Good">Good</TabsTrigger>
        <TabsTrigger value="Low">Low</TabsTrigger>
      </TabsList>
      {(Object.entries(adData) as [keyof AdQualityData, AdData][]).map(
        ([quality, data]) => (
          <TabsContent key={quality} value={quality} className="mt-2">
            <Card className="border border-stone-800 bg-black p-5 mb-5">
              <div className="space-y-4">
                <div>
                  <h3 className="text-md mb-2">Headlines</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {data.headlines_30_characters.map((headline, index) => (
                      <li key={index} className="text-neutral-300 text-sm">
                        {headline}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-md mb-2">Descriptions</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {data.descriptions_90_characters.map(
                      (description, index) => (
                        <li key={index} className="text-neutral-300 text-sm">
                          {description}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="space-y-2">
                  <Slider
                    size="sm"
                    step={1}
                    color="foreground"
                    label="Rate this ad copy"
                    showSteps={true}
                    maxValue={5}
                    minValue={0}
                    value={sliderValues[quality]}
                    onChange={(value) => handleSliderChange(quality, value)}
                    classNames={{
                      base: "max-w-md gap-3 mt-4",
                      track: "border-s-secondary-100",
                      filler: "bg-sky-500",
                    }}
                  />
                </div>
                <ApproveButton onClick={() => handleApprove(quality)} />
              </div>
            </Card>
          </TabsContent>
        )
      )}
    </Tabs>
  );
}
