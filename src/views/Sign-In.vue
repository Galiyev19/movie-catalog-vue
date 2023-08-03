<template>
  <main class="main_sign_in relative min-h-screen w-full bg-no-repeat bg-center bg-fixed bg-cover">
    <div className="w-full h-full md:bg-opacity-25 p-2">
      <div className="flex justify-center content-center w-full min-h-screen ">
        <form
          className="flex flex-col text-center bg-black bg-opacity-70 px-4 py-4 self-center mt-2 lg:w-2/5  lg:max-w-md rounded-md w-full"
          @submit.prevent="handleSubmit">
          <h2 className="text-white font-bold text-4xl">Войти</h2>
          <div className="flex w-full flex-col">
            <span className="text-white text-xl text-start">Почта</span>
            <input className="outline-none my-4 rounded-sm p-2 text-xl" placeholder="Введите почту" type="email"
              v-bind:value="email" @input="email = $event.target.value" />
            <span className="text-white text-xl text-start">Пароль</span>
            <div className="flex w-full bg-white my-4 rounded-sm p-2 ">
              <input className="outline-none border-none w-full text-xl" :type="showPassword ? '' : `password`"
                minlength="5" placeholder="Введите пароль" v-bind:value="password"
                @input="password = $event.target.value" />
              <label className="relative top-0 left-0 z-10" @click="showPassword = !showPassword">
                <font-awesome-icon icon="eye" v-if="showPassword" />
                <font-awesome-icon icon="eye-slash" v-if="!showPassword" />
              </label>
            </div>
            <span v-if="this.error.length > 0" class="text-red-600 text-2xl">{{ this.error }}</span>
            <button type="submit" className="w-full bg-green-400 p-2 rounded-sm text-white my-2">
              Войти
            </button>
            <div className="flex justify-center w-full mt-4 text-center">
              <label className="text-white text-center">
                Нету аккаунта?
                <router-link to="/sign-up" className="mx-1 text-blue-300 text-center">
                  зарегистрироваться
                </router-link>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
export default {
  name: "sign-in",
  data() {
    return {
      email: "",
      password: "",
      error: "",
      showPassword: false
    }
  },
  methods: {
    ...mapActions(["setUserId"]),
    async handleSubmit() {
      try {
        const data = {
          email: this.email,
          password: this.password
        }
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/sign-in`, data)
        console.log(response.data)
        this.setUserId(response.data.id)
        localStorage.setItem("userId", response.data._id)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isAuth", true)
        this.$router.push("/home")
      } catch (error) {
        console.log(error)
        if (error.response.status === 400) {
          this.error = error.response.data.message
        }
      }
    }
  }
}
</script>

<style scoped>
.main_sign_in {
  background-image: url("../assets/images/login.jpg");
  background: cover;
  background-size: cover;
}
</style>
