<template>
    <div class="flex flex-col cursor-pointer hover:opacity-70 duration-300">
        <router-link class=" flex object-cover" :to="`/home/${data.title || data.name}`">
            <img :src="url + data.poster_path" @click="onClickMoreDetail(data.id)" />
        </router-link>
        <div class="flex flex-col w-full py-4">
            <h2 class="text-white text-3xl font-bold">{{ data.original_title || data.name }}</h2>
            <div class="flex min-w-full justify-between">
                <span class="text-white text-2xl">{{
                    Math.trunc(data.vote_average * 10) / 10
                }} </span>
                <font-awesome-icon
                    :icon="this.$store.state.userMovieList?.some(item => item.id === this.data.id) || this.isFav ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'"
                    class="text-4xl text-white cursor-pointer" @click="toogleAddMovie(this.data.id)" />
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
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
        async toogleAddMovie(id) {
            const userId = localStorage.getItem("userId")
            const token = localStorage.getItem("token")

            const userMovieList = await axios(`https://server-movie-catalog.onrender.com/user-movie-list/${userId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            if (userMovieList.data?.some(item => item.id === id)) {
                this.isFav = false
                this.deleteListItem(id)
                this.deleteItemUserMovieList(id)
            } else {
                this.isFav = true
                this.addMyListItem(id)
            }
        }
    },

}
</script>
<style></style>