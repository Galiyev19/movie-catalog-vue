<template>
    <div class="grid grid-cols-4 gap-4 mb-5 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
        <router-link :to="`/home/${item.original_title || item.name}`" @click="this.onClickMoreDetail(item.id)"
            class="flex flex-col  p-2 hover:scale-105 duration-300" v-for="item in personCredits" :key="item.id">
            <div class="flex w-full h-full ">
                <img :src="this.url + item.poster_path" class=" object-cover hover:border-2" />
            </div>
            <h4 class="text-white text-2xl font-bold my-2">{{ item.original_title }}</h4>
            <div class="flex">
                <h6 class="text-white text-xl">{{ Math.trunc(item.vote_average * 10) / 10 }}</h6>
                <img src="@/assets/images/imdb.svg" class="imdb_img ml-2" />
            </div>
        </router-link>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    name: "media-grid",
    props: ["personCredits", "media_type"],
    data() {
        return {
            url: "https://image.tmdb.org/t/p/original/",
        }
    },
    methods: {
        ...mapActions(["selectMovieId", "setMediaType"]),
        onClickMoreDetail(id) {
            this.selectMovieId(id), this.setMediaType(this.media_type);
        },
    }
}
</script>
<style>
.card_img_h {
    height: 700px;
    width: 100%;
}
</style>