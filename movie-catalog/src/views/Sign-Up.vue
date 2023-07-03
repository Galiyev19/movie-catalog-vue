<template>
  <div
    className="relative min-h-screen w-full bg-no-repeat bg-center bg-fixed bg-cover main_sign_up"
  >
    <div className="w-full h-full md:bg-opacity-25 p-8">
      <div className="flex justify-center content-center w-full min-h-screen">
        <form
          className="flex flex-col text-center bg-black bg-opacity-70 px-8 py-8 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full"
        >
          <h2 className="text-white font-bold text-4xl mb-2">
            Зарегистрироваться
          </h2>
          <div className="flex w-full flex-col">
            <span className="text-white text-xl text-start">Почта</span>
            <input
              className="outline-none my-4 rounded-sm p-2"
              placeholder="Введите почту"
            />
            <span className="text-white text-xl text-start">Пароль</span>
            <input
              className="outline-none my-4 rounded-sm p-2"
              placeholder="Введите пароль"
            />
            <button
              className="w-full bg-green-400 p-2 rounded-sm text-white my-2"
            >
              Создать
            </button>
            <div className="flex justify-center w-full mt-4 text-center">
              <label className="text-white text-center">
                Уже зарегистрированы.
                <router-link
                  to="/sign-in"
                  className="mx-1 text-blue-300 text-center"
                >
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

<script></script>

<style>
.main_sign_up {
  background-image: url("../assets/images/login.jpg");
  background: cover;
  background-size: cover;
}
</style>
