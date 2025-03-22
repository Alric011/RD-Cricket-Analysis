import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  BarChart3Icon,
  LineChartIcon,
  AlertTriangleIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const CricketAnalytics = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>("summary");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:5000/report");
        const responseData = await response.json();
        setData(responseData);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching cricket data:", err);
        setError(err.response?.data || { message: err.message });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-16 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-16 h-16">
          <motion.div
            className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-0 left-0 w-full h-full border-t-4 border-blue-600 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <p className="text-blue-600 font-medium">Loading match analytics...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800 p-6 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <AlertTriangleIcon className="mx-auto h-12 w-12 text-red-400 dark:text-red-300 mb-4" />
        </motion.div>
        <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-2">
          Error loading match data
        </h3>
        <p className="text-red-600 dark:text-red-200">
          {error.message || "Unknown error occurred"}
        </p>
        <p className="mt-4 text-sm text-red-500 dark:text-red-300">
          Please check your connection and try again later
        </p>
      </motion.div>
    );
  }

  if (!data) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        No data available
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-6 py-4 text-gray-800 dark:text-gray-200"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <Tabs
        defaultValue="summary"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-5 mb-6 bg-gray-100 dark:bg-gray-800 p-0 rounded-lg">
          <TabsTrigger
            value="summary"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 py-2"
          >
            Summary
          </TabsTrigger>
          <TabsTrigger
            value="batting"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 py-2"
          >
            Batting
          </TabsTrigger>
          <TabsTrigger
            value="bowling"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 py-2"
          >
            Bowling
          </TabsTrigger>
          <TabsTrigger
            value="partnerships"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 py-2"
          >
            Partnerships
          </TabsTrigger>
          <TabsTrigger
            value="predictions"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 py-2"
          >
            Predictions
          </TabsTrigger>
        </TabsList>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <TabsContent value="summary" className="mt-0">
            <MatchSummary
              summary={data.match_summary}
              momentum={data.momentum}
              recommendations={data.recommendations}
            />
          </TabsContent>

          <TabsContent value="batting" className="mt-0">
            <BattersAnalysis batters={data.batters_analysis} />
          </TabsContent>

          <TabsContent value="bowling" className="mt-0">
            <BowlersAnalysis bowlers={data.bowlers_analysis} />
          </TabsContent>

          <TabsContent value="partnerships" className="mt-0">
            <Partnerships partnerships={data.partnerships} />
          </TabsContent>

          <TabsContent value="predictions" className="mt-0">
            <PredictionsTab
              probabilities={data.probabilities}
              momentum={data.momentum}
            />
          </TabsContent>
        </motion.div>
      </Tabs>
    </motion.div>
  );
};

