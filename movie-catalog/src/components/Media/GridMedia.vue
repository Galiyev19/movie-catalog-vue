<template>
    <div class="flex w-full flex-col">
        <div class="grid grid-cols-5 gap-5 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
            <card v-for="item in this.data" :key="item.id" :data="item" />
        </div>
        <div ref="observer"></div>
    </div>
</template>
<script>
import apiMovies from '../../api/api-movies';
import Card from './Card.vue';
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
        async getInfo() {
            this.page += 1
            const media_type = sessionStorage.getItem("media_type")
            const result = await apiMovies.getPopularMovieTv(media_type, this.page);
            this.data = [...this.data, ...result.results]
        }
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