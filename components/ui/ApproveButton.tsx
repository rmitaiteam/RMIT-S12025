"use client";
import { useState } from "react";

interface ApproveButtonProps {
  onClick: () => void;
}

export default function ApproveButton({ onClick }: ApproveButtonProps) {
  const [approved, setApproved] = useState(false);

  const handleApprove = () => {
    setApproved(true);
    onClick();
  };

  return (
    <button
      onClick={handleApprove}
      className={`bg-white text-black rounded-full flex items-center justify-center space-x-2 px-4 py-2 transition-all duration-300 ${
        approved ? "bg-white text-black" : ""
      }`}
      disabled={approved}
    >
      {approved ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`lucide lucide-circle-check-big ${
              approved ? "animate-check" : ""
            }`}
          >
            <path d="M21.801 10A10 10 0 1 1 17 3.335" className="svg-elem-1" />
            <path d="m9 11 3 3L22 4" className="svg-elem-2" />
          </svg>
          <span className="svg-elem-2">Approved</span>
        </>
      ) : (
        <span>Approve</span>
      )}
    </button>
  );
}
