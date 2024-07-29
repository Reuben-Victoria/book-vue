import { createApp } from "vue";
import { createPinia } from "pinia";
import { MotionPlugin } from "@vueuse/motion";
import router from "./router";
import "./style.css";
import "./assets/styles/main.scss";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(MotionPlugin);
app.use(pinia);

app.mount("#app");
