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
        !disableSelection &&
        name != 'hidden' &&
        !isBiddingActive &&
        turnOf == playerId
      "
      class="absolute cursor-pointer top-0 left-0 h-full w-full hover:bg-yellow-200 rounded-lg opacity-25"
    ></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs, inject } from "vue";
import { Socket } from "socket.io-client";
import state from "../store";
export default defineComponent({
  props: {
    name: { type: String as PropType<string>, default: "hidden" },
    disableSelection: Boolean as PropType<boolean>,
  },
  setup(props) {
    const { name, disableSelection } = toRefs(props);
    const playerId = computed(() => state?.currentUser?.id);
    const turnOf = computed(() => state?.turnOf);
    const isBiddingActive = computed(() => state?.isBiddingActive);
    const card = computed(() => {
      const folder = "../assets/images/cards/";
      const images = import.meta.globEager("../assets/images/cards/*.png");
      if (name.value == "hidden")
        return images[folder + "purple_back.png"].default;
      return images[folder + name.value.split("-").reverse().join("") + ".png"]
        .default;
    });

    const socket = inject<Socket>("socket");
    const throwCard = () => {
      if (socket) {
        socket.emit("throwCard", {
          gameId: state.id,
          playerId: state.currentUser?.id || localStorage.getItem("pid"),
          card: name.value,
        });
      }
    };
    return {
      name,
      card,
      disableSelection,
      throwCard,
      playerId,
      turnOf,
      isBiddingActive,
    };
  },
});
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
