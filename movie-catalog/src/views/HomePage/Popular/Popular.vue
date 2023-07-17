<template lang="">
  <div class="main">
    <div class="flex w-full flex-wrap items-start my-4">
      <button
        class="more_info_btn text-3xl mr-4 my-4"
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
    <div
      class="card_container scroll-smooth overflow-y-auto"
      id="content"
      ref="scrollRef"
    >
      <card-item
        v-for="item in movies"
        :movie="item"
        :key="item.id"
        :media_type="this.media_type"
      />
    </div>
    <button class="btn-carousel_popular right" @click="next">
      <font-awesome-icon icon="chevron-right" class="text-white text-8xl" />
    </button>
    <button class="btn-carousel_popular left" @click="prev">
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
import { ref } from "vue";
export default {
  setup() {
    const scrollRef = ref(null);

    const next = () => {
      if (scrollRef.value) {
        scrollRef.value.scrollBy({
          left: window.innerWidth,
          behavior: "smooth",
        });
      }
    };

    const prev = () => {
      if (scrollRef.value) {
        scrollRef.value.scrollBy({
          left: -window.innerWidth,
          behavior: "smooth",
        });
      }
    };
    return {
      next,
      scrollRef,
      prev,
    };
  },
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
  /* overflow: hidden; */
  height: auto;
  margin-top: 16px;
}

.btn-carousel_popular {
  position: absolute;
  top: 150%;
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

::-webkit-scrollbar {
  height: 8px;
  cursor: pointer;
}

::-webkit-scrollbar-thumb {
  background: gray;
  cursor: pointer;
}

@media (max-width: 1600px) {
  .btn-carousel_popular {
    top: 150%;
  }
}

@media (max-width: 992px) {
  .btn-carousel_popular {
    display: none;
  }
}
</style>
