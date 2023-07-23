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
      const response = await API.get(`/3/trending/all/day`, options);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  getPopulaMovie: async (optionName) => {
    try {
      const response = await API.get(`/3/movie/${optionName}/`, options);
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
      const response = await API.get("/3/tv/top_rated", options);
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

  getMovieTrailer: async (id, media_type) => {
    try {
      const response = await API.get(
        `/3/${media_type}/${id}?api_key=c0a4af2ca7697281b24b36262493a644&append_to_response=videos`
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },

  getPopularSerials: async (optionName) => {
    try {
      const response = await API.get(`/3/tv/${optionName}/`, options);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  getSerialsTrailer: async (id, media_type) => {
    try {
      const response = await API.get(
        `/3/${media_type}/${id}?api_key=c0a4af2ca7697281b24b36262493a644&append_to_response=videos`
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  getActorsList: async (id, media_type) => {
    try {
      const response = await API.get(`/3/${media_type}/${id}/credits`, options);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getImageList: async (id, media_type) => {
    try {
      const response = await API.get(`/3/${media_type}/${id}/images`, options);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getPersonInfo: async (id) => {
    try {
      const response = await API.get(`/3/person/${id}`,options);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getLinks: async (id) => {
    try{
      const response = await API.get(`/3/person/${id}/external_ids`,options)
      return response.data;
    }catch(error){
      console.log(error);
    }
  },
  getVideoListById: async (media_type,id) => {
    try {
      const response = await API.get(`3/${media_type}/${id}/videos`, options);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  getPersonMovieCredits: async (id) => {
    try {
      const movieCredits = await API.get(`/3/person/${id}/movie_credits`,options);
      return movieCredits;
    } catch (error) {
      return result;
    }
  },
  getPersonTvCredits: async (id) => {
    try {
      const TvCredits = await API.get(`/3/person/${id}/tv_credits`,options);
      return TvCredits;
    } catch (error) {
      return result;
    }
  },
  getPersonImage: async (id) => {
    try {
      const response = await API.get(`/3/person/${id}/images`,options);
      return response.data.profiles
    } catch (error) {
      
    }
  },
  getPopularMovieTv: async (media_type,page = 1) => {
    try{
      const response = await API.get(`/3/${media_type}/popular?&page=${page}`,options)
      return response.data
    }catch(error){
      console.log(error)
    }
  }
};

export default apiMovies;
