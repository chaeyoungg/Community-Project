import { memberState } from "@recoil/user/atoms";
import { useRecoilValue } from "recoil";

const API_SERVER = "https://api.fesp.shop";

const useMutation = (url, options = {}) => {
  const user = useRecoilValue(memberState);
  const send = async (addOptions = {}) => {
    if (!url.startsWith("http")) {
      url = API_SERVER + url;
    }

    options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token?.accessToken}`,
      },
      ...options,
      ...addOptions,
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`2xx 이외의 응답: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  return { send };
};

export default useMutation;
