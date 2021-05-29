export type PlayerClient = {
  id: string;
  name: string;
  score: number;
  cards: number | string[];
  stats: { bid: number; tricks: number };
};

export interface GameState {
  onHold?: boolean;
  id?: number;
  gameSize?: number;
  isReady?: boolean;
  isComplete?: boolean;
  playersList?: PlayerClient[];
  isBiddingActive?: boolean;
  handCardsCount?: number;
  trump?: string;
  turnOf?: string;
  thrownCards?: { [playerId: string]: string };
  currentUser?: {
    id: string;
    name?: string;
    throwable?: string[];
    unavailableBids?: number[];
  };
}
