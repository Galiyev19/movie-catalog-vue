<template lang="">
  <div class="main">
    <div class="flex w-full flex-wrap items-start my-4">
      <button
        class="more_info_btn font-montserrat text-3xl mr-4 my-4 max-[992px]:text-lg"
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
        v-for="item in this.$store.getters.getMovieCarousel"
        :movie="item"
        :key="item.id"
        :media_type="this.media_type"
        :addMyListItem="this.addMyListItem"
        :deleteListItem="this.deleteListItem"
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
import axios from 'axios';
import { ref } from "vue";
import apiMovies from "@/api/api-movies";

import { mapActions, mapState } from "vuex";
import CardItem from "./CardItem.vue";
import ModalAddMovieToFavorite from '../../../components/Modal/ModalAddMovieToFavorite.vue';
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
  components: { CardItem, ModalAddMovieToFavorite },
  data() {
    return {
      movies: this.$store.getters.getMovieCarousel,
      genres: [],
      myList: {},
      media_type: "movie",
      options: [
        { id: 1, name: "Now Playing", value: "now_playing" },
        { id: 2, name: "Top Rated", value: "top_rated" },
        { id: 3, name: "Upcomming", value: "upcoming" },
        { id: 4, name: "Popular", value: "popular" },
      ],

    };
  },
  methods: {
    ...mapActions(["selectedOpitonMovie", "getUserInfo", "getMovieCarousel"]),
    async getData() {
      this.getMovieCarousel(this.$store.getters.selectedOptionMovie)
    },
    async getGenres() {
      const res = await apiMovies.getGenres();
      this.genres = res;
    },
    changeOption(name) {
      this.selectedOpitonMovie(name);
      this.getData();
    },
    async addMyListItem(id) {
      try {
        const findItem = this.$store.getters.getMovieCarousel.filter(item => item.id === id)
        // console.log(findItem[0])
        const userId = localStorage.getItem("userId")
        const token = localStorage.getItem("token")
        const request = await axios.patch(`http://localhost:4444/user/${userId}`, {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${token}`
          },
          body: findItem[0]
        })
      } catch (e) {
        console.log(e.response)
      }
    },
    async deleteListItem(id) {
      try {
        const findItem = this.$store.getters.getMovieCarousel.filter(item => item.id === id)
        // console.log(findItem[0])
        const userId = localStorage.getItem("userId")
        const token = localStorage.getItem("token")
        const request = await axios.patch(`http://localhost:4444/deleteMovie/${userId}`, {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${token}`
          },
          body: findItem[0].id
        })

      } catch (e) {
        console.log(e.response)
      }
    },

  },
  computed: { ...mapState(['userMovieList']) },
  mounted() {
    this.getMovieCarousel(this.$store.getters.selectedOptionMovie)
  },
  created() {
    this.getMovieCarousel(this.$store.getters.selectedOptionMovie)
    this.getData();
    this.getGenres();
    this.getUserInfo()
  },
}
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


@media (max-width: 1920px) {
  .btn-carousel_popular {
    top: 160%;
  }
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
