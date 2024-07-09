import axios from "axios";

// const REFRESH_URL = "/auto/refresh";
const BASE_URL = "https://api.fesp.shop";
function useAxios() {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-type": "application/json",
      accept: "application/json",
    },
  });

  return instance;
}

export default useAxios;
