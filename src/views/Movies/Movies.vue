<template>
  <div class="movies_main">
    <div class="swipper">
      <carousel-item v-for="(item, index) in movies" :movie="item" :key="`item-${index}`" :current-slide="currentSlide"
        :index="index" />
    </div>
    <button class="btn-carousel right" @click="nextSlide">
      <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-white text-5xl" />
    </button>
    <button class="btn-carousel left" @click="prevSlide">
      <font-awesome-icon icon="fa-solid fa-chevron-left" class="text-white text-5xl" />
    </button>
  </div>
  <div class="flex w-full px-24 py-24">
    <grid-media />
  </div>
</template>
<script>
import apiMovies from '../../api/api-movies';
import GridMedia from '../../components/Media/GridMedia.vue';
import CarouselItem from '../TVSerials/CarouselItem.vue';

export default {
  name: "movies",
  components: { CarouselItem, GridMedia },
  data() {
    return {
      movies: [],
      currentSlide: 0,
      slideInterval: null,
    }
  },
  methods: {
    async getMovies() {
      const result = await apiMovies.getNowPlayingMovie()
      this.movies = result.results
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
    }, 10000);
  },
  beforeMount() {
    clearInterval(this.slideInterval);
  },
  created() {
    this.getMovies()
    sessionStorage.setItem('media_type', 'movie')
  },
  computed() {
    this.getMovies()
    sessionStorage.setItem('media_type', 'movie')
  },
};
</script>
<style scoped>
.movies_main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
}

.swipper {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}
</style>
