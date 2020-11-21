<template>
  <component
    :is="cardIcon"
    size="24"
    weight="fill"
    :color="card == 'H' || card == 'D' ? '#B91C1C' : 'black'"
  />
</template>

<script>
import { PhX, PhHeartStraight, PhClub, PhSpade, PhDiamond } from "phosphor-vue";
export default {
  props: { card: String },
  computed: {
    cardIcon() {
      switch (this.card) {
        case "H":
          return PhHeartStraight;
        case "C":
          return PhClub;
        case "D":
          return PhDiamond;
        case "S":
          return PhSpade;
        default:
          return PhX;
      }
    },
  },
};
</script>

<style>
</style>