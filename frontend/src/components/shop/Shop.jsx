import { ShopItem } from "./ShopItem";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Coins } from "../common/Coins";
import { getAllUpgrades } from "../../api/gameApi";

const getUpgradeInfo = (upgrade, level) => {
  switch (upgrade.id) {
    case 1:
      return {
        name: "Монеты за слово",
        description: `Множитель монет за введенное слово: ${upgrade.effect[level]}x`,
      };
    case 2:
      return {
        name: "Монеты за букву",
        description: `Множитель монет за введенную букву: ${upgrade.effect[level]}x`,
      };
    case 3:
      return {
        name: "Штраф за ошибку",
        description: `Множитель монет за ошибку: ${upgrade.effect[level]}x`,
      };
    case 4:
      return {
        name: "Простота слов",
        description: "Облегчает слова",
      };
    default:
      return { name: "", description: "" };
  }
};

export const Shop = () => {
  const [shopItems, setShopItems] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.profile.upgrades.length === 0) {
      return;
    }

    getAllUpgrades().then((upgrades) => {
      setShopItems(
        upgrades.map((upgrade) => {
          const level = user.profile.upgrades.find(
            (elem) => elem.id === upgrade.id
          ).level;

          const info = getUpgradeInfo(upgrade, level);

          return (
            <ShopItem
              key={upgrade.id}
              id={upgrade.id}
              name={info.name}
              description={info.description}
              cost={
                level + 1 === upgrade.levels ? "∞" : upgrade.costs[level + 1]
              }
              level={level}
              maxLevel={upgrade.levels - 1}
            />
          );
        })
      );
    });
  }, [user.profile.upgrades]);

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
