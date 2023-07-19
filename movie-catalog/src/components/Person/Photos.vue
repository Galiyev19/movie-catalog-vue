<template>
    <div class="grid grid-cols-4 gap-4 mb-5 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
        <img v-for="item in photos" :key="item.id" :src="this.url + item.file_path" />
    </div>
</template>
<script>
export default {
    name: 'photos-grid',
    props: ["photos"],
    data() {
        return {
            url: "https://image.tmdb.org/t/p/original/",
        }
    }
}
</script>
<style></style>