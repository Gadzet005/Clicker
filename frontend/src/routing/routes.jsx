import {
  HOME_PAGE,
  GAME_PAGE,
  LOGIN_PAGE,
  REGISTER_PAGE,
  ACCOUNT_PAGE,
  COIN_RATING_PAGE,
  WORD_RATING_PAGE,
  SHOP_PAGE,
} from "./consts";
import { Home } from "../components/home/Home";
import { Game } from "../components/game/Game";
import { Login } from "../components/login/Login";
import { Register } from "../components/register/Register";
import { Account } from "../components/account/Account";
import { CoinRating } from "../components/rating/CoinRating";
import { WordRating } from "../components/rating/WordRating";
import { Shop } from "../components/shop/Shop";

export const authRoutes = [
  {
    path: GAME_PAGE,
    component: <Game />,
  },
  {
    path: ACCOUNT_PAGE,
    component: <Account />,
  },
  {
    path: SHOP_PAGE,
    component: <Shop />,
  },
];

export const publicRoutes = [
  {
    path: HOME_PAGE,
    component: <Home />,
  },
  {
    path: LOGIN_PAGE,
    component: <Login />,
  },
  {
    path: REGISTER_PAGE,
    component: <Register />,
  },
  {
    path: COIN_RATING_PAGE,
    component: <CoinRating />,
  },
  {
    path: WORD_RATING_PAGE,
    component: <WordRating />,
  },
];
