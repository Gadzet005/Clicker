import { HOME_PAGE, GAME_PAGE } from "./consts";
import { Home } from "../components/home/Home";
import { Game } from "../components/game/Game";

export const authRoutes = [];

export const publicRoutes = [
  {
    path: HOME_PAGE,
    component: <Home />,
  },
  {
    path: GAME_PAGE,
    component: <Game />,
  },
];
