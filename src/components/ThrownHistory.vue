<template>
  <div class="throw-history w-full h-8">
    <div v-if="showHistory" class="w-full h-full bg-white flex">
      <div
        class="w-1/6 h-full flex justify-center items-center text-xs uppercase"
      >
        <div
          class="text-gray-500 text-center"
          style="font-size: 0.8em; line-height: 1"
        >
          Throws
        </div>
      </div>
      <div class="w-10/12 h-full flex">
        <div
          v-for="player in playersList"
          :key="player"
          class="py-1 w-1/2 text-center self-center text-green-800"
        >
          <!-- {{ thrownCards[player.id] }} -->
          <div class="flex items-center justify-center">
            <card-icon :card="lastThrownCards[player].charAt(0)" :size="16" />
            <span
              class="font-bold"
              :style="{
                color:
                  lastThrownCards[player].charAt(0) == 'H' ||
                  lastThrownCards[player].charAt(0) == 'D'
                    ? '#B91C1C'
                    : 'black',
              }"
            >
              {{ cardName(lastThrownCards[player]) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch, reactive } from "vue";
import gameState from "../store";
import CardIcon from "./CardIcon.vue";

export default defineComponent({
  components: { CardIcon },
  setup() {
    const playersList = computed(() =>
      !!gameState.playersList
        ? gameState.playersList.map((player) => player.id)
        : [""]
    );

    const thrownCards = computed(() => gameState.thrownCards || {});
    let lastThrownCards = reactive({});
    watch(thrownCards, (newValue) => {
      if (Object.values(newValue).length == playersList.value.length) {
        for (let player in newValue) {
          lastThrownCards[player] = newValue[player];
        }
      }
    });

    const showHistory = computed(
      () => Object.keys(lastThrownCards).length == playersList.value.length
    );

    const cardName = (card) => {
      const faceCards = "JQKA".split("");
      let [_, value] = card.split("-");
      if (parseInt(value) > 10) return faceCards[parseInt(value) - 11];
      return value;
    };

    return { showHistory, cardName, lastThrownCards, playersList };
  },
});
</script>

<style>
</style>