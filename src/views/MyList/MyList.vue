<template>
    <div class="flex w-full h-screen p-[124px] px-[3%]">
        <div class="h-full grid grid-cols-6 gap-5 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
            <card v-for="item in this.$store.getters.getUserMovieList" :key="item.id" :data="item"
                :deleteListItem="this.deleteListItem" :deleteItemUserMovieList="deleteItemUserMovieList" />
            <h1 class="text-white text-6xl font-bold" v-if="this.$store.getters.getUserMovieList?.length <= 0">Empty</h1>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import axios from 'axios'
import Card from '../../components/Media/Card.vue'
export default {
    name: 'movie-list',
    components: { Card },
    data() {
        return {
            data: this.$store.getters.getUserMovieList
        }
    },
    methods: {
        ...mapActions(["getUserInfo", "deleteItemUserMovieList"]),
        onClickMoreDetail(id,) {
            const media_type = sessionStorage.getItem('media_type')
            this.selectMovieId(id), this.setMediaType(media_type);
        },
        async deleteListItem(id) {
            try {

                const findItem = this.data.filter(item => item.id === id)
                console.log(findItem[0])
                const userId = localStorage.getItem("userId")
                const token = localStorage.getItem("token")
                const request = await axios.patch(`${process.env.VUE_APP_API_URL}/deleteMovie/${userId}`, {
                    method: "PATCH",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    body: findItem[0]?.id
                })
            } catch (error) {
                console.log(error)
            }
        },
    },
    created() {
        this.getUserInfo()
    },
    computed() {
        this.getUserInfo()
    },
    mounted() {
        this.getUserInfo()
    },
}
</script>
<style></style>