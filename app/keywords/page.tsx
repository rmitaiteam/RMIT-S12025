"use client";
import { useEffect, useState } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { Navbar } from "@/components/navbar";
import { Chip, Spinner, Snippet } from "@nextui-org/react";
import { Input, Image } from "@nextui-org/react";
import { CircleAlert, Clock } from "lucide-react";
import { CheckIcon } from "@/components/ui/CheckIcon";

interface Keyword {
  query: string;
}

export default function KeywordsPage() {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [adKeywords, setAdKeywords] = useState<[]>([]);
  const [lastScrape, setLastScrape] = useState<string>("");
  const [newKeyword, setNewKeyword] = useState<string>("");
  const [deleteKeyword, setDeleteKeyword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [deleteMessage, setDeleteMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddKeyword = async () => {
    try {
      const response = await fetch("/api/keywordActions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "INSERT",
          queries: [{ query: newKeyword }],
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessage(
        `${newKeyword} was successfully added. Refresh the page to see the updated list.`
      );
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setMessage("Failed to add keyword. Please try again.");
    }
  };

  const handleRemoveKeyword = async () => {
    try {
      const response = await fetch("/api/keywordActions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "DELETE",
          queries: [{ query: deleteKeyword }],
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setDeleteMessage(
        `${deleteKeyword} was successfully removed. Refresh the page to see the updated list.`
      );
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setDeleteMessage("Failed to remove keyword. Please try again.");
    }
  };

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/keywordActions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "GET" }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setKeywords(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchLastScrape = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/keywordActions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "GET_LAST_SCRAPE" }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        setLastScrape(data.body.last_scraped_at);
        setAdKeywords(data.body.keywords_with_ads);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKeywords();
    fetchLastScrape();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container w-full max-w-4xl mx-auto px-4 py-12 dark:bg-background dark:text-foreground">
        <Breadcrumbs>
          <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
          <BreadcrumbItem>Keyword Actions</BreadcrumbItem>
        </Breadcrumbs>
        <h2 className="text-2xl mt-5 font-medium tracking-tight">
          Keyword Actions
        </h2>
        <div>
          <div className="flex flex-row gap-2 items-center mt-5">
            <Image
              src="/iteration.svg"
              alt="in-progress"
              width={20}
              height={30}
            />
            <h3 className="text-md font-medium">
              Keywords in Current Scrape Job
            </h3>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {loading && (
              <div className=" justify-center items-center p-10">
                <Spinner size="lg" color="success" />
              </div>
            )}
            {keywords.map((keyword, index) => (
              <Snippet
                key={index}
                symbol=""
                className="hover:scale-105"
                color="warning"
                variant="flat"
              >
                {keyword.query}
              </Snippet>
            ))}
          </div>
          <div className="flex flex-row gap-2 items-center mt-5 mb-4">
            <Image src="/check.svg" alt="clock" width={25} height={30} />
            <h3 className="text-md font-medium">Last Scrape Action</h3>
          </div>
          {loading && (
            <div className=" justify-center items-center p-10">
              <Spinner size="lg" color="success" />
            </div>
          )}
          {!loading && (
            <div>
              <Chip variant="flat">
                {new Date(lastScrape).toLocaleString()}
              </Chip>
              {adKeywords.length > 0 && (
                <>
                  <div className="mt-2 text-sm ml-2">
                    Ads were found for the following keywords:
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {adKeywords.map((k, index) => (
                      <Chip
                        key={index}
                        startContent={<CheckIcon size={18} />}
                        className="cursor-copy text-blue-500"
                        variant="flat"
                        onClick={() => navigator.clipboard.writeText(k)}
                      >
                        {k}
                      </Chip>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
          <div>
            <div className="flex flex-row gap-2 items-center mt-5 mb-4">
              <Image src="/add.svg" alt="add" width={25} height={30} />
              <h3 className="text-md font-medium">Add Keyword</h3>
            </div>
            <div className="flex flex-row gap-2 mt-2">
              <Input
                placeholder="Enter a keyword"
                labelPlacement="outside"
                type="text"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
              />
              <button
                className="bg-white text-black rounded-full flex items-center ml-2 justify-center space-x-2 px-4 py-2 hover:bg-neutral-200"
                onClick={handleAddKeyword}
              >
                Add
              </button>
            </div>
            {message && (
              <Chip
                color="success"
                className="mt-2"
                variant="flat"
                startContent={<CircleAlert size={24} />}
              >
                {message}
              </Chip>
            )}
          </div>
          <div className="flex flex-row gap-2 items-center mt-5 mb-4">
            <Image src="/delete.svg" alt="delete" width={25} height={30} />
            <h3 className="text-md font-medium">Delete Keyword</h3>
          </div>
          <div className="flex flex-row gap-2 mt-2">
            <Input
              placeholder="Enter a keyword to delete"
              labelPlacement="outside"
              type="text"
              value={deleteKeyword}
              onChange={(e) => setDeleteKeyword(e.target.value)}
            />
            <button
              className="bg-white text-black rounded-full flex items-center ml-2 justify-center space-x-2 px-4 py-2 hover:bg-neutral-200"
              onClick={handleRemoveKeyword}
            >
              Remove
            </button>
          </div>
          {deleteMessage && (
            <Chip
              color="danger"
              className="mt-2"
              variant="flat"
              startContent={<CircleAlert size={24} />}
            >
              {deleteMessage}
            </Chip>
          )}
        </div>
      </div>
    </div>
  );
}
