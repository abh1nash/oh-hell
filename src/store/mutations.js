import Vue from "vue";

export function SET_PLAYER(state, { name, id }) {
  if (name && id) {
    Vue.set(state, "player", {});
    Vue.set(state.player, "name", name);
    Vue.set(state.player, "id", id);
  } else Vue.set(state, "player", undefined);
}
