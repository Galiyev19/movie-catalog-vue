<template>
    <div class="fixed z-20 right-[3%] top-[8%] rounded-xl  bg-slate-700 p-6 text-center text-white"
        :class="this.$store.state.isAdd === false ? 'hidden' : 'flex'">
        <div :class="this.$store.state.isAdd === true ? 'transform-x-0' : 'modal_add_movie_in_my_list'">
            <h2 class="text-3xl">Movie is add in your list</h2>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    name: "modal-movie-add-to-list",
    data() {
        return {

        }
    },
    methods: {
        ...mapActions(['setIsAdd'])
    },
    computed() {

    },
    mounted() {

    },
}
</script>
<style>
.modal_add_movie_in_my_list {
    transform: translateX(120%);
    transition: transform 500ms ease;
}

.show_modal {
    transform: translateX(0);
}
</style>