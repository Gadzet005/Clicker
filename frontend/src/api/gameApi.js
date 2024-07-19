import { host, authHost } from "./axiosApi.js";

export const getWords = async (wordAmount, maxWordHardness) => {
  try {
    const { data } = await host.get("/getWords", {
      params: {
        wordAmount,
        maxWordHardness,
      },
    });

    return data.words;
  } catch (error) {
    return [];
  }
};

export const type = async (success, completeWord) => {
  try {
    const { data } = await authHost.post("/game/type", {
      success,
      completeWord,
    });
    return data;
  } catch (error) {
    return { moneyChanging: null, coinCount: null, wordCount: null };
  }
};

export const getCoinRating = async () => {
  const { data } = await host.get("/game/getBestUsersByCoin");

  return data.users.map(({ id, name, coinCount }) => ({
    id,
    name,
    score: coinCount,
  }));
};

export const getWordRating = async () => {
  const { data } = await host.get("/game/getBestUsersByWord");

  return data.users.map(({ id, name, wordCount }) => ({
    id,
    name,
    score: wordCount,
  }));
};

export const getRatingPosition = async () => {
  try {
    const { data } = await authHost.get("/game/getRatingPosition");
    return data;
  } catch (err) {
    return { positionCoin: null, positionWord: null };
  }
};

export const getAllUpgrades = async () => {
  const { data } = await host.get("/game/getAllUpgrades");
  return data.upgrades;
};

export const buyUpgrade = async (id) => {
  try {
    await authHost.post("/game/buyUpgrade", { upgradeId: String(id) });
  } catch {
    // Ничего
  }
};
