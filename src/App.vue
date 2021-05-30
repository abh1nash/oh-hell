<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, provide, reactive } from "vue";
import { io } from "socket.io-client";
import { setGameData } from "./store";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "App",
  components: {},
  setup() {
    const socketURL = import.meta.env.VITE_SOCKET_URL;
    const connection = io(socketURL as string);
    provide("socket", connection);

    connection.on("gameState", ({ data }) => {
      setGameData(reactive(data));
      localStorage.setItem("gid", data.id);
      localStorage.setItem("pid", data.currentUser.id);
    });

    connection.on("gameEvent", () => {
      connection.emit("checkGame", {
        gameId: localStorage.getItem("gid"),
        requesterId: localStorage.getItem("pid"),
      });
    });
    const router = useRouter();
    connection.on("invalid", () => {
      router.push({ name: "Home" });
    });
  },
});
</script>
