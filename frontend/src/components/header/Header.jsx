import {
  HOME_PAGE,
  GAME_PAGE,
  LOGIN_PAGE,
  REGISTER_PAGE,
  ACCOUNT_PAGE,
} from "../../routing/consts";
import { HeaderItem } from "./HeaderItem";
import { useEffect, useState } from "react";

export const Header = () => {
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
      name: "Аккаунт",
      path: ACCOUNT_PAGE,
    },
  ];

  const [items, setItems] = useState([]);

  const updateItems = () => {
    setItems(
      list.map(({ name, path }) => {
        return (
          <HeaderItem
            key={path}
            name={name}
            path={path}
            onClick={() => setItems([])}
            isActive={path === window.location.pathname}
          />
        );
      })
    );
  };

  useEffect(() => updateItems());

  return (
    <div className="navbar navbar-expand-lg bg-body-tertiary mb-3">
      <div className="container-fluid">
        <div className="collapse navbar-collapse justify-content-center">
          <div className="navbar-nav fs-3">{items}</div>
        </div>
      </div>
    </div>
  );
};
