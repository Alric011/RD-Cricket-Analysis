import { useState } from "react";
import { Match } from "../types/match";
import BattingCard from "./BattingCard";
import BowlingCard from "./BowlingCard";
import YetToBat from "./YetToBat";
import FallOfWickets from "./FallOfWickets";
import Image from "next/image";

interface ScoreCardProps {
  match: Match;
}

export default function ScoreCard({ match }: ScoreCardProps) {
  const [activeTab, setActiveTab] = useState("SUMMARY");
  const [activeInnings, setActiveInnings] = useState(0);

  const innings1 = match.innings[0];
  const innings2 = match.innings[1];

  return (
    <div className="card fade-in">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex justify-between">
          {["SUMMARY", "SCORECARD", "COMMENTARY"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? "tab-active"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === "SCORECARD" && (
        <>
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex justify-between">
              <button
                className={`px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  activeInnings === 0
                    ? "tab-active"
                    : "text-gray-500 dark:text-gray-400"
                }`}
                onClick={() => setActiveInnings(0)}
              >
                {innings1.team.name}
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  activeInnings === 1
                    ? "tab-active"
                    : "text-gray-500 dark:text-gray-400"
                }`}
                onClick={() => setActiveInnings(1)}
              >
                {innings2.team.name}
              </button>
            </nav>
          </div>

          <div className="p-4">
            {activeInnings === 0 ? (
              <>
                <BattingCard
                  battingPerformances={innings1.battingPerformances}
                  players={innings1.team.players}
                  extras={innings1.team.extras}
                />
                <FallOfWickets wickets={innings1.fallOfWickets} />
                <div className="mt-8">
                  <BowlingCard
                    bowlingPerformances={innings2.bowlingPerformances}
                    players={innings2.team.players}
                  />
                </div>
              </>
            ) : (
              <>
                <BattingCard
                  battingPerformances={innings2.battingPerformances}
                  players={innings2.team.players}
                  extras={innings2.team.extras}
                />
                <YetToBat players={innings2.team.yetToBat || []} />
                <FallOfWickets wickets={innings2.fallOfWickets} />
                <div className="mt-8">
                  <BowlingCard
                    bowlingPerformances={innings1.bowlingPerformances}
                    players={innings1.team.players}
                  />
                </div>
              </>
            )}
          </div>
        </>
      )}

      {activeTab === "SUMMARY" && (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="relative h-16 w-16 mr-4">
                <Image
                  src={`/rr.png`}
                  alt={innings1.team.shortName}
                  layout="fill"
                  className="team-logo"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold">{innings1.team.shortName}</h2>
                <p className="text-lg">
                  {innings1.score}/{innings1.wickets} ({innings1.overs})
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">vs</div>
            </div>
            <div className="flex items-center">
              <div>
                <h2 className="text-xl font-bold text-right">
                  {innings2.team.shortName}
                </h2>
                <p className="text-lg text-right">
                  {innings2.score}/{innings2.wickets} ({innings2.overs})
                </p>
              </div>
              <div className="relative h-16 w-16 ml-4">
                <Image
                  src={`/pk.png`}
                  alt={innings2.team.shortName}
                  layout="fill"
                  className="team-logo"
                />
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg mb-6 fade-in">
            <p className="text-center font-medium text-indigo-700 dark:text-indigo-300">
              {match.result}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="card p-4 slide-up">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Top Performers
              </h3>

              <div className="space-y-4">
                <div className="flex items-center p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
                  <div className="mr-4 bg-green-100 dark:bg-green-800 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-600 dark:text-green-300"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 011 1v3a1 1 0 01-1 1H9a1 1 0 01-1-1V5a1 1 0 011-1v-.5a1.5 1.5 0 011.5-1.5z" />
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Top Scorer
                    </p>
                    <h4 className="font-bold">Venkatesh Iyer</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      52 (26) · 4 fours · 3 sixes
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                  <div className="mr-4 bg-blue-100 dark:bg-blue-800 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600 dark:text-blue-300"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Best Bowler
                    </p>
                    <h4 className="font-bold">Shahbaz Ahmed</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      1 wicket · 22 runs · 2.3 overs
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="card p-4 slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Match Info
              </h3>

              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Date
                  </div>
                  <div className="flex-1 text-sm">{match.date}</div>
                </div>

                <div className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Venue
                  </div>
                  <div className="flex-1 text-sm">
                    {match.venue || "MA Chidambaram Stadium, Chennai"}
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Match Type
                  </div>
                  <div className="flex-1 text-sm">
                    {match.matchType} {match.matchNumber}
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Toss
                  </div>
                  <div className="flex-1 text-sm">KKR, elected to field</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "COMMENTARY" && (
        <div className="p-6">
          <div className="text-center py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Commentary not available
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Live commentary is only available during the match.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
