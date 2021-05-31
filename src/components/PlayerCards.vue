<template>
  <div
    v-if="bottom && turnOf == currentUserId && !isGameOnHold"
    class="absolute w-full text-center -mt-6 animate-bounce font-bold uppercase text-white"
  >
    Your Turn
  </div>
  <div :class="['flex flex-wrap-reverse']">
    <cards-container
      :cards="playerData ? playerData?.cards : 0"
      :throwable="throwable"
      :class="[
        'max-h-full',
        { 'w-20 mx-auto': top },
        { 'w-20 ml-8': left },
        { 'w-20 -ml-8': right },
        { 'w-96 mx-auto pl-7': bottom },
      ]"
    />
    <div
      :class="[
        'w-full text-xs text-white my-2 md:mt-5',
        right ? 'text-left -ml-10' : 'text-center',
        { 'animate-bounce': player == turnOf && currentUserId != player },
      ]"
    >
      <span>{{ playerData?.name || "Player" }}</span>
      <span
        class="text-center relative rounded inline p-1 ml-1 bg-white text-green-700 font-bold"
      >
        {{ playerData?.stats.tricks || 0 }}/{{ playerData?.stats.bid || 0 }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, toRefs } from "vue";
import gameState from "../store";
import CardsContainer from "./CardsContainer.vue";
export default defineComponent({
  components: { CardsContainer },
  props: {
    top: Boolean as PropType<boolean>,
    left: Boolean as PropType<boolean>,
    right: Boolean as PropType<boolean>,
    bottom: Boolean as PropType<boolean>,
    player: { type: String as PropType<string>, required: true },
  },
  setup(props) {
    const { player, top, left, right, bottom } = toRefs(props);
    const playerData = computed(
      () => gameState.playersList?.filter((user) => user.id == player.value)[0]
    );
    const isGameOnHold = computed(() => gameState.onHold);
    const throwable = computed(() => gameState.currentUser?.throwable);
    const turnOf = computed(() => gameState.turnOf);
    const currentUserId = computed(() => localStorage.getItem("pid"));
    return {
      currentUserId,
      playerData,
      throwable,
      turnOf,
      top,
      left,
      right,
      bottom,
      isGameOnHold,
    };
  },
});
</script>

