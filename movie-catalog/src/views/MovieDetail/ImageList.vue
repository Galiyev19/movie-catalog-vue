<template>
  <div class="img_list_container">
    <div class="wrapper">
      <button class="btn_slider" @click="prev">
        <font-awesome-icon icon="chevron-left"
          class="text-white text-6xl max-[992px]:text-6xl max-[768px]:text-4xl max-[576px]:text-2xl max-[418px]:text-xs hover:text-red-500" />
      </button>
      <div class="carousel_img" id="carousel_img" ref="scrollRef">
        <img :src="url + img.file_path" v-for="img in images" :key="img.id" />
      </div>
      <button class="btn_slider" @click="next">
        <font-awesome-icon icon="chevron-right"
          class="text-white text-6xl max-[992px]:text-6xl max-[768px]:text-4xl max-[576px]:text-2xl max-[418px]:text-xs hover:text-red-500" />
      </button>
    </div>
  </div>
</template>
<script>
import apiMovies from "../../api/api-movies";
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
  /* border: 1px solid #fff; */
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
  /* overflow: hidden; */
  overflow-y: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
}

.carousel_img img {
  height: 468px;
  width: calc(100% / 3);
  object-fit: cover;
  margin-left: 8px;
  margin-bottom: 16px;
}

.carousel_img img:hover {
  border: 1px solid #fff;
}

.btn_slider {
  border-radius: 4px;
  border: 1px solid #ffffffb3;
  background: rgb(18, 18, 18);
  /* position: absolute; */
  cursor: pointer;
  margin: 0px 8px;
  padding: 0.75rem 0.25rem;
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
  .btn_slider {
    top: 318%;
  }
}

@media (max-width: 1440px) {
  .carousel_img img {
    width: calc(100% / 2);
  }
}


@media (max-width: 990px) {
  .carousel_img img {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .carousel_img img {
    width: 100%;
  }
}
</style>
