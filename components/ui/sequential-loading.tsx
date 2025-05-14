import React, { useState, useEffect } from "react";
import RetrievalLoadingAnimation from "./retrieval";
import AnalysingAdsAnimation from "./analysing";
import GeneratingAnimation from "./generating";
import FinalAnimation from "./final";

const SequentialLoadingAnimation = ({ delay = 4000 }) => {
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const animations = [
    {
      Component: RetrievalLoadingAnimation,
      text: "Retrieving ads for reference",
    },
    { Component: AnalysingAdsAnimation, text: "Analysing retrieved ads" },
    { Component: GeneratingAnimation, text: "Generating new Ads" },
    { Component: FinalAnimation, text: "Almost there..." },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnimation((prev) => {
        const next = prev + 1;
        if (next >= animations.length) {
          clearInterval(timer);
          return prev; // Stop at the last animation
        }
        return next;
      });
    }, delay);

    return () => clearInterval(timer);
  }, [animations.length, delay]);

  const { Component, text } = animations[currentAnimation];

  return (
    <div className="sequential-loading-animation">
      <Component text={text} />
      <style jsx>{`
        .sequential-loading-animation {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40vh;
        }
      `}</style>
    </div>
  );
};

export default SequentialLoadingAnimation;
