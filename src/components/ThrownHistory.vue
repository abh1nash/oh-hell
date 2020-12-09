<template>
  <div class="w-full h-8 ">
    <div
      v-if="Object.keys(thrownCards).length == playersList.length"
      class="w-full h-full bg-white flex"
    >
      <div
        class="w-1/6 h-full flex justify-center items-center text-xs uppercase"
      >
        <div class="history-text text-gray-500">Last Round</div>
      </div>
      <div class="w-10/12 h-full flex">
        <div
          v-for="player in playersList"
          :key="player.id"
          class="py-1 w-1/2 text-center self-center text-green-800"
        >
          <!-- {{ thrownCards[player.id] }} -->
          <div class="flex items-center justify-center">
            <card-icon :card="thrownCards[player.id].charAt(0)" :size="16" />
            <span
              class="font-bold"
              :style="{
                color:
                  thrownCards[player.id].charAt(0) == 'H' ||
                  thrownCards[player.id].charAt(0) == 'D'
                    ? '#B91C1C'
                    : 'black',
              }"
            >
              {{ cardName(thrownCards[player.id]) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CardIcon from "./TrumpCardIcon";
export default {
  components: { CardIcon },
  props: { throws: Object },
  data() {
    return {
      thrownCards: {},
    };
  },
  computed: {
    ...mapState({
      players: (state) => state.game.players,
    }),
    playersList() {
      return this.players ? Object.values(this.players) : [];
    },
  },
  methods: {
    cardName(card) {
      const faceCards = "JQKA".split("");
      let [_, value] = card.split("-");
      if (parseInt(value) > 10) return faceCards[parseInt(value) - 11];
      return value;
    },
  },
  watch: {
    throws: function(val) {
      if (Object.keys(val).length == this.playersList.length) {
        this.thrownCards = { ...val };
        console.log(val, this.thrownCards);
      }
    },
  },
};
</script>

<style></style>
