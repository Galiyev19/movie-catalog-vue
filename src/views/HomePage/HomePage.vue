<template>
  <div class="carousel">
    <div class="container_slider">
      <carousel-item v-for="(item, index) in this.$store.getters.getTredingAll" :movie="item" :key="item.id"
        :current-slide="currentSlide" :index="index" :addMyList="addMyList" :deleteMovie="deleteMovie" />
    </div>
  </div>
  <button class="btn-carousel right" @click="nextSlide">
    <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-white text-5xl" />
  </button>
  <button class="btn-carousel left" @click="prevSlide">
    <font-awesome-icon icon="fa-solid fa-chevron-left" class="text-white text-5xl" />
  </button>

  <div class="popular">
    <div class="flex w-full justify-between items-end flex-wrap">
      <h2 class="text-8xl text-white max-[576px]:text-4xl font-montserrat">Featured Movie</h2>
      <h2 class="text-4xl text-red-600 cursor-pointer hover:text-white max-[414px]:text-2xl font-montserrat">
        See more <font-awesome-icon icon="chevron-right" />
      </h2>
    </div>
    <popular />
  </div>

  <div class="serials">
    <div class="flex w-full justify-between items-end flex-wrap">
      <h2 class="text-8xl text-white max-[992px]:text-4xl font-montserrat">TV Serials</h2>
      <h2 class="text-4xl text-red-600 cursor-pointer hover:text-white max-[414px]:text-2xl font-montserrat">
        See more <font-awesome-icon icon="chevron-right" />
      </h2>
    </div>
    <serial-slider />
  </div>
  <modal-add-movie-to-favorite v-if="this.$store.getters.getIsAdd" />
</template>

<script>
import apiMovies from "../../api/api-movies";
import CarouselItem from "../TVSerials/CarouselItem.vue";
import Popular from "./Popular/Popular.vue";
import SerialSlider from "./SerialsSlider/SerialsSlider.vue";
import ModalAddMovieToFavorite from "../../components/Modal/ModalAddMovieToFavorite.vue";
import { mapActions } from 'vuex'

export default {
  name: "Home",
  components: { CarouselItem, Popular, SerialSlider, ModalAddMovieToFavorite },
  data() {
    return {
      currentSlide: 0,
      slideInterval: null,
      data: [],
    };
  },

  methods: {
    ...mapActions(["getUserInfo", "getMovieCarousel", "setIsAdd", 'getTredingAll']),
    async addMyList(data) {
      const response = await apiMovies.addMovieUserList(data)
      console.log(response)
    },
    async deleteMovie(data) {
      await apiMovies.deleteMovieInUserList(data);
    },
    async getData() {
      const res = await apiMovies.getNowPlayingMovie();
      console.log(res.results)
      this.data = res?.results;
    },
    setCurrentSlide(index) {
      this.currentSlide = index;
    },
    prevSlide() {
      const index = this.currentSlide > 0 ? this.currentSlide - 1 : this.data.length - 1;
      this.setCurrentSlide(index);
    },
    nextSlide() {
      const index = this.currentSlide < this.data.length - 1 ? this.currentSlide + 1 : 0;
      this.setCurrentSlide(index);
    },
  },
  mounted() {
    this.slideInterval = setInterval(() => {
      const index = this.currentSlide < this.data.length - 1 ? this.currentSlide + 1 : 0;
      this.setCurrentSlide(index);
    }, 10000);
    this.getTredingAll()
  },
  beforeMount() {
    clearInterval(this.slideInterval);
  },
  created() {
    this.getUserInfo()
    this.getData(this.selectedOption);
    this.getTredingAll()
  },
  computed() {
    this.getTredingAll()
  },

};
</script>
<style>
body {
  background-color: #232323;
}

.icon_size {
  font-size: 20px;
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
  min-height: 100vh;
  /* padding: 16px 5%; */
}

.container_slider {
  width: 100%;
  height: 100%;
  /* position: relative;
  overflow: hidden; */
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

.popular {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 3% 5%;
}

.serials {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 3% 5%;
}
</style>
