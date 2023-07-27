<template>
    <div class="flex w-full h-full p-[124px] px-[3%]">
        <div class="grid gap-4 grid-cols-4">
            <card v-for="item in this.$store.getters.getUserMovieList" :key="item.id" :data="item" />
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import Card from '../../components/Media/Card.vue'
export default {
    name: 'movie-list',
    components: { Card },
    data() {
        return {
            data: []
        }
    },
    methods: {
        ...mapActions(["getUserInfo"]),
        // async getUserData() {
        //     try {
        //         const response = await axios.get("http://localhost:4444/auth/me", {
        //             headers: {
        //                 accept: "application/json",
        //                 Authorization:
        //                     "Bearer" + localStorage.getItem('token'),
        //             },
        //         })
        //         console.log(response.data)
        //         this.data = response.data.movieList
        //     } catch (e) {
        //         console.log(e)
        //     }

        // }
    },
    created() {
        this.getUserInfo()
    },
    computed() {
        this.getUserInfo()
    }
}
</script>
<style></style>