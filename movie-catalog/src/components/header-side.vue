<template>
  <div class="header">
    <router-link to="/home">
      <img class="logo" src="@/assets/images/logo.svg" />
    </router-link>
    <nav class="menu">
      <router-link to="/home" class="text-white font-bold text-3xl hover:text-red-700 mx-2">Home</router-link>
      <router-link to="/movies" class="text-white font-bold text-3xl hover:text-red-700 mx-2">Movie</router-link>
      <router-link to="/tv_serials" class="text-white font-bold text-3xl hover:text-red-700 mx-2">TV Serials</router-link>
      <router-link to="/tv_serials" class="text-white font-bold text-3xl hover:text-red-700 mx-2">My List</router-link>
    </nav>
    <input placeholder="Search" class="search_input" />
    <div class="user_info" @click="toggleMenu">
      <font-awesome-icon icon="user" class="text-white text-3xl" />
      <div class="user_menu_block" id="user_menu">
        <ul class="user_menu">
          <router-link to="/profile" class="user_menu_item"><font-awesome-icon icon="user" class="mr-2" />
            Profile</router-link>
          <li class="user_menu_item"> <font-awesome-icon icon="list" class="mr-2" />My List</li>
          <li class="user_menu_item" @click="LogOut"><font-awesome-icon icon="right-from-bracket" class="mr-2" />Logout
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "header",
  methods: {
    toggleMenu() {
      let menu = document.getElementById("user_menu")
      menu.classList.toggle("open_menu")
    },
    LogOut() {
      localStorage.removeItem("token")
      this.$router.push("sign-in")
    }
  }
}
</script>

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

.user_info {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 60px;
  border: 1px solid #fff;
  border-radius: 50%;
  cursor: pointer;
}

.user_menu_block {
  position: absolute;
  background: #fff;
  top: 80%;
  right: 2.5%;
  width: 180px;
  border-radius: 8px;
  max-height: 0px;
  overflow: hidden;
  transition: max-height 0.5s;
}

.user_menu_block.open_menu {
  max-height: 300px;
}

.user_menu {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 4px 0px;
}

.user_menu_item {
  font-size: 24px;
  padding: 9px 16px;
  width: 100%;
  text-align: start;
}

.user_menu_item:hover {
  background: #f80505;
}

@media (max-width: 992px) {
  .menu {
    display: none;
  }

  .search_input {
    display: none;
  }

  .user_info {
    display: none;
  }

  .header {
    padding: 8px 5%;
  }
}
</style>
