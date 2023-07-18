<template lang="">
  <div class="main">
    <div class="carousel">
      <div class="container_slider">
        <carousel-item
          v-for="(item, index) in serials"
          :movie="item"
          :key="`item-${index}`"
          :current-slide="currentSlide"
          :index="index"
        />
      </div>
    </div>
    <button class="btn-carousel right" @click="nextSlide">
      <font-awesome-icon
        icon="fa-solid fa-chevron-right"
        class="text-white text-5xl"
      />
    </button>
    <button class="btn-carousel left" @click="prevSlide">
      <font-awesome-icon
        icon="fa-solid fa-chevron-left"
        class="text-white text-5xl"
      />
    </button>
  </div>
</template>
<script>
import apiMovies from "../../api/api-movies";
import CarouselItem from "./CarouselItem.vue";
export default {
  name: "tv-serials",
  components: { CarouselItem },
  data() {
    return {
      serials: [],
      currentSlide: 0,
      slideInterval: null,
    };
  },
  methods: {
    async getTvSerials() {
      const result = await apiMovies.getTVSerials();
      console.log(result.results);
      this.serials = result.results;
    },
    setCurrentSlide(index) {
      this.currentSlide = index;
    },
    prevSlide() {
      const index =
        this.currentSlide > 0 ? this.currentSlide - 1 : this.serials.length - 1;
      this.setCurrentSlide(index);
    },
    nextSlide() {
      const index =
        this.currentSlide < this.serials.length - 1 ? this.currentSlide + 1 : 0;
      this.setCurrentSlide(index);
    },
  },
  mounted() {
    this.slideInterval = setInterval(() => {
      const index =
        this.currentSlide < this.serials.length - 1 ? this.currentSlide + 1 : 0;
      this.setCurrentSlide(index);
    }, 10000);
  },
  beforeMount() {
    clearInterval(this.slideInterval);
  },
  created() {
    this.getTvSerials();
  },
};
</script>
<style>
.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
}
</style>
