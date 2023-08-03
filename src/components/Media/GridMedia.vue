<template>
    <div class="flex w-full flex-col">
        <div class="grid grid-cols-7 gap-5 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
            <card v-for="item in this.data" :key="item.id" :data="item" :deleteListItem="this.deleteListItem"
                :addMyListItem="this.addMyListItem" />
        </div>
        <div ref="observer"></div>
    </div>
</template>
<script>
import apiMovies from '../../api/api-movies';
import Card from './Card.vue';
import { mapActions } from 'vuex';
import axios from 'axios';
export default {
    name: 'grid-card',
    components: { Card },
    data() {
        return {
            data: [],
            page: 1
        }
    },
    methods: {
        ...mapActions(["getUserInfo", "deleteItemUserMovieList"]),
        init() {
            if (this.$route.params.name) {
                this.getUserInfo()
            }
        },

        async getInfo() {
            this.page += 1
            const media_type = sessionStorage.getItem("media_type")
            const result = await apiMovies.getPopularMovieTv(media_type, this.page);
            this.data = [...this.data, ...result.results]
        },
        async addMyListItem(id) {
            try {
                this.deleteItemUserMovieList(id)

                const findItem = this.data.filter(item => item.id === id)

                const userId = localStorage.getItem("userId")
                const token = localStorage.getItem("token")

                const request = await axios.patch(`${process.env.VUE_APP_API_URL}/user/${userId}`, {
                    method: "PATCH",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    body: findItem[0]
                })

            } catch (error) {
                console.log(error)
            }
        },
        async deleteListItem(id) {
            try {
                const findItem = this.data.filter(item => item.id === id)

                const userId = localStorage.getItem("userId")
                const token = localStorage.getItem("token")

                const request = await axios.patch(`${process.env.VUE_APP_API_URL}/deleteMovie/${userId}`, {
                    method: "PATCH",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    body: findItem[0].id
                })


            } catch (error) {
                console.log(error.response)
            }
        },
    },
    mounted() {
        const options = {
            rootMargin: '0px',
            threshold: 1.0
        }

        const callback = (entries, observer) => {
            if (entries[0].isIntersecting) {
                this.getInfo()
            }
        };

        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer)
    },
    created() {
        this.getInfo()
    },
    computed() {
        this.getInfo()
    }
}
</script>
<style></style>