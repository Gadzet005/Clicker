import { host } from "./axiosApi.js";

export const getWords = async (wordAmount, maxWordHardness) => {
  const { data } = await host.post("/getWords", {
    wordAmount,
    maxWordHardness,
  });

  return data.words;
};
