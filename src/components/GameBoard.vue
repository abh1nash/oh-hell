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
            <div class="text-xs">{{ player.name }}</div>
            <div class="font-bold text-sm">{{ player.score }}</div>
          </div>
        </div>
      </div>
      <thrown-history :throws="thrownCards"/>
      <play-area class="flex-grow flex-shrink" />
      <div class="player-cards">
        <div
          v-if="
            turn == playerId &&
            !gameComplete &&
            !!thrownCards &&
            !thrownCards[playerId]
          "
          class="text-center text-white animate-ping-slow font-bold uppercase opacity absolute left-1/2 -mt-10 -ml-12"
        >
          Your Turn
        </div>
        <div class="w-full h-2 mb-5 mx-auto text-center text-white block">
          <span>{{ currentPlayer.name }}</span>
          <span
            class="rounded inline p-1 pr-2 ml-1 bg-white text-green-700 font-bold"
          >
            {{
              hand && hand.tricks && hand.tricks[currentPlayer.id]
                ? hand.tricks[currentPlayer.id]
                : 0
            }}/{{
              hand && hand.bids && hand.bids[currentPlayer.id]
                ? hand.bids[currentPlayer.id]
                : 0
            }}
          </span>
        </div>
        <cards-container
          :cards="cards"
          :throwable="throwable"
          :disableSelection="!!thrownCards && !!thrownCards[playerId]"
        />
      </div>
      <div v-if="isBiddingTurn && !gameComplete" class="fixed left-0 top-0">
        <bid-options />
      </div>
      <div v-if="gameComplete" class="fixed left-0 top-0 z-10">
        <winner-announce />
      </div>
    </div>
  </div>
</template>

<script>
import BidOptions from "./BidOptions";
import WinnerAnnounce from "./WinnerAnnounce";
import CardsContainer from "./CardsContainer";
import TrumpCardIcon from "./TrumpCardIcon";
import PlayArea from "./PlayArea";
import { mapActions, mapState, mapGetters } from "vuex";
import ThrownHistory from './ThrownHistory.vue';
export default {
  components: {
    CardsContainer,
    TrumpCardIcon,
    PlayArea,
    BidOptions,
    WinnerAnnounce,
    ThrownHistory
  },
  props: { gameId: String },
  data() {
    return {
      throwable: [],
      gameComplete: false,
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
    roundComplete({ tricks }) {
      this.setPlayerTricks(tricks);
    },
    handComplete() {
      setTimeout(() => {
        this.setPlayerTricks({});

        this.$socket.emit("gameStart", { gameId: this.gameId });
      }, 2000);
    },
    gameComplete() {
      this.gameComplete = true;
    },
  },
  computed: {
    ...mapState({
      cards: (state) => state.game.cardsCurrent,
      bidding: (state) => (state.bidding ? state.bidding.isActive : null),
      trump: (state) => (state.game.hand ? state.game.hand.trump : null),
      hand: (state) => state.game.hand,
      thrownCards: (state) => state.game.thrownCards,
      players: (state) => state.game.players,
      turn: (state) => state.game.turn,
      playerId: (state) => state.player.id,
      currentPlayer: (state) => state.player,
    }),
    ...mapGetters({ isBiddingTurn: "isBiddingTurn" }),
    playersList() {
      return this.players ? Object.values(this.players) : [];
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
      setPlayerTricks: "setPlayerTricks",
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
    height: 150px;
    width: 100%;
    margin: 0 auto;
    @media (min-width: 992px) {
      height: 180px;
    }
  }
}
</style>
