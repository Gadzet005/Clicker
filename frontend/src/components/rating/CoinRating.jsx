import { BaseRating } from "./BaseRating";
import { Coins } from "../common/Coins";
import { RatingHeader } from "./RatingHeader";
import { getCoinRating } from "../../api/gameApi";
import { useEffect, useState } from "react";

export const CoinRating = () => {
  const [rating, setRating] = useState([]);

  useEffect(() => {
    getCoinRating().then((data) => {
      setRating(data);
    });
  }, []);

  return (
    <div>
      <RatingHeader title="Рейтинг игроков: монеты" />
      <BaseRating list={rating} IconComp={Coins} />
    </div>
  );
};
