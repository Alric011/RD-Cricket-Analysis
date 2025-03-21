import { Match } from "../types/match";
import Image from "next/image";

interface MatchCardProps {
  match: Match;
  onClick: () => void;
}

export default function MatchCard({ match, onClick }: MatchCardProps) {
  const team1: any = match.innings[0].team;
  const team2: any = match.innings[1].team;

  return (
    <div
      className="card cursor-pointer hover:shadow-xl transition-all duration-300 slide-up"
      onClick={onClick}
    >
      <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <h2 className="text-sm font-medium">IPL · {match.date}</h2>
        <p className="text-xs opacity-80">
          {match.matchType} {match.matchNumber}
        </p>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative h-12 w-12">
              <Image
                src={`/rr.png`}
                alt={team1.shortName}
                layout="fill"
                className="team-logo"
              />
            </div>
            <div>
              <h3 className="font-bold">{team1.shortName}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {team1.score}/{team1.wickets} ({team1.overs})
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div>
              <h3 className="font-bold text-right">{team2.shortName}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-right">
                {team2.score}/{team2.wickets} ({team2.overs})
              </p>
            </div>
            <div className="relative h-12 w-12">
              <Image
                src={`/pk.png`}
                alt={team2.shortName}
                layout="fill"
                className="team-logo"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-center text-indigo-600 dark:text-indigo-400">
            {match.result}
          </p>
        </div>
      </div>
    </div>
  );
}
