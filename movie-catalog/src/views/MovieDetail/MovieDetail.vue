<template>
  <div
    class="main_movie_detail"
    :style="`background-image:linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 100%), url(${
      url + movieDetail.backdrop_path || url + movie.poster_path
    }) `"
  >
    <h1 class="text-white font-bold text-8xl mb-2">
      {{ movieDetail.title || movieDetail.name }}
    </h1>
    <div class="video_player" v-if="video.length > 0">
      <vue-plyr>
        <div
          data-plyr-provider="youtube"
          :data-plyr-embed-id="video[0].key"
        ></div>
      </vue-plyr>
    </div>
    <div class="flex flex-col my-9 w-full">
      <span class="text-white font-bold text-6xl mb-9">About movie</span>
      <p class="text-white font-bold text-4xl leading-9">
        {{ movieDetail.overview }}
      </p>
      <div class="flex flex-col my-4">
        <p class="text-2xl text-red-500 my-4" v-if="this.director.length !== 0">
          Director:
          <span
            class="text-white underline cursor-pointer"
            v-for="item in director"
            :key="item.id"
            >{{ item.original_name }}</span
          >
        </p>
        <p class="text-2xl text-red-500">
          Genres:
          <span
            v-for="genres in movieDetail.genres"
            :key="genres.id"
            class="text-white underline mx-0.5"
          >
            {{ genres.name }}
          </span>
        </p>
        <div class="flex text-2xl text-red-500 my-4">
          Rating:
          <div class="flex">
            <span class="text-white underline mx-2"
              >{{ Math.trunc(movieDetail.vote_average * 10) / 10 }}
            </span>
            <img src="@/assets/images/imdb.svg" class="imdb_img" />
          </div>
        </div>
        <p class="text-2xl text-red-500">
          Original language:
          <span class="text-white underline">{{
            movieDetail.original_language?.toUpperCase()
          }}</span>
        </p>
      </div>
    </div>
    <div class="flex flex-col w-full my-2">
      <h2 class="text-white text-6xl font-bold">Top Cast</h2>
      <actor-list />
    </div>
  </div>
</template>
<script>
import apiMovies from "../../api/api-movies";
import ActorList from "./ActorList.vue";
export default {
  name: "movie-detail",
  components: { ActorList },
  data() {
    return {
      url: "https://image.tmdb.org/t/p/original/",
      movieDetail: {},
      video: [],
      director: [],
    };
  },
  methods: {
    async getMovieTrailer() {
      const id = sessionStorage.getItem("id");
      const mediaType = sessionStorage.getItem("media_type");

      const result = await apiMovies.getMovieTrailer(id, mediaType);
      console.log(result);
      this.movieDetail = result;
      this.video = this.movieDetail.videos.results;
    },
    async getActors() {
      const id = sessionStorage.getItem("id");
      const media_type = sessionStorage.getItem("media_type");
      const result = await apiMovies.getActorsList(id, media_type);
      this.director = result.crew.filter((item) => item.job === "Director");
    },
    onReady() {
      this.$refs.youtube.playVideo();
    },
  },
  mounted() {},
  created() {
    // this.getMovieDeatailById();
    this.getMovieTrailer();
    this.getActors();
  },
  computed() {
    this.getMovieTrailer();
    this.getActors();
  },
};
</script>
<style scoped>
.main_movie_detail {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 124px 5% 0% 5%;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%);
}

.video_player {
  padding: 8px;
  width: 100%;
  height: 100%;
}

.movie_info {
  display: flex;
  flex-direction: column;
  width: 50%;
}
</style>
