import { useState } from "react";
import { Coins } from "../common/Coins";
import { useSelector, useDispatch } from "react-redux";
import { changeCoinsAction } from "../../store/userReducers";
import upgradeImage from "./imgs/upgrade.png";

export const ShopItem = ({ id, name, description, cost, level, maxLevel }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [curLevel, setLevel] = useState(level);

  const buyItemHandler = () => {
    if (user.profile.coins >= cost) {
      dispatch(changeCoinsAction({ coins: -cost }));
      setLevel(curLevel + 1);
    }
  };

  return (
    <div className="p-4	m-3 border border-3 border-black rounded-5">
      <div className="d-flex justify-content-center">
        <img className=" w-25 h-25" src={upgradeImage} alt="Улучшение" />
      </div>
      <h1 className="text-center">{name}</h1>
      <p className="text-muted">{description}</p>
      <div>
        <p className="d-inline me-3 fs-3">Стоимость:</p>
        <Coins
          value={cost}
          textStyle={
            "me-1 fs-3 " +
            (user.profile.coins >= cost ? "text-success" : "text-danger")
          }
          imageWidth="25px"
          imageHeight="25px"
        />
      </div>
      <p className="fs-3">
        Текущий уровень: {curLevel} / {maxLevel}
      </p>
      <div className="d-flex justify-content-center">
        {curLevel === maxLevel ? (
          <button className="btn btn-danger btn-lg disabled">
            макс. уровень
          </button>
        ) : (
          <button
            className={
              "btn btn-success btn-lg " +
              (user.profile.coins >= cost ? "" : "disabled")
            }
            onClick={buyItemHandler}
          >
            {curLevel === 0 ? "Купить" : "Улучшить"}
          </button>
        )}
      </div>
    </div>
  );
};
