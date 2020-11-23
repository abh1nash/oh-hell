<template>
  <div
    :class="[
      'flex px-1 justify-center',
      vertical ? 'flex-col mt-10 max-h-full' : 'ml-8',
    ]"
  >
    <single-card
      v-for="card in sortedCards"
      :disableSelection="!isThrowable(card)"
      :name="typeof card == 'string' ? card : undefined"
      :key="card"
      :class="[vertical ? '-mt-14 vertical-card' : '-ml-6']"
    />
  </div>
</template>

<script>
import SingleCard from "./SingleCard";
export default {
  components: { SingleCard },
  props: {
    cards: { type: [Array, Number] },
    vertical: Boolean,
    throwable: Array,
  },
  computed: {
    sortedCards() {
      if (typeof this.cards == "object") {
        return this.cards.sort().sort((a, b) => {
          let aVal = a.split("-");
          let bVal = b.split("-");
          if (aVal[0] != bVal[0]) return 0;
          return parseInt(aVal[1]) - parseInt(bVal[1]);
        });
      }
      return this.cards;
    },
  },
  methods: {
    isThrowable(card) {
      return typeof card == "string" ? this.throwable.includes(card) : false;
    },
  },
};
</script>

