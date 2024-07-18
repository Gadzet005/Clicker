import { BaseRating } from "./BaseRating";
import { Words } from "../common/Words";
import { RatingHeader } from "./RatingHeader";

export const WordRating = () => {
  // TODO: получение списка игроков с сервера
  const getPlayers = () => {
    return [
      { id: 1, name: "Gadzet", score: 3212 },
      { id: 2, name: "Игрок 2", score: 231 },
      { id: 3, name: "sdsdadsadd", score: 126 },
      { id: 4, name: "Kto ya?", score: 100 },
      { id: 5, name: "Hello world", score: 5 },
      { id: 6, name: "heehhe", score: 4 },
      { id: 7, name: "lol", score: 3 },
      { id: 8, name: "XD", score: 2 },
      { id: 9, name: "heehhe", score: 1 },
      { id: 10, name: "lol", score: 0 },
      { id: 11, name: "XD21333333333333333333333333333333132321", score: 0 },
    ];
  };

  return (
    <div>
      <RatingHeader title="Рейтинг игроков: слова" />
      <BaseRating getList={getPlayers} IconComp={Words} />
    </div>
  );
};
