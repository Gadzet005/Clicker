import { EmailField } from "../common/EmailField";
import { PasswordField } from "../common/PasswordField";
import { FormError } from "../common/FormError";
import { Link, useNavigate } from "react-router-dom";
import { REGISTER_PAGE, ACCOUNT_PAGE } from "../../routing/consts";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setAuthAction } from "../../store/userReducers";
import { userLogin } from "../../api/userApi.js";

export const Login = () => {
  const [error, setError] = useState(null);

  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate(ACCOUNT_PAGE);
    }
    // eslint-disable-next-line
  }, [isAuth]);

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    userLogin(data).then((data) => {
      if (data.success) {
        dispatch(setAuthAction(data));
      } else {
        setError(<FormError message={data.message} />);
      }
    });
  };

  return (
    <div className="d-flex flex-column">
      <h1 className="d-flex justify-content-center">Вход</h1>
      <div className="d-flex justify-content-center">
        <p className="me-2">Нет аккаунта?</p>{" "}
        <Link className="text-decoration-none" to={REGISTER_PAGE}>
          Страница регистрации
        </Link>
      </div>
      <div className="d-flex justify-content-center">{error}</div>

      <div className="d-flex justify-content-center">
        <form className="w-25" onSubmit={submitHandler}>
          <EmailField />
          <PasswordField />
          <button type="submit" className="btn btn-primary">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};
