import axios from "axios";

const API = axios.create({
  baseURL: "https://api.themoviedb.org",
  timeout: 30000,
});

const serverAPI = axios.create({
  baseURL: "http://localhost:4444",
  timeout: 30000,
})

export {serverAPI};
export default API;
