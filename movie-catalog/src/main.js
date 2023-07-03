import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

library.add(fas);

const app = createApp(App);

app.use(router).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
