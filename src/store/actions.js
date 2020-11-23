export function setPlayer({ commit }, payload) {
  commit("SET_PLAYER", payload);
}

export function setGame({ commit }, id) {
  commit("SET_GAME", id);
}

export function setGameTurns({ commit }, { startFrom, turns }) {
  commit("SET_GAME_TURNS", { startFrom, turns });
}

export function setNewHand({ commit }, { cards }) {
  commit("SET_NEW_HAND", cards);
}

export function setTrump({ commit }, trump) {
  commit("SET_TRUMP", trump);
}

export function setBidStatus({ commit }, status) {
  commit("SET_BID_STATUS", status);
}

export function changeTurn({ commit }, playerId) {
  commit("SET_TURN", playerId);
}

export function setHandBids({ commit }, bids) {
  commit("SET_HAND_BIDS", bids);
}

export function setPlayersInfo({ commit }, playersList) {
  commit("SET_PLAYERS_INFO", playersList);
}
