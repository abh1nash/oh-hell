import Vue from "vue";
import { io } from "socket.io-client";
import VueSocketIO from "vue-socket.io";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/styles/tailwind.css";

Vue.config.productionTip = false;

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: io(process.env.VUE_APP_SOCKET_URL),
    vuex: { store },
    options: { withCredentials: false },
  })
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
