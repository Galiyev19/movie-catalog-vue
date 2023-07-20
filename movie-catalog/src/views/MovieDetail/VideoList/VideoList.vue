<template>
    <div class="grid gap-5 grid-cols-4 py-5 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
        <video-item v-for="video in videoList" :key="video.id" :video="video" />
        <div class="modal" v-if="this.$store.getters.getShowModalVideo === true">
            <font-awesome-icon icon="circle-xmark" class="text-5xl text-white icon_close max-[992px]:text-3xl"
                @click="this.setShowModalVideo(false)" />
            <modal-video />
        </div>
    </div>
</template> 
<script>
import { mapActions } from 'vuex';
import apiMovies from '../../../api/api-movies';
import VideoItem from './VideoItem.vue';
import ModalVideo from '../../../components/ModalVideo.vue';
export default {
    name: "video-list",
    components: { VideoItem, ModalVideo },
    data() {
        return {
            videoList: [],
        }
    },
    methods: {
        ...mapActions(["setShowModalVideo"]),
        async getVideoList() {
            const media_type = sessionStorage.getItem("media_type");
            const id = sessionStorage.getItem("id");
            const result = await apiMovies.getVideoListById(media_type, id);
            // console.log("video", result)
            this.videoList = result.results;
        },
    },
    created() {
        this.getVideoList()
    },
    computed() {
        this.getVideoList()
    },
}
</script>
<style scoped>
.icon_close {
    position: absolute;
    top: 2%;
    right: 3%;
    cursor: pointer;
}

.modal {
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 100;
}
</style>