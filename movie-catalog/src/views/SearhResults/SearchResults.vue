<template>
    <div class="flex w-full h-full pt-[124px] px-[3%]">
        <div class="flex w-full flex-col">
            <div class="grid grid-cols-5 gap-5 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
                <card v-for="item in this.$store.getters.getSearchResult" :key="item.id" :data="item" />
            </div>
            <div ref="observer"></div>
        </div>
    </div>
</template>
<script>
import apiMovies from '../../api/api-movies';
import Card from '../../components/Media/Card.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
    components: { Card },
    name: "search-results",
    data() {
        return {
            data: this.$store.getters.getSearchResult,
        }
    },
    methods: {
        ...mapActions(['getSearchResult']),

    },
    created() {
        console.log(this.$store.getters.getSearchResult)
        this.$store.getters.getSearchResult
    },
    mounted() {

    },
    computed() {

    }
}
</script>
<style></style>