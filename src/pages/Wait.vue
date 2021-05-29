<template>
  <div
    class="flex flex-col bg-gray-200 h-screen w-screen items-center justify-center"
  >
    <div class="w-full md:w-1/4">
      <div class="text-gray-500 text-center">
        <div>Game #{{ id }}</div>
        <div class="text-2xl text-gray-700">
          {{ playersList.length }} out of {{ playersCount }} players joined.
        </div>
        <div
          v-if="playersList.length > 0"
          class="w-full rounded bg-gray-100 mt-2"
        >
          <div v-for="player in playersList" class="p-2" :key="player.id">
            {{ player.name }} joined.
          </div>
        </div>
      </div>
      <div v-if="!isCurrentUserJoined" class="mt-5 text-center">
        <form @submit.prevent="joinGame" class="flex flex-col mx-3">
          <label for="join_name" class="text-xl text-gray-500">Your Name</label>
          <input
            v-model="playerName"
            type="text"
            class="bg-white p-3 text-xl font-bold"
            id="join_name"
          />
          <button
            type="submit"
            :disabled="!playerName"
            class="bg-blue-600 w-full hover:bg-blue-500 text-white mt-4 uppercase p-3 rounded text-lg font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Join Game
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType, computed, watch, ref } from "vue";
import { useRouter } from "vue-router";
import { Socket } from "socket.io-client";
import state from "../store";
export default defineComponent({
  props: {
    id: { type: String as PropType<string>, required: true },
  },
  setup({ id }) {
    const router = useRouter();
    if (!id) router.push({ name: "Home" });

    const socket = inject<Socket>("socket");
    const requester = localStorage.getItem("pid") || undefined;
    if (socket) {
      socket.emit("checkGame", {
        requesterId: requester || socket.id,
        gameId: id,
      });
    }
    const playersList = computed(() => state.playersList || []);
    const playersCount = computed(() => state.gameSize || 0);
    const isCurrentUserJoined = computed(() => {
      const filter =
        state.playersList && state.currentUser
          ? state.playersList.filter(
              (player) => player.id == state.currentUser?.id
            )
          : [];
      return filter.length > 0;
    });
    const playerName = ref<string>();

    const joinGame = () => {
      socket?.emit("joinGame", {
        gameId: id,
        playerId: requester || socket.id,
        name: playerName.value,
      });
    };

    watch(state, (value) => {
      if (value.isReady) router.push({ name: "Game", params: { id } });
    });
    return {
      playerName,
      playersList,
      playersCount,
      isCurrentUserJoined,
      joinGame,
    };
  },
});
</script>

<style>
</style>