<template>
  <div class="relative flex-grow flex-shrink px-3">
    <div class="top top-0 w-full left-0 h-24 absolute flex justify-center pt-3">
      <div v-if="isDisplayed(playerPositions[0])" class="w-28 md:w-48 max-h-12">
        <player-cards
          :player="getPlayer(playerPositions[0])"
          top
        ></player-cards>
      </div>
      <div v-if="isDisplayed(playerPositions[1])" class="w-28 md:w-48 max-h-12">
        <player-cards
          :player="getPlayer(playerPositions[1])"
          top
        ></player-cards>
      </div>
    </div>

    <div
      class="left top-0 left-0 h-full w-32 md:w-40 absolute flex flex-col justify-center items-start"
    >
      <div
        v-if="isDisplayed(playerPositions[2])"
        class="w-2/3 md:w-full h-1/4 relative flex justify-center items-center"
      >
        <player-cards
          :player="getPlayer(playerPositions[2])"
          left
        ></player-cards>
      </div>
      <div
        v-if="isDisplayed(playerPositions[3])"
        class="w-2/3 md:w-full h-1/4 relative flex justify-center items-center"
      >
        <player-cards
          :player="getPlayer(playerPositions[3])"
          left
        ></player-cards>
      </div>
    </div>

    <div
      class="right top-0 right-0 h-full w-24 md:w-36 absolute flex flex-col justify-center items-end"
    >
      <div
        v-if="isDisplayed(playerPositions[4])"
        class="w-2/3 md:w-full h-1/4 relative flex justify-center items-center"
      >
        <player-cards
          :player="getPlayer(playerPositions[4])"
          right
        ></player-cards>
      </div>
      <div
        v-if="isDisplayed(playerPositions[5])"
        class="w-2/3 md:w-full h-1/4 relative flex justify-center items-center"
      >
        <player-cards
          :player="getPlayer(playerPositions[5])"
          right
        ></player-cards>
      </div>
    </div>
    <card-throws></card-throws>
  </div>
  <div class="h-36 -mt-10">
    <player-cards :player="getPlayer(playerPositions[6])" bottom></player-cards>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import PlayerCards from "./PlayerCards.vue";
import CardThrows from "./CardThrows.vue";
import usePlayerPosition from "../composables/usePlayerPosition";

export default defineComponent({
  components: { PlayerCards, CardThrows },
  setup() {
    const { isDisplayed, getPlayer, playerPositions } = usePlayerPosition();
    return { isDisplayed, getPlayer, playerPositions };
  },
});
</script>

<style>
</style>