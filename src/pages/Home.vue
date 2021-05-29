<template>
  <div class="flex items-center justify-center h-screen w-screen bg-gray-200">
    <div class="w-full md:w-1/4">
      <form @submit.prevent="createGame" class="text-center flex flex-col mx-3">
        <label for="name" class="text-xl text-gray-500">Your Name</label>
        <input
          v-model="gameDetails.name"
          type="text"
          class="text-2xl bg-white font-bold p-5 rounded"
        />
        <label for="players_count" class="text-xl text-gray-500 mt-4"
          >Number of Players</label
        >
        <select
          id="players_count"
          v-model.number="gameDetails.playersCount"
          class="text-2xl font-bold bg-white p-5 rounded"
        >
          <option v-for="option in 6" :value="option + 1" :key="option">
            {{ option + 1 }}
          </option>
        </select>
        <button
          :disabled="!gameDetails.name || !gameDetails.playersCount"
          class="bg-blue-600 hover:bg-blue-500 text-white mt-4 uppercase p-5 rounded text-2xl font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Create Game
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, inject } from "vue";
import { useRouter } from "vue-router";
import { Socket } from "socket.io-client";
export default defineComponent({
  setup() {
    const gameDetails = reactive({ name: "", playersCount: 0 });
    const socket = inject<Socket>("socket");
    const router = useRouter();

    const createGame = () => {
      let id: string | null = null;
      if (localStorage.getItem("pid")) id = localStorage.getItem("pid");
      socket?.emit("createGame", {
        playersCount: gameDetails.playersCount,
        initiator: { name: gameDetails.name, id },
      });
      socket?.on(
        "createdGame",
        (data: { playerId: string; gameId: number }) => {
          const pid = data.playerId;
          const gameId = data.gameId;
          router.push({ name: "Wait", params: { id: gameId } });
          localStorage.setItem("pid", pid);
        }
      );
    };
    return { gameDetails, createGame };
  },
});
</script>

<style>
</style>