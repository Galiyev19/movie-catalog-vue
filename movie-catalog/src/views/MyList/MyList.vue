<template>
    <div class="flex w-full- p-[124px] px-[3%]">
        <div class="grid gap-4 grid-cols-4">
            <card v-for="item in this.$store.getters.getUserMovieList" :key="item.id" :data="item"
                :deleteListItem="this.deleteListItem" />
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
                console.log(this.data)
                const findItem = this.data.filter(item => item.id === id)
                console.log(findItem[0])
                const userId = localStorage.getItem("userId")
                const token = localStorage.getItem("token")
                const request = await axios.patch(`http://localhost:4444/deleteMovie/${userId}`, {
                    method: "PATCH",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    body: findItem[0].id
                })
                console.log("ITEM IS DELETED")
                console.log(request)
            } catch (error) {
                console.log(error)
            }
        },
    },
    created() {
        // this.getUserInfo()
    },
    computed() {
        // this.getUserInfo()
    }
}
</script>
<style></style>