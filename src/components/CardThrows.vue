<template>
  <div
    class="show-area absolute h-72 w-32 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  >
    <div
      class="top-throw absolute top-0 left-0 transform -translate-y-5 w-full h-24 flex items-center justify-center"
    >
      <div
        v-if="isVisible(playerPositions[0])"
        class="w-1/2 flex h-full max-h-full"
      >
        <single-card
          :disableSelection="true"
          :name="thrownAt(playerPositions[0])"
          class="mx-auto"
        />
      </div>
      <div
        v-if="isVisible(playerPositions[1])"
        class="w-1/2 flex h-full max-h-full"
      >
        <single-card
          :disableSelection="true"
          :name="thrownAt(playerPositions[1])"
          class="mx-auto"
        />
      </div>
    </div>
    <div
      class="left-throw absolute top-0 -left-1/3 md:-left-1/2 h-full w-24 flex flex-wrap items-center justify-center"
    >
      <div
        v-if="isVisible(playerPositions[2])"
        class="flex h-1/4 w-full max-h-full"
      >
        <single-card
          :disableSelection="true"
          :name="thrownAt(playerPositions[2])"
          class="mx-auto"
        />
      </div>
      <div
        v-if="isVisible(playerPositions[3])"
        class="flex h-1/4 w-full max-h-full"
      >
        <single-card
          :disableSelection="true"
          :name="thrownAt(playerPositions[3])"
          class="mx-auto"
        />
      </div>
    </div>

    <div
      class="right-throw absolute top-0 -right-1/3 md:-right-1/2 h-full w-24 flex flex-wrap items-center justify-center"
    >
      <div
        v-if="isVisible(playerPositions[4])"
        class="flex h-1/4 w-full max-h-full"
      >
        <single-card
          :disableSelection="true"
          :name="thrownAt(playerPositions[4])"
          class="mx-auto"
        />
      </div>
      <div
        v-if="isVisible(playerPositions[5])"
        class="flex h-1/4 w-full max-h-full"
      >
        <single-card
          :disableSelection="true"
          :name="thrownAt(playerPositions[5])"
          class="mx-auto"
        />
      </div>
    </div>

    <div
      class="bottom-throw absolute -bottom-1/4 left-0 w-full h-24 flex items-center justify-center"
    >
      <div
        v-if="isVisible(playerPositions[6])"
        class="w-1/2 flex h-full max-h-full"
      >
        <single-card
          :disableSelection="true"
          :name="thrownAt(playerPositions[6])"
          class="mx-auto"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, inject } from "vue";
import { Socket } from "socket.io-client";
import gameState, { setGameOnHold } from "../store";
import usePlayerPosition from "../composables/usePlayerPosition";
import SingleCard from "./SingleCard.vue";

export default defineComponent({
  components: { SingleCard },
  setup() {
    const { getPlayer, playerPositions, isDisplayed } = usePlayerPosition();
    const throws = computed(() => gameState.thrownCards);
    const socket = inject<Socket>("socket");
    const gameId = computed(() => gameState.id);
    watch(throws, (newVal) => {
      newVal = { ...newVal };
      if (Object.keys(newVal).length == gameState.gameSize) {
        setGameOnHold();
        setTimeout(() => {
          if (socket) {
            socket.emit("checkGame", {
              requesterId: localStorage.getItem("pid") || socket.id,
              gameId: gameId.value || localStorage.getItem("gid"),
            });
          }
        }, 2000);
      }
    });
    const thrownAt = (position: string) => {
      return throws.value
        ? throws.value[getPlayer(position) as string]
        : undefined;
    };
    const isVisible = (position: string) => {
      return isDisplayed(position) && !!thrownAt(position);
    };

    return { thrownAt, isVisible, playerPositions };
  },
});
</script>


<style lang="scss">
.show-area {
  .card-image-container {
    width: auto;
    height: auto;
    .card-image {
      max-height: 5.5em;
      margin: 0;

      @media (min-width: 992px) {
        max-height: 6.5em;
      }
    }
  }
}
</style>