<template>
  <div class="flex items-center justify-center h-screen w-screen bg-gray-200">
    <div class="w-full md:w-1/4">
      <form
        @submit.prevent="createGameRoom"
        class="text-center flex flex-col mx-3"
      >
        <label for="name" class="text-xl text-gray-500">Your Name</label>
        <input
          v-model="name"
          type="text"
          class="text-2xl bg-white font-bold p-5 rounded"
        />
        <label for="players_count" class="text-xl text-gray-500 mt-4"
          >Number of Players</label
        >
        <select
          id="players_count"
          v-model="playersCount"
          type="text"
          class="text-2xl font-bold bg-white p-5 rounded"
        >
          <option v-for="option in 6" :value="option + 1" :key="option">
            {{ option + 1 }}
          </option>
        </select>
        <button
          :disabled="!name || !playersCount"
          class="bg-blue-600 hover:bg-blue-500 text-white mt-4 uppercase p-5 rounded text-2xl font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Create Game
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      name: "",
      playersCount: null,
    };
  },
  sockets: {
    connect() {
      console.log("Connected to game server.");
    },
    createdGame: function (msg) {
      this.$router.push({ name: "Game", params: { id: msg.id } });
    },
  },
  methods: {
    createGameRoom() {
      this.$socket.emit("createGame", {
        name: this.name,
        playersCount: this.playersCount,
      });
    },
  },
};
</script>
