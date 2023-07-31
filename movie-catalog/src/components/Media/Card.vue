<template>
    <div class="flex flex-col cursor-pointer hover:opacity-70 duration-300" @click="onClickMoreDetail(data.id)">
        <router-link class=" flex object-cover" :to="`/home/${data.original_title || data.name}`">
            <img :src="url + data.poster_path" />
        </router-link>
        <div class="flex flex-col w-full py-4">
            <h2 class="text-white text-3xl font-bold">{{ data.original_title || data.name }}</h2>
            <div class="flex min-w-full justify-between">
                <span class="text-white text-2xl">{{
                    Math.trunc(data.vote_average * 10) / 10
                }} </span>
                <font-awesome-icon :icon="isFav ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'"
                    class="text-4xl text-white cursor-pointer" @click="this.toogleAddFav(data.id)" />
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
    name: "card",
    props: ["data", "addMyListItem", "deleteListItem"],
    data() {
        return {
            url: "https://image.tmdb.org/t/p/original",
            isFav: this.$store.getters.getUserMovieList.some(item => item.id === this.data.id)
        }
    },
    methods: {
        ...mapActions(["selectMovieId", "setMediaType", "deleteItemUserMovieList", "addMovieUserList"]),
        onClickMoreDetail(id,) {
            const media_type = sessionStorage.getItem('media_type')
            this.selectMovieId(id), this.setMediaType(media_type);
        },
        toogleAddFav(id) {
            this.isFav = !this.isFav
            console.log(this.showBtn)

            if (this.isFav === true) {
                this.addMyListItem(id)
                console.log(this.data)
                // this.addMovieUserList(this.data)
            } else {
                this.deleteListItem(id)
                this.deleteItemUserMovieList(id)
            }
        },
    },

}
</script>
<style></style>