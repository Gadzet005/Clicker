import { Coins } from "../common/Coins";
import { Words } from "../common/Words";
import { useDispatch, useSelector } from "react-redux";
import { setNotAuthAction } from "../../store/userReducers";
import { userLogout } from "../../api/userApi";

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
        <h1>Профиль</h1>
      </div>

      <div className="container">
        <h1 className="mb-3">{user.name}</h1>
        <h2>Почта: {user.email}</h2>
        <div>
          <h2 className="d-inline me-3">Монет:</h2>{" "}
          <Coins value={user.profile.coins} />
        </div>
        <div>
          <h2 className="d-inline me-3">Слов:</h2>{" "}
          <Words value={user.profile.words} />
        </div>

        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary btn-lg mt-5 px-5"
            onClick={logoutHandler}
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  );
};
