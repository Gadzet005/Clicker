import { EmailField } from "../common/EmailField";
import { PasswordField } from "../common/PasswordField";
import { Link } from "react-router-dom";
import { REGISTER_PAGE } from "../../routing/consts";

export const Login = () => {
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
      <h1 className="d-flex justify-content-center">Вход</h1>
      <div className="d-flex justify-content-center">
        <p className="me-2">Нет аккаунта?</p>{" "}
        <Link className="text-decoration-none" to={REGISTER_PAGE}>
          Страница регистрации
        </Link>
      </div>

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
