import Vue from "vue";

export function SET_PLAYER(state, { name, id }) {
  if (name && id) {
    Vue.set(state, "player", {});
    Vue.set(state.player, "name", name);
    Vue.set(state.player, "id", id);
  } else Vue.set(state, "player", undefined);
}

export function SET_GAME(state, id) {
  Vue.set(state, "game", {});
  Vue.set(state.game, "id", id);
}

export function SET_GAME_TURNS(state, payload) {
  Vue.set(state.game, "turn", payload.startFrom);
  Vue.set(state.game, "turns", payload.turns);
}

export function SET_NEW_HAND(state, cards) {
  Vue.set(state.game, "cardsCount", {});
  state.game.turns.forEach((player) => {
    Vue.set(state.game.cardsCount, player, cards.length);
  });
  Vue.set(state.game, "cardsCurrent", cards);
}

export function SET_TRUMP(state, trump) {
  if (!state.game.hand) Vue.set(state.game, "hand", {});
  Vue.set(state.game.hand, "trump", trump);
}

export function SET_BID_STATUS(state, status) {
  if (!state.game.bidding) Vue.set(state.game, "bidding", {});
  Vue.set(state.game.bidding, "isActive", status);
}

export function SET_TURN(state, playerId) {
  Vue.set(state.game, "turn", playerId);
}

export function SET_HAND_BIDS(state, bids) {
  if (!state.game.hand) Vue.set(state.game, "hand", {});
  if (!state.game.hand.bids) Vue.set(state.game.hand, "bids", {});
  Object.entries(bids).forEach((bid) => {
    Vue.set(state.game.hand.bids, bid[0], bid[1]);
  });
}
