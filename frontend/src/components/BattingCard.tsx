import { BattingPerformance, Player } from "../types/match";
import { motion, AnimatePresence } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRightIcon, AlertCircleIcon } from "lucide-react";

interface BattingCardProps {
  battingPerformances: BattingPerformance[];
  players: Player[];
  extras?: {
    total: number;
    wides: number;
    noBalls: number;
    legByes: number;
    byes: number;
  };
}

export default function BattingCard({
  battingPerformances,
  players,
  extras,
}: BattingCardProps) {
  const getPlayerById = (id: string) => {
    return players.find((player) => player.id === id);
  };

  const formatDismissal = (performance: BattingPerformance) => {
    if (performance.isNotOut) return "not out";
    if (performance.dismissalType === "lbw")
      return `lbw b ${performance.bowler}`;
    if (performance.dismissalType === "c")
      return `c ${performance.dismissedBy} b ${performance.bowler}`;
    return "-";
  };

  // Determine if a performance is a milestone (50+ runs)
  const isMilestone = (runs: number) => runs >= 50;

  // Variants for framer-motion animations
  const rowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <Card className="border-none shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4">
        <CardTitle className="text-sm flex items-center justify-between">
          <span className="flex items-center">
            <ChevronRightIcon className="h-4 w-4 mr-2" />
            Batting Scorecard
          </span>
          <Badge
            variant="outline"
            className="text-xs text-blue-100 border-blue-300 bg-blue-600/30"
          >
            INNINGS
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-blue-50 dark:bg-blue-900/20">
              <TableRow>
                <TableHead className="font-medium text-blue-700 dark:text-blue-300 w-2/5">
                  BATTER
                </TableHead>
                <TableHead className="text-right font-medium text-blue-700 dark:text-blue-300">
                  R
                </TableHead>
                <TableHead className="text-right font-medium text-blue-700 dark:text-blue-300">
                  B
                </TableHead>
                <TableHead className="text-right font-medium text-blue-700 dark:text-blue-300">
                  4s
                </TableHead>
                <TableHead className="text-right font-medium text-blue-700 dark:text-blue-300">
                  6s
                </TableHead>
                <TableHead className="text-right font-medium text-blue-700 dark:text-blue-300">
                  S/R
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <AnimatePresence>
                {battingPerformances.map((performance, index) => {
                  const player = getPlayerById(performance.playerId);
                  const milestone = isMilestone(performance.runs);
                  return (
                    <motion.tr
                      key={index}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.05 }}
                      whileHover={{
                        backgroundColor: "rgba(59, 130, 246, 0.05)",
                        transition: { duration: 0.2 },
                      }}
                      className={`${
                        milestone ? "bg-blue-50/40 dark:bg-blue-900/10" : ""
                      }`}
                    >
                      <TableCell className="font-medium py-4">
                        <div className="flex flex-col">
                          <div className="font-medium text-gray-900 dark:text-white flex items-center">
                            {player?.name}
                            {player?.isCaptain && (
                              <Badge
                                variant="outline"
                                className="ml-2 text-xs py-0 h-5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                              >
                                C
                              </Badge>
                            )}
                            {player?.isWicketKeeper && (
                              <Badge
                                variant="outline"
                                className="ml-1 text-xs py-0 h-5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                              >
                                WK
                              </Badge>
                            )}
                            {milestone && (
                              <span className="ml-2 text-yellow-500 dark:text-yellow-400">
                                ★
                              </span>
                            )}
                          </div>
                          <motion.div
                            className="text-xs text-gray-500 dark:text-gray-400 mt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            {formatDismissal(performance)}
                          </motion.div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-gray-900 dark:text-white">
                        {milestone ? (
                          <motion.span
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            className="text-blue-600 dark:text-blue-400"
                          >
                            {performance.runs}
                          </motion.span>
                        ) : (
                          performance.runs
                        )}
                      </TableCell>
                      <TableCell className="text-right text-gray-600 dark:text-gray-400">
                        {performance.balls}
                      </TableCell>
                      <TableCell className="text-right text-gray-600 dark:text-gray-400">
                        {performance.fours}
                      </TableCell>
                      <TableCell className="text-right text-gray-600 dark:text-gray-400">
                        {performance.sixes}
                      </TableCell>
                      <TableCell className="text-right text-gray-600 dark:text-gray-400">
                        {performance.strikeRate.toFixed(2)}
                      </TableCell>
                    </motion.tr>
                  );
                })}

                {extras && (
                  <motion.tr
                    initial="hidden"
                    animate="visible"
                    variants={rowVariants}
                    transition={{ delay: battingPerformances.length * 0.05 }}
                    className="bg-blue-50/50 dark:bg-blue-900/5"
                  >
                    <TableCell colSpan={1} className="font-medium py-4">
                      <div className="flex items-center text-blue-600 dark:text-blue-400">
                        <AlertCircleIcon className="h-4 w-4 mr-2" />
                        Extras
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-blue-600 dark:text-blue-400">
                      {extras.total}
                    </TableCell>
                    <TableCell colSpan={4} className="text-right">
                      <div className="flex flex-wrap justify-end gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Badge
                          variant="outline"
                          className="bg-blue-50 dark:bg-blue-900/10 text-gray-600 dark:text-gray-400 border-blue-100 dark:border-blue-900/20"
                        >
                          W {extras.wides}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 dark:bg-blue-900/10 text-gray-600 dark:text-gray-400 border-blue-100 dark:border-blue-900/20"
                        >
                          NB {extras.noBalls}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 dark:bg-blue-900/10 text-gray-600 dark:text-gray-400 border-blue-100 dark:border-blue-900/20"
                        >
                          B {extras.byes}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 dark:bg-blue-900/10 text-gray-600 dark:text-gray-400 border-blue-100 dark:border-blue-900/20"
                        >
                          LB {extras.legByes}
                        </Badge>
                      </div>
                    </TableCell>
                  </motion.tr>
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
