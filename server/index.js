require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const cors = require("cors");
const history = require("connect-history-api-fallback");

const Game = require("./Game");

app.use(history());
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

let game;

io.on("connection", (socket) => {
  console.log(`${socket.id} has connected.`);

  socket.on("createGame", ({ name, playersCount }) => {
    game = new Game({ name, id: socket.id }, playersCount);
    socket.join(game.id);
    socket.emit("createdGame", { id: game.id });
    console.log(`Created game ${game.id}`);
  });

  socket.on("joinGame", ({ name, gameId }) => {
    game.join(socket.id, name);
    socket.join(gameId);
    io.to(gameId).emit("playerJoin", { name: name, id: socket.id });
    socket.emit("joined", { id: socket.id });

    if (game.isReady()) game.dealCards();
  });

  socket.on("gameStart", ({ gameId }) => {
    io.to(gameId).emit("startBid", {
      startFrom: game ? game.currentTurn() : undefined,
      turns: game ? game.turnList() : undefined,
      trump: game.handTrump,
    });
    socket.emit("dealtCards", {
      cards:
        game && game.players[socket.id]
          ? game.players[socket.id].cardsOnHand
          : undefined,
    }); //At this point, everyone has same amount of cards.
  });

  socket.on("gamePlayers", ({ gameId }) => {
    socket.emit("playersInfo", { players: game.playersList() });
  });

  socket.on("getThrowableCards", ({ gameId }) => {
    socket.emit("throwableCards", {
      throwable: game.throwableCards(socket.id),
    });
  });

  socket.on("throwCard", ({ gameId, card }) => {
    game.throwCard(socket.id, card);
    socket.emit("dealtCards", {
      cards: game.players[socket.id] ? game.players[socket.id].cardsOnHand : [],
    });
    io.to(game.id).emit("playersInfo", { players: game.playersList() });
    io.to(game.id).emit("changeTurn", {
      turn: game.currentTurn(),
    });
    io.to(game.id).emit("thrownCards", {
      thrownCards: game.roundThrows,
    });
    if (Object.keys(game.roundThrows).length == game.playersCount) {
      io.to(game.id).emit("roundComplete", { tricks: game.handTricks });
      if (game.cardsDealt.length == 0) {
        game.newHand();
        game.dealCards();
        io.to(game.id).emit("playersInfo", { players: game.playersList() });

        io.to(game.id).emit("handComplete");

        if (game.handCardsCount == 0) {
          io.to(game.id).emit("gameComplete");
        }
      } else {
        game.newRound();
      }
      setTimeout(() => {
        io.to(game.id).emit("thrownCards", {
          thrownCards: game.roundThrows,
        }); //this empties the thrown cards
      }, 2000);
    }
  });

  socket.on("setBid", ({ gameId, bid }) => {
    game.addHandBid(socket.id, bid);
    if (Object.keys(game.handBids).length == game.playersCount) {
      //bidding complete for the hand
      io.to(game.id).emit("biddingComplete");
    }
    io.to(game.id).emit("changeTurn", {
      turn: game.currentTurn(),
    });
    io.to(game.id).emit("playerBids", { bids: game.handBids });
  });

  socket.on("checkUnavailableBids", () => {
    socket.emit("unavailableBids", {
      unavailable: game && game.unavailableBids(),
    });
  });

  if (game && game.isReady) {
    io.to(game.id).emit("gameReady");
  }

  socket.on("gameExists", ({ id }) => {
    if (game.id == id) socket.join(id);
    socket.emit("gameExistence", {
      id,
      requestId: socket.id,
      exists: game && game.id == id,
      players: game && game.id == id ? game.players : undefined,
      playersCount: game ? game.playersCount : undefined,
    });
  });

  socket.on("disconnect", () => {
    if (game && Object.keys(game.players).includes(socket.id)) {
      game.leave(socket.id);
    }
    console.log(`${socket.id} has disconnected.`);
  });
});
