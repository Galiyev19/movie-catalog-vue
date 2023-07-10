<template>
  <div class="slide" v-show="currentSlide === index">
    <img
      :src="url + movie.backdrop_path || url + movie.poster_path"
      class="slide_img"
    />
    <div class="movie_info">
      <h1 class="text-white text-8xl font-bold">
        {{ movie.original_title || movie.name }}
      </h1>
      <div class="flex items-center my-4">
        <img src="@/assets/images/imdb.svg" alt="imdb" class="imdb_img" />
        <span class="text-white ml-4">{{ movie.vote_average }} / 10</span>
      </div>
      <p class="text-white mt-6 mb-6 text-2xl">{{ movie.overview }}</p>
      <router-link
        :to="`/home/${movie.original_title}`"
        class="more_info_btn text-2xl"
        @click="selectMovieId(movie.id)"
        >More</router-link
      >
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "carousel-item",
  props: ["movie", "currentSlide", "index"],
  data() {
    return {
      url: "https://image.tmdb.org/t/p/original",
    };
  },
  methods: {
    ...mapActions(["selectMovieId"]),
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
}

.slide_img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.5;
  background-image: linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 95%);
}

.movie_info {
  position: absolute;
  top: 28%;
  left: 12%;
  max-width: 40%;
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
