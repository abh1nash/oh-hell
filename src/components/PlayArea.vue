<template>
  <div class="relative">
    <div class="top top-0 left-0 w-full h-24 absolute flex justify-center pt-4">
      <div class="w-1/3 max-h-12">
        <player-position position="2/2 3/4 3/5 4/6 4/7" />
      </div>
      <div class="w-1/3 max-h-12">
        <player-position position="4/5 5/7" />
      </div>
    </div>
    <div
      class="left top-0 left-0 h-full w-36 absolute flex flex-col justify-center items-start"
    >
      <div class="w-2/3 h-1/3 relative flex justify-center items-center">
        <player-position position="2/3 2/4 2/6 2/7" class="" />
      </div>
      <div class="w-2/3 h-1/3 flex justify-center items-center">
        <player-position position="3/6 3/7" />
      </div>
    </div>
    <div
      class="left top-0 right-0 h-full w-36 absolute flex flex-col justify-center items-end"
    >
      <div class="w-2/3 h-1/3 relative flex justify-center items-center">
        <player-position right position="3/3 4/4 5/5 5/6 6/7" />
      </div>
      <div class="w-2/3 h-1/3 flex justify-center items-center">
        <player-position right position="6/6 7/7" />
      </div>
    </div>
  </div>
</template>

<script>
import PlayerPosition from "./PlayerPosition.vue";
export default {
  components: { PlayerPosition },
};
</script>
