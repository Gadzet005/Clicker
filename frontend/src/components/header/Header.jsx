import { HOME_PAGE, GAME_PAGE } from "../../routing/consts";
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
    <div className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse justify-content-center">
          <div className="navbar-nav fs-3">{items}</div>
        </div>
      </div>
    </div>
  );
};
