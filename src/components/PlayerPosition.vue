<template>
  <div class="">
    <cards-container :cards="13" class="max-h-full" :vertical="vertical" />
    <div class="w-full text-xs text-center text-white mt-2 md:mt-5">
      <span>Abhinash</span>
      <span
        class="rounded inline p-1 pr-2 ml-1 bg-white text-green-700 font-bold"
      >
        5/7
      </span>
    </div>
  </div>
</template>

<script>
import CardsContainer from "./CardsContainer.vue";
export default {
  components: { CardsContainer },
  props: { position: String, vertical: Boolean },
};
</script>

<style>
</style>