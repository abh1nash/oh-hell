import { createApp } from "vue";
import Harlem from "@harlem/core";
import createDevtoolsPlugin from "@harlem/plugin-devtools";

import router from "./routes/router";

import App from "./App.vue";
import "./styles/index.css";

const app = createApp(App);

app.use(router);
app.use(Harlem, {
  plugins: [createDevtoolsPlugin({ label: "State" })],
});
app.mount("#app");
