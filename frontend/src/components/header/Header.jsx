import {
  HOME_PAGE,
  GAME_PAGE,
  LOGIN_PAGE,
  REGISTER_PAGE,
  ACCOUNT_PAGE,
  COIN_RATING_PAGE,
} from "../../routing/consts";
import { HeaderItem } from "./HeaderItem";
import { useEffect, useState } from "react";

const list = [
  {
    name: "Главная",
    path: HOME_PAGE,
  },
  {
    name: "Игра",
    path: GAME_PAGE,
  },
  {
    name: "Вход",
    path: LOGIN_PAGE,
  },
  {
    name: "Регистрация",
    path: REGISTER_PAGE,
  },
  {
    name: "Профиль",
    path: ACCOUNT_PAGE,
  },
  {
    name: "Рейтинг",
    path: COIN_RATING_PAGE,
  },
];

export const Header = () => {
  const [items, setItems] = useState([]);

  const updateItems = (activePath) => {
    setItems(
      list.map(({ name, path }) => {
        return (
          <HeaderItem
            key={name}
            name={name}
            path={path}
            onClick={updateItems}
            isActive={path === activePath}
          />
        );
      })
    );
  };

  useEffect(() => updateItems(window.location.pathname), []);

  return (
    <div className="navbar nav-underline navbar-expand-lg bg-body-tertiary mb-3">
      <div className="container-fluid">
        <div className="collapse navbar-collapse justify-content-center">
          <div className="navbar-nav fs-3">{items}</div>
        </div>
      </div>
    </div>
  );
};
