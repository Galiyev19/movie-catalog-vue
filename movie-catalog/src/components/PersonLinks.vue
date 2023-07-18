<template >
    <div class="links">
        <a :href="`https://instagram.com/${links.instagram_id}`" class="cursor-pointer mx-2" target=”_blank”>
            <font-awesome-icon :icon="['fab', 'instagram']" bounce class="text-white text-5xl  hover:text-cyan-600" />
        </a>
        <a :href="`https://facebook.com/${links.facebook_id}`" class="cursor-pointer mx-2" target=”_blank”>
            <font-awesome-icon :icon="['fab', 'facebook']" bounce class="text-white text-5xl  hover:text-cyan-600" />
        </a>
        <a :href="`https://twitter.com/${links.twitter_id}`" class="cursor-pointer mx-2" target=”_blank”>
            <font-awesome-icon :icon="['fab', 'twitter']" bounce class="text-white text-5xl  hover:text-cyan-600" />
        </a>
        <a :href="`https://www.imdb.com/name/${links.imdb_id}`" class="cursor-pointer mx-2" target=”_blank”>
            <font-awesome-icon :icon="['fab', 'imdb']" bounce class="text-white text-5xl  hover:text-cyan-600" />
        </a>
    </div>
</template>
<script>
import apiMovies from '../api/api-movies';
export default {
    name: "peron-links",
    data() {
        return {
            links: {}
        }
    },
    methods: {
        async getLinks(id) {
            const personId = sessionStorage.getItem('personId')
            const result = await apiMovies.getLinks(personId)
            console.log(result)
            this.links = result
        }
    },
    created() {
        this.getLinks()
    },
    computed() {
        this.getLinks()
    }
}
</script>
<style>
.links {
    display: flex;
    padding: 0.5rem 0px;
}
</style>