<template>
    <div class="content max-[992px]:w-full">
        <vue-plyr>
            <div data-plyr-provider="youtube" :data-plyr-embed-id="this.$store.getters.getCurrentVideo.key"></div>
        </vue-plyr>
    </div>
</template>
<script>
export default {
    name: "modal-video",
    data() {
        return {

        }
    }
}
</script>
<style>
.content {
    padding: 1rem;
    width: 95%;
    height: 90%;
}
</style>