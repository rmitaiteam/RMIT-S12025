import { Chip } from "@nextui-org/react";
import { useState } from "react";

interface DeleteKeywordsProps {
  initialKeywords: string[];
}

export default function DeleteKeywords({
  initialKeywords,
}: DeleteKeywordsProps) {
  const [keywords, setKeywords] = useState<string[]>(initialKeywords);
  const [deleteKeyword, setDeleteKeyword] = useState<string>("");
  const [deleteMessage, setDeleteMessage] = useState<string>("");

  const handleRemoveKeyword = async (keyword: string) => {
    try {
      const response = await fetch("/api/keywordActions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "DELETE",
          queries: [{ query: keyword }],
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setKeywords((prevKeywords) => prevKeywords.filter((k) => k !== keyword));
      setDeleteMessage(
        `${keyword} was successfully removed. Refresh the page to see the updated list.`
      );
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setDeleteMessage("Failed to remove keyword. Please try again.");
    }
  };

  return (
    <div>
      <h3 className="text-md font-medium mt-5">Delete Keyword</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <Chip
            key={index}
            onClose={() => handleRemoveKeyword(keyword)}
            variant="flat"
            className="hover:border border-red-600"
          >
            {keyword}
          </Chip>
        ))}
      </div>
      {deleteMessage && <p>{deleteMessage}</p>}
    </div>
  );
}
