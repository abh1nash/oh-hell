<template>
  <div class="h-full w-full bg-green-600 flex items-center justify-center">
    <div class="game-area">
      <div class="h-20 w-full bg-green-300 flex">
        <div
          class="font-bold text-green-700 text-center bg-white uppercase w-1/6 justify-center flex"
        >
          <div class="self-center">
            <span class="text-xs">Trump</span>
            <div class="block text-center">
              <trump-card-icon :card="trump" class="mx-auto" />
            </div>
          </div>
        </div>
        <div class="w-10/12 h-full flex">
          <div
            v-for="player in playersList"
            :key="player.id"
            class="py-1 w-1/2 text-center self-center text-green-800"
          >
            <div class="text-xs">{{ truncateName(player.name) }}</div>
            <div class="font-bold text-sm">{{ player.score }}</div>
          </div>
        </div>
      </div>
      <play-area class="flex-grow flex-shrink" />
      <div class="player-cards">
        <cards-container :cards="cards" :throwable="throwable" />
      </div>
      <div v-if="isBiddingTurn" class="fixed left-0 top-0">
        <bid-options />
      </div>
    </div>
  </div>
</template>

<script>
import BidOptions from "./BidOptions";
import CardsContainer from "./CardsContainer";
import TrumpCardIcon from "./TrumpCardIcon";
import PlayArea from "./PlayArea";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  components: { CardsContainer, TrumpCardIcon, PlayArea, BidOptions },
  props: { gameId: String },
  data() {
    return {
      throwable: [],
    };
  },
  sockets: {
    startBid({ startFrom, turns, cards, trump }) {
      this.setGameTurns({ startFrom, turns });
      this.setBidStatus(true);
      this.setTrump(trump);
    },
    dealtCards({ cards }) {
      this.setNewHand({ cards });
    },
    changeTurn({ turn }) {
      this.setTurn(turn);
      this.getThrowableCards();
    },
    biddingComplete() {
      this.setBidStatus(false);
    },
    playerBids({ bids }) {
      this.setHandBids(bids);
    },
    playersInfo({ players }) {
      this.setPlayersInfo(players);
    },
    throwableCards({ throwable }) {
      this.throwable = throwable;
    },
  },
  computed: {
    ...mapState({
      cards: (state) => state.game.cardsCurrent,
      bidding: (state) => (state.bidding ? state.bidding.isActive : null),
      trump: (state) => (state.game.hand ? state.game.hand.trump : null),
      players: (state) => state.game.players,
      turn: (state) => state.game.turn,
      playerId: (state) => state.player.id,
    }),
    ...mapGetters({ isBiddingTurn: "isBiddingTurn" }),
    playersList() {
      return Object.values(this.players);
    },
  },
  methods: {
    ...mapActions({
      setGameTurns: "setGameTurns",
      setNewHand: "setNewHand",
      setBidStatus: "setBidStatus",
      setTurn: "changeTurn",
      setHandBids: "setHandBids",
      setTrump: "setTrump",
      setPlayersInfo: "setPlayersInfo",
    }),
    truncateName(name) {
      let truncatedName = name;
      if (this.playersList.length > 4) {
        truncatedName =
          truncatedName.length > this.playersList.length - 4
            ? truncatedName.substring(0, this.playersLength - 4) + "..."
            : truncatedName;
      }
      return truncatedName;
    },
    getThrowableCards() {
      if (!this.bidding && this.turn == this.playerId) {
        this.$socket.emit("getThrowableCards", { gameId: this.gameId });
      }
    },
  },
  mounted() {
    this.$socket.emit("gameStart", { gameId: this.gameId });
    this.$socket.emit("gamePlayers", { gameId: this.gameId });
  },
};
</script>

<style lang="scss">
.game-area {
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  max-height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    height: 768px;
    width: 700px;
  }

  .player-cards {
    // position: absolute;
    // bottom: 0;
    height: 200px;
    width: 100%;
    margin: 0 auto;
    @media (min-width: 992px) {
      height: 180px;
    }
  }
}
</style>