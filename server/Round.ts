import Player from "./Player";

export default class Round {
  public thrownCards: { [playerId: string]: string };
  public roundTrick?: { playerId: string; cardValue: number };
  private __firstThrownCardType: string;

  constructor(
    private readonly playersList: Player[],
    private readonly trump: string
  ) {
    this.thrownCards = {};
    this.roundTrick = undefined;
    this.__firstThrownCardType = "";
  }

  throw(playerId: string, card: string) {
    if (!this.__firstThrownCardType)
      this.__firstThrownCardType = card.charAt(0);

    this.thrownCards[playerId] = card;
    this.playersList
      .filter((player) => player.id == playerId)[0]
      .throwCard(card);

    if (Object.keys(this.thrownCards).length == this.playersList.length)
      this.evaluate();
  }

  throwable(playerId: string) {
    const player = this.playersList.filter((item) => item.id == playerId)[0];
    const cards = player.getCards(playerId) as string[];

    if (!!this.__firstThrownCardType) {
      let filteredCards = cards.filter(
        (card) => card.charAt(0) == this.__firstThrownCardType
      );
      return filteredCards.length > 0 ? filteredCards : cards;
    }

    return cards;
  }

  evaluate() {
    // convert card values to number
    let cardValues: { playerId: string; cardValue: number }[] = [];

    for (let playerId in this.thrownCards) {
      let card = this.thrownCards[playerId];
      let cardValue = 0;
      if (card.charAt(0) == this.__firstThrownCardType) {
        cardValue = 10 + parseInt(card.split("-")[1]);
      }
      if (card.charAt(0) == this.trump) {
        cardValue = 100 + parseInt(card.split("-")[1]);
      }
      cardValues.push({ playerId, cardValue });
    }

    // sort the values and save the greatest value with player id
    this.roundTrick = cardValues.sort((a, b) => b.cardValue - a.cardValue)[0];
  }
}
