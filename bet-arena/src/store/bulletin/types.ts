// src/store/bulletin/types.ts

interface Outcome {
  name: string;
  price: number;
}

interface Market {
  key: string;
  outcomes: Outcome[];
}

interface Bookmaker {
  key: string;
  title: string;
  last_update: string;
  markets: Market[];
}


export type Match = {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: number;
  home_team: string;
  away_team: string;
  bookmakers: Bookmaker[];
}

export type BulletinState = {
  matches: Match[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}