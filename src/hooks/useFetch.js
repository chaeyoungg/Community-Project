import { useEffect, useState } from "react";

function useFetch(fetchParams, type = null) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = "https://api.fesp.shop";

  useEffect(() => {
    request(fetchParams, type);
  }, []);

  const request = async (fetchParams, paramType) => {
    try {
      let res;
      if (type) {
        console.log("타입 있음", type);
        const url = new URL(BASE_URL + fetchParams);
        url.search = new URLSearchParams({ type: paramType });
        res = await fetch(url, {
          header: {
            "Content-Type": "application/json",
          },
        });
      } else {
        console.log("타입 없음");

        res = await fetch(BASE_URL + fetchParams, {
          header: {
            "Content-Type": "application/json",
          },
        });
      }

      const jsonRes = await res.json();
      if (jsonRes.ok) {
        setError(null);
        setData(jsonRes);
      } else {
        throw new Error(jsonRes.error.message);
      }
      return jsonRes;
    } catch (err) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, data, error };
}

export default useFetch;
// const REFRESH_URL = "/auto/refresh";
