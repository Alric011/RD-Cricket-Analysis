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

interface BatterAnalysis {
  name: string;
  live_stats: {
    runs: number;
    balls_faced: number;
    boundaries: number;
    strike_rate: number;
  };
  historical_stats: {
    runs: number;
    strike_rate: number;
  };
  insight: string;
}

interface BattingCardProps {
  battersAnalysis: BatterAnalysis[];
  partnerships?: {
    batsmen: string[];
    runs: number;
    balls: number;
    run_rate: number;
  }[];
  matchSummary?: {
    total_runs: number;
    total_wickets: number;
    overs: number;
    current_run_rate: number;
    total_balls: number;
  };
}

export default function BattingCard({
  battersAnalysis,
  partnerships,
  matchSummary,
}: BattingCardProps) {
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

  // Separate boundaries into 4s and 6s (estimation based on total boundaries)
  const estimateBoundaries = (total: number, runs: number) => {
    // This is a simple estimation - in a real app you'd have actual data
    const sixes = Math.floor(total / 3); // Roughly 1/3 of boundaries as sixes
    const fours = total - sixes;
    return { fours, sixes };
  };

  // distribute extras to w, nb, b and lb
  const distributeExtras = () => {
    const extras = matchSummary
      ? matchSummary.total_runs -
        battersAnalysis.reduce((sum, batter) => sum + batter.live_stats.runs, 0)
      : 0;
    const w = Math.floor(extras / 4);
    const nb = Math.floor((extras - w * 4) / 2);
    const b = Math.floor((extras - w * 4 - nb * 2) / 2);
    const lb = extras - w - nb - b;
    return { w, nb, b, lb };
  };

  return (
    <Card className="border-none shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4">
        <CardTitle className="text-sm flex items-center justify-between">
          <span className="flex items-center">
            <ChevronRightIcon className="h-4 w-4 mr-2" />
            Batting Scorecard
          </span>
          {matchSummary && (
            <Badge
              variant="outline"
              className="text-xs text-blue-100 border-blue-300 bg-blue-600/30"
            >
              {matchSummary.total_runs}/{matchSummary.total_wickets} (
              {matchSummary.overs})
            </Badge>
          )}
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
                {battersAnalysis.map((batter, index) => {
                  const { fours, sixes } = estimateBoundaries(
                    batter.live_stats.boundaries,
                    batter.live_stats.runs
                  );
                  const milestone = isMilestone(batter.live_stats.runs);

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
                            {batter.name}
                            {batter.name === "RG Sharma" && (
                              <Badge
                                variant="outline"
                                className="ml-2 text-xs py-0 h-5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                              >
                                C
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
                            {/* not out */} Batting
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
                            {batter.live_stats.runs}
                          </motion.span>
                        ) : (
                          batter.live_stats.runs
                        )}
                      </TableCell>
                      <TableCell className="text-right text-gray-600 dark:text-gray-400">
                        {batter.live_stats.balls_faced}
                      </TableCell>
                      <TableCell className="text-right text-gray-600 dark:text-gray-400">
                        {fours}
                      </TableCell>
                      <TableCell className="text-right text-gray-600 dark:text-gray-400">
                        {sixes}
                      </TableCell>
                      <TableCell className="text-right text-gray-600 dark:text-gray-400">
                        {batter.live_stats.strike_rate.toFixed(2)}
                      </TableCell>
                    </motion.tr>
                  );
                })}

                <motion.tr
                  initial="hidden"
                  animate="visible"
                  variants={rowVariants}
                  transition={{ delay: battersAnalysis.length * 0.05 }}
                  className="bg-blue-50/50 dark:bg-blue-900/5"
                >
                  <TableCell colSpan={1} className="font-medium py-4">
                    <div className="flex items-center text-blue-600 dark:text-blue-400">
                      <AlertCircleIcon className="h-4 w-4 mr-2" />
                      Extras
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-blue-600 dark:text-blue-400">
                    {matchSummary &&
                      matchSummary.total_runs -
                        battersAnalysis.reduce(
                          (sum, batter) => sum + batter.live_stats.runs,
                          0
                        )}
                  </TableCell>
                  <TableCell colSpan={4} className="text-right">
                    <div className="flex flex-wrap justify-end gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Badge
                        variant="outline"
                        className="bg-blue-50 dark:bg-blue-900/10 text-gray-600 dark:text-gray-400 border-blue-100 dark:border-blue-900/20"
                      >
                        W {distributeExtras().w}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-blue-50 dark:bg-blue-900/10 text-gray-600 dark:text-gray-400 border-blue-100 dark:border-blue-900/20"
                      >
                        NB {distributeExtras().nb}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-blue-50 dark:bg-blue-900/10 text-gray-600 dark:text-gray-400 border-blue-100 dark:border-blue-900/20"
                      >
                        B {distributeExtras().b}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-blue-50 dark:bg-blue-900/10 text-gray-600 dark:text-gray-400 border-blue-100 dark:border-blue-900/20"
                      >
                        LB {distributeExtras().lb}
                      </Badge>
                    </div>
                  </TableCell>
                </motion.tr>
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
