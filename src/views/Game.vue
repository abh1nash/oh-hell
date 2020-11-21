<template>
  <div
    class="flex flex-col bg-gray-200 h-screen w-screen items-center justify-center"
  >
    <div v-if="players.length < playersCount" class="w-full md:w-1/4">
      <div class="text-gray-500 text-center">
        <div>Game {{ id }}</div>
        <div class="text-2xl text-gray-700">
          {{ players.length }} out of {{ playersCount }} players joined.
        </div>
        <div v-if="players.length > 0" class="w-full rounded bg-gray-100 mt-2">
          <div v-for="player in players" class="p-2" :key="player.id">
            {{ player.name }} joined.
          </div>
        </div>
      </div>
      <div v-if="!player" class="mt-5 text-center">
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
    <game-board v-else />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import GameBoard from "../components/GameBoard.vue";
export default {
  components: { GameBoard },
  props: {
    id: String,
  },
  data() {
    return {
      players: [],
      playersCount: 0,
      playerName: "",
    };
  },
  sockets: {
    gameExistence(game) {
      if (!game.exists) this.$router.push({ name: "Home" });
      else {
        if (game.players[game.requestId])
          this.setPlayer(game.players[game.requestId]);
        this.players = Object.values(game.players);
        this.playersCount = game.playersCount;
      }
    },
    playerJoin(player) {
      this.players.push(player);
    },
    joined({ id }) {
      this.setPlayer({ name: this.playerName, id });
    },
  },
  computed: {
    ...mapState({
      player: (state) => state.player,
    }),
  },
  methods: {
    ...mapActions({ setPlayer: "setPlayer" }),
    joinGame() {
      this.$socket.emit("joinGame", { name: this.playerName, gameId: this.id });
    },
  },
  created() {
    this.$socket.emit("gameExists", { id: this.id });
  },
  beforeDestroy() {
    let name, id;
    this.setPlayer({ name, id });
  },
};
</script>

<style>
</style>