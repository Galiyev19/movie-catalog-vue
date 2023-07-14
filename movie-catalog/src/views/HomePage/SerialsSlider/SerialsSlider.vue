<template>
  <div class="main">
    <div class="flex w-full items-start my-4">
      <button
        class="more_info_btn text-3xl mr-4"
        v-for="option in options"
        :key="option.id"
        @click="changeOption(option.value)"
        :class="{
          currentOption: option.value === this.$store.getters.selectedOptionTV,
        }"
      >
        {{ option.name }}
      </button>
    </div>
    <div
      class="card_container scroll-smooth overflow-x-auto"
      id="serial_content"
    >
      <card-item
        v-for="item in serials"
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
import apiMovies from "../../../api/api-movies";
import CardItem from "../Popular/CardItem.vue";
import { mapActions } from "vuex";

export default {
  name: "serials-slider",
  components: { CardItem },
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
    next() {
      document.getElementById("serial_content").scrollLeft += 500;
    },
    prev() {
      document.getElementById("serial_content").scrollLeft -= 500;
    },
    changeOption(name) {
      this.selectedOptionTV(name);
      this.getPopularSerials();
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
  overflow: hidden;
  height: auto;
  margin-top: 16px;
}

.btn-carousel {
  position: absolute;
  top: 270%;
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
</style>
