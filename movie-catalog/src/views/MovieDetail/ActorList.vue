<template>
  <div class="swiper">
    <div class="carousel_actor">
      <button class="text-white text-8xl" @click="prevSlide">
        <font-awesome-icon icon="angles-left" />
      </button>
      <div
        class="card"
        v-for="(actor, index) in actors"
        :key="actor.id"
        v-show="currentSlide === index"
      >
        <img :src="this.url + actor.profile_path" class="" />
        <div class="flex flex-col w-100 items-center justify-center my-2">
          <span class="text-red-600 cursor-pointer font-bold text-2xl">{{
            actor.original_name
          }}</span>
          <span class="text-white text-xl">{{ actor.character }}</span>
        </div>
      </div>
      <button class="text-white text-8xl" @click="nextSlide">
        <font-awesome-icon icon="angles-right" />
      </button>
    </div>
  </div>
</template>
<script>
import apiMovies from "../../api/api-movies";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
export default {
  name: "actor-list-swiper",
  components: { Swiper, SwiperSlide },
  data() {
    return {
      url: "https://image.tmdb.org/t/p/original/",
      actors: [],
      currentSlide: 0,
    };
  },
  methods: {
    async getActorsList() {
      const id = sessionStorage.getItem("id");
      const media_type = sessionStorage.getItem("media_type");
      const result = await apiMovies.getActorsList(id, media_type);
      console.log(result);
      this.actors = result.cast;
    },
    setCurrentSlide(index) {
      this.currentSlide = index;
    },
    prevSlide() {
      const index =
        this.currentSlide > 0 ? this.currentSlide - 1 : this.actors.length - 1;
      this.setCurrentSlide(index);
    },
    nextSlide() {
      const index =
        this.currentSlide < this.actors.length - 1 ? this.currentSlide + 1 : 0;
      this.setCurrentSlide(index);
    },
  },
  created() {
    this.getActorsList();
  },
};
</script>
<style scoped>
.swiper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.carousel_actor {
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* overflow-y: hidden; */
  width: 100%;
  height: 100%;
}

.card {
  scroll-behavior: smooth;
  border-radius: 12px;
}

.card img {
  height: auto;
  width: 600px;
  border-radius: 12px;
}
</style>
