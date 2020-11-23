<template>
  <div class="overflow-hidden top-0 left-0 relative h-screen w-screen">
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

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      unavailableBids: [],
    };
  },
  sockets: {
    unavailableBids({ unavailable }) {
      this.unavailableBids = unavailable;
    },
  },
  computed: {
    ...mapState({
      cardsCurrent: (state) => state.game.cardsCurrent,
      gameId: (state) => state.game.id,
      playerId: (state) => state.player.id,
    }),
    bidValues() {
      return this.cardsCurrent
        ? Array(this.cardsCurrent.length + 1).fill(0)
        : [];
    },
  },
  methods: {
    isAvailableBid(value) {
      return this.unavailableBids
        ? !this.unavailableBids.includes(value)
        : true;
    },
    setBid(value) {
      if (!this.isAvailableBid(value)) return;
      this.$socket.emit("setBid", {
        gameId: this.gameId,
        bid: value,
      });
    },
  },
  mounted() {
    this.$socket.emit("checkUnavailableBids");
  },
};
</script>

<style>
</style>