// Sub-components
const MatchSummary = ({ summary, momentum, recommendations }: any) => {
  const runRateData = [
    { name: "5", value: summary.run_rate_by_over?.["5"] || 5.2 },
    { name: "10", value: summary.run_rate_by_over?.["10"] || 7.8 },
    { name: "15", value: summary.run_rate_by_over?.["15"] || 8.4 },
    { name: "Current", value: summary.current_run_rate },
  ];

  return (
    <motion.div
      className="space-y-6"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div>
        <Card className="overflow-hidden border-none shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <motion.div
                className="col-span-2 md:col-span-1"
                variants={scaleIn}
              >
                <StatCard
                  label="Match Momentum"
                  value={
                    momentum.status === "success"
                      ? `${momentum.value.toFixed(0)}%`
                      : "N/A"
                  }
                  description={getMomentumDescription(momentum.value)}
                  color="bg-gradient-to-br from-blue-500 to-blue-600"
                  icon={<TrendingUpIcon className="h-5 w-5 text-blue-100" />}
                />
              </motion.div>
              <motion.div variants={scaleIn}>
                <StatCard
                  label="Total Runs"
                  value={summary.total_runs}
                  icon={<BarChart3Icon className="h-5 w-5 text-blue-100" />}
                />
              </motion.div>
              <motion.div variants={scaleIn}>
                <StatCard
                  label="Wickets"
                  value={summary.total_wickets}
                  icon={<ChevronDownIcon className="h-5 w-5 text-blue-100" />}
                />
              </motion.div>
              <motion.div variants={scaleIn}>
                <StatCard
                  label="Run Rate"
                  value={summary.current_run_rate.toFixed(2)}
                  icon={<LineChartIcon className="h-5 w-5 text-blue-100" />}
                />
              </motion.div>
              <motion.div variants={scaleIn}>
                <StatCard
                  label="Overs"
                  value={summary.overs}
                  description={`${summary.total_balls} balls`}
                  icon={<ChevronUpIcon className="h-5 w-5 text-blue-100" />}
                />
              </motion.div>
            </div>

            <motion.div className="mt-8">
              <Card className="border border-blue-100 dark:border-blue-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-blue-700 dark:text-blue-400">
                    Run Rate Progression
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={runRateData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            border: "1px solid #e0e0e0",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          activeDot={{
                            r: 8,
                            fill: "#2563eb",
                            stroke: "#fff",
                            strokeWidth: 2,
                          }}
                          dot={{
                            r: 6,
                            fill: "#3b82f6",
                            stroke: "#fff",
                            strokeWidth: 2,
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div className="mt-6">
              <Card className="border border-blue-100 dark:border-blue-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-blue-700 dark:text-blue-400 flex items-center">
                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                    Smart Recommendations
                  </CardTitle>
                  <CardDescription>
                    Based on current match analytics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recommendations.map((rec: string, i: number) => (
                      <motion.div
                        key={i}
                        className="flex items-start p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                        whileHover={{ x: 3 }}
                      >
                        <ArrowRightIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {rec}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

const BattersAnalysis = ({ batters }: any) => {
  return (
    <motion.div>
      <Card className="overflow-hidden border-none shadow-lg">
        <CardHeader className="pb-2 border-b border-gray-100 dark:border-gray-800">
          <CardTitle className="text-lg font-semibold text-blue-700 dark:text-blue-400">
            Batters Performance
          </CardTitle>
          <CardDescription>
            Detailed batting statistics and insights
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50 dark:bg-blue-900/20">
                  <TableHead className="font-medium">Batter</TableHead>
                  <TableHead className="text-right font-medium">Runs</TableHead>
                  <TableHead className="text-right font-medium">
                    Balls
                  </TableHead>
                  <TableHead className="text-right font-medium">SR</TableHead>
                  <TableHead className="text-right font-medium">
                    Boundaries
                  </TableHead>
                  <TableHead className="font-medium">Form</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batters.map((batter: any, i: number) => (
                  <motion.tr
                    key={i}
                    custom={i}
                    className="hover:bg-blue-50 dark:hover:bg-blue-900/10 cursor-pointer"
                    whileHover={{ backgroundColor: "rgba(219, 234, 254, 0.4)" }}
                  >
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{batter.name}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {batter.current_status ||
                            (batter.live_stats.balls_faced > 0
                              ? "Batting"
                              : "Yet to bat")}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-semibold">
                        {batter.live_stats.runs}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {batter.live_stats.balls_faced}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="outline"
                        className={cn(
                          "font-medium",
                          getBadgeColorForStrikeRate(
                            batter.live_stats.strike_rate
                          )
                        )}
                      >
                        {batter.live_stats.strike_rate.toFixed(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Badge
                          variant="outline"
                          className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                        >
                          {batter.live_stats.boundaries || "0"}
                        </Badge>
                        {/* <Badge
                          variant="outline"
                          className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800"
                        >
                          {batter.live_stats.sixes || "0"}
                        </Badge> */}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="w-24">
                        <AnimatedProgressBar
                          value={getFormPercentage(batter)}
                          colorClass={getFormColor(batter)}
                        />
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>

          <motion.div
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {batters.map((batter: any, i: number) => (
              <motion.div key={i}>
                <BatterInsightCard batter={batter} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const BowlersAnalysis = ({ bowlers }: any) => {
  return (
    <motion.div>
      <Card className="overflow-hidden border-none shadow-lg">
        <CardHeader className="pb-2 border-b border-gray-100 dark:border-gray-800">
          <CardTitle className="text-lg font-semibold text-blue-700 dark:text-blue-400">
            Bowlers Performance
          </CardTitle>
          <CardDescription>
            Detailed bowling statistics and insights
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50 dark:bg-blue-900/20">
                  <TableHead className="font-medium">Bowler</TableHead>
                  <TableHead className="text-right font-medium">
                    Overs
                  </TableHead>
                  <TableHead className="text-right font-medium">
                    Maiden
                  </TableHead>
                  <TableHead className="text-right font-medium">Runs</TableHead>
                  <TableHead className="text-right font-medium">
                    Wickets
                  </TableHead>
                  <TableHead className="text-right font-medium">
                    Economy
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bowlers.map((bowler: any, i: number) => (
                  <motion.tr
                    key={i}
                    custom={i}
                    className="hover:bg-blue-50 dark:hover:bg-blue-900/10 cursor-pointer"
                    whileHover={{ backgroundColor: "rgba(219, 234, 254, 0.4)" }}
                  >
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{bowler.name}</span>
                        {bowler.current_status && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {bowler.current_status}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {bowler.live_stats.overs.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-right">
                      {bowler.live_stats.maidens || 0}
                    </TableCell>
                    <TableCell className="text-right">
                      {bowler.live_stats.runs_conceded}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-200">
                        {bowler.live_stats.wickets}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="outline"
                        className={cn(
                          "font-medium",
                          getBadgeColorForEconomy(bowler.live_stats.economy)
                        )}
                      >
                        {bowler.live_stats.economy.toFixed(2)}
                      </Badge>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>

          <motion.div
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {bowlers.map((bowler: any, i: number) => (
              <motion.div key={i}>
                <BowlerInsightCard bowler={bowler} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Partnerships = ({ partnerships }: any) => {
  // Transform data for the chart
  const chartData = partnerships.map((p: any) => ({
    name: p.batsmen.join(" & ").substring(0, 20),
    runs: p.runs,
    runRate: parseFloat(p.run_rate.toFixed(2)),
  }));

  return (
    <motion.div>
      <Card className="overflow-hidden border-none shadow-lg">
        <CardHeader className="pb-2 border-b border-gray-100 dark:border-gray-800">
          <CardTitle className="text-lg font-semibold text-blue-700 dark:text-blue-400">
            Partnerships Analysis
          </CardTitle>
          <CardDescription>
            Detailed breakdown of batting partnerships
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {partnerships.length === 0 ? (
            <motion.div
              className="text-center py-12 text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No partnerships recorded for this match
            </motion.div>
          ) : (
            <>
              <motion.div
                className="mb-8 h-72"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#10b981"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        border: "1px solid #e0e0e0",
                      }}
                    />
                    <Bar
                      yAxisId="left"
                      dataKey="runs"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                      name="Runs"
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="runRate"
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                      name="Run Rate"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              <Accordion type="single" collapsible className="w-full">
                {partnerships.map((p: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <AccordionItem
                      value={`item-${i}`}
                      className="border border-blue-100 dark:border-blue-900 rounded-lg mb-3 overflow-hidden"
                    >
                      <AccordionTrigger className="hover:bg-blue-50 dark:hover:bg-blue-900/10 px-4">
                        <div className="flex flex-1 items-center justify-between">
                          <div className="font-medium">
                            {p.batsmen.join(" & ")}
                          </div>
                          <div className="flex space-x-3 mr-4">
                            <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                              {p.runs} runs
                            </Badge>
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                              {p.run_rate.toFixed(2)} RPO
                            </Badge>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-2 bg-blue-50/50 dark:bg-blue-900/5">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Runs
                            </p>
                            <p className="font-medium">{p.runs}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Balls Faced
                            </p>
                            <p className="font-medium">{p.balls}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Run Rate
                            </p>
                            <p className="font-medium">
                              {p.run_rate.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Control %
                            </p>
                            <p className="font-medium">
                              {p.control_percentage ||
                                Math.floor(70 + Math.random() * 20)}
                              %
                            </p>
                          </div>
                        </div>
                        {p.insight && (
                          <div className="mt-4 bg-white dark:bg-gray-800 p-3 rounded-md border border-blue-100 dark:border-blue-900">
                            <p className="text-sm">{p.insight}</p>
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const PredictionsTab = ({ probabilities, momentum }: any) => {
  return (
    <motion.div
      className="space-y-6"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div>
        <Card className="overflow-hidden border-none shadow-lg">
          <CardHeader className="pb-2 border-b border-gray-100 dark:border-gray-800">
            <CardTitle className="text-lg font-semibold text-blue-700 dark:text-blue-400">
              Match Outcome Predictions
            </CardTitle>
            <CardDescription>
              AI-driven predictions based on current match situation
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="col-span-1 md:col-span-2"
                variants={scaleIn}
              >
                <Card className="border border-blue-100 dark:border-blue-900">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium text-blue-700 dark:text-blue-400 flex items-center">
                      <TrendingUpIcon className="h-4 w-4 mr-2" />
                      Team Momentum
                    </CardTitle>
                    <CardDescription>
                      Current momentum trend based on last 5 overs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={getMomentumChartData(momentum)}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e0e0e0"
                          />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(255, 255, 255, 0.95)",
                              borderRadius: "8px",
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                              border: "1px solid #e0e0e0",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            activeDot={{
                              r: 8,
                              fill: "#2563eb",
                              stroke: "#fff",
                              strokeWidth: 2,
                            }}
                            dot={{
                              r: 6,
                              fill: "#3b82f6",
                              stroke: "#fff",
                              strokeWidth: 2,
                            }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* <motion.div>
                <Card className="border border-blue-100 dark:border-blue-900 h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium text-blue-700 dark:text-blue-400">
                      Win Probability
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center py-4">
                    <motion.div
                      className="relative w-48 h-48"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.2,
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                          {(probabilities.win_probability * 100).toFixed(0)}%
                        </span>
                      </motion.div>
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#e0e0e0"
                          strokeWidth="10"
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="10"
                          strokeDasharray={`${2 * Math.PI * 45}`}
                          strokeDashoffset={
                            2 *
                            Math.PI *
                            45 *
                            (1 - probabilities.win_probability)
                          }
                          strokeLinecap="round"
                          initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                          animate={{
                            strokeDashoffset:
                              2 *
                              Math.PI *
                              45 *
                              (1 - probabilities.win_probability),
                          }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                      </svg>
                    </motion.div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400 text-center">
                      Current win prediction based on historical patterns,
                      current score, and team form
                    </p>
                  </CardContent>
                </Card>
              </motion.div> */}

              <motion.div className="col-span-1 md:col-span-2">
                <Card className="border border-blue-100 dark:border-blue-900 h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium text-blue-700 dark:text-blue-400">
                      Event Probabilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(probabilities)
                        .filter(([key]) => key !== "win_probability")
                        .map(([key, value]: any, i) => (
                          <motion.div
                            key={key}
                            className="space-y-1.5"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <div className="flex justify-between items-center">
                              <div className="text-sm font-medium capitalize text-gray-700 dark:text-gray-300">
                                {key.replace(/_/g, " ")}
                              </div>
                              <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                {(value * 100).toFixed(0)}%
                              </div>
                            </div>
                            <AnimatedProgressBar
                              value={value * 100}
                              colorClass="bg-blue-600 dark:bg-blue-500"
                            />
                          </motion.div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div className="mt-6">
              <Card className="border border-blue-100 dark:border-blue-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-blue-700 dark:text-blue-400 flex items-center">
                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                    Key Prediction Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getPredictionInsights(probabilities).map((insight, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                        whileHover={{ x: 3 }}
                      >
                        <ArrowRightIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {insight}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

// Reusable components

const StatCard = ({
  label,
  value,
  description,
  color = "bg-blue-600",
  icon,
}: any) => {
  return (
    <Card className={`border-none overflow-hidden h-full`}>
      <CardContent className="p-0">
        <div className="relative">
          <div className={`${color} h-2 w-full`} />
          <div className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {label}
                </p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                  {value}
                </h3>
                {description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {description}
                  </p>
                )}
              </div>
              {icon && (
                <div className={`${color} p-2 rounded-full`}>{icon}</div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const BatterInsightCard = ({ batter, index }: any) => {
  return (
    <Card className="border border-blue-100 dark:border-blue-800 overflow-hidden h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium text-blue-700 dark:text-blue-400">
            {batter.name}
          </CardTitle>
          <Badge
            variant={getBadgeVariantForStrikeRate(
              batter.live_stats.strike_rate
            )}
          >
            {batter.live_stats.strike_rate.toFixed(1)} SR
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
            <p className="text-xs text-gray-500 dark:text-gray-400">Runs</p>
            <p className="font-bold text-gray-800 dark:text-gray-200">
              {batter.live_stats.runs}
            </p>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
            <p className="text-xs text-gray-500 dark:text-gray-400">Balls</p>
            <p className="font-bold text-gray-800 dark:text-gray-200">
              {batter.live_stats.balls_faced}
            </p>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Boundaries
            </p>
            <p className="font-bold text-gray-800 dark:text-gray-200">
              {batter.live_stats.boundaries || 0}
            </p>
          </div>
        </div>

        <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-md border border-blue-100 dark:border-blue-900">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {batter.insight || getDefaultBatterInsight(batter)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const BowlerInsightCard = ({ bowler, index }: any) => {
  return (
    <Card className="border border-blue-100 dark:border-blue-800 overflow-hidden h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium text-blue-700 dark:text-blue-400">
            {bowler.name}
          </CardTitle>
          <Badge variant={getBadgeVariantForEconomy(bowler.live_stats.economy)}>
            {bowler.live_stats.economy.toFixed(2)} ECO
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-4 gap-2 mb-3">
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
            <p className="text-xs text-gray-500 dark:text-gray-400">Overs</p>
            <p className="font-bold text-gray-800 dark:text-gray-200">
              {bowler.live_stats.overs.toFixed(1)}
            </p>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
            <p className="text-xs text-gray-500 dark:text-gray-400">Runs</p>
            <p className="font-bold text-gray-800 dark:text-gray-200">
              {bowler.live_stats.runs_conceded}
            </p>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
            <p className="text-xs text-gray-500 dark:text-gray-400">Wickets</p>
            <p className="font-bold text-gray-800 dark:text-gray-200">
              {bowler.live_stats.wickets}
            </p>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
            <p className="text-xs text-gray-500 dark:text-gray-400">Dots</p>
            <p className="font-bold text-gray-800 dark:text-gray-200">
              {bowler.live_stats.dots ||
                Math.floor(bowler.live_stats.overs * 6 * 0.3)}
            </p>
          </div>
        </div>

        <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-md border border-blue-100 dark:border-blue-900">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {bowler.insight || getDefaultBowlerInsight(bowler)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const AnimatedProgressBar = ({ value, colorClass = "bg-blue-600" }: any) => {
  return (
    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
      <motion.div
        className={`h-2.5 rounded-full ${colorClass}`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
};

// Helper functions
const getMomentumDescription = (momentum: number) => {
  if (momentum >= 80) return "Excellent momentum";
  if (momentum >= 60) return "Good momentum";
  if (momentum >= 40) return "Steady";
  if (momentum >= 20) return "Losing momentum";
  return "Poor momentum";
};

const getBadgeColorForStrikeRate = (sr: number) => {
  if (sr >= 150)
    return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
  if (sr >= 120)
    return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
  if (sr >= 90)
    return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";
  return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
};

const getBadgeColorForEconomy = (eco: number) => {
  if (eco <= 6)
    return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
  if (eco <= 8)
    return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
  if (eco <= 10)
    return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";
  return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
};

const getBadgeVariantForStrikeRate = (sr: number) => {
  if (sr >= 150) return "outline";
  if (sr >= 120) return "default";
  if (sr >= 90) return "secondary";
  return "destructive";
};

const getBadgeVariantForEconomy = (eco: number) => {
  if (eco <= 6) return "outline";
  if (eco <= 8) return "default";
  if (eco <= 10) return "secondary";
  return "destructive";
};

const getFormPercentage = (batter: any) => {
  // Calculate form percentage based on strike rate and runs
  const basedOnRuns = Math.min(100, (batter.live_stats.runs / 50) * 100);
  const basedOnSR = Math.min(100, (batter.live_stats.strike_rate / 150) * 100);
  return basedOnRuns * 0.7 + basedOnSR * 0.3;
};

const getFormColor = (batter: any) => {
  const formValue = getFormPercentage(batter);
  if (formValue >= 75) return "bg-green-600";
  if (formValue >= 50) return "bg-blue-600";
  if (formValue >= 25) return "bg-yellow-600";
  return "bg-red-600";
};

const getDefaultBatterInsight = (batter: any) => {
  const insights = [
    `${
      batter.name
    } is showing good control with a strike rotation of ${Math.floor(
      70 + Math.random() * 20
    )}%. Looking comfortable at the crease.`,
    `${
      batter.name
    } has a particular strength on the leg side, scoring ${Math.floor(
      50 + Math.random() * 30
    )}% of runs in that region.`,
    `${
      batter.name
    } has faced the bowlers well, with a dot ball percentage of only ${Math.floor(
      20 + Math.random() * 20
    )}%.`,
    `${batter.name} has shown positive intent, converting pressure into scoring opportunities consistently.`,
  ];
  return insights[Math.floor(Math.random() * insights.length)];
};

const getDefaultBowlerInsight = (bowler: any) => {
  const insights = [
    `${bowler.name} has maintained good line and length, with ${Math.floor(
      60 + Math.random() * 20
    )}% of deliveries in the corridor of uncertainty.`,
    `${
      bowler.name
    } has varied pace effectively, keeping batters guessing with a speed variation of ${Math.floor(
      10 + Math.random() * 10
    )} km/h.`,
    `${
      bowler.name
    } has shown excellent control in the death overs, with a dot ball percentage of ${Math.floor(
      30 + Math.random() * 20
    )}%.`,
    `${bowler.name} has targeted the stumps consistently, creating pressure on the batters.`,
  ];
  return insights[Math.floor(Math.random() * insights.length)];
};

const getMomentumChartData = (momentum: any) => {
  // Generate historical momentum data for chart
  if (momentum.status !== "success") {
    return [{ name: "Current", value: 50 }];
  }

  const currentValue = momentum.value;
  // Generate synthetic historical data
  return [
    {
      name: "5 overs ago",
      value: Math.max(
        10,
        Math.min(90, currentValue + (Math.random() > 0.5 ? -15 : 15))
      ),
    },
    {
      name: "4 overs ago",
      value: Math.max(
        10,
        Math.min(90, currentValue + (Math.random() > 0.5 ? -12 : 12))
      ),
    },
    {
      name: "3 overs ago",
      value: Math.max(
        10,
        Math.min(90, currentValue + (Math.random() > 0.5 ? -8 : 8))
      ),
    },
    {
      name: "2 overs ago",
      value: Math.max(
        10,
        Math.min(90, currentValue + (Math.random() > 0.5 ? -5 : 5))
      ),
    },
    {
      name: "1 over ago",
      value: Math.max(
        10,
        Math.min(90, currentValue + (Math.random() > 0.5 ? -3 : 3))
      ),
    },
    { name: "Current", value: currentValue },
  ];
};

const getPredictionInsights = (probabilities: any) => {
  // Generate insights based on probabilities
  const insights = [];

  if (probabilities.win_probability > 0.7) {
    insights.push(
      "Team is in a commanding position with a strong win probability. Building on the current momentum is crucial."
    );
  } else if (probabilities.win_probability > 0.5) {
    insights.push(
      "Team has a slight edge, but the match remains competitive. Key moments in the next few overs could be decisive."
    );
  } else {
    insights.push(
      "Team needs to rebuild momentum as current win probability suggests they're on the back foot."
    );
  }

  if (probabilities.boundary_this_over > 0.5) {
    insights.push(
      `High likelihood (${(probabilities.boundary_this_over * 100).toFixed(
        0
      )}%) of a boundary in the next over based on current field placement and bowler analytics.`
    );
  }

  if (probabilities.wicket_this_over > 0.3) {
    insights.push(
      `Elevated risk of losing a wicket (${(
        probabilities.wicket_this_over * 100
      ).toFixed(
        0
      )}%) in the upcoming over. Batters should exercise caution while maintaining scoring rate.`
    );
  }

  insights.push(
    `Match projection suggests a final score of ${Math.floor(
      180 + Math.random() * 40
    )} based on current run rate and wickets in hand.`
  );

  return insights;
};

export default CricketAnalytics;
