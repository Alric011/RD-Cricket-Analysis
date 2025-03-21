import { BattingPerformance, Player } from '../types/match';

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

export default function BattingCard({ battingPerformances, players, extras }: BattingCardProps) {
  const getPlayerById = (id: string) => {
    return players.find(player => player.id === id);
  };

  const formatDismissal = (performance: BattingPerformance) => {
    if (performance.isNotOut) return 'not out';
    if (performance.dismissalType === 'lbw') return `lbw b ${performance.bowler}`;
    if (performance.dismissalType === 'c') return `c ${performance.dismissedBy} b ${performance.bowler}`;
    return '-';
  };

  return (
    <div className="overflow-x-auto fade-in">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Batting
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              R
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              B
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              4s
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              6s
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              S/R
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
          {battingPerformances.map((performance, index) => {
            const player = getPlayerById(performance.playerId);
            return (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {player?.name} 
                        {player?.isCaptain && <span className="ml-1 text-xs">(C)</span>}
                        {player?.isWicketKeeper && <span className="ml-1 text-xs">(Wk)</span>}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDismissal(performance)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900 dark:text-white">
                  {performance.runs}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                  {performance.balls}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                  {performance.fours}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                  {performance.sixes}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                  {performance.strikeRate.toFixed(2)}
                </td>
              </tr>
            );
          })}
          
          {extras && (
            <tr className="bg-gray-50 dark:bg-gray-800">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  Extras
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900 dark:text-white">
                {extras.total}
              </td>
              <td colSpan={4} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                (W {extras.wides}, B {extras.byes}, LB {extras.legByes})
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
