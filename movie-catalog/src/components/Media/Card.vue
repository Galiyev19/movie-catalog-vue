<template>
    <router-link :to="`/home/${data.original_title || data.name}`"
        class="flex flex-col cursor-pointer hover:opacity-70 duration-300" @click="onClickMoreDetail(data.id)">
        <div class=" flex object-cover">
            <img :src="url + data.poster_path" />
        </div>
        <div class="flex flex-col w-full py-4">
            <h2 class="text-white text-3xl font-bold">{{ data.original_title || data.name }}</h2>
            <div class="flex min-w-full justify-between">
                <span class="text-white text-2xl">{{
                    Math.trunc(data.vote_average * 10) / 10
                }} </span>
                <font-awesome-icon icon="heart" class="text-4xl text-white icon hover:text-red-600 duration-300" />
            </div>
        </div>
    </router-link>
</template>
<script>
import { mapActions } from "vuex";
export default {
    name: "card",
    props: ["data"],
    data() {
        return {
            url: "https://image.tmdb.org/t/p/original",
        }
    },
    methods: {
        ...mapActions(["selectMovieId", "setMediaType"]),
        onClickMoreDetail(id,) {
            const media_type = sessionStorage.getItem('media_type')
            this.selectMovieId(id), this.setMediaType(media_type);
        },
    },

}
</script>
<style></style>