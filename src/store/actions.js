export function setPlayer({ commit }, payload) {
  console.log(payload);
  commit("SET_PLAYER", payload);
}
