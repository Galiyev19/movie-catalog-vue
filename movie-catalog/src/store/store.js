import { createStore } from "vuex";

export default createStore({
  state: {
    movieId: null,
    type: "",
  },
  getters: {
    movieId(state) {
      return state.movieId;
    },
  },
  mutations: {
    selectMovieId(state, value) {
      console.log(value);
      state.movieId = value;
    },
  },
  actions: {
    selectMovieId({ commit }, id) {
      commit("selectMovieId", id);
    },
  },
});
