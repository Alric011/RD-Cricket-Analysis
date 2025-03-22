import { useState, useEffect } from 'react';
import axios from 'axios';

const CricketAnalytics = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:5000/report");
        const responseData = await response.json();
        setData(responseData);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching cricket data:', err);
        setError(err.response?.data || { message: err.message });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading match analytics...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <h3 className="text-red-700 font-semibold">Error loading match data</h3>
        <p className="text-red-600">{error.message || 'Unknown error occurred'}</p>
      </div>
    );
  }

  if (!data) {
    return <div className="text-center py-12">No data available</div>;
  }

  return (
    <div className="space-y-8 text-gray-800">
      <MatchSummary summary={data.match_summary} />
      <MomentumScore momentum={data.momentum} />
      <BattersAnalysis batters={data.batters_analysis} />
      <BowlersAnalysis bowlers={data.bowlers_analysis} />
      <Partnerships partnerships={data.partnerships} />
      <ProbabilitiesChart probabilities={data.probabilities} />
      <Recommendations recommendations={data.recommendations} />
    </div>
  );
};

// Sub-components
const MatchSummary = ({ summary }: any) => (
  <div className="bg-blue-50 p-4 rounded-lg">
    <h2 className="text-xl font-bold text-blue-800 mb-2">Match Summary</h2>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <StatCard label="Total Runs" value={summary.total_runs} />
      <StatCard label="Wickets" value={summary.total_wickets} />
      <StatCard label="Overs" value={summary.overs} />
      <StatCard label="Run Rate" value={summary.current_run_rate} />
      <StatCard label="Balls" value={summary.total_balls} />
    </div>
  </div>
);

const MomentumScore = ({ momentum }: any) => (
  <div className="bg-purple-50 p-4 rounded-lg">
    <h2 className="text-xl font-bold text-purple-800 mb-2">Momentum Prediction</h2>
    {momentum.status === 'success' ? (
      <div className="flex items-center justify-center">
        <div className="text-5xl font-bold text-purple-700">{momentum.value.toFixed(1)}</div>
        <div className="ml-2 text-purple-600">/100</div>
      </div>
    ) : (
      <div className="text-orange-600 text-center">{momentum.message || 'Unable to calculate momentum'}</div>
    )}
  </div>
);

const BattersAnalysis = ({ batters }: any) => (
  <div className="bg-green-50 p-4 rounded-lg">
    <h2 className="text-xl font-bold text-green-800 mb-4">Batters Analysis</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-green-100">
            <th className="py-2 px-4 text-left">Batter</th>
            <th className="py-2 px-4 text-right">Runs</th>
            <th className="py-2 px-4 text-right">Balls</th>
            <th className="py-2 px-4 text-right">SR</th>
            <th className="py-2 px-4 text-right">Boundaries</th>
            <th className="py-2 px-4 text-left">Insight</th>
          </tr>
        </thead>
        <tbody>
          {batters.map((batter: any, i: any) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-2 px-4 font-medium">{batter.name}</td>
              <td className="py-2 px-4 text-right">{batter.live_stats.runs}</td>
              <td className="py-2 px-4 text-right">{batter.live_stats.balls_faced}</td>
              <td className="py-2 px-4 text-right">{batter.live_stats.strike_rate.toFixed(1)}</td>
              <td className="py-2 px-4 text-right">{batter.live_stats.boundaries}</td>
              <td className="py-2 px-4 text-sm">{batter.insight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const BowlersAnalysis = ({ bowlers }: any) => (
  <div className="bg-red-50 p-4 rounded-lg">
    <h2 className="text-xl font-bold text-red-800 mb-4">Bowlers Analysis</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-red-100">
            <th className="py-2 px-4 text-left">Bowler</th>
            <th className="py-2 px-4 text-right">Runs</th>
            <th className="py-2 px-4 text-right">Overs</th>
            <th className="py-2 px-4 text-right">Economy</th>
            <th className="py-2 px-4 text-right">Wickets</th>
            <th className="py-2 px-4 text-left">Insight</th>
          </tr>
        </thead>
        <tbody>
          {bowlers.map((bowler: any, i: any) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-2 px-4 font-medium">{bowler.name}</td>
              <td className="py-2 px-4 text-right">{bowler.live_stats.runs_conceded}</td>
              <td className="py-2 px-4 text-right">{bowler.live_stats.overs.toFixed(1)}</td>
              <td className="py-2 px-4 text-right">{bowler.live_stats.economy.toFixed(2)}</td>
              <td className="py-2 px-4 text-right">{bowler.live_stats.wickets}</td>
              <td className="py-2 px-4 text-sm">{bowler.insight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Partnerships = ({ partnerships }: any) => (
  <div className="bg-yellow-50 p-4 rounded-lg">
    <h2 className="text-xl font-bold text-yellow-800 mb-4">Partnerships</h2>
    {partnerships.length === 0 ? (
      <p className="text-center text-gray-500">No partnerships recorded</p>
    ) : (
      <div className="space-y-3">
        {partnerships.map((p: any, i: any) => (
          <div key={i} className="bg-white p-3 rounded border border-yellow-200">
            <div className="font-medium">{p.batsmen.join(' & ')}</div>
            <div className="flex justify-between mt-1">
              <span>{p.runs} runs</span>
              <span>{p.balls} balls</span>
              <span>Run rate: {p.run_rate.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const ProbabilitiesChart = ({ probabilities }: any) => (
  <div className="bg-indigo-50 p-4 rounded-lg">
    <h2 className="text-xl font-bold text-indigo-800 mb-4">Event Probabilities</h2>
    <div className="grid grid-cols-3 gap-4">
      {Object.entries(probabilities).map(([key, value]: any) => (
        <div key={key} className="bg-white p-3 rounded-lg text-center">
          <div className="text-gray-600 capitalize">{key.replace('_', ' ')}</div>
          <div className="text-2xl font-bold text-indigo-600 mt-1">
            {(value * 100).toFixed(0)}%
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Recommendations = ({ recommendations }: any) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h2 className="text-xl font-bold text-gray-800 mb-3">Recommendations</h2>
    <ul className="space-y-2">
      {recommendations.map((rec: any, i: any) => (
        <li key={i} className="flex items-start">
          <span className="text-blue-500 mr-2">•</span>
          <span>{rec}</span>
        </li>
      ))}
    </ul>
  </div>
);

const StatCard = ({ label, value }: any) => (
  <div className="bg-white p-3 rounded-lg text-center">
    <div className="text-sm text-gray-600">{label}</div>
    <div className="text-xl font-bold text-blue-700">{value}</div>
  </div>
);

export default CricketAnalytics;