import { createStore } from "vuex";
import apiMovies from "../api/api-movies";


export default createStore({
  state: {
    isAuth: false,
    movieDetail: {},
    movieId: null,
    personId: null,
    media_type: "",
    selectOptionTV: "top_rated",
    selectOptionMovie: "now_playing",
    currentVideo: null, 
    showModalVideo: false,
  },
  getters: {
    getMovieDetail(state){
      return state.movieDetail
    },
    movieId(state) {
      return state.movieId;
    },
    mediaType(state) {
      return state.media_type;
    },
    selectedOptionTV(state) {
      return state.selectOptionTV;
    },
    selectedOptionMovie(state) {
      return state.selectOptionMovie;
    },
    personId(state) {
      return state.personId
    },
    getCurrentVideo(state){
      return state.currentVideo
    },
    getShowModalVideo(state){
      return state.showModalVideo
    },
    getIsAuth() {
      return state.isAuth
    }
  },
  mutations: {
    setMovieDetail (state,movieDetail) {
      state.movieDetail = movieDetail;
    },
    selectMovieId(state, id) {
      sessionStorage.setItem("id", id);
      console.log(id);
      state.movieId = id;
    },
    setMediaType(state, media_type) {
      sessionStorage.setItem("media_type", media_type);
      console.log(media_type);
      state.media_type = media_type;
    },
    selectedOptionTV(state, optionName) {
      console.log(optionName);
      state.selectOptionTV = optionName;
    },
    selectedOpitonMovie(state, optionName) {
      console.log(optionName);
      state.selectOptionMovie = optionName;
    },
    setPersonId(state,id){
      console.log(id)
      sessionStorage.setItem("personId", id);
      state.personId = id
    },
    setCurrentVideo(state,video){
      state.currentVideo = video
    },
    setShowModalVideo(state,option){
      console.log(state.showModalVideo)
      state.showModalVideo = option
    },
    setIsAuth(state) {
      state.isAuth = true;
    }
  },
  actions: {
    async getMovieDetail({commit}) {
      try{
        const id = sessionStorage.getItem("id")
        const media_type = sessionStorage.getItem("media_type")
        // console.log(id)
        const data = await apiMovies.getMovieTrailer(id,media_type)
        console.log(data)
        commit("setMovieDetail",data)
      }catch(error){
        console.error(error);
      }
    },
    selectMovieId({ commit }, id) {
      commit("selectMovieId", id);
    },
    setMediaType({ commit }, media_type) {
      commit("setMediaType", media_type);
    },
    selectedOptionTV({ commit }, optionName) {
      commit("selectedOptionTV", optionName);
    },
    selectedOpitonMovie({ commit }, optionName) {
      commit("selectedOpitonMovie", optionName);
    },
    setPersonId ({commit},id){
      commit("setPersonId",id)
    },
    setCurrentVideo({commit}, video){
      console.log(video)
      commit("setCurrentVideo",video)
    },
    setShowModalVideo({commit},option){
      commit("setShowModalVideo",option)
    },
    setIsAuth({commit}){
      commit("setIsAuth")
    }
  },
});
