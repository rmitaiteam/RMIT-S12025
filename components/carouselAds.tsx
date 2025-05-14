import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Define a type for ads
type AdProps = {
  ads: {
    title: string;
    description: string;
    link: string;
    source: string;
  }[];
};

export function AdsCarousel({ ads }: AdProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="container w-full max-w-4xl"
    >
      <CarouselContent>
        {ads.map((ad, index) => (
          <CarouselItem key={index} className="basis-1/2">
            <div className="p-1">
              <Card className="bg-black border border-stone-800">
                <CardContent className="flex flex-col p-6">
                  <p className="text-xs text-neutral-500">{ad.source}</p>
                  <h2 className="text-md">{ad.title}</h2>
                  <p className="text-xs text-neutral-500">{ad.link}</p>
                  <p className="text-sm text-gray-500">{ad.description}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
