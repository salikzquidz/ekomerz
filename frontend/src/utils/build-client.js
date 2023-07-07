import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3300/api/v1/",
  withCredentials: true,
});

export default client;
