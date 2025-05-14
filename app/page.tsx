import React from "react";
import { ArrowRight, Shield, Target, Zap } from "lucide-react";
import Image from "next/image";

const LandingPage = () => {
  return (
    <div className="bg-black text-white min-h-screen font-normal tracking-tight p-5 overflow-hidden relative items-center">
      <div className="mt-20 absolute top-[50%] left-[80%] transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[500px]">
        <Image src={"/RMIT-symbol.jpg"} width={400} height={500} alt="Logo" />
      </div>

      <header className="container mx-auto px-4 py-4 relative z-10">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Image src={"/AdLabLogo.png"} width={150} height={40} alt="Logo" />
          </div>
          <div className="flex items-center space-x-6">
            <a href="/auth/login">
              <button className="bg-white text-black px-4 py-2 mr-3 rounded-full text-sm font-medium hover:bg-gray-200 transition duration-300">
                Log in
              </button>
            </a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 pt-20 mt-20 pb-20 relative z-10">
        <h1 className="text-6xl font-light tracking-tight mb-6 max-w-3xl">
          <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 text-transparent bg-clip-text animate-gradient">
            Generate Ads
          </span>{" "}
          with ease <br /> using AI
        </h1>
        <p className="text-xl text-gray-400 mb-5 max-w-2xl">
          Meet the system for generating ad copies that are optimized for RMIT
          University.
        </p>
        <p className="text-sm text-gray-400 mb-10 max-w-2xl">
          Built by Data Science and AI students, batch of 2024.
        </p>
        <div className="flex items-center space-x-4">
          <a href="/auth/login">
            <button className="bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-200 transition duration-300">
              Start generating
            </button>
          </a>
          <a href="/help">
            <button className="flex items-center text-sm text-gray-400 hover:text-white">
              Learn how it works <ArrowRight className="ml-2" size={16} />
            </button>
          </a>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
