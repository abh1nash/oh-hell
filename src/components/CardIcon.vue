<template>
  <component
    :is="cardIcon"
    :size="size || 24"
    weight="fill"
    :color="card == 'H' || card == 'D' ? '#B91C1C' : 'black'"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PhX, PhHeartStraight, PhClub, PhSpade, PhDiamond } from "phosphor-vue";
export default defineComponent({
  props: { card: String, size: Number },
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
});
</script>