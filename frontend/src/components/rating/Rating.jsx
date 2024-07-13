import { RatingItem } from "./RatingItem";
import { Coins } from "../common/Coins";

export const Rating = () => {
  const getPlayers = () => {
    // TODO: получение списка игроков с сервера
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

  const players = getPlayers().map((player) => {
    return {
      ...player,
      name: player.name.slice(0, 15) + (player.name.length > 15 ? "..." : ""),
    };
  });

  const items = [];
  for (let i = 0; i < players.length; i++) {
    items.push(
      <RatingItem
        key={i}
        name={players[i].name}
        score={players[i].score}
        place={i + 1}
      />
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center mb-5">
        <h1 className="me-2">Рейтинг игроков:</h1>
        <Coins />
      </div>
      <div className="container">
        <ul className="list-group">{items}</ul>
      </div>
    </div>
  );
};
