import axios from "axios";

const API = axios.create({
  baseURL: "https://api.themoviedb.org",
  timeout: 30000,
});
export default API;
