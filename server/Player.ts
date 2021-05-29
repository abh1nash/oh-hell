class Player {
  public score: number;
  private __cardsOnHand: string[];

  constructor(public name: string, public readonly id: string) {
    this.score = 0;
    this.__cardsOnHand = [];
  }

  addCard(card: string) {
    this.__cardsOnHand.push(card);
  }

  throwCard(card: string) {
    if (this.__cardsOnHand.includes(card))
      this.__cardsOnHand.splice(this.__cardsOnHand.indexOf(card), 1);
  }

  getCards(requesterId?: string): number | string[] {
    if (requesterId && requesterId == this.id) {
      return this.__cardsOnHand;
    } else {
      return this.__cardsOnHand.length;
    }
  }

  resetCards() {
    while (this.__cardsOnHand.length > 0) {
      this.__cardsOnHand.pop();
    }
  }

  addScore(value: number) {
    this.score += value;
  }
}

export default Player;
