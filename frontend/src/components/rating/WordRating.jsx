import { BaseRating } from "./BaseRating";
import { Words } from "../common/Words";
import { RatingHeader } from "./RatingHeader";

export const WordRating = () => {
  // TODO: получение списка игроков с сервера
  const getPlayers = () => {
    return [
      { name: "Gadzet", score: 12312 },
      { name: "Player 1", score: 4133 },
      { name: "sdsdadsadd", score: 3414 },
      { name: "Kto ya?", score: 2134 },
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
      <BaseRating getList={getPlayers} IconComp={Words} />
    </div>
  );
};
