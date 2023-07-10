import API from "./axios";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMGE0YWYyY2E3Njk3MjgxYjI0YjM2MjYyNDkzYTY0NCIsInN1YiI6IjY0NzliNjJkY2Y0YjhiMDBhODc2ZGRhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Mgefz5Z1U12Lal5gd7y3qx-Tqysg67nKsJawysi3Zqo",
  },
  mode: "no-cors",
};

const apiMovies = {
  getNowPlayingMovie: async () => {
    try {
      const response = await API.get("/3/movie/now_playing", options);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  getPopulaMovie: async () => {
    try {
      const response = await API.get("/3/trending/movie/day", options);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },

  getGenres: async () => {
    try {
      const response = await API.get("/3/genre/movie/list", options);
      return response.data.genres;
    } catch (e) {
      console.log(e);
    }
  },

  getTVSerials: async () => {
    try {
      const response = await API.get("/3/tv/popular", options);
      // console.log(response);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },

  getMovieDetailById: async (id) => {
    try {
      const response = await API.get(`/3/movie/${id}`, options);
      return response;
    } catch (e) {
      console.log(e);
    }
  },

  getMovieTrailer: async (id) => {
    try {
      const response = await API.get(
        `/3/movie/${id}?api_key=c0a4af2ca7697281b24b36262493a644&append_to_response=videos`
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },

  getPopularSerials: async () => {
    try {
      const response = await API.get("/3/tv/top_rated", options);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  getSerialsTrailer: async (id) => {
    try {
      const response = await API.get(
        `/3/tv/${id}?api_key=c0a4af2ca7697281b24b36262493a644&append_to_response=videos`
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
};

export default apiMovies;
