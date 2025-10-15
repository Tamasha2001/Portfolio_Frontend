import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

fetch(`${apiBaseUrl}/projects`)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error("Error fetching projects:", err));

export default API;
