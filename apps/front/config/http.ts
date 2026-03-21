import type { AxiosInstance, CreateAxiosDefaults } from "axios";
import axios from "axios";

const options: CreateAxiosDefaults = {
  baseURL: "http://localhost:4000",
};

const API: AxiosInstance = axios.create(options);

export default API;
