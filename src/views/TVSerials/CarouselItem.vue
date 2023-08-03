<template>
  <div class="slide" :class="currentSlide === index ? 'active' : ''">
    <img :src="this.url + movie?.backdrop_path || this.url + movie?.poster_path" class="slide_img" />
    <div class="movie_info">
      <h1 class="text-white font-montserrat text-8xl font-bold max-[992px]:text-6xl max-[768px]:text-4xl">
        {{ movie.original_title || movie.name }}
      </h1>
      <div class="flex items-center my-4">
        <img src="@/assets/images/imdb.svg" alt="imdb" class="imdb_img" />
        <span class="text-white ml-4 font-montserrat">{{ movie.vote_average }} / 10</span>
      </div>
      <p
        class="text-white mt-6 mb-6 font-montserrat text-2xl w-2/5 max-[992px]:w-4/5 max-[768px]:text-xl max-[576px]:text-sm">
        {{ movie.overview }}
      </p>
      <div class="flex items-center">
        <router-link :to="`/home/${movie.original_title || movie.name}`" class="more_info_btn text-2xl font-montserrat"
          @click="onClickMoreDetail(movie.id, this.media_type)">More</router-link>
        <font-awesome-icon :icon="this.isFav ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'"
          class="text-4xl text-white cursor-pointer mx-3" @click="toogleAddMovie(this.movie)" />
      </div>
    </div>

  </div>
</template>
<script>
import axios from 'axios';
import { mapActions } from "vuex";
import apiMovies from "../../api/api-movies";
export default {
  name: "carousel-item",
  props: ["movie", "currentSlide", "index", "addMyList", "deleteMovie"],
  data() {
    return {
      url: "https://image.tmdb.org/t/p/original/",
      media_type: sessionStorage.getItem("media_type"),
      isFav: false,
    };
  },
  methods: {
    ...mapActions(["selectMovieId", "setMediaType", "setIsAdd"]),
    onClickMoreDetail(id, media_type) {
      this.selectMovieId(id);
      this.setMediaType(media_type);
    },
    async getUser(id) {
      const userId = localStorage.getItem("userId")
      const token = localStorage.getItem("token")
      const response = await axios(`${procces.env.VUE_APP_API_URL}/user-movie-list/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      this.isFav = response.data.some(item => item.id === id)
    },
    async toogleAddMovie(data) {
      const userId = localStorage.getItem("userId")
      const token = localStorage.getItem("token")

      const userMovieList = await axios(`${procces.env.VUE_APP_API_URL}/user-movie-list/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (userMovieList.data?.some(item => item.id === data.id)) {
        this.isFav = false
        this.deleteMovie(data)
      } else {
        this.isFav = true
        this.addMyList(data)
        this.setIsAdd(true)
      }
    }
  },
  computed() {
    this.getUser(this.movie.id)
  },
  created() {
    this.getUser(this.movie.id)
  },
  mounted() {

  },
};
</script>
<style>
.slide {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
  background-position: center;
  background-size: cover;
  opacity: 1;
  clip-path: circle(0 at 0 100%);
}

.active {
  clip-path: circle(150% at 0% 50%);
  transition: 1.8s ease;
  transition-property: clip-path;
}

.slide_img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: 0.5;
  background-image: linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 95%);
}

.movie_info {
  position: absolute;
  top: 28%;
  left: 12%;
  max-width: 100%;
  padding: 12px;
}

.imdb_img {
  height: 34px;
  widows: 70px;
}

.more_info_btn {
  outline: none;
  border: 1px solid white;
  color: white;
  border-radius: 8px;
  padding: 8px 12px;
}

.more_info_btn:hover {
  border-color: red;
  color: red;
}
</style>
