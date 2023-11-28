import axios from "axios";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

export const $api = axios.create({
  baseURL: "http://localhost:8000/api", //import.meta.env.BASE_URL
  withCredentials: true,
  headers: {
    authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || "",
  },
});
