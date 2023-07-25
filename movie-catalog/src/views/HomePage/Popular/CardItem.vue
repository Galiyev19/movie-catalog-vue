<template>
  <div class="card min-w-[32rem]">
    <router-link :to="`/home/${movie.title || movie.name}`" @click="onClickMoreDetail(movie.id, this.media_type)">
      <img :src="url + movie.poster_path" alt="poster" />
    </router-link>
    <div class="flex w-full flex-col">
      <h2 class="text-white font-montserrat text-4xl font-bold my-2">
        {{ movie.title || movie.name }}
      </h2>
      <div class="flex w-full my-1 px-2 justify-between">
        <div class="flex">
          <img src="@/assets/images/imdb.svg" class="imdb_img" />
          <span class="text-white font-montserrat text-2xl ml-4">{{
            Math.trunc(movie.vote_average * 10) / 10
          }}</span>
        </div>
        <div class="flex">
          <font-awesome-icon icon="heart"
            :class="!this.$store.getters.getUserMovieList.find(item => item.id === movie.id) ? 'flex' : 'hidden'"
            class="text-4xl text-white icon" @click="this.addMyListItem(movie.id)" />
          <font-awesome-icon icon="trash"
            :class="this.$store.getters.getUserMovieList.find(item => item.id === movie.id) ? 'flex' : 'hidden'"
            class="text-4xl text-white icon" @click="this.deleteListItem(movie.id)" />

        </div>
      </div>
    </div>
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
      test: false
    };
  },
  props: ["movie", "genres", "media_type", "addMyListItem", "deleteListItem"],
  methods: {
    ...mapActions(["selectMovieId", "setMediaType"]),
    onClickMoreDetail(id, media_type) {
      this.selectMovieId(id), this.setMediaType(media_type);
    },
    isFav() {
      this.test = !this.test
      console.log(this.test)
    }
  },
  created() { },
  computed() {
    this.isFav()
    this.$store.getters.getUserMovieList
  }
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  min-width: 25%;
  width: 100%;
  margin-right: 30px;
  transition: 0.3s;
  justify-content: space-between;
  margin-bottom: 16px;
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
  height: 700px;
  width: 100%;
}

.card_img_h:hover {
  transform: scale(1);
}

@media (max-width: 1280px) {
  .card {
    min-width: 50%;
    margin-right: 15px;
  }
}

@media (max-width: 992px) {
  .card {
    min-width: 100%;
    margin-right: 15px;
    justify-content: space-around;
  }
}
</style>
