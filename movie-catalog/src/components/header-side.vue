<template>
  <div class="header">
    <img class="logo" src="@/assets/images/logo.png" />
    <nav class="menu">
      <router-link
        to="/"
        class="text-white font-bold text-3xl hover:text-red-700 mx-2"
        >Главная</router-link
      >
      <router-link
        to="/category"
        class="text-white font-bold text-3xl hover:text-red-700 mx-2"
        >Категории</router-link
      >
      <router-link
        to="/"
        class="text-white font-bold text-3xl hover:text-red-700 mx-2"
        >Сериалы</router-link
      >
    </nav>
    <input placeholder="Искать" class="search_input" />
    <div>
      <h2 class="text-white">Аккаунт</h2>
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
  border-bottom: 1px solid white;
  justify-content: space-between;
}

.menu {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.logo {
  height: 60px;
  width: 80px;
}

.search_input {
  outline: none;
  border: 1px solid black;
  border-radius: 8px;
  font-size: 18px;
  padding: 8px 6px;
  width: 45%;
}
</style>
