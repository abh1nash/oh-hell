<template>
  <div :class="['flex px-1 justify-center pl-5']">
    <single-card
      v-for="card in sortedCards"
      :disableSelection="
        disableSelection || typeof card == 'number' ? false : !isThrowable(card)
      "
      :name="card"
      :key="card"
      :class="['-ml-6']"
    ></single-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, PropType } from "vue";
import SingleCard from "./SingleCard.vue";
import gameState from "../store";

export default defineComponent({
  components: { SingleCard },
  props: {
    cards: {
      type: [Array, Number] as PropType<readonly string[] | number>,
      required: true,
    },
    disableSelection: { type: Boolean as PropType<boolean> },
    throwable: Array as PropType<readonly string[]>,
  },

  setup(props) {
    const { cards, disableSelection, throwable } = toRefs(props);

    const sortedCards = computed(() => {
      if (typeof cards.value == "number") {
        return Array(cards.value).fill("hidden");
      }
      return [...cards.value].sort().sort((a, b) => {
        let aVal = a.split("-");
        let bVal = b.split("-");
        if (aVal[0] != bVal[0]) return 0;
        return parseInt(aVal[1]) - parseInt(bVal[1]);
      });
    });

    const isGameOnHold = computed(() => gameState.onHold);
    const isThrowable = (card: string) => {
      if (isGameOnHold.value) return false;
      return throwable?.value?.includes(card);
    };

    return { sortedCards, isThrowable, disableSelection };
  },
});
</script>

