<template>
  <div class="img_list_container">
    <div class="wrapper">
      <font-awesome-icon
        icon="angles-left"
        class="text-white text-8xl btn_slider max-[992px]:text-6xl max-[768px]:text-4xl max-[576px]:text-2xl max-[418px]:text-xs"
        @click="prev"
      />
      <div class="carousel_img" id="carousel_img">
        <img :src="url + img.file_path" v-for="img in images" :key="img.id" />
      </div>
      <font-awesome-icon
        icon="angles-right"
        class="text-white text-8xl btn_slider max-[992px]:text-6xl max-[768px]:text-4xl max-[576px]:text-2xl max-[418px]:text-xs"
        @click="next"
      />
    </div>
  </div>
</template>
<script>
import apiMovies from "../../api/api-movies";

export default {
  name: "image-list",
  components: {},
  data() {
    return {
      url: "https://image.tmdb.org/t/p/original/",
      images: [],
    };
  },
  methods: {
    async getImages() {
      const id = sessionStorage.getItem("id");
      const media_type = sessionStorage.getItem("media_type");
      const result = await apiMovies.getImageList(id, media_type);
      console.log(result);
      this.images = result.backdrops;
    },
    next() {
      document.getElementById("carousel_img").scrollLeft += 468;
    },
    prev() {
      document.getElementById("carousel_img").scrollLeft -= 468;
    },
  },
  created() {
    this.getImages();
  },
};
</script>
<style scoped>
.img_list_container {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
  padding: 32px 16px;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.carousel_img {
  display: flex;
  width: 100%;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
}

.carousel_img img {
  height: 468px;
  width: calc(100% / 3);
  object-fit: cover;
  margin-left: 24px;
}

.carousel_img img:hover {
  border: 1px solid #fff;
}

.btn_slider {
  /* position: absolute; */
  cursor: pointer;
}

@media (max-width: 1920px) {
  .btn_slider {
    top: 318%;
  }
}

@media (max-width: 990px) {
  .carousel_img img {
    width: calc(100% / 2);
  }
}

@media (max-width: 768px) {
  .carousel_img img {
    width: 100%;
  }
}
</style>
