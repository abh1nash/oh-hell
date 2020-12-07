<template>
  <div
    class="flex flex-col bg-gray-200 h-screen w-screen items-center justify-center"
  >
    <game-board
      :gameId="gameId"
      v-if="!loading && players.length == playersCount"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import GameBoard from "../components/GameBoard.vue";
export default {
  components: { GameBoard },
  props: {
    gameId: String,
  },
  data() {
    return {
      loading: true,
      players: [],
      playersCount: 0,
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
        this.loading = false;
      }
    },
  },
  computed: {
    ...mapState({
      player: (state) => state.player,
    }),
  },
  methods: {
    ...mapActions({
      setPlayer: "setPlayer",
      setGame: "setGame",
      resetGame: "resetGame",
    }),
  },
  created() {
    this.$socket.emit("gameExists", { id: this.gameId });
  },
  beforeDestroy() {
    let name, id;
    this.setPlayer({ name, id });
    this.resetGame();
  },
};
</script>

<style>
</style>