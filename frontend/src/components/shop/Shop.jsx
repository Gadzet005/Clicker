import { ShopItem } from "./ShopItem";
import { useState, useEffect } from "react";

export const Shop = () => {
  const [shopItems, setShopItems] = useState([]);

  // TOOO: считывание с json файла
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
      <h1 className="text-center mb-5">Магазин улучшений</h1>
      <div className="container d-flex flex-wrap justify-content-around">
        {shopItems}
      </div>
    </div>
  );
};
