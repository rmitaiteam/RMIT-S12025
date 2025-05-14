"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { Code } from "@nextui-org/code";
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function CompViz({
  data,
  error,
  keyword,
}: {
  data?: any;
  error?: any;
  keyword: string;
}) {
  if (error) return <div>Error loading data</div>;

  // Simplified data check
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="flex justify-center items-center mt-5">
        No data available for the query.
        <span className="justify-center items-center ml-2">😢</span>
      </div>
    );
  }
  const chartData = Object.keys(data).map((source) => ({
    source,
    ads: data[source]?.Ads || 0,
    titles: data[source]?.Titles || 0,
    descriptions: data[source]?.Descriptions || 0,
  }));

  const chartConfig = {
    ads: {
      label: "ads",
      color: "hsl(var(--chart-1))",
    },
    titles: {
      label: "titles",
      color: "hsl(var(--chart-2))",
    },
    descriptions: {
      label: "descriptions",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-light">
          Stats for the keyword: <Code>{keyword}</Code>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="source"
              tickLine={true}
              tickMargin={15}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 30)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="ads" fill="var(--color-ads)" radius={4}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar dataKey="titles" fill="var(--color-titles)" radius={4}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar
              dataKey="descriptions"
              fill="var(--color-descriptions)"
              radius={4}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total ad headlines and descriptions for the current filter.
        </div>
      </CardFooter>
    </Card>
  );
}
