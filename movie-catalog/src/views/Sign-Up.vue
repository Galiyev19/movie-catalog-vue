<template>
  <div class="relative min-h-screen w-full bg-no-repeat bg-center bg-fixed bg-cover main_sign_up">
    <div class="w-full h-full md:bg-opacity-25 p-8">
      <div class="flex justify-center content-center w-full min-h-screen">
        <form
          className="flex flex-col text-center bg-black bg-opacity-70 px-8 py-8 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full"
          @submit.prevent="handleSubmit">
          <h2 class="text-white font-bold text-4xl mb-2">
            Зарегистрироваться
          </h2>
          <div class="flex w-full flex-col">
            <span class="text-white text-xl text-start">username</span>
            <input class="outline-none my-4 rounded-sm p-2" type="text" v-bind:value="username"
              @input="username = $event.target.value" placeholder="UserName" />
            <span class="text-white text-xl text-start">email</span>
            <input class="outline-none my-4 rounded-sm p-2" placeholder="Email" type="email" v-bind:value="email"
              @input="email = $event.target.value" />
            <span class="text-white text-xl text-start">password</span>
            <div class="flex w-full bg-white my-4 rounded-sm p-2 ">
              <input class="outline-none border-none w-full text-xl" :type="showPassword ? '' : `password`" minlength="5"
                placeholder="Password" v-bind:value="password" @input="password = $event.target.value" />
              <label class="relative top-0 left-0 z-10" @click="showPassword = !showPassword">
                <font-awesome-icon icon="eye" v-if="showPassword" />
                <font-awesome-icon icon="eye-slash" v-if="!showPassword" />
              </label>
            </div>
            <button class="w-full bg-green-400 p-2 rounded-sm text-white my-2" @click="handleSignUp">
              Создать
            </button>
            <div class="flex justify-center w-full mt-4 text-center">
              <label class="text-white text-center">
                Уже зарегистрированы.
                <router-link to="/sign-in" class="mx-1 text-blue-300 text-center">
                  Войти
                </router-link>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
export default {
  name: "sign-up",
  data() {
    return {
      username: '',
      email: '',
      password: '',
      showPassword: '',
      errorText: ''
    }
  },
  methods: {
    ...mapActions(["setUserId"]),
    async handleSignUp() {
      try {
        const data = {
          username: this.username,
          email: this.email,
          password: this.password
        }

        const request = await axios.post("http://localhost:4444/sign-up", data)
        console.log(request)
        this.setUserId(request.data.id)
        localStorage.setItem("userId", response.data._id)
        localStorage.setItem("token", request.data.token);
        localStorage.setItem("isAuth", true)
        this.$router.push("/home")
      } catch (error) {
        console.log(error)
      }
    }

  }
}
</script>

<style>
.main_sign_up {
  background-image: url("../assets/images/login.jpg");
  background: cover;
  background-size: cover;
}
</style>
