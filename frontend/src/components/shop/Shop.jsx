import { ShopItem } from "./ShopItem";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Coins } from "../common/Coins";

export const Shop = () => {
  const [shopItems, setShopItems] = useState([]);
  const user = useSelector((state) => state.user);

  // TOOO: запрос к серверу
  const getShopItems = () => {
    return [
      {
        id: 1,
        name: "Монеты за слово",
        description: "Увеличение монет за каждое введеное слово",
        cost: 100,
        level: 0,
        maxLevel: 5,
      },
      {
        id: 2,
        name: "Монеты за символ",
        description: "Увеличение монет за каждый введеный символ",
        cost: 200,
        level: 2,
        maxLevel: 3,
      },
      {
        id: 3,
        name: "Штраф",
        description: "Уменьшение штрафа при ошибке",
        cost: 500,
        level: 3,
        maxLevel: 3,
      },
    ];
  };

  useEffect(() => {
    setShopItems(
      getShopItems().map((item) => (
        <ShopItem
          key={item.id}
          id={item.id}
          name={item.name}
          description={item.description}
          cost={item.cost}
          level={item.level}
          maxLevel={item.maxLevel}
        />
      ))
    );
  }, []);

  return (
    <div>
      <h1 className="text-center">Магазин улучшений</h1>
      <div className="d-flex justify-content-center">
        <h2 className="d-inline">Ваши монеты:</h2>
        <div className="d-inline">
          <Coins
            value={user.profile.coins}
            textStyle="me-1 ms-3 fs-3"
            imageWidth="25px"
            imageHeight="25px"
          />
        </div>
      </div>
      <div className="container d-flex flex-wrap mt-5 justify-content-center">
        {shopItems}
      </div>
    </div>
  );
};
