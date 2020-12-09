<template>
  <div
    :class="[
      'card-image-container relative',
      name == 'hidden' ? 'hidden-card max-h-full' : 'h-24 w-16',
    ]"
  >
    <img
      :class="['card-image shadow-lg', { 'max-h-16': name == 'hidden' }]"
      :src="card"
    />
    <div
      @click="throwCard"
      v-if="
        !disableSelection && name != 'hidden' && !bidMode && turn == playerId
      "
      class="absolute cursor-pointer top-0 left-0 h-full w-full hover:bg-yellow-200 rounded-lg opacity-25"
    ></div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    name: { type: String, default: "hidden" },
    disableSelection: Boolean,
  },
  computed: {
    ...mapState({
      turn: (state) => state.game.turn,
      playerId: (state) => state.player.id,
      bidMode: (state) => state.game.bidding.isActive,
    }),
    card() {
      const images = require.context("../assets/images/cards", false, /\.png$/);
      if (this.name == "hidden") return images("./purple_back.png");
      return images(
        "./" +
          this.name
            .split("-")
            .reverse()
            .join("") +
          ".png"
      );
    },
  },
  methods: {
    ...mapActions({ setTurn: "changeTurn" }),
    throwCard() {
      this.setTurn("");
      this.$socket.emit("throwCard", { card: this.name });
    },
  },
};
</script>

<style lang="scss">
.card-image-container {
  height: 100%;
  width: 100%;
  max-width: 4.5rem;
  &.hidden-card:before {
    display: none;
  }
  &:not(.vertical-card):before {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 30%,
      rgba(0, 0, 0, 0.7)
    );
  }
  &:last-child {
    &:before {
      display: none;
    }
  }
}
</style>
