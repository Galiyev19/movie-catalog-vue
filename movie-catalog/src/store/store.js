import { createStore } from "vuex";
import apiMovies from "../api/api-movies";
import axios from 'axios'

export default createStore({
  state: {
    userId: null,
    isAuth: false,
    movieDetail: {},
    movieId: null,
    personId: null,
    media_type: "",
    selectOptionTV: "top_rated",
    selectOptionMovie: "now_playing",
    currentVideo: null, 
    showModalVideo: false,
    searchResult: [],
    searchValue: "",
    userMovieList: []
  },
  getters: {
    getUserId(state) {
      return state.userId
    },
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
    getIsAuth(state) {
      return state.isAuth
    },
    getSearchResult(state) {
      return state.searchResult
    },
    getSearchValue(state) {
      return state.searchValue
    },
    getUserMovieList(state){
      return state.userMovieList
    }
  },
  mutations: {
    setUserId(state,id) {
      state.userId = id
    },
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
    setSearchResult(state,results){
      // console.log(results)
      state.searchResult = results;
    },
    setSearchValue (state,value){
      // console.log(value)
      state.searchValue = value
    },
    setUserMovieList(state,value){
      state.userMovieList = value
    }
  },
  actions: {
    async getMovieDetail({commit}) {
      try{
        const id = sessionStorage.getItem("id")
        const media_type = sessionStorage.getItem("media_type")
        // console.log(id)
        const data = await apiMovies.getMovieTrailer(id,media_type)
        // console.log(data)
        commit("setMovieDetail",data)
      }catch(error){
        console.error(error);
      }
    },
    async getSearchResult({commit},searchValue){
      try{
        const data = await apiMovies.searchData(searchValue)
        console.log(data.data.results)
        commit("setSearchResult",data.data.results)
      }catch(error){
        console.log(error)
      }
    },
    async getUserInfo({commit}){
      try {
        const response = await axios.get("http://localhost:4444/auth/me", {
          headers: {
              accept: "application/json",
              Authorization:
                  "Bearer" + localStorage.getItem('token'),
          },
        })
        console.log(response)
        commit("setUserMovieList",response.data.movieList)
      } catch (error) {
        return error
      }
    },
    setUserId({commit},id){
      console.log(id)
      commit("setUserId",id)
    },
    setSearchValue({ commit }, value) {
      commit("setSearchValue", value);
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
      // console.log(video)
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
