const shortid = require("shortid");

const cardTypes = ["D", "H", "S", "C"];

class Game {
  constructor(initiator, playersCount) {
    this.id = shortid.generate();
    this.initiator = initiator.id;
    this.playersCount = playersCount;
    this.players = {
      [initiator.id]: {
        name: initiator.name,
        id: initiator.id,
        score: 0,
        cardsOnHand: [],
      },
    };
    this.playerTurn = 0;
    this.newHand();
  }

  playersList() {
    return Object.values(this.players).map((player) => {
      return {
        name: player.name,
        id: player.id,
        cardsOnHand: player.cardsOnHand.length,
        score: player.score,
      };
    });
  }

  isReady() {
    return Object.keys(this.players).length == this.playersCount;
  }

  join(id, name) {
    if (!this.players[id])
      this.players[id] = { name, id, score: 0, cardsOnHand: [] };
  }

  currentTurn() {
    return Object.keys(this.players)[this.playerTurn];
  }

  turnList() {
    return Object.keys(this.players);
  }

  changeTurn() {
    if (this.playerTurn == Object.keys(this.players).length - 1)
      this.playerTurn = 0;
    else this.playerTurn++;
  }

  leave(id) {
    delete this.players[id];
    this.playersCount--;
  }

  resetScores() {
    Object.keys(this.players).forEach((id) => {
      this.players[id].score = 0;
    });
  }

  throwableCards(playerId) {
    if (!this.roundFirstCard) return this.players[playerId].cardsOnHand;
    let eligibleCards = this.players[playerId].cardsOnHand.filter(
      (card) => card.charAt(0) == this.roundFirstCard.charAt(0)
    ); //check if the player has same card type as the first thrown card
    if (eligibleCards.length < 1) return this.players[playerId].cardsOnHand;
    return eligibleCards;
  }

  addScore(id, score) {
    this.players[id].score += score;
  }

  dealCards() {
    //Prepare deck
    let cardsPool = [];
    cardTypes.forEach((type) => {
      for (let i = 2; i <= 14; i++) {
        cardsPool.push(`${type}-${i}`);
      }
    });

    //Reset Player Cards
    Object.keys(this.players).forEach((id) => {
      this.players[id].cardsOnHand = [];
    });

    //Deal Cards
    while (this.cardsDealt.length < this.playersCount * this.handCardsCount) {
      Object.keys(this.players).forEach((id) => {
        if (this.players[id].cardsOnHand.length < this.handCardsCount) {
          let randomCard = cardsPool.splice(
            Math.floor(Math.random() * cardsPool.length),
            1
          )[0];
          this.players[id].cardsOnHand.push(randomCard);
          this.cardsDealt.push(randomCard);
        }
      });
    }
  }

  newHand() {
    this.handBids = {};
    this.handTricks = {};
    this.handCardsCount = this.handCardsCount
      ? this.handCardsCount - 1
      : Math.min(13, Math.floor(52 / this.playersCount));
    this.handTrump = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    this.cardsDealt = [];
    this.newRound();
  }

  newRound() {
    this.roundBids = {};
    this.roundTricks = {};
    this.roundPrevThrows = { ...this.roundThrows };
    this.roundThrows = {};
    this.roundFirstCard = "";
  }

  throwCard(id, card) {
    let turnChanged = false;
    if (this.players[id].cardsOnHand.includes(card)) {
      if (Object.keys(this.roundThrows).length == 0) this.roundFirstCard = card;
      this.roundThrows[id] = this.players[id].cardsOnHand.splice(
        this.players[id].cardsOnHand.indexOf(card),
        1
      )[0];
      this.cardsDealt.splice(this.cardsDealt.indexOf(card), 1);
      if (Object.keys(this.roundThrows).length == this.playersCount) {
        turnChanged = true;
        this.evaluateRound();
        if (this.cardsDealt.length == 0) {
          this.evaluateHand();
        }
      }
    } else {
      this.leave(id);
    }
    if (!turnChanged) this.changeTurn();
  }

  evaluateRound() {
    let trick = { value: 0 };
    Object.entries(this.roundThrows).forEach((entry) => {
      let curVal = 0;
      if (entry[1].charAt(0) == this.handTrump)
        curVal = 10 + parseInt(entry[1].split("-")[1]);
      if (
        entry[1].charAt(0) != this.handTrump &&
        entry[1].charAt(0) == this.roundFirstCard.charAt(0)
      )
        curVal = parseInt(entry[1].split("-")[1]);

      if (curVal > trick.value) {
        trick.player = entry[0];
        trick.value = curVal;
      }
    });

    this.playerTurn = Object.keys(this.players).indexOf(trick.player);

    if (!this.handTricks[trick.player]) this.handTricks[trick.player] = 1;
    else this.handTricks[trick.player]++;
  }

  evaluateHand() {
    Object.keys(this.players).forEach((id) => {
      if (this.handBids[id] == this.handTricks[id])
        this.addScore(id, 10 + this.handBids[id]);
    });
  }

  unavailableBids() {
    if (Object.keys(this.handBids).length < this.playersCount - 1) return [];
    let bidValues = [];
    for (let i = 0; i <= this.handCardsCount; i++) {
      bidValues.push(i);
    }
    let handBidsSum = Object.values(this.handBids).reduce((a, b) => a + b);
    return bidValues.filter(
      (value) => value + handBidsSum == this.handCardsCount
    );
  }

  addHandBid(id, amount) {
    this.handBids[id] = amount;
    this.changeTurn();
  }

  restart() {
    this.resetScores();
    this.newHand();
  }
}

module.exports = Game;
