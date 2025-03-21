import { Match } from "../types/match";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MatchCardProps {
  match: Match;
  onClick: () => void;
}

export default function MatchCard({ match, onClick }: MatchCardProps) {
  const team1: any = match.innings[0].team;
  const team2: any = match.innings[1].team;
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Card 
        className="overflow-hidden cursor-pointer border-none shadow-lg"
        onClick={onClick}
      >
        <CardHeader className="p-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-medium">IPL · {match.date}</h2>
              <Badge variant="outline" className="mt-1 text-xs text-blue-100 border-blue-300 bg-blue-600/30">
                {match.matchType} {match.matchNumber}
              </Badge>
            </div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <svg 
                className="h-8 w-8 text-white opacity-70" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                  stroke="currentColor" 
                  strokeWidth="2"
                />
                <circle cx="12" cy="12" r="4" fill="currentColor" />
              </svg>
            </motion.div>
          </div>
        </CardHeader>

        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-6">
            <motion.div 
              className="flex items-center space-x-4"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="relative h-14 w-14 bg-blue-50 dark:bg-blue-900/20 rounded-full p-1 shadow-sm">
                <Image
                  src={`/rr.png`}
                  alt={team1.shortName}
                  layout="fill"
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h3 className="font-bold">{team1.shortName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {team1.score}/{team1.wickets} 
                  <span className="text-xs text-gray-500 dark:text-gray-500 ml-1">
                    ({team1.overs})
                  </span>
                </p>
              </div>
            </motion.div>

            <div className="flex h-8 items-center">
              <div className="w-px h-8 bg-gray-200 dark:bg-gray-700"></div>
            </div>

            <motion.div 
              className="flex items-center space-x-4"
              whileHover={{ x: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div>
                <h3 className="font-bold text-right">{team2.shortName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-right">
                  {team2.score}/{team2.wickets} 
                  <span className="text-xs text-gray-500 dark:text-gray-500 ml-1">
                    ({team2.overs})
                  </span>
                </p>
              </div>
              <div className="relative h-14 w-14 bg-blue-50 dark:bg-blue-900/20 rounded-full p-1 shadow-sm">
                <Image
                  src={`/pk.png`}
                  alt={team2.shortName}
                  layout="fill"
                  className="object-contain p-1"
                />
              </div>
            </motion.div>
          </div>
        </CardContent>

        <CardFooter className="pt-2 pb-4 px-5 border-t border-gray-100 dark:border-gray-800">
          <div className="w-full">
            <p className="text-sm font-medium text-center text-blue-600 dark:text-blue-400">
              {match.result}
            </p>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}