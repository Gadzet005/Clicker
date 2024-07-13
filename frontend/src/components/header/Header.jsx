import {
  HOME_PAGE,
  GAME_PAGE,
  LOGIN_PAGE,
  REGISTER_PAGE,
  ACCOUNT_PAGE,
} from "../../routing/consts";
import { HeaderItem } from "./HeaderItem";

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

  const items = list.map(({ name, path }) => {
    return (
      <HeaderItem
        key={name}
        name={name}
        path={path}
        isActive={window.location.pathname === path}
      />
    );
  });

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
