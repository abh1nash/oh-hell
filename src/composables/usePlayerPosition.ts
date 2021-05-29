import { computed } from "vue";
import gameState from "../store";
import playerLayoutState from "../store/playerLayout";

export default function usePlayerPosition() {
  const playerPositions = [
    "2/2 3/4 3/5 4/6 4/7", //top left
    "4/5 5/7", //top right
    "2/3 2/4 2/6 2/7", //left top
    "3/6 3/7", //left bottom
    "3/3 4/4 5/5 5/6 6/7", //right top
    "6/6 7/7", //right bottom
    "1/2 1/3 1/4 1/5 1/6 1/7", //current player
  ];

  const gameSize = computed(() => gameState.gameSize);
  const layout = computed(() => playerLayoutState.layout);

  const isDisplayed = (position: string) => {
    return (
      position
        .split(" ")
        .filter((item) => parseInt(item.charAt(2)) == gameSize.value).length > 0
    );
  };
  const getPlayer = (position: string) => {
    if (gameSize.value && layout.value) {
      const playerIndex = position
        .split(" ")
        .filter((item) => parseInt(item.charAt(2)) == gameSize.value)[0]
        .split("/")[0];
      return layout.value[parseInt(playerIndex) - 1];
    }
  };
  return { isDisplayed, playerPositions, getPlayer };
}
