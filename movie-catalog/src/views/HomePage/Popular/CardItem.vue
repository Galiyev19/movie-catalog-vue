<template>
  <div class="card" @mouseover="showBtn = true" @mouseleave="showBtn = false">
    <img :src="url + movie.poster_path" alt="poster" class="h-100" />
    <div class="flex w-full flex-col">
      <h2 class="text-white text-3xl font-bold my-2">
        {{ movie.title || movie.name }}
      </h2>
      <div class="flex w-full my-1">
        <img src="@/assets/images/imdb.svg" class="imdb_img" />
        <span class="text-white text-2xl ml-4">{{
          Math.trunc(movie.vote_average * 10) / 10
        }}</span>
        <font-awesome-icon icon="heart" class="text-4xl icon" />
      </div>
    </div>
    <router-link
      :to="`/home/${movie.title || movie.name}`"
      class="btn_more"
      @click="onClickMoreDetail(movie.id, this.media_type)"
      >More detail</router-link
    >
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "card-item",
  data() {
    return {
      url: "https://image.tmdb.org/t/p/original",
      showBtn: false,
    };
  },
  props: ["movie", "genres", "media_type"],
  methods: {
    ...mapActions(["selectMovieId", "setMediaType"]),
    onClickMoreDetail(id, media_type) {
      this.selectMovieId(id), this.setMediaType(media_type);
    },
  },
  created() {},
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  min-width: 30%;
  margin-right: 30px;
  transition: 0.3s;
  justify-content: space-between;
}

.card:hover {
  opacity: 0.7;

  cursor: pointer;
}

.icon {
  margin-left: auto;
}

.icon:hover {
  color: red;
}

.btn_more {
  outline: none;
  border: 1px solid white;
  color: whitesmoke;
  border-radius: 8px;
  padding: 8px 12px;
  width: 100%;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  transition: 0.3s;
  z-index: 100;
  margin: 8px 0px;
}

.btn_more:hover {
  border-color: red;
  color: red;
}

.card_img_h {
  min-height: 300px;
}
</style>
