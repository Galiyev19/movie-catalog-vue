<template>
  <div class="slide" :class="currentSlide === index ? 'active' : ''">
    <img :src="url + movie.backdrop_path || url + movie.poster_path" class="slide_img" />
    <div class="movie_info">
      <h1 class="text-white text-8xl font-bold max-[992px]:text-6xl max-[768px]:text-4xl">
        {{ movie.original_title || movie.name }}
      </h1>
      <div class="flex items-center my-4">
        <img src="@/assets/images/imdb.svg" alt="imdb" class="imdb_img" />
        <span class="text-white ml-4">{{ movie.vote_average }} / 10</span>
      </div>
      <p class="text-white mt-6 mb-6 text-2xl w-2/5 max-[992px]:w-4/5 max-[768px]:text-xl max-[576px]:text-sm">
        {{ movie.overview }}
      </p>
      <router-link :to="`/home/${movie.original_title || movie.name}`" class="more_info_btn text-2xl"
        @click="onClickMoreDetail(movie.id, this.media_type)">More</router-link>
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
      media_type: sessionStorage.getItem("media_type"),
    };
  },
  methods: {
    ...mapActions(["selectMovieId", "setMediaType"]),
    onClickMoreDetail(id, media_type) {
      this.selectMovieId(id);
      this.setMediaType(media_type);
    },
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
