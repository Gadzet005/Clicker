import { Coins } from "../common/Coins";
import { Words } from "../common/Words";
import { useDispatch, useSelector } from "react-redux";
import { setNotAuthAction } from "../../store/userReducers";
import { userLogout } from "../../api/userApi";
import exitImage from "./imgs/exit.png";

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
      <div className="d-flex justify-content-center">
        <h1 className="text-center">{user.name}</h1>
        <div className="d-flex align-items-center ms-3">
          <button className="btn btn-danger pe-0" onClick={logoutHandler}>
            <img
              className="me-2"
              width="25px"
              height="25px"
              src={exitImage}
              alt="Выйти"
              onClick={logoutHandler}
              title="Выйти"
            />
          </button>
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
