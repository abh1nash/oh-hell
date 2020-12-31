<template>
  <div class="relative">
    <div class="top top-0 left-0 w-full h-24 absolute flex justify-center pt-4">
      <div
        v-if="isDisplayablePosition(playerPositions[0])"
        class="w-24 md:w-48 max-h-12"
      >
        <player-position :position="playerPositions[0]" />
      </div>
      <div
        v-if="isDisplayablePosition(playerPositions[1])"
        class="w-24 md:w-48 max-h-12"
      >
        <player-position :position="playerPositions[1]" />
      </div>
    </div>
    <div
      class="left top-0 left-0 h-full w-36 md:w-48 absolute flex flex-col justify-center items-start"
    >
      <div
        v-if="isDisplayablePosition(playerPositions[2])"
        class="w-2/3 md:w-full h-1/4 relative flex justify-center items-center"
      >
        <player-position :position="playerPositions[2]" class="" />
      </div>
      <div
        v-if="isDisplayablePosition(playerPositions[3])"
        class="w-2/3 md:w-full h-1/4 flex justify-center items-center"
      >
        <player-position :position="playerPositions[3]" />
      </div>
    </div>
    <div
      class="left top-0 right-0 h-full w-36 md:w-48 absolute flex flex-col justify-center items-end"
    >
      <div
        v-if="isDisplayablePosition(playerPositions[4])"
        class="w-2/3 md:w-full h-1/4 relative flex justify-center items-center"
      >
        <player-position right :position="playerPositions[4]" />
      </div>
      <div
        v-if="isDisplayablePosition(playerPositions[5])"
        class="w-2/3 md:w-full h-1/4 flex justify-center items-center"
      >
        <player-position right :position="playerPositions[5]" />
      </div>
    </div>
    <div
      class="show-area absolute h-72 w-36 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <div
        class="top-throw absolute top-0 left-0 w-full h-24 flex items-center justify-center"
      >
        <div
          v-if="isDisplayablePosition(playerPositions[0])"
          class="w-1/2 flex h-full max-h-full"
        >
          <single-card
            v-if="thrownCardsAt(playerPositions[0])"
            :disableSelection="true"
            :name="thrownCardsAt(playerPositions[0])"
            class="mx-auto"
          />
        </div>
        <div
          v-if="isDisplayablePosition(playerPositions[1])"
          class="w-1/2 flex h-full max-h-full"
        >
          <single-card
            v-if="thrownCardsAt(playerPositions[1])"
            :disableSelection="true"
            :name="thrownCardsAt(playerPositions[1])"
            class="mx-auto"
          />
        </div>
      </div>
      <div
        class="left-throw absolute top-0 -left-1/3 md:-left-1/2 h-full w-24 flex flex-wrap items-center justify-center"
      >
        <div
          v-if="isDisplayablePosition(playerPositions[2])"
          class="flex h-1/4 w-full max-h-full"
        >
          <single-card
            v-if="thrownCardsAt(playerPositions[2])"
            :disableSelection="true"
            :name="thrownCardsAt(playerPositions[2])"
            class="mx-auto"
          />
        </div>
        <div
          v-if="isDisplayablePosition(playerPositions[3])"
          class="flex h-1/4 w-full max-h-full"
        >
          <single-card
            v-if="thrownCardsAt(playerPositions[3])"
            :disableSelection="true"
            :name="thrownCardsAt(playerPositions[3])"
            class="mx-auto"
          />
        </div>
      </div>

      <div
        class="right-throw absolute top-0 -right-1/3 md:-right-1/2 h-full w-24 flex flex-wrap items-center justify-center"
      >
        <div
          v-if="isDisplayablePosition(playerPositions[4])"
          class="flex h-1/4 w-full max-h-full"
        >
          <single-card
            v-if="thrownCardsAt(playerPositions[4])"
            :disableSelection="true"
            :name="thrownCardsAt(playerPositions[4])"
            class="mx-auto"
          />
        </div>
        <div
          v-if="isDisplayablePosition(playerPositions[5])"
          class="flex h-1/4 w-full max-h-full"
        >
          <single-card
            v-if="thrownCardsAt(playerPositions[5])"
            :disableSelection="true"
            :name="thrownCardsAt(playerPositions[5])"
            class="mx-auto"
          />
        </div>
      </div>

      <div
        class="bottom-throw absolute -bottom-1/4 left-0 w-full h-24 flex items-center justify-center"
      >
        <div class="w-1/2 flex h-full max-h-full">
          <single-card
            v-if="thrownCardsAt(playerPositions[6])"
            :disableSelection="true"
            :name="thrownCardsAt(playerPositions[6])"
            class="mx-auto"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PlayerPosition from "./PlayerPosition.vue";
import SingleCard from "./SingleCard.vue";
export default {
  components: { PlayerPosition, SingleCard },
  data() {
    return {
      playerPositions: [
        "4/5 5/7", //top right
        "2/2 3/4 3/5 4/6 4/7", //top left
        
        "3/6 3/7", //left bottom
        "2/3 2/4 2/6 2/7", //left top
        
        "6/6 7/7", //right bottom
        "3/3 4/4 5/5 5/6 6/7", //right top
        
        "1/2 1/3 1/4 1/5 1/6 1/7", //current player
      ],
    };
  },
  sockets: {
    thrownCards({ thrownCards }) {
      // if (Object.keys(thrownCards).length < 1) {
      //   this.$set(this, "thrownCards", {});
      //   return;
      // }
      // Object.entries(thrownCards).forEach((entry) => {
      //   this.$set(this.thrownCards, entry[0], entry[1]);
      // });
      this.setThrownCards(thrownCards);
    },
  },
  computed: {
    ...mapState({
      thrownCards: (state) => state.game.thrownCards || {},
      players: (state) => state.game.players,
      turnList: (state) => state.game.turns,
    }),
  },
  methods: {
    ...mapActions({ setThrownCards: "setThrownCards" }),
    isDisplayablePosition(positionString) {
      // position string denotes the position of
      // a player out of total number of players
      // eg: 2/3 means 2nd player in a 3 player game
      let flag = false;
      let positions = positionString.split(" ");
      positions.forEach((position) => {
        // extract the last digit from position
        // string and check if that is equal to
        // the current players count
        if (
          this.players &&
          Object.keys(this.players).length == parseInt(position.split("/")[1])
        )
          flag = true;
      });
      return flag;
    },
    thrownCardsAt(positionString) {
      if (this.isDisplayablePosition(positionString)) {
        let playerIndex =
          parseInt(
            positionString
              .split(" ")
              .filter(
                (position) =>
                  position.charAt(2) == Object.keys(this.players).length
              )[0]
              .charAt(0)
          ) - 1; //extracting player position from position string

        return this.thrownCards[this.turnList[playerIndex]];
      }
      return null;
    },
  },
};
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
