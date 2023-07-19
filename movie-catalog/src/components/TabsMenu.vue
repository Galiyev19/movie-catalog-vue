<template>
    <div class="flex w-full justify-center">
        <button v-for="(btn, index) in tabs" :key="btn.id" class="text-white text-2xl mx-2 p-1.5 "
            :class="currentIndex === index ? 'border-b' : 'text-gray-600'" @click="setCurrentindex(index)">{{
                btn.nameTab?.toUpperCase() }}</button>
    </div>
</template>
<script>
export default {
    name: "tabs-menu",
    props: ["tabs", "currentIndex", "setCurrentindex",],
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>
<style></style>