<template>
  <div
    class="flex flex-col bg-gray-200 h-screen w-screen items-center justify-center"
  >
    <game-board></game-board>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, inject } from "vue";
import { useRouter } from "vue-router";
import { Socket } from "socket.io-client";
import GameBoard from "../components/GameBoard.vue";
export default defineComponent({
  components: { GameBoard },
  props: { id: { type: String as PropType<string>, required: true } },
  setup({ id }) {
    const router = useRouter();
    const socket = inject<Socket>("socket");
    if (!id) router.push({ name: "Home" });
    const requesterId = localStorage.getItem("pid")
      ? localStorage.getItem("pid")
      : socket?.id;
    if (socket) {
      socket.emit("checkGame", {
        requesterId: requesterId,
        gameId: parseInt(id),
      });
    }
  },
});
</script>

<style>
</style>