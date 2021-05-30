require("dotenv").config();
const express = require("express");
const app = express();

const { createServer } = require("http");
const { Server } = require("socket.io");
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const cors = require("cors");
const cHistory = require("connect-history-api-fallback");

import Game from "./Game";
import generateGameState from "./generateGameState";

app.use(cHistory());
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const games: Game[] = [];

io.on("connection", (socket) => {
  console.log(`New Connection: ${socket.id}`);
  socket.on("createGame", ({ playersCount, initiator }) => {
    const gameId = games.push(
      new Game(playersCount, {
        name: initiator.name,
        id: initiator.id ? initiator.id : socket.id,
      })
    );
    console.log(`Created Game: ${gameId + 1}`);
    socket.join(gameId - 1);
    socket.emit("createdGame", {
      playerId: initiator.id ? initiator.id : socket.id,
      gameId: gameId - 1,
    });
  });

  socket.on("checkGame", ({ gameId, requesterId }) => {
    if (!!games[gameId]) {
      socket.join(gameId);
      // socket.to(gameId).emit("gameEvent");
      socket.emit("gameState", {
        data: generateGameState(requesterId, gameId, games[gameId]),
      });
    } else {
      socket.emit("invalid");
    }
  });

  socket.on("joinGame", ({ gameId, playerId, name }) => {
    if (!!games[gameId]) {
      games[gameId].joinGame(name, playerId);
      socket.join(gameId);
      socket.to(gameId).emit("gameEvent");
      socket.emit("gameState", {
        data: generateGameState(playerId, gameId, games[gameId]),
      });
    } else {
      socket.emit("invalid");
    }
  });

  socket.on("setBid", ({ gameId, playerId, bid }) => {
    if (!!games[gameId]) {
      games[gameId].setBid(playerId, bid);
      socket.to(gameId).emit("gameEvent");
      socket.emit("gameState", {
        data: generateGameState(playerId, gameId, games[gameId]),
      });
    } else {
      socket.emit("invalid");
    }
  });

  socket.on("throwCard", ({ gameId, playerId, card }) => {
    if (!!games[gameId]) {
      games[gameId].throw(playerId, card);
      socket.to(gameId).emit("gameEvent");
      socket.emit("gameState", {
        data: generateGameState(playerId, gameId, games[gameId]),
      });
    } else {
      socket.emit("invalid");
    }
  });
});
