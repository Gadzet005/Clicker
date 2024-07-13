import { BaseRating } from "./BaseRating";
import { Coins } from "../common/Coins";
import { RatingHeader } from "./RatingHeader";

export const CoinRating = () => {
  // TODO: получение списка игроков с сервера
  const getPlayers = () => {
    return [
      { name: "Gadzet", score: 555 },
      { name: "Игрок 2", score: 450 },
      { name: "sdsdadsadd", score: 126 },
      { name: "Kto ya?", score: 100 },
      { name: "Hello world", score: 5 },
      { name: "heehhe", score: 4 },
      { name: "lol", score: 3 },
      { name: "XD", score: 2 },
      { name: "heehhe", score: 1 },
      { name: "lol", score: 0 },
      { name: "XD2133333333333333333333333333333313232133123333333", score: 0 },
    ];
  };

  return (
    <div>
      <RatingHeader />
      <BaseRating getList={getPlayers} IconComp={Coins} />
    </div>
  );
};
