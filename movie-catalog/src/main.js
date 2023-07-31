import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from '@fortawesome/free-regular-svg-icons'

// import { far } from "@fortawesome/free-solid-svg-icons";
import store from "./store/store";
import VuePlyr from "vue-plyr";
import "vue-plyr/dist/vue-plyr.css";
import "./style.css";

library.add(fas,fab,far);


const app = createApp(App);

router.beforeEach((to,from,next) => {
  const token = localStorage.getItem("token");
  if (!token) {
    // User is not logged in, redirect to the login or registration page
    if (to.name !== 'sign-in' && to.name !== 'sign-up') {
      next({ name: 'sign-in' }); // Redirect to login page
    } else {
      next(); // Proceed to the login or registration page
    }
  } else {
    // User is logged in, redirect to the default route (e.g., dashboard)
    if (to.name === 'sign-in' || to.name === 'sign-up') {
      next({ name: 'home' }); // Redirect to dashboard or any other default route
    } else {
      next(); // Proceed to the default route
    }
  }

})

app
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .use(VuePlyr, {
    plyr: {},
  })
  .mount("#app");
