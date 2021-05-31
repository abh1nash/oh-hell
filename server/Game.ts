import Player from "./Player";
import Hand from "./Hand";

export default class OhHellGame {
  private __playersList: Player[];
  private __handCardsCount: number;
  private __currentHand: Hand | undefined;
  private __lastHandThrows: { [player: string]: string } | {};
  private __lastTurn?: string;

  public isComplete: boolean = false;

  constructor(
    public readonly playersCount: number,
    private readonly initiator: { name: string; id: string }
  ) {
    this.__playersList = [];
    this.__handCardsCount = Math.min(3, Math.floor(52 / this.playersCount));
    this.__lastHandThrows = {};
    this.__currentHand = undefined;
    this.__lastTurn = undefined;
    this.joinGame(this.initiator.name, this.initiator.id);
  }

  playersList(requesterId?: string) {
    return this.__playersList.map((player) => {
      const stats =
        this.__currentHand && this.__currentHand.playerStats
          ? this.__currentHand.playerStats.filter(
              (stat) => stat.playerId == player.id
            )[0]
          : undefined;
      const throwable =
        requesterId == player.id && this.turnOf == requesterId
          ? this.__currentHand?.throwable(player.id)
          : undefined;
      return {
        name: player.name,
        id: player.id,
        score: player.score,
        cards: player.getCards(requesterId),
        stats: { bid: stats?.bid || 0, tricks: stats?.tricks || 0 },
        throwable,
      };
    });
  }

  get turnOf() {
    return this.__lastTurn
      ? this.__lastTurn
      : this.__currentHand
      ? this.__currentHand.turn
      : this.__playersList[0].id;
  }

  get isBiddingActive() {
    return this.__currentHand?.playerStats.length !== this.__playersList.length;
  }

  get thrownCards() {
    return Object.keys(this.__lastHandThrows).length == this.playersCount
      ? this.__lastHandThrows
      : this.__currentHand?.thrownCards;
  }

  get currentTrump() {
    return this.__currentHand?.trump;
  }

  get handCardsCount() {
    return this.__handCardsCount;
  }

  get unavailableBids() {
    return this.isBiddingActive && this.__currentHand
      ? this.__currentHand.unavailableBids
      : [];
  }

  isInGame(playerId: string) {
    return this.__playersList.map((player) => player.id).includes(playerId);
  }

  joinGame(name: string, id: string) {
    this.__playersList.push(new Player(name, id));

    if (this.__playersList.length == this.playersCount) this.startHand();
  }

  startHand() {
    if (this.__currentHand) {
      this.__lastHandThrows = { ...this.__currentHand.thrownCards };
      this.__lastTurn = this.__currentHand.turn;
      setTimeout(() => {
        this.__lastHandThrows = {};
      }, 1000);
    }
    this.__currentHand = new Hand(
      this.__playersList,
      this.__handCardsCount,
      this.__lastTurn
    );
  }

  setBid(playerId: string, bid: number) {
    this.__currentHand?.setBid(playerId, bid);
    if (this.__lastTurn) this.__lastTurn = undefined;
  }

  throw(playerId: string, card: string) {
    this.__currentHand?.throw(playerId, card);

    if (this.__currentHand?.isComplete) {
      this.__handCardsCount--;
      if (this.__handCardsCount == 0) {
        this.isComplete = true;
      } else {
        this.startHand();
      }
    }
  }
}
