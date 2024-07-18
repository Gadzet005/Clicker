import { useState, useEffect } from "react";
import { getQRCode } from "../../api/walletApi";

export const QRCode = ({ coins, cost }) => {
  const [qrCode, setQRCode] = useState(null);

  useEffect(() => {
    getQRCode(coins, cost).then((res) => {
      console.log(res);
      // setQRCode(res);
    });
  }, []);

  return <div>{qrCode}</div>;
};
