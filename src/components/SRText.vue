<template>
  <div class="sr-only" role="status">
    Game #{{ gameId }}
    <br />
    Current mode: {{ isBiddingActive ? "Bidding" : "Playing" }}
    <ul>
      <li v-for="player in playersList" :key="player.id">
        {{ player.name }} has scored {{ player.score }} point{{
          player.score == 1 ? "" : "s"
        }}.
      </li>
    </ul>
    <span>Current trump is {{ trump }}.</span>
    <span v-if="cardsOnHand">
      You have the following cards:
      <ul>
        <li v-for="card in cardsOnHand" :key="card">
          {{ cardName(card) }}
          <button
            :disabled="
              isBiddingActive ||
              !currentUser?.throwable ||
              !currentUser?.throwable?.includes(card)
            "
            @click="throwCard(card)"
          >
            Throw
          </button>
        </li>
      </ul>
    </span>
    <ul>
      <li v-for="player in [...thrownCards]" :key="player.id">
        {{ player.name }} has thrown {{ cardName(player.card) }}.
      </li>
    </ul>
    <span v-if="Object.keys(lastThrownCards).length > 1">
      Last round throws:
      <ul>
        <li v-for="item in lastThrownCards" :key="item">
          {{ item.name }}:
          {{ cardName(item.card) }}
        </li>
      </ul>
    </span>
    <ul>
      <li v-for="player in playersList" :key="player.id">
        {{ player.name }} bid status: {{ player.stats.bid }} bids,
        {{ player.stats.tricks }} tricks
      </li>
    </ul>
  </div>
  <div
    class="sr-only turn"
    v-if="turnOf?.id == currentUser?.id && !isBiddingActive"
    role="alert"
  >
    Its your turn to throw card, {{ currentUser?.name }}.
  </div>
  <div class="sr-only" v-else role="status">
    Current turn of {{ turnOf?.name }}.
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, watch } from "@vue/runtime-core";
import { Socket } from "socket.io-client";
import gameState from "../store";

export default defineComponent({
  setup() {
    const gameId = computed(() => gameState.id);
    const playersList = computed(() => gameState.playersList || []);
    const currentUser = computed(() => gameState.currentUser);
    const cardsOnHand = computed(() => {
      if (gameState.currentUser?.isInGame) {
        const handCards = playersList.value?.filter(
          (player) => player.id == currentUser.value?.id
        )[0].cards;
        return handCards && typeof handCards != "number"
          ? [...handCards].sort().sort((a, b) => {
              let aVal = a.split("-");
              let bVal = b.split("-");
              if (aVal[0] != bVal[0]) return 0;
              return parseInt(aVal[1]) - parseInt(bVal[1]);
            })
          : Array(cardsOnHand).fill("hidden");
      }
      return undefined;
    });
    const isBiddingActive = computed(() => gameState.isBiddingActive);

    const cardName = (card?: string) => {
      if (!card) return;
      const faceCards = "Jack,Queen,King,Ace".split(",");
      let cardType = "";
      let cardValue = card.split("-")[1];

      switch (card.charAt(0)) {
        case "S":
          cardType = "Spades";
          break;
        case "D":
          cardType = "Diamonds";
          break;
        case "C":
          cardType = "Clubs";
          break;
        case "H":
          cardType = "Hearts";
          break;
      }

      if (parseInt(cardValue) > 10) {
        cardValue = faceCards[parseInt(cardValue) - 11];
      }

      return `${cardValue} of ${cardType}`;
    };

    const turnOf = computed(
      () =>
        gameState.playersList?.filter(
          (player) => player.id == gameState.turnOf
        )[0]
    );

    const trump = computed(() => {
      let trumpSymbol = gameState.trump;
      let card = `${trumpSymbol}-2`;
      return cardName(card)?.split(" ")[2];
    });

    const thrownCards = computed(() =>
      gameState.thrownCards
        ? Object.keys(gameState.thrownCards).map((id) => ({
            id,
            name: playersList.value?.filter((player) => player.id == id)[0]
              .name,
            card: gameState.thrownCards ? gameState.thrownCards[id] : undefined,
          }))
        : []
    );

    const lastThrownCards: any = {};

    watch(thrownCards, (newValue) => {
      if (newValue.length == playersList.value.length) {
        newValue.forEach((item) => {
          lastThrownCards[item.id] = { ...item };
        });
      }
    });

    const socket = inject<Socket>("socket");
    const throwCard = (card: string) => {
      if (
        socket &&
        !isBiddingActive.value &&
        turnOf.value?.id == currentUser.value?.id
      ) {
        socket.emit("throwCard", {
          gameId: gameState.id,
          playerId: gameState.currentUser?.id || localStorage.getItem("pid"),
          card,
        });
      }
    };
    return {
      throwCard,
      lastThrownCards,
      gameId,
      playersList,
      cardName,
      currentUser,
      isBiddingActive,
      turnOf,
      trump,
      cardsOnHand,
      thrownCards,
    };
  },
});
</script>

<style>
</style>