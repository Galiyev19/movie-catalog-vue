<template lang="">
  <div class="main">
    <div class="flex w-full items-start my-4">
      <button
        class="more_info_btn text-3xl mr-4"
        :class="{
          currentOption:
            option.value === this.$store.getters.selectedOptionMovie,
        }"
        v-for="option in options"
        :key="option.id"
        @click="changeOption(option.value)"
      >
        {{ option.name }}
      </button>
    </div>
    <div class="card_container scroll-smooth overflow-x-auto" id="content">
      <card-item
        v-for="item in movies"
        :movie="item"
        :key="item.id"
        :media_type="this.media_type"
      />
    </div>
    <button class="text-white btn-carousel right" @click="next">
      <font-awesome-icon icon="chevron-right" class="text-white text-8xl" />
    </button>
    <button class="btn-carousel left" @click="prev">
      <font-awesome-icon
        icon="fa-solid fa-chevron-left"
        class="text-white text-8xl"
      />
    </button>
  </div>
</template>
<script>
import apiMovies from "@/api/api-movies";
import CardItem from "./CardItem.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { mapActions } from "vuex";
export default {
  name: "popular",
  components: { CardItem, Swiper, SwiperSlide },
  data() {
    return {
      movies: [],
      genres: [],
      media_type: "movie",
      options: [
        { id: 1, name: "Now Playing", value: "now_playing" },
        { id: 1, name: "Top Rated", value: "top_rated" },
        { id: 1, name: "Upcomming", value: "upcoming" },
        { id: 2, name: "Popular", value: "popular" },
      ],
    };
  },
  methods: {
    ...mapActions(["selectedOpitonMovie"]),
    async getData() {
      const res = await apiMovies.getPopulaMovie(
        this.$store.getters.selectedOptionMovie
      );
      // console.log(res.results);
      this.movies = res.results;
    },
    async getGenres() {
      const res = await apiMovies.getGenres();
      this.genres = res;
    },
    next() {
      document.getElementById("content").scrollLeft += 700;
      document.getElementById("content").clientX += 700;
    },
    prev() {
      document.getElementById("content").scrollLeft -= 700;
    },
    changeOption(name) {
      this.selectedOpitonMovie(name);
      this.getData();
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
  top: calc(160% - 25px);
}

.left {
  left: 6%;
}
.right {
  right: 6%;
}
.currentOption {
  border-color: red;
  color: red;
}
</style>
