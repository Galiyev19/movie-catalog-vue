<template>
  <div class="main_movie_detail" :style="`background-image:linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 100%), 
  url(${url + this.$store.getters.getMovieDetail.backdrop_path || url + this.$store.getters.getMovieDetail.poster_path
    }) `">
    <!-- /**
  * ! Backround movie
  */ -->
    <div class="flex justify-center items-start flex-col w-100 review">
      <h1
        class="text-white font-montserrat font-bold text-8xl mb-2 max-[1920px]:text-6xl max-[992px]:text-4xl max-[768px]:text-2xl max-[576px]:text-xl">
        {{ this.$store.getters.getMovieDetail.title || this.$store.getters.getMovieDetail.name }}
      </h1>
      <p
        class="text-white font-montserrat font-bold text-2xl leading-9 my-6 max-[992px]:text-xl max-[768px]:text-sm max-[576px]:text-xs">
        {{ this.$store.getters.getMovieDetail.overview }}
      </p>
      <button class="more_info_btn font-montserrat" @click="isOpen = true">Watch trailer</button>
    </div>
    <!-- /**
  * ! Video player
  */ -->
    <div class="modal" v-if="this.isOpen === true">
      <font-awesome-icon icon="circle-xmark" class="text-4xl text-white icon_close" @click="this.isOpen = false" />
      <div class="video_player" v-if="this.$store.getters.getMovieDetail.videos.results.length > 0">
        <vue-plyr>
          <div data-plyr-provider="youtube"
            :data-plyr-embed-id="this.$store.getters.getMovieDetail.videos.results[0].key">
          </div>
        </vue-plyr>
      </div>
    </div>
    <!-- /**
  * ! Movie info
  */ -->
    <div class="flex w-full flex-col">
      <div class="flex flex-col justify-center w-full mt-16 py-4">
        <span
          class="text-white font-montserrat font-bold text-6xl mb-9 underline max-[992px]:text-4xl max-[768px]:text-2xl max-[576px]:text-xl">Storyline</span>
        <p
          class="text-white font-montserrat font-bold text-4xl leading-9 max-[992px]:text-xl max-[768px]:text-sm max-[576px]:text-xs">
          {{ this.$store.getters.getMovieDetail.overview }}
        </p>
        <div class="flex flex-col my-4">
          <p class="font-montserrat text-2xl text-red-500 my-4 max-[992px]:text-xl max-[768px]:text-sm max-[576px]:text-xs"
            v-if="this.director.length !== 0">
            Director:
            <span class="text-white font-montserrat underline cursor-pointer hover:text-red-500" v-for="item in director"
              :key="item.id" @click="setPersonId(item.id)"><router-link :to="`/person/${item.id}`">{{ item.original_name
              }}</router-link></span>
          </p>
          <p class="font-montserrat text-2xl text-red-500 max-[992px]:text-xl max-[768px]:text-sm max-[576px]:text-xs">
            Genres:
            <span v-for="genres in this.$store.getters.getMovieDetail.genres" :key="genres.id"
              class="text-white font-montserrat underline mx-0.5 cursor-pointer hover:text-red-500">
              {{ genres.name }}
            </span>
          </p>
          <div class="flex text-2xl text-red-500 my-4 max-[992px]:text-xl max-[768px]:text-sm max-[576px]:text-xs">
            Rating:
            <div class="flex">
              <span class="text-white font-montserrat underline mx-2">{{
                Math.trunc(this.$store.getters.getMovieDetail.vote_average * 10)
                / 10 }}
              </span>
              <img src="@/assets/images/imdb.svg" class="imdb_img" />
            </div>
          </div>
          <p class="text-2xl font-montserrat text-red-500 max-[992px]:text-xl max-[768px]:text-sm max-[576px]:text-xs">
            Original language:
            <span class="text-white  font-montserrat underline">{{
              this.$store.getters.getMovieDetail.original_language?.toUpperCase()
            }}</span>
          </p>
          <p
            class="text-2xl font-montserrat text-red-500 my-4 max-[992px]:text-xl max-[768px]:text-sm max-[576px]:text-xs">
            Release Date:
            <span class="text-white font-montserrat underline">{{
              this.$store.getters.getMovieDetail.release_date || this.$store.getters.getMovieDetail.first_air_date
            }}</span>
          </p>
          <p
            class="text-2xl font-montserrat text-red-500 my-2 max-[992px]:text-xl max-[768px]:text-sm max-[576px]:text-xs">
            Status:
            <span class="text-white font-montserrat underline">{{ this.$store.getters.getMovieDetail.status }}</span>
          </p>
          <p class="text-2xl font-montserrat text-red-500 my-2 max-[992px]:text-xl max-[768px]:text-sm max-[576px]:text-xs"
            v-if="movieDetail.runtime">
            Runtime:
            <span class="text-white font-montserrat underline">{{ this.$store.getters.getMovieDetail.runtime }} min</span>
          </p>
          <p class="text-2xl font-montserrat text-red-500 my-2 max-[992px]:text-xl max-[768px]:text-sm max-[576px]:text-xs"
            v-if="this.$store.getters.getMovieDetail.runtime">
            Production:
            <span class="text-white font-montserrat underline">
              {{ this.$store.getters.getMovieDetail.production_companies.map((i) => i.name).join(", ") }}
            </span>
          </p>
        </div>
      </div>
    </div>
    <!-- /**
      * !Seasons
    */ -->
    <div class="flex flex-col w-full mb-10" v-if="this.$store.getters.getMovieDetail.hasOwnProperty('seasons')">
      <h2
        class="text-white mb-6 font-montserrat text-6xl font-bold underline max-[992px]:text-4xl max-[768px]:text-2xl max-[576px]:text-xl ">
        Seasons
      </h2>
      <seasons />
    </div>
    <!-- /**
      * !Movie cast
    */ -->
    <div class="flex flex-col w-full my-2">
      <h2
        class="text-white font-montserrat text-6xl font-bold underline max-[992px]:text-4xl max-[768px]:text-2xl max-[576px]:text-xl">
        Top Cast
      </h2>
      <actor-list />
    </div>
    <!-- /**
      * ! Movie photos
    */ -->
    <div class="flex flex-col w-full my-5 hover:text-red-600">
      <router-link to="/"
        class="text-white font-montserrat text-6xl font-bold my-5 underline max-[992px]:text-4xl max-[768px]:text-2xl max-[576px]:text-xl cursor-pointer">
        Photos <font-awesome-icon icon="chevron-right"
          class="text-white font-montserrat text-4xl ml-7 text-center content-center hover:text-red-600 cursor-pointer max-[992px]:text-lg" />
      </router-link>
      <image-list class="my-10" />
    </div>
    <!-- /**
      * ! Movie videos
    */ -->
    <div class="flex flex-col w-full my-5">
      <h2
        class="text-white font-montserrat text-6xl font-bold my-5 underline max-[992px]:text-4xl max-[768px]:text-2xl max-[576px]:text-xl">
        Videos
      </h2>
      <video-list />
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import apiMovies from "../../api/api-movies";
import ActorList from "./ActorList.vue";
import ImageList from "./ImageList.vue";
import VideoList from "./VideoList/VideoList.vue";
import Seasons from "../../components/Media/Seasons.vue";
export default {
  name: "movie-detail",
  components: { ActorList, ImageList, VideoList, Seasons },
  data() {
    return {
      url: "https://image.tmdb.org/t/p/original/",
      movieDetail: {},
      video: [],
      director: [],
      crew: [],
      isOpen: false,
    };
  },
  methods: {
    ...mapActions(["setPersonId", "getMovieDetail"]),
    // async getMovieTrailer() {
    //   const id = sessionStorage.getItem("id");
    //   const mediaType = sessionStorage.getItem("media_type");

    //   const result = await apiMovies.getMovieTrailer(id, mediaType);
    //   console.log(result);
    //   this.movieDetail = result;
    //   this.video = this.movieDetail.videos.results;
    // },
    async getActors() {
      const id = sessionStorage.getItem("id");
      const media_type = sessionStorage.getItem("media_type");
      const result = await apiMovies.getActorsList(id, media_type);
      const test = result.crew.filter((item) => item.job === "Director");
      // console.log(test)
      this.director = result.crew.filter((item) => item.job === "Director");
    },
    onReady() {
      this.$refs.youtube.playVideo();
    },
  },
  mounted() {
    this.getMovieDetail()
  },
  created() {
    // this.getMovieTrailer();
    this.getActors();
    this.getMovieDetail()
  },
  computed() {
    // this.getMovieTrailer();
    this.getActors();
    this.getMovieDetail()
  },
};
</script>
<style scoped>
.main_movie_detail {
  display: flex;
  flex-direction: column;
  width: 100%;
  /* height: 100vh; */
  padding: 124px 5% 0% 5%;
  background-size: contain;
  object-fit: cover;
  object-position: center;
  background-repeat: no-repeat;
  background-image: linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%);
}

.icon_close {
  position: absolute;
  top: 15%;
  right: 15%;
  cursor: pointer;
}

.icon_close:hover {
  color: red;
}

.modal {
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 1000;
}

.imdb_img {
  height: 34px;
  width: 70px;
}



.video_player {
  padding: 8px;
  width: 60%;
  height: 60%;
}

.movie_info {
  display: flex;
  flex-direction: column;
  width: 50%;
}

.review {
  aspect-ratio: 16/9;
}

@media (max-width: 1024px) {
  .review {
    object-fit: contain;
    justify-content: start;
    aspect-ratio: 6/2;
    margin: 0;
  }
}

@media (max-width: 768px) {
  .review {
    aspect-ratio: 8/2;
  }

  .more_info_btn {
    width: 100%;
  }

  .imdb_img {
    height: 17px;
    width: 35px;
  }

  .main_movie_detail {
    padding: 124px 2%;
  }

  .video_player {
    width: 95%;
  }
}
</style>
