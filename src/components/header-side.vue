<template>
  <div class="header">
    <router-link to="/home">
      <img class="logo" src="@/assets/images/logo.svg" />
    </router-link>
    <nav class="menu">
      <router-link to="/home"
        class="text-white font-bold text-2xl hover:text-red-700 mx-2 font-montserrat">HOME</router-link>
      <router-link to="/movies"
        class="text-white font-bold text-2xl hover:text-red-700 mx-2 font-montserrat">MOVIE</router-link>
      <router-link to="/tv_serials"
        class="text-white font-bold text-2xl hover:text-red-700 mx-2 font-montserrat">TV</router-link>
      <router-link to="/my-list" class="text-white font-bold text-2xl hover:text-red-700 mx-2 font-montserrat">MY
        LIST</router-link>
    </nav>
    <div class="search_input ">
      <input placeholder="Search"
        class="outline-none border-none w-full bg-transparent font-montserrat placeholder:font-montserrat  placeholder:text-lg placeholder:text-white"
        v-bind:value="search" @input="search = $event.target.value" />
      <router-link to="/search-results" @click="this.inputSearch">
        <font-awesome-icon icon="magnifying-glass" class="text-white text-2xl cursor-pointer" />
      </router-link>
    </div>
    <div class=" user_info" @click="toggleMenu">
      <font-awesome-icon icon="user" class="text-white text-3xl" v-if="this.data?.avatarUrl === undefined" />
      <img :src="this.url + data?.avatarUrl" v-else class="logo rounded-full" />
      <div class="user_menu_block" id="user_menu">
        <ul class="user_menu">
          <router-link to="/profile" class="user_menu_item font-montserrat"><font-awesome-icon icon="user" class="mr-2" />
            Profile</router-link>
          <router-link to="/my-list" class="user_menu_item font-montserrat"> <font-awesome-icon icon="list"
              class="mr-2" />My List</router-link>
          <li class="user_menu_item font-montserrat" @click="LogOut"><font-awesome-icon icon="right-from-bracket"
              class="mr-2" />Logout
          </li>
        </ul>
      </div>
    </div>
    <font-awesome-icon icon="bars-staggered" class="text-3xl burger text-white cursor-pointer" />
  </div>
</template>

<script>
import axios from 'axios'
import apiMovies from '../api/api-movies'
import { mapActions } from 'vuex'
export default {
  name: "header",
  data() {
    return {
      url: "http://localhost:4444/uploads/",
      search: "",
      data: null
    }
  },
  methods: {
    ...mapActions(['setSearchValue', 'getSearchResult']),
    async getUserData() {
      try {
        const response = await axios.get("http://localhost:4444/auth/me", {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer" + localStorage.getItem('token'),
          },
        })
        console.log(response.data)
        this.data = response.data
      } catch (e) {
        console.log(e)
      }
    },
    toggleMenu() {
      let menu = document.getElementById("user_menu")
      menu.classList.toggle("open_menu")
    },
    LogOut() {
      localStorage.removeItem("token")
      localStorage.setItem("isAuth", false)
      this.$router.push("sign-in")
    },
    inputSearch() {
      // console.log(this.search)
      this.setSearchValue(this.search)
      this.getSearchResult(this.search)

    }
  },
  computed() {
    this.inputSearch()
    this.search
    this.getUserData()
  },
  mounted() {
    this.inputSearch()
    this.search
    this.getUserData()
  },
  created() {
    this.getUserData()
  },
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
  display: flex;
  outline: none;
  border: 1px solid black;
  border-radius: 8px;
  font-size: 18px;
  padding: 12px 8px;
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
  border: 1px solid red;
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


.burger {
  display: none;
}


@media (max-width: 1024px) {
  .burger {
    display: flex;
  }

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
