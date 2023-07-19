<template>
    <div class="card" @click="showModalVideo(this.video)">
        <div class="flex w-full">
            <div class="relative hover:scale-105 transition-all">
                <img :src="`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`"
                    class="hover:scale-105 hover:opacity-70 relative object-cover" />
                <div class="flex w-full h-full absolute inset-0">
                    <font-awesome-icon icon="circle-play" class="text-white text-6xl m-auto hover:text-red-600" />
                </div>
            </div>
        </div>
        <div class="description">
            <span class="text-red-600 text-2xl">{{ video.name }}</span>
            <span class="text-white text-md">{{ video.type }}</span>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import ModalVideo from '../../../components/ModalVideo.vue';
export default {
    name: "video-item",
    components: { ModalVideo },
    props: ["video"],
    data() {
        return {

        }
    },
    methods: {
        ...mapActions(["setCurrentVideo", "setShowModalVideo"]),
        showModalVideo(video) {
            this.setCurrentVideo(video), this.setShowModalVideo(true)
        }
    }
}
</script>
<style>
.card {
    display: flex;
    flex-direction: column;
    cursor: pointer;
}

.description {
    display: flex;
    flex-direction: column;
    padding: .5rem 0px;
}

.icon_close {
    position: absolute;
    top: 15%;
    right: 15%;
    cursor: pointer;
}

.icon_close:hover {
    color: red;
}
</style>