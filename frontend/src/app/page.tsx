"use client";

import { useState } from "react";
import Head from "next/head";
import { matchData } from "../lib/data";
import MatchCard from "../components/MatchCard";
import ScoreCard from "../components/ScoreCard";
import ThemeToggle from "../components/ThemeToggle";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes"

export default function Home() {
  const [showDetail, setShowDetail] = useState(false);
  const { theme } = useTheme();

  return (
    <div className="min-h-screen pb-10">
      <Head>
        <title>IPL Match Analysis</title>
        <meta name="description" content="IPL T20 Cricket Match Statistics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showDetail && (
              <button
                onClick={() => setShowDetail(false)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
            )}
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              IPL Match Analysis
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 mt-8">
        {!showDetail ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Live Matches</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MatchCard
                  match={matchData}
                  onClick={() => setShowDetail(true)}
                />
                {/* Would have more MatchCard components here for multiple matches */}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Upcoming Matches</h2>
              <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-lg p-8 text-center shadow`}>
                <p className="text-gray-500 dark:text-gray-400">
                  No upcoming matches scheduled.
                </p>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Stay tuned for exciting matches!
                </p>
              </div>
            </div>
          </>
        ) : (
          <ScoreCard match={matchData} />
        )}
      </main>

      <footer className="mt-12 container mx-auto px-4 py-4 border-t border-gray-200 dark:border-gray-800">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} IPL Match Analysis - All rights reserved.
        </p>
      </footer>
    </div>
  );
}
