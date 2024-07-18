import { walletHost } from "./axiosApi";

export const getQRCode = async (id, amount) => {
  const { data } = await walletHost.get("/getTransactionQR", {
    params: {
      UID: id,
      TonAmt: amount,
    },
  });

  return data;
};
