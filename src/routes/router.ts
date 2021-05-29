import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "Wait",
    path: "/wait/:id",
    props: true,
    component: () => import("../pages/Wait.vue"),
  },
  {
    name: "Game",
    path: "/game/:id",
    props: true,
    component: () => import("../pages/Game.vue"),
  },
  { name: "Home", path: "/", component: () => import("../pages/Home.vue") },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
