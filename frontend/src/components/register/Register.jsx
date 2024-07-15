import { EmailField } from "../common/EmailField";
import { PasswordField } from "../common/PasswordField";
import { TextField } from "../common/TextField";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PAGE, ACCOUNT_PAGE } from "../../routing/consts";
import { useEffect, useState } from "react";
import { setAuthAction } from "../../store/userReducers";
import { useSelector, useDispatch } from "react-redux";
import { userRegistration } from "../../api/userApi";
import { FormError } from "../common/FormError";

export const Register = () => {
  const [error, setError] = useState(null);

  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate(ACCOUNT_PAGE);
    }
  }, [isAuth]);

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    if (data.password !== data.passwordRepeat) {
      setError(<FormError message="Пароли не совпадают" />);
      return;
    }

    userRegistration(data).then((data) => {
      if (data.success) {
        dispatch(setAuthAction(data));
      } else {
        setError(<FormError message={data.message} />);
      }
    });
  };

  return (
    <div className="d-flex flex-column">
      <h1 className="d-flex justify-content-center">Регистрация</h1>
      <div className="d-flex justify-content-center">
        <p className="me-2">Уже есть аккаунт?</p>{" "}
        <Link className="text-decoration-none" to={LOGIN_PAGE}>
          Страница входа
        </Link>
      </div>
      <div className="d-flex justify-content-center">{error}</div>

      <div className="d-flex justify-content-center">
        <form className="w-25" onSubmit={submitHandler}>
          <EmailField />
          <TextField name="name" label="Имя" />
          <PasswordField name="password" />
          <PasswordField name="passwordRepeat" label="Повторите пароль" />
          <button type="submit" className="btn btn-primary">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};
