import { EmailField } from "../common/EmailField";
import { PasswordField } from "../common/PasswordField";
import { TextField } from "../common/TextField";
import { Link } from "react-router-dom";
import { LOGIN_PAGE } from "../../routing/consts";

export const Register = () => {
  // TODO: отравка запроса на сервер
  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    console.log(data);
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

      <div className="d-flex justify-content-center">
        <form className="w-25" onSubmit={submitHandler}>
          <EmailField />
          <TextField name="name" label="Имя" />
          <PasswordField name="password1" />
          <PasswordField name="password2" label="Повторите пароль" />
          <button type="submit" className="btn btn-primary">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};
