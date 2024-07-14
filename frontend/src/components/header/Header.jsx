import {
  HOME_PAGE,
  GAME_PAGE,
  LOGIN_PAGE,
  REGISTER_PAGE,
  ACCOUNT_PAGE,
  COIN_RATING_PAGE,
} from "../../routing/consts";
import { HeaderItem } from "./HeaderItem";
import { useSelector } from "react-redux";

const FOR_ALL = 0;
const ONLY_FOR_ANONYMOUS = 1;
const ONLY_FOR_AUTH = 2;

const list = [
  {
    name: "Главная",
    path: HOME_PAGE,
    type: FOR_ALL,
  },
  {
    name: "Игра",
    path: GAME_PAGE,
    type: ONLY_FOR_AUTH,
  },
  {
    name: "Рейтинг",
    path: COIN_RATING_PAGE,
    type: FOR_ALL,
  },
  {
    name: "Вход",
    path: LOGIN_PAGE,
    type: ONLY_FOR_ANONYMOUS,
  },
  {
    name: "Регистрация",
    path: REGISTER_PAGE,
    type: ONLY_FOR_ANONYMOUS,
  },
  {
    name: "Профиль",
    path: ACCOUNT_PAGE,
    type: ONLY_FOR_AUTH,
  },
];

export const Header = () => {
  const isAuth = useSelector((state) => state.user.isAuth);

  const items = list.map(({ name, path, type }) => {
    if (
      (isAuth && type === ONLY_FOR_ANONYMOUS) ||
      (!isAuth && type === ONLY_FOR_AUTH)
    ) {
      return;
    }
    return <HeaderItem key={name} name={name} path={path} />;
  });

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
