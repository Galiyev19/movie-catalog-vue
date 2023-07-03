<template>
  <section class="home">
    <header-side />
    <div class="carousel">
      <div class="container_slider">
        <carousel-item
          v-for="(item, index) in movies"
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
    <button class="btn-carousel left" @click="nextSlide">
      <font-awesome-icon
        icon="fa-solid fa-chevron-left"
        class="text-white text-5xl"
      />
    </button>
    <router-view></router-view>
  </section>
</template>

<script>
import HeaderSide from "../components/header-side.vue";
import apiMovies from "../api/api-movies";
import CarouselItem from "./CarouselItem.vue";
export default {
  name: "Home",
  components: { HeaderSide, CarouselItem },
  data() {
    return {
      currentSlide: 0,
      slideInterval: null,
      movies: [],
    };
  },

  methods: {
    async getData() {
      const res = await apiMovies.getPopularMovie();
      this.movies = res.results;
    },
    setCurrentSlide(index) {
      this.currentSlide = index;
    },
    prevSlide() {
      const index =
        this.currentSlide > 0 ? this.currentSlide - 1 : this.movies.length - 1;
      this.setCurrentSlide(index);
    },
    nextSlide() {
      const index =
        this.currentSlide < this.movies.length - 1 ? this.currentSlide + 1 : 0;
      this.setCurrentSlide(index);
    },
  },
  mounted() {
    this.slideInterval = setInterval(() => {
      const index =
        this.currentSlide < this.movies.length - 1 ? this.currentSlide + 1 : 0;
      this.setCurrentSlide(index);
    }, 30000);
  },
  beforeMount() {
    clearInterval(this.slideInterval);
  },
  created() {
    this.getData();
  },
};
</script>

<style>
.icon_size {
  font-size: 20px;
}

body {
  background-color: #232323;
}
.home {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
}

.carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80vh;
  padding: 16px 5%;
}

.container_slider {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.btn-carousel {
  position: absolute;
  top: calc(50% - 25px);
}

.left {
  left: 6%;
}

.right {
  right: 6%;
}
</style>
