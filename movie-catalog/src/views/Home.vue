<template>
  <section class="home">
    <header-side />
    <router-view></router-view>
    <footer-vue />
  </section>
</template>

<script>
import footerVue from "../components/footer.vue";
import HeaderSide from "../components/header-side.vue";

export default {
  name: "Home",
  components: { HeaderSide, footerVue },
};
</script>

<style>
body {
  min-height: 100%;
}

.home {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}
</style>
