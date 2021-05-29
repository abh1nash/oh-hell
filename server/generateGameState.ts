import { GameState } from "../src/types/@GameState";
import OhHellGame from "./Game";

export default function generateGameState(
  requesterId: string,
  gameId: number,
  game: OhHellGame
): GameState {
  const currentUser = game
    .playersList(requesterId)
    .filter((player) => player.id == requesterId)[0];
  return {
    id: gameId,
    onHold: false,
    gameSize: game.playersCount,
    isBiddingActive: game.isBiddingActive,
    isReady: game.playersCount == game.playersList().length,
    isComplete: game.isComplete,
    handCardsCount: game.handCardsCount,
    trump: game.currentTrump,
    turnOf: game.turnOf,
    thrownCards: game.thrownCards,
    playersList: game.playersList(requesterId),
    currentUser: {
      id: requesterId,
      name: currentUser ? currentUser.name : undefined,
      throwable: currentUser ? currentUser.throwable : undefined,
      unavailableBids: game.unavailableBids,
    },
  };
}
