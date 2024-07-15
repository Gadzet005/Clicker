import { host } from "./axiosApi.js";

export const getWords = async (wordAmount, maxWordHardness) => {
  const { data } = await host.get("/getWords", {
    params: {
      wordAmount,
      maxWordHardness,
    },
  });

  return data.words;
};
