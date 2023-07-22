import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import SignIn from "../views/Sign-In.vue";
import SignUp from "../views/Sign-Up.vue";
import HomePage from "../views/HomePage/HomePage.vue";
import MovieDeatail from "../views/MovieDetail/MovieDetail.vue";
import TVSerials from "../views/TVSerials/TVSerials.vue";
import Movie from "../views/Movies/Movies.vue";
import PersonDetail from '../views/Person/PersonDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "/home",
          name: "homePage",
          component: HomePage,
        },
        {
          path: "/tv_serials",
          name: "tv_serials",
          component: TVSerials,
        },
        {
          path: "/movies",
          name: "movies",
          component: Movie,
        },
        {
          path: "/home/:title",
          name: "movieDetail",
          component: MovieDeatail,
        },
        {
          path: "/person/:id",
          name: "personDetail",
          component: PersonDetail,
        },
      ],
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: SignIn,
      meta: { requiresAuth: false } 
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: SignUp,
      meta: { requiresAuth: false } 
    },
  ],
});



export default router;
