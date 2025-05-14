import React from "react";
import { Input, Spinner, Chip, Code } from "@nextui-org/react";
import { Info, TriangleAlert, ExternalLink } from "lucide-react";
import { Tooltip } from "@nextui-org/react";
import Link from "next/link";

interface ActiveKeywordsProps {
  title: string;
  onClick?: () => void;
}

export default function ActiveKeywords({
  title,
  onClick,
}: ActiveKeywordsProps) {
  const [query, setQuery] = React.useState<string>("");
  const [account, setAccount] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [keywords, setKeywords] = React.useState<{ keyword: string }[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const handleFetch = () => {
    if (query && account) {
      setIsLoading(true);
      setError(null);

      fetch("/api/getKeywords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id: account,
          campaign_name: query,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setKeywords(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
          setIsLoading(false);
        });
    }
  };

  const accountIds = [
    { value: 1176860568, name: "Architecture & Building" },
    { value: 2321583743, name: "Art" },
    { value: 1938429401, name: "Biomedical Sciences" },
    { value: 2338846560, name: "Building" },
    { value: 1025764107, name: "Business" },
    { value: 2130006572, name: "Communication" },
    { value: 2852332617, name: "Design" },
    { value: 8752572247, name: "Education" },
    { value: 2586952033, name: "Engineering" },
    { value: 7735565697, name: "Environment" },
    { value: 3973837899, name: "Fashion" },
    { value: 2035438413, name: "Games" },
    { value: 4603246978, name: "Health" },
    { value: 5974685772, name: "Information Technology" },
    { value: 4661603319, name: "Law" },
    { value: 1859368611, name: "Leadership" },
    { value: 8558392280, name: "Media" },
    { value: 4903674049, name: "Psychology" },
    { value: 1482520268, name: "RMIT 148-252-0268" },
    { value: 1302090248, name: "RMIT Bundoora Campaigns" },
    { value: 5742721078, name: "RMIT Bundoora Health Clinic" },
    { value: 4413508837, name: "RMIT Central" },
    { value: 9974339223, name: "RMIT COB" },
    { value: 5272354218, name: "RMIT DSC" },
    { value: 8688413088, name: "RMIT HDR Campaigns" },
    { value: 7891853300, name: "RMIT Human Resources" },
    { value: 1840193290, name: "RMIT International" },
    { value: 9936178805, name: "RMIT International (Pilot)" },
    { value: 7158197405, name: "RMIT INTON India" },
    { value: 8520440207, name: "RMIT INTON Indonesia" },
    { value: 4680288976, name: "RMIT INTON South East Asia" },
    { value: 8417593386, name: "RMIT INTON Subcontinent" },
    { value: 2582093019, name: "RMIT Keyword Research" },
    { value: 7812886407, name: "RMIT Online" },
    { value: 1830533030, name: "RMIT SEH" },
    { value: 8926226507, name: "RMIT Short/Single Course Campaigns" },
    { value: 7694952452, name: "RMIT University Vietnam" },
    { value: 2351038356, name: "RMIT Vietnam - SGS (PG)" },
    { value: 9268431944, name: "RMIT-YouTube-2020" },
    { value: 9266023313, name: "Science" },
    { value: 7951112821, name: "Social & Community" },
    { value: 2495141292, name: "STEM" },
    { value: 6003612631, name: "Writing" },
    { value: 9541917523, name: "zzzRMIT Central" },
  ];

  const accountOptions = accountIds.map((account) => (
    <option key={account.value} value={account.value}>
      {account.name}
    </option>
  ));

  return (
    <div className="container w-full max-w-4xl mx-auto ml-2 px-3 dark:bg-background dark:text-foreground">
      <div className="flex flex-row">
        <h1 className="text-white pb-2 items-center">{title}</h1>
        <Tooltip content="This is where you can view the active keywords for your campaigns.">
          <Info className="w-4 h-4 ml-1 mt-1" />
        </Tooltip>
      </div>
      <div className="items-center mb-4">
        <span className="flex flex-row p-2 bg-stone-800 border border-yellow-500 rounded-md">
          <TriangleAlert className="w-4 h-4 ml-1" />
          <h1 className="text-white text-xs ml-1">
            The account list is hardcoded. If you need to add more accounts,
            please contact the developer.
          </h1>
        </span>
      </div>
      <div className="flex flex-row">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a campaign name"
          labelPlacement="outside"
          endContent={
            <div className="flex ml-5">
              <label className="sr-only">Filter</label>
              <select
                className="border-0 bg-transparent ml-12 text-default-400 text-small truncate"
                id="filter"
                name="filter"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              >
                {accountOptions}
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
      </div>
      {isLoading && (
        <div className="flex justify-center items-center p-10">
          <Spinner size="lg" color="success" />
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center p-10">
          <h1 className="text-white">
            There was an error, no worries, try again now 😄
          </h1>
        </div>
      )}
      {keywords.length > 0 && (
        <div className="mt-4">
          <h1 className="font-light text-sm">
            These are the keywords used in the <Code>{query}</Code> campaign.{" "}
            <p className="text-sm mt-2">
              If you would like to scrape ads for one of these keywords, click
              on a keyword to copy {">"} navigate to{" "}
              <a href={"/keywords"} className="text-blue-400 hover:underline">
                Keywords
              </a>{" "}
              and enter the keyword there.
            </p>
          </h1>
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {Array.isArray(keywords) && keywords.length > 0
          ? keywords.map((item: any, index: number) => (
              <Chip
                key={index}
                color="success"
                variant="flat"
                onClick={() => navigator.clipboard.writeText(item.keyword)}
                className="cursor-copy hover:scale-110 hover:bg-blur"
              >
                {item.keyword}
              </Chip>
            ))
          : !keywords && <h1 className="text-sm">No keywords found</h1>}
      </div>
    </div>
  );
}
