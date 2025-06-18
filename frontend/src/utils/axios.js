// src/utils/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // adjust as needed
  withCredentials: true
});

export default instance;
