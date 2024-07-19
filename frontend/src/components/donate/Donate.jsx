import { useState, useEffect } from "react";
import { Coins } from "../common/Coins";
import { QRCode } from "./QRCode";

const shop = [
  {
    coins: 1000,
    cost: 10,
  },
  {
    coins: 5000,
    cost: 40,
  },
  {
    coins: 10000,
    cost: 75,
  },
];

export const Donate = () => {
  const [QR, setQR] = useState(null);

  const buyHandler = (coins, cost) => {
    alert("Пока эта функция не доступна");
  };

  const donateItems = shop.map(({ coins, cost }) => {
    return (
      <li key={coins} className="list-group-item">
        <div className="d-flex align-items-center justify-content-between">
          <Coins value={coins} />
          <p className="d-inline fs-1 text-muted ms-3 my-0">за {cost} ton</p>
          <button
            className="btn btn-success ms-5 btn-lg"
            onClick={() => buyHandler(coins, cost)}
          >
            Купить
          </button>
        </div>
      </li>
    );
  });

  return (
    <div>
      <h1 className="text-center mb-5">Пополнение</h1>
      <div className="d-flex justify-content-center">
        <ul className="list-group">{donateItems}</ul>
      </div>
      <div>{QR}</div>
    </div>
  );
};
