import Player from "./Player";
import Round from "./Round";
const cardTypes = ["D", "H", "S", "C"];

class Hand {
  private __currentRound: Round;
  private __lastRoundThrows: { [playerId: string]: string } | {};
  private __dealtCards: string[];
  private __turn: number = 0;

  public isComplete: Boolean = false;
  public trump: string;
  public playerStats: { playerId: string; bid: number; tricks: number }[];

  constructor(
    private readonly playersList: Player[],
    private cardsCount: number,
    private turnOf?: string
  ) {
    this.__turn = 0;

    if (this.turnOf) {
      this.__turn = this.playersList
        .map((player) => player.id)
        .indexOf(this.turnOf);
    }

    this.playersList.forEach((player) => {
      player.resetCards();
    });
    this.isComplete = false;
    this.trump = "";
    this.playerStats = [];
    this.__lastRoundThrows = {};
    this.__currentRound = new Round(this.playersList, this.trump);
    this.__dealtCards = [];
    this.setTrump();
    this.dealCards();
    this.startRound();
  }

  get thrownCards() {
    return Object.keys(this.__lastRoundThrows).length == this.playersList.length
      ? this.__lastRoundThrows
      : this.__currentRound?.thrownCards;
  }

  get unavailableBids() {
    if (this.playerStats.length < this.playersList.length - 1) return [];
    let bidValues: number[] = [];
    for (let i = 0; i <= this.cardsCount; i++) {
      bidValues.push(i);
    }
    let handBidsSum = this.playerStats.reduce((a, b) => a + b.bid, 0);
    return bidValues.filter((value) => value + handBidsSum == this.cardsCount);
  }

  throwable(playerId) {
    return this.__currentRound?.throwable(playerId);
  }

  setTrump() {
    this.trump = cardTypes[Math.floor(Math.random() * 4)];
  }

  setBid(playerId: string, bid: number) {
    this.playerStats.push({ playerId, bid, tricks: 0 });
    this.__turn++;
    if (this.playerStats.length == this.playersList.length) this.startRound();
  }

  dealCards() {
    let deck: string[] = [];

    cardTypes.forEach((type) => {
      for (let i = 2; i <= 14; i++) {
        deck.push(`${type}-${i}`);
      }
    });
    while (
      this.__dealtCards.length <
      this.cardsCount * this.playersList.length
    ) {
      this.playersList.forEach((player) => {
        if (player.getCards() < this.cardsCount) {
          let randomCard = deck.splice(
            Math.floor(Math.random() * deck.length),
            1
          )[0];
          player.addCard(randomCard);
          this.__dealtCards.push(randomCard);
        }
      });
    }
  }

  startRound() {
    if (this.__currentRound) {
      this.__lastRoundThrows = { ...this.__currentRound.thrownCards };
      setTimeout(() => (this.__lastRoundThrows = {}), 1000);
    }
    this.__currentRound = new Round(this.playersList, this.trump);
  }

  throw(playerId: string, card: string) {
    this.__currentRound.throw(playerId, card);
    this.__turn++;
    this.__dealtCards.splice(this.__dealtCards.indexOf(card), 1);
    if (!!this.__currentRound.roundTrick) {
      const trick = this.__currentRound.roundTrick;

      // set the next turn for the trickster
      const trickster = this.playersList.filter(
        (player) => player.id == trick.playerId
      )[0];
      const tricksterTurn = this.playersList.indexOf(trickster);
      this.__turn = tricksterTurn;

      this.playerStats.filter((item) => item.playerId == trick.playerId)[0]
        .tricks++; // increase the tricks count of the trickster

      if (this.__dealtCards.length == 0) {
        this.evaluate();
      } else {
        this.startRound();
      }
    }
  }

  get turn() {
    return this.playersList[this.__turn % this.playersList.length].id;
  }

  evaluate() {
    this.playerStats.forEach((stat) => {
      if (stat.bid == stat.tricks) {
        let scorer = this.playersList.filter(
          (player) => player.id == stat.playerId
        )[0];
        scorer.addScore(10 + stat.bid);
      }
    });
    this.isComplete = true;
  }
}

export default Hand;
