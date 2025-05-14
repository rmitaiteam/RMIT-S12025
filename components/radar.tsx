"use client";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface FrequencyChartProps {
  chartTitle: string;
  chartColor: string;
  data: Array<{
    Word: string;
    Title_Frequency?: number;
    Description_Frequency?: number;
  }>;
}

export function FrequencyChart({
  chartTitle,
  chartColor,
  data = [],
}: FrequencyChartProps) {
  if (data.length === 0) {
    return null;
  }

  const chartData = data.map((item) => ({
    word: item.Word,
    frequency: item.Title_Frequency || item.Description_Frequency,
  }));

  const chartConfig = {
    frequency: {
      label: "Count",
      color: chartColor,
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle className="font-light text-md">{chartTitle}</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <PolarAngleAxis
              dataKey="word"
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <PolarGrid />
            <Radar
              dataKey="frequency"
              fill={chartColor}
              fillOpacity={0.6}
              dot={{
                r: 3,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
