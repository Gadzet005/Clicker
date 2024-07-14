import { authHost } from "./axiosApi.js";

export const getWords = async (wordAmount, maxWordHardness) => {
  const { data } = await authHost.post(
    "/getWords",
    { wordAmount, maxWordHardness },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );

  return data.words;
};
