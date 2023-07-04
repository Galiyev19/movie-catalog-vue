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

  getPopulaMovieSerialsTV: async () => {
    try {
      const response = await API.get("/3/trending/all/day", options);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },

  getGenres: async () => {
    try {
      const response = await API.get("3/genre/movie/list", options);
      return response.data.genres;
    } catch (e) {
      console.log(e);
    }
  },
};

export default apiMovies;
