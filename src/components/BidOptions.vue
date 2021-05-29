<template>
  <div
    v-if="isBiddingTurn"
    class="fixed overflow-hidden top-0 left-0 h-screen w-screen"
  >
    <div
      class="absolute left-0 top-0 h-screen w-screen bg-black opacity-25"
    ></div>
    <div
      class="absolute top-1/2 left-1/2 h-64 w-64 bg-white shadow-xl rounded transform -translate-x-1/2 -translate-y-1/2"
    >
      <div class="text-center p-4 font-bold">Select your bid</div>
      <div class="grid grid-cols-4 px-2">
        <button
          :disabled="!isAvailableBid(index)"
          @click="setBid(index)"
          class="col-auto p-2 text-center font-bold hover:bg-blue-500 hover:text-white rounded disabled:text-gray-500 disabled:opacity-25 disabled:cursor-not-allowed"
          v-for="(_, index) in bidValues"
          :key="index"
        >
          {{ index }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from "@vue/runtime-core";
import { Socket } from "socket.io-client";
import gameState from "../store";

export default defineComponent({
  setup() {
    const bidValues = computed(() => (gameState.handCardsCount || 0) + 1);
    const unavailableBids = computed(
      () => gameState.currentUser?.unavailableBids
    );
    const isAvailableBid = (value) =>
      unavailableBids.value ? !unavailableBids.value.includes(value) : true;

    const isBiddingTurn = computed(() => {
      return (
        gameState.isBiddingActive &&
        gameState.turnOf == localStorage.getItem("pid")
      );
    });

    const socket = inject<Socket>("socket");

    const setBid = (value) => {
      if (socket) {
        socket.emit("setBid", {
          gameId: gameState.id,
          playerId: localStorage.getItem("pid") || socket.id,
          bid: value,
        });
      }
    };

    return { isBiddingTurn, isAvailableBid, setBid, bidValues };
  },
});
</script>

<style>
</style>