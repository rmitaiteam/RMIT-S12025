"use client";
import { Navbar } from "@/components/navbar";
import DashboardCard from "@/components/ui/dashboard-card";
import { fetchUserAttributes } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import Keywords from "@/public/Keywords.svg";
import LineChart from "@/public/LineChart.svg";
import GPT from "@/public/GPT.svg";
import ActiveKeywords from "@/components/keywords";
import { RecentlyGenerated } from "@/components/recents";

interface Ads {
  id: number;
  creation_date: string;
  description1: string;
  description2: string;
  description3: string;
  description4: string;
  headline1: string;
  headline2: string;
  headline3: string;
  headline4: string;
  quality_level: string;
  query: string;
  rating: number;
}

export default function Dashboard() {
  const [user, setUser] = useState<string | undefined>("");
  const [showActiveKeywords, setShowActiveKeywords] = useState<boolean>(false);
  const [ads, setAds] = useState<Ads[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await fetchUserAttributes();
      setUser(userData.preferred_username);
    };

    const fetchAds = async () => {
      fetch("/api/getGenAds")
        .then((response) => response.json())
        .then((data) => setAds(data))
        .catch((error) => console.error("Error fetching ads data:", error));
    };

    fetchUserData();
    fetchAds();
  }, []);

  const handleKeywordsClick = () => {
    setShowActiveKeywords((prevState) => !prevState);
  };

  const handleGenerateClick = () => {
    window.location.href = "/generate";
  };

  const handleCompetitorsClick = () => {
    window.location.href = "/analytics/competitors";
  };

  const dashboardCards = [
    {
      title: "Keywords",
      subtitle: "Check out the keywords that are currently live",
      image: Keywords,
      onClick: handleKeywordsClick,
    },
    {
      title: "RMIT Competitor Analysis",
      subtitle: "Check out what the competitors are up to",
      image: LineChart,
      onClick: handleCompetitorsClick,
    },
    {
      title: "Generate",
      subtitle:
        "AI-powered generation, but it knows what your competitors are up to.",
      image: GPT,
      onClick: handleGenerateClick,
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="container w-full max-w-4xl mx-auto px-4 py-12 sm:grid grid-cols-1 pl-0">
        <h1 className="text-white p-5 font-light text-3xl">
          Hi,{" "}
          <span className="bg-gradient-to-r from-emerald-500 to-sky-500 inline-block text-transparent bg-clip-text">
            {user}
          </span>
          !
        </h1>
        <div>
          <h1 className="text-white pl-5 text-xl font-medium">Dashboard</h1>
          <h1 className="text-white pl-5 pt-5">Quick Links</h1>
        </div>
        <div className="pl-5 pt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {dashboardCards.map((card, index) => (
            <DashboardCard
              key={index}
              title={card.title}
              subtitle={card.subtitle}
              image={card.image}
              onClick={card.onClick}
            />
          ))}
        </div>
        {/* Render the ActiveKeywords component if showActiveKeywords is true */}
        {showActiveKeywords && (
          <div className="mt-8">
            <ActiveKeywords title="Active Keywords" />
          </div>
        )}
        <div className="pl-5 pt-5">
          <h1 className="text-white">Recent Generations</h1>
          <RecentlyGenerated ads={ads} limit={3} />
        </div>
      </div>
    </div>
  );
}
