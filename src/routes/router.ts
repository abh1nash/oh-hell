import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import Wait from "../pages/Wait.vue";
import Game from "../pages/Game.vue";

const routes = [
  {
    name: "Wait",
    path: "/wait/:id",
    props: true,
    component: Wait,
  },
  {
    name: "Game",
    path: "/game/:id",
    props: true,
    component: Game,
  },
  { name: "Home", path: "/", component: Home },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
