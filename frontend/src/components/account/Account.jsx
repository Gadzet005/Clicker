import { Coins } from "../common/Coins";
import { Words } from "../common/Words";
import { useDispatch, useSelector } from "react-redux";
import { setNotAuthAction } from "../../store/userReducers";
import { userLogout } from "../../api/userApi";
import { Link } from "react-router-dom";
import { DONATE_PAGE } from "../../routing/consts";
import exitImage from "./imgs/exit.png";
import donateImage from "./imgs/donate.png";

export const Account = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    userLogout().then(() => {
      dispatch(setNotAuthAction());
    });
  };

  return (
    <div>
      <div>
        <h1 className="text-center">{user.name}</h1>
        <div className="d-flex justify-content-center my-3  ">
          <Link className="text-decoration-none mx-4" onClick={logoutHandler}>
            <div className="d-flex justify-content-center">
              <img src={exitImage} alt="Выйти" />
            </div>
            <p className="text-center fs-6 text-muted">Выйти</p>
          </Link>
          <Link className="text-decoration-none mx-4" to={DONATE_PAGE}>
            <div className="d-flex justify-content-center">
              <img src={donateImage} alt="Пополнить" />
            </div>
            <p className="text-center fs-6 text-muted">Пополнить</p>
          </Link>
        </div>
      </div>

      <div className="container">
        <h2>Почта: {user.email}</h2>
        <div>
          <h2 className="d-inline me-2">Монеты:</h2>{" "}
          <Coins
            value={user.profile.coins}
            textStyle="me-2 fs-3"
            imageWidth="25px"
            imageHeight="25px"
          />
        </div>
        <div>
          <h2 className="d-inline me-2">Слова:</h2>{" "}
          <Words
            value={user.profile.words}
            textStyle="me-2 fs-3"
            imageWidth="25px"
            imageHeight="25px"
          />
        </div>
      </div>
    </div>
  );
};
