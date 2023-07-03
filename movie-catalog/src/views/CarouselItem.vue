<template>
  <div class="slide" v-show="currentSlide === index">
    <img :src="url + movie.backdrop_path" />
  </div>
</template>
<script>
export default {
  name: "carousel-item",
  props: ["movie", "currentSlide", "index"],
  data() {
    return {
      url: "https://image.tmdb.org/t/p/original",
    };
  },
};
</script>
<style>
.slide {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
}

.slide img {
  /* border-radius: 12px; */
  height: 100%;
  width: 100%;
  object-fit: cover;
  margin-left: auto;
  margin-right: auto;
}
</style>
