import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { Credentials } from "../Credentials";
import { accessTokenState } from "../store/accessTokenState";

// アクセストークンを取得してセットするカスタムフック
export const useSetAccessToken = () => {
  const spotifyClientInfo = Credentials();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(
            spotifyClientInfo.ClientId + ":" + spotifyClientInfo.ClientSecret
          )
      },
      data: "grant_type=client_credentials",
      method: "POST"
    })
      .then((res) => {
        setAccessToken(res.data.access_token);
        console.log(res.data.access_token);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [
    spotifyClientInfo.ClientId,
    spotifyClientInfo.ClientSecret,
    setAccessToken
  ]);

  return { accessToken };
};
