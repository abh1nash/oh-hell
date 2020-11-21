<template>
  <div class="relative">
    <div class="top top-0 left-0 w-full h-24 absolute flex justify-center pt-4">
      <div class="w-24 md:w-48 max-h-12">
        <player-position position="2/2 3/4 3/5 4/6 4/7" />
      </div>
      <div class="w-24 md:w-48 max-h-12">
        <player-position position="4/5 5/7" />
      </div>
    </div>
    <div
      class="left top-0 left-0 h-full w-36 md:w-48 absolute flex flex-col justify-center items-start"
    >
      <div
        class="w-2/3 md:w-full h-1/4 relative flex justify-center items-center"
      >
        <player-position position="2/3 2/4 2/6 2/7" class="" />
      </div>
      <div class="w-2/3 md:w-full h-1/4 flex justify-center items-center">
        <player-position position="3/6 3/7" />
      </div>
    </div>
    <div
      class="left top-0 right-0 h-full w-36 md:w-48 absolute flex flex-col justify-center items-end"
    >
      <div
        class="w-2/3 md:w-full h-1/4 relative flex justify-center items-center"
      >
        <player-position right position="3/3 4/4 5/5 5/6 6/7" />
      </div>
      <div class="w-2/3 md:w-full h-1/4 flex justify-center items-center">
        <player-position right position="6/6 7/7" />
      </div>
    </div>
    <div
      class="show-area absolute h-72 w-36 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <div
        class="top-throw absolute top-0 left-0 w-full h-24 flex items-center justify-center"
      >
        <div class="w-1/2 flex h-full max-h-full">
          <single-card :disableSelection="true" name="H-12" class="mx-auto" />
        </div>
        <div class="w-1/2 flex h-full max-h-full">
          <single-card :disableSelection="true" name="H-12" class="mx-auto" />
        </div>
      </div>
      <div
        class="left-throw absolute top-0 -left-1/3 md:-left-1/2 h-full w-24 flex flex-wrap items-center justify-center"
      >
        <div class="flex h-1/4 w-full max-h-full">
          <single-card :disableSelection="true" name="H-12" class="mx-auto" />
        </div>
        <div class="flex h-1/4 w-full max-h-full">
          <single-card :disableSelection="true" name="H-12" class="mx-auto" />
        </div>
      </div>

      <div
        class="right-throw absolute top-0 -right-1/3 md:-right-1/2 h-full w-24 flex flex-wrap items-center justify-center"
      >
        <div class="flex h-1/4 w-full max-h-full">
          <single-card :disableSelection="true" name="H-12" class="mx-auto" />
        </div>
        <div class="flex h-1/4 w-full max-h-full">
          <single-card :disableSelection="true" name="H-12" class="mx-auto" />
        </div>
      </div>

      <div
        class="bottom-throw absolute -bottom-1/4 left-0 w-full h-24 flex items-center justify-center"
      >
        <div class="w-1/2 flex h-full max-h-full">
          <single-card :disableSelection="true" name="H-12" class="mx-auto" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlayerPosition from "./PlayerPosition.vue";
import SingleCard from "./SingleCard.vue";
export default {
  components: { PlayerPosition, SingleCard },
};
</script>

<style lang="scss">
.show-area {
  .card-image-container {
    width: auto;
    height: auto;
    .card-image {
      max-height: 5.5em;
      margin: 0;

      @media (min-width: 992px) {
        max-height: 6.5em;
      }
    }
  }
}
</style>