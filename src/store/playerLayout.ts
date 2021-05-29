import { createStore } from "@harlem/core";
import { PlayerLayoutState } from "../types/@PlayerLayoutState";

type PlayerLayoutParameter = { currentUserId?: string; playersList?: string[] };

const STATE = {
  layout: [] as string[],
};

const { state, mutation } = createStore("player_layout", STATE);

export const setPlayerLayout = mutation(
  "setPlayerLayout",
  (state, payload: PlayerLayoutParameter) => {
    const { currentUserId, playersList } = payload;

    if (currentUserId && playersList) {
      const idx = playersList.indexOf(currentUserId);

      let layout = playersList;

      if (idx > -1) {
        layout = [
          ...playersList.splice(idx, playersList.length - idx),
          ...playersList,
        ];
      }

      state.layout = layout;
    }
  }
);

export default state;
