<template>
  <div class="main">
    <div class="flex w-full items-start my-4">
      <button class="more_info_btn font-montserrat text-3xl mr-4" v-for="option in options" :key="option.id"
        @click="changeOption(option.value)" :class="{
          currentOption: option.value === this.$store.getters.selectedOptionTV,
        }">
        {{ option.name }}
      </button>
    </div>
    <div class="card_container scroll-smooth overflow-y-auto" id="serial_content" ref="scrollRef">
      <card-item v-for="item in serials" :movie="item" :key="item.id" :media_type="this.media_type"
        :addMyListItem="this.addMyListItem" :deleteListItem="this.deleteListItem" />
    </div>
    <button class="text-white btn-carousel_serial right" @click="next">
      <font-awesome-icon icon="chevron-right" class="text-white font-montserrat text-8xl" />
    </button>
    <button class="btn-carousel_serial left" @click="prev">
      <font-awesome-icon icon="fa-solid fa-chevron-left" class="text-white font-montserrat text-8xl" />
    </button>
  </div>
</template>
<script>
import apiMovies from "../../../api/api-movies";
import CardItem from "../Popular/CardItem.vue";
import { mapActions } from "vuex";
import { ref } from "vue";
import axios from "axios";
export default {
  name: "serials-slider",
  components: { CardItem },
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
  data() {
    return {
      serials: [],
      media_type: "tv",
      options: [
        { id: 1, name: "Top Rated", value: "top_rated" },
        { id: 2, name: "Popular", value: "popular" },
      ],
    };
  },
  methods: {
    ...mapActions(["selectedOptionTV"]),
    async getPopularSerials() {
      const result = await apiMovies.getPopularSerials(
        this.$store.getters.selectedOptionTV
      );
      // console.log(result.results);
      this.serials = result.results;
    },
    changeOption(name) {
      this.selectedOptionTV(name);
      this.getPopularSerials();
    },
    async addMyListItem(id) {
      try {
        const findItem = this.serials.filter(item => item.id === id)
        // console.log(findItem[0])
        const userId = localStorage.getItem("userId")
        const token = localStorage.getItem("token")
        const request = await axios.patch(`${process.env.VUE_APP_API_URL}/user/${userId}`, {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${token}`
          },
          body: findItem[0]
        })

      } catch (e) {
        console.log(e)
      }
    },
    async deleteListItem(id) {
      try {
        const findItem = this.serials.filter(item => item.id === id)

        const userId = localStorage.getItem("userId")
        const token = localStorage.getItem("token")
        const request = await axios.patch(`${process.env.VUE_APP_API_URL}/deleteMovie/${userId}`, {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${token}`
          },
          body: findItem[0].id
        })

      } catch (e) {
        console.log(e)
      }
    },
  },
  created() {
    this.getPopularSerials();
  },
};
</script>
<style scoped>
.main {
  display: flex;
  width: 100%;
}

.card_container {
  display: flex;
  position: relative;
  /* overflow: hidden; */
  height: auto;
  margin-top: 16px;
}

.btn-carousel_serial {
  position: absolute;
  top: 255%;
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

.btn-carousel {
  display: none;
}

::-webkit-scrollbar {
  height: 8px;
  cursor: pointer;
}

::-webkit-scrollbar-thumb {
  background: gray;
  cursor: pointer;
}


/* @media (max-width: 1920px) {
  .btn-carousel_serial {
    top: 278%;
  }
}


@media (max-width: 1600px) {
  .btn-carousel_serial {
    top: 242%;
  }
}

@media (max-width: 1440px) {
  .btn-carousel_serial {
    top: 232%;
  }
}

@media (max-width: 1280px) {
  .btn-carousel_serial {
    top: 280%;
  }
} */

@media (max-width: 1024px) {
  .btn-carousel_serial {
    display: none;
  }
}
</style>
