import { createStore } from "@harlem/core";
import { GameState } from "../types/@GameState";
import { setPlayerLayout } from "./playerLayout";

export interface MainState {
  data: GameState;
}
const STATE: GameState = {
  id: undefined,
  gameSize: 0,
  isReady: false,
  isComplete: false,
  isBiddingActive: false,
  turnOf: "",
  thrownCards: undefined,
  playersList: undefined,
  currentUser: {
    id: "",
    name: undefined,
    throwable: undefined,
  },
};

const { state, mutation } = createStore<GameState>("game_data", STATE);

export const setGameOnHold = mutation(
  "setGameOnHold",
  (state) => (state.onHold = true)
);

export const setGameData = mutation<GameState>("setGameData", (state, data) => {
  for (let item in data) {
    state[item] = data[item];
  }
  setPlayerLayout({
    currentUserId: state.currentUser?.id,
    playersList: state.playersList?.map((player) => player.id),
  });
});

export default state;
