export interface Player {
  id: string;
  name: string;
  isWicketKeeper?: boolean;
  isCaptain?: boolean;
  image?: string;
}

export interface BattingPerformance {
  playerId: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  dismissalType?: string;
  dismissedBy?: string;
  bowler?: string;
  isNotOut?: boolean;
}

export interface BowlingPerformance {
  playerId: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  players: Player[];
  yetToBat?: string[];
  extras?: {
    total: number;
    wides: number;
    noBalls: number;
    legByes: number;
    byes: number;
  };
}

export interface Innings {
  team: Team;
  score: number;
  wickets: number;
  overs: number;
  battingPerformances: BattingPerformance[];
  bowlingPerformances: BowlingPerformance[];
  fallOfWickets: string[];
}

export interface Match {
  id: string;
  date: string;
  venue: string;
  matchType: string;
  matchNumber: string;
  innings: Innings[];
  result: string;
  winningTeam: string;
  winMargin: string;
  highlightsUrl?: string;
}
