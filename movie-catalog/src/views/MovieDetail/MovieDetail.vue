<template>
  <div
    class="main_movie_detail"
    :style="`background-image:linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 100%), url(${
      url + movieDetail.backdrop_path || url + movie.poster_path
    }) `"
  >
    <h1 class="text-white font-bold text-8xl mb-2">
      {{ movieDetail.title }}
    </h1>
    <div class="video_player">
      <vue-plyr>
        <div
          data-plyr-provider="youtube"
          :data-plyr-embed-id="video[0]?.key"
        ></div>
      </vue-plyr>
    </div>
    <div class="flex my-9">
      <p class="text-white font-bold text-4xl">
        {{ movieDetail.overview }}
      </p>
    </div>
  </div>
</template>
<script>
import apiMovies from "../../api/api-movies";

export default {
  name: "movie-detail",
  components: {},
  data() {
    return {
      url: "https://image.tmdb.org/t/p/original/",
      movieDetail: {},
      video: [],
    };
  },
  methods: {
    async getMovieDeatailById() {
      const result = await apiMovies.getMovieDetailById(
        this.$store.getters.movieId
      );
      this.movieDetail = result.data;
    },
    async getMovieTrailer() {
      const result = await apiMovies.getMovieTrailer(
        this.$store.getters.movieId
      );
      console.log(result);
      this.movieDetail = result;
      this.video = this.movieDetail.videos.results;
    },
    onReady() {
      this.$refs.youtube.playVideo();
    },
  },
  mounted() {},
  created() {
    // this.getMovieDeatailById();
    this.getMovieTrailer();
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
