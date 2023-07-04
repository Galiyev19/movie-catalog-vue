<template lang="">
  <div class="main">
    <div class="card_container scroll-smooth overflow-x-auto" id="content">
      <card-item v-for="item in movies" :movie="item" />
    </div>
    <button class="text-white btn-carousel right" @click="next">
      <font-awesome-icon icon="chevron-right" class="text-white text-5xl" />
    </button>
    <button class="btn-carousel left" @click="prev">
      <font-awesome-icon
        icon="fa-solid fa-chevron-left"
        class="text-white text-5xl"
      />
    </button>
  </div>
</template>
<script>
import apiMovies from "@/api/api-movies";
import CardItem from "./CardItem.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
export default {
  name: "popular",
  components: { CardItem, Swiper, SwiperSlide },
  data() {
    return {
      movies: [],
      modules: [Pagination],
      genres: [],
    };
  },
  methods: {
    async getData() {
      const res = await apiMovies.getPopulaMovieSerialsTV();
      console.log(res.results);
      const temp = [];
      res.results.map((item) => temp.push(item.genre_ids));
      console.log(temp);
      this.movies = res.results;
    },
    async getGenres() {
      const res = await apiMovies.getGenres();
      console.log(res);
    },
    next() {
      document.getElementById("content").scrollLeft += 700;
    },
    prev() {
      document.getElementById("content").scrollLeft -= 700;
    },
  },
  created() {
    this.getData();
    this.getGenres();
  },
};
</script>
<style scoped>
.main {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.card_container {
  display: flex;
  overflow: hidden;
  height: auto;
  margin-top: 16px;
}

.btn-carousel {
  position: absolute;
  top: calc(150% - 25px);
}

.btn-carousel:focus {
  color: red;
}

.left {
  left: 6%;
}

.right {
  right: 6%;
}
</style>
