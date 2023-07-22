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
const token = localStorage.getItem("token");
router.beforeEach((to,from,next) => {
  
  // if(to.name !== "sign-in" && !localStorage.getItem('token')){
  //   next({name: "sign-in"});
  // }else{
  //   next()
  // }

  if (to.meta.requiresAuth) {
    // If authentication is required, check if the user is logged in
    if (localStorage.getItem('token')) {
      // If the user is logged in, allow the navigation
      next();
    } else {
      // If the user is not logged in, redirect to the login page
      next('/sign-in');
    }
  } else {
    // If the route does not require authentication, allow the navigation
    next();
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
