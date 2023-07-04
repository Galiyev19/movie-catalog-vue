<template>
  <section class="home">
    <header-side />
    <router-view></router-view>
  </section>
</template>

<script>
import HeaderSide from "../components/header-side.vue";

export default {
  name: "Home",
  components: { HeaderSide },
};
</script>

<style></style>
