<template>
  <div
    v-if="isGameComplete"
    class="fixed overflow-hidden top-0 left-0 h-screen w-screen"
    role="alert"
  >
    <div
      class="absolute left-0 top-0 h-screen w-screen bg-black opacity-25"
    ></div>
    <div
      class="absolute top-1/2 left-1/2 pb-8 w-80 bg-white shadow-xl rounded transform -translate-x-1/2 -translate-y-1/2"
    >
      <div class="text-center p-4 text-red-700 font-bold">Game Complete!</div>

      <div
        v-for="(player, index) in rank"
        :key="player.name"
        :class="[
          'py-2 px-3 flex text-sm',
          { 'bg-yellow-400 text-xl font-bold': index == 0 },
          { 'bg-gray-200 text-lg': index == 1 },
        ]"
      >
        <div class="w-1/6 font-bold">#{{ index + 1 }}</div>
        <div class="w-3/6">{{ player.name }}</div>
        <div class="w-2/6 text-right">{{ player.score }}</div>
      </div>
      <div class="text-center px-20 mt-5">
        <router-link
          :to="{ name: 'Home' }"
          class="bg-blue-600 block hover:bg-blue-500 text-white uppercase p-3 rounded font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
          >Go to Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import gameState from "../store";

export default defineComponent({
  setup() {
    const isGameComplete = computed(() => gameState.isComplete);
    const playersList = computed(() => {
      if (gameState.playersList) {
        return gameState.playersList.map(({ name, score }) => ({
          name,
          score,
        }));
      } else {
        return [{ name: "", score: 0 }];
      }
    });
    const rank = computed(() =>
      playersList.value?.sort((a, b) => b.score - a.score)
    );
    return { isGameComplete, rank };
  },
});
</script>

<style>
</style>