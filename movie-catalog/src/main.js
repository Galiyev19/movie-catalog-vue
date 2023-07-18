import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
// import { far } from "@fortawesome/free-solid-svg-icons";
import store from "./store/store";
import VuePlyr from "vue-plyr";
import "vue-plyr/dist/vue-plyr.css";
import "./style.css";

library.add(fas,fab);


const app = createApp(App);

app
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .use(VuePlyr, {
    plyr: {},
  })
  .mount("#app");
