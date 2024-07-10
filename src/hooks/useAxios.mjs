import { memberState } from "@recoil/user/atoms";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

// const REFRESH_URL = "/auto/refresh";
const BASE_URL = "https://api.fesp.shop";
const REFRESH_URL = "/auth/refresh";

function useAxios() {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-type": "application/json",
      accept: "application/json",
    },
  });

  const navigate = useNavigate();
  const user = useRecoilState(memberState);
  console.log("axiosUser =>", user);

  instance.interceptors.request.use((config) => {
    //config에는 axios 요청객체가 들어감 (url header... )
    if (user[0]) {
      let token = user[0].token.accessToken;
      if (config.url === REFRESH_URL) {
        //갱신되어야 상태이면
        token = user[0].token.refreshToken; //갱신!
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // 응답 인터셉터
  instance.interceptors.response.use(
    (res) => res,
    async (err) => {
      //응답이 에러인 경우에는 로그인이 인증이 안된거니까..
      const { config, response } = err;
      if (response?.status === 401) {
        // 인증 되지 않음
        if (config.url === REFRESH_URL) {
          // refresh 토큰 인증 실패
          const gotoLogin = confirm(
            "로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?"
          );
          gotoLogin &&
            navigate("/users/login", { state: { from: location.pathname } });
          //navigate는 두개의 매개변수를 받는데, 1. 이동할 경로 2. (옵션) state는 이동 시 상태를 추가로 저장한다. (이전 페이지로 돌아가게 상태를 저장)
        } else {
          // refresh 토큰으로 access 토큰 재발급 요청
          const accessToken = await getAccessToken(instance);
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            // 갱신된 accessToken으로 재요청
            return axios(config);
          }
        }
      } else {
        return Promise.reject(err);
      }
    }
  );

  //accessToken 갱신요청
  async function getAccessToken(instance) {
    try {
      const {
        data: { accessToken }, //data라는 객체에 바로 넣는거지!
      } = await instance.get(REFRESH_URL);
      return accessToken;
    } catch (err) {
      console.error(err);
    }
  }
  return instance;
}

export default useAxios;
