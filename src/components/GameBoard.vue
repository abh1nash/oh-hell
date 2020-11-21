<template>
  <div class="h-full w-full bg-green-600 flex items-center justify-center">
    <div class="game-area">
      <div class="h-20 w-full bg-green-300 flex">
        <div
          class="font-bold text-green-700 text-center bg-white uppercase w-1/6 justify-center flex"
        >
          <div class="self-center">
            <span class="text-xs">Trump</span>
            <div class="block text-center">
              <trump-card-icon card="C" class="mx-auto" />
            </div>
          </div>
        </div>
        <div class="w-10/12 h-full flex">
          <div
            v-for="i in 7"
            :key="i"
            class="py-1 w-1/2 text-center self-center text-green-800"
          >
            <div class="text-xs">Abhinash</div>
            <div class="font-bold text-sm">300</div>
          </div>
        </div>
      </div>
      <play-area class="flex-grow flex-shrink" />
      <div class="player-cards">
        <cards-container
          :cards="[
            'S-13',
            'D-12',
            'H-12',
            'C-2',
            'S-14',
            'C-3',
            'H-14',
            'C-14',
            'H-7',
            'D-4',
            'H-2',
            'D-2',
            'C-13',
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardsContainer from "./CardsContainer";
import TrumpCardIcon from "./TrumpCardIcon";
import PlayArea from "./PlayArea";
export default {
  components: { CardsContainer, TrumpCardIcon, PlayArea },
};
</script>

<style lang="scss">
.game-area {
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  max-height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  @media (min-width: 992px) {
    // height: 700px;
    width: 700px;
  }

  .player-cards {
    // position: absolute;
    // bottom: 0;
    height: 200px;
    width: 100%;
    margin: 0 auto;
    @media (min-width: 992px) {
      height: 180px;
    }
  }
}
</style>