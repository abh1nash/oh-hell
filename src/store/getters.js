export function isBiddingTurn(state) {
  return state.game && state.game.bidding && state.player
    ? state.game.bidding.isActive && state.player.id == state.game.turn
    : false;
}
