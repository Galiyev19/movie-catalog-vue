<template>
  <div class="main">
    <div
      class="card_container scroll-smooth overflow-x-auto"
      id="serial_content"
    >
      <card-item v-for="item in serials" :movie="item" :key="item.id" />
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

export default {
  name: "serials-slider",
  components: { CardItem },
  data() {
    return {
      serials: [],
    };
  },
  methods: {
    async getPopularSerials() {
      const result = await apiMovies.getPopularSerials();
      // console.log(result.results);
      this.serials = result.results;
    },
    next() {
      document.getElementById("serial_content").scrollLeft += 700;
    },
    prev() {
      document.getElementById("serial_content").scrollLeft -= 700;
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
  overflow: hidden;
  height: auto;
  margin-top: 16px;
}

.btn-carousel {
  position: absolute;
  top: calc(260% - 25px);
}

.left {
  left: 6%;
}
.right {
  right: 6%;
}

@media (max-width: 1680px) {
  .btn-carousel {
    top: calc(250%);
  }
}

@media (max-width: 1480px) {
  .btn-carousel {
    top: calc(230%);
  }
}

@media (max-width: 1320px) {
  .btn-carousel {
    top: calc(225%);
  }
}
</style>
