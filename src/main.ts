import { createApp } from "vue";
import "./style.css";
import router from "./router/index";
//@ts-ignore
import App from "./App.vue";
import store from "./store/index";
const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
