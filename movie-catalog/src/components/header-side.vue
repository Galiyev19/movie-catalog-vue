<template>
  <div class="header">
    <router-link to="/home">
      <img class="logo" src="@/assets/images/logo.svg" />
    </router-link>
    <nav class="menu">
      <router-link
        to="/home"
        class="text-white font-bold text-3xl hover:text-red-700 mx-2"
        >Home</router-link
      >
      <router-link
        to="/category"
        class="text-white font-bold text-3xl hover:text-red-700 mx-2"
        >TV Serials</router-link
      >
      <router-link
        to="/"
        class="text-white font-bold text-3xl hover:text-red-700 mx-2"
        >Actors</router-link
      >
    </nav>
    <input placeholder="Search" class="search_input" />
    <div>
      <h2 class="text-white">Account</h2>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 32px 5%;
  /* border-bottom: 1px solid white; */
  justify-content: space-between;
  position: absolute;
  z-index: 100;
}

.menu {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.logo {
  height: 60px;
  width: 80px;
  cursor: pointer;
}

.search_input {
  outline: none;
  border: 1px solid black;
  border-radius: 8px;
  font-size: 18px;
  padding: 8px 6px;
  width: 45%;
  background: rgba(0, 0, 0, 0);
  outline: none;
  border: 1px solid white;
  color: white;
}

.search_input::placeholder {
  color: white;
}

.search_input:focus {
  border: 1px solid cyan;
}
</style>
