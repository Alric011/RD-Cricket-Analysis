import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BowlerAnalysis {
  name: string;
  live_stats: {
    overs: number;
    runs_conceded: number;
    wickets: number;
    economy: number;
  };
  historical_stats: {
    economy: number;
    wickets: number;
  };
  insight: string;
}

interface BowlingCardProps {
  bowlersAnalysis: BowlerAnalysis[];
}

export default function BowlingCard({ bowlersAnalysis }: BowlingCardProps) {
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <Card className="border-none shadow-sm overflow-hidden bg-white dark:bg-gray-900">
      <CardHeader className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800 py-3">
        <CardTitle className="text-blue-700 dark:text-blue-300 text-base font-medium">
          Bowling
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <motion.table
            className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
            initial="hidden"
            animate="visible"
            variants={tableVariants}
          >
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Bowler
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  O
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  M
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  R
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  W
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Econ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {bowlersAnalysis.map((bowler, index) => {
                const isCaptain = bowler.name === "JO Holder";
                // Format overs to show correct decimal (.1 for 1 ball, .2 for 2 balls, etc.)
                const formattedOvers = () => {
                  const fullOvers = Math.floor(bowler.live_stats.overs);
                  const balls = Math.round(
                    (bowler.live_stats.overs - fullOvers) * 6
                  );
                  return `${fullOvers}.${balls}`;
                };

                return (
                  <motion.tr
                    key={index}
                    className="hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors duration-200"
                    variants={rowVariants}
                    whileHover={{ x: 3, transition: { duration: 0.2 } }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {bowler.name}
                            {isCaptain && (
                              <span className="ml-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                                (C)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700 dark:text-gray-300">
                      {formattedOvers()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700 dark:text-gray-300">
                      0
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700 dark:text-gray-300">
                      {bowler.live_stats.runs_conceded}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-blue-600 dark:text-blue-400">
                      {bowler.live_stats.wickets}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700 dark:text-gray-300">
                      {bowler.live_stats.economy.toFixed(2)}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </motion.table>
        </div>
      </CardContent>
    </Card>
  );
}
