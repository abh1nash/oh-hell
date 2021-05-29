<template>
  <div class="h-full w-full bg-green-600 flex items-center justify-center">
    <div class="game-area">
      <div class="h-14 w-full bg-green-300 flex">
        <div
          class="font-bold text-green-700 text-center bg-white uppercase w-1/6 justify-center flex"
        >
          <div class="self-center">
            <span class="text-xs">Trump</span>
            <div class="block text-center">
              <card-icon :card="trump" class="mx-auto" />
            </div>
          </div>
        </div>
        <div v-if="playersList" class="w-10/12 h-full flex">
          <div
            v-for="(player, index) in playersList"
            :key="index"
            class="py-1 w-1/2 text-center self-center text-green-800"
          >
            <div class="text-xs">{{ player.name }}</div>
            <div class="font-bold text-sm">{{ player.score }}</div>
          </div>
        </div>
      </div>
      <thrown-history></thrown-history>
      <game-stage></game-stage>
    </div>
    <bid-options></bid-options>
    <winner-announce></winner-announce>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import gameState from "../store";
import CardIcon from "./CardIcon.vue";
import GameStage from "./GameStage.vue";
import BidOptions from "./BidOptions.vue";
import ThrownHistory from "./ThrownHistory.vue";
import WinnerAnnounce from "./WinnerAnnounce.vue";

export default defineComponent({
  components: {
    CardIcon,
    GameStage,
    BidOptions,
    WinnerAnnounce,
    ThrownHistory,
  },
  setup() {
    const playersList = computed(() => gameState.playersList);
    const trump = computed(() => gameState.trump);
    return { playersList, trump };
  },
});
</script>

<style lang="scss">
.game-area {
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  max-height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    height: 768px;
    width: 700px;
  }

  .player-cards {
    // position: absolute;
    // bottom: 0;
    height: 150px;
    width: 100%;
    margin: 0 auto;
    @media (min-width: 992px) {
      height: 180px;
    }
  }
}
</style>