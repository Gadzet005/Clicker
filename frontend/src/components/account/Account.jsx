import { Coins } from "../common/Coins";
import { Words } from "../common/Words";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setNotAuthAction } from "../../store/userReducers";

export const Account = () => {
  const coins = useSelector((state) => state.user.profile.coins);
  const words = useSelector((state) => state.user.profile.words);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(setNotAuthAction());
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <h1>Профиль</h1>
      </div>

      <div className="container">
        <h1 className="mb-5">Gadzet</h1>
        <h2>Место в рейтинге: 1</h2>
        <div>
          <h2 className="d-inline me-3">Монет:</h2> <Coins value={coins} />
        </div>
        <div>
          <h2 className="d-inline me-3">Слов:</h2> <Words value={words} />
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
