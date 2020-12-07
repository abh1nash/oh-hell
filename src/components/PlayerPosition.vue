<template>
  <div class="flex flex-wrap-reverse">
    <cards-container
      :cards="monitoredPlayer.cardsOnHand"
      :class="[
        'max-h-full w-full',
        { 'animate-pulse': currentTurn == monitoredPlayer.id },
      ]"
      :vertical="vertical"
    />
    <div class="w-full text-xs text-center text-white my-2 md:mt-5">
      <span>{{ monitoredPlayer.name }}</span>
      <span
        class="rounded inline p-1 pr-2 ml-1 bg-white text-green-700 font-bold"
      >
        {{ monitoredPlayerTricks }}/{{ monitoredPlayerBids }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CardsContainer from "./CardsContainer.vue";
export default {
  components: { CardsContainer },
  props: { position: String, vertical: Boolean },
  computed: {
    ...mapState({
      hand: (state) => state.game.hand,
      turns: (state) => state.game.turns,
      players: (state) => state.game.players,
      currentTurn: (state) => state.game.turn,
    }),
    monitoredPlayer() {
      let playersCount = Object.keys(this.players).length;
      let monitorIndex = this.position
        .split(" ")
        .filter((position) => position.charAt(2) == playersCount)[0]
        .split("/")[0];
      return this.players[this.turns[parseInt(monitorIndex - 1)]];
    },
    monitoredPlayerBids() {
      if (!this.hand) return 0;
      if (!this.hand.bids) return 0;
      return this.hand.bids[this.monitoredPlayer.id]
        ? this.hand.bids[this.monitoredPlayer.id]
        : 0;
    },
    monitoredPlayerTricks() {
      if (!this.hand) return 0;
      if (!this.hand.tricks) return 0;
      return this.hand.tricks[this.monitoredPlayer.id]
        ? this.hand.tricks[this.monitoredPlayer.id]
        : 0;
    },
  },
};
</script>

<style>
</style